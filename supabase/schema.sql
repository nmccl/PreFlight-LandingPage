-- ============================================================================
-- PreFlight Feedback Board — schema, security, and RPC functions
--
-- Run this once in the Supabase dashboard: Project > SQL Editor > New query.
-- Safe to re-run (uses IF NOT EXISTS / CREATE OR REPLACE throughout).
--
-- After running this file, set your Cloudflare Turnstile secret key with:
--   select vault.create_secret('YOUR_TURNSTILE_SECRET_KEY', 'turnstile_secret_key');
-- ============================================================================

create extension if not exists pgcrypto with schema extensions;
create extension if not exists http with schema extensions;
create extension if not exists supabase_vault;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 120),
  details text not null check (char_length(details) between 1 and 4000),
  votes_count integer not null default 0,
  comments_count integer not null default 0,
  client_id uuid not null,
  edit_token_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_votes_idx on public.posts (votes_count desc, created_at desc);
create index if not exists posts_created_idx on public.posts (created_at desc);
create index if not exists posts_comments_idx on public.posts (comments_count desc, created_at desc);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  client_id uuid not null,
  edit_token_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists comments_post_idx on public.comments (post_id, created_at);

create table if not exists public.post_votes (
  post_id uuid not null references public.posts (id) on delete cascade,
  client_id uuid not null,
  created_at timestamptz not null default now(),
  primary key (post_id, client_id)
);

-- ---------------------------------------------------------------------------
-- Row Level Security
--
-- Only SELECT policies exist. There are no insert/update/delete policies,
-- which means RLS denies all direct writes from the anon key. Every write
-- goes through a SECURITY DEFINER function below, which runs as the table
-- owner (bypassing RLS) only after enforcing spam checks and, for edits,
-- proof of the caller's edit token.
-- ---------------------------------------------------------------------------

alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.post_votes enable row level security;

drop policy if exists "posts are publicly readable" on public.posts;
create policy "posts are publicly readable" on public.posts for select using (true);

drop policy if exists "comments are publicly readable" on public.comments;
create policy "comments are publicly readable" on public.comments for select using (true);

drop policy if exists "votes are publicly readable" on public.post_votes;
create policy "votes are publicly readable" on public.post_votes for select using (true);

-- ---------------------------------------------------------------------------
-- Turnstile verification helper
--
-- Fails closed: if the secret isn't configured yet, or Cloudflare's check
-- doesn't come back with success:true, this returns false.
-- ---------------------------------------------------------------------------

create or replace function public._verify_turnstile(p_token text)
returns boolean
language plpgsql
security definer
set search_path = public, extensions, vault
as $$
declare
  v_secret text;
  v_status int;
  v_body text;
  v_json jsonb;
begin
  if p_token is null or length(p_token) < 10 then
    return false;
  end if;

  select decrypted_secret into v_secret
  from vault.decrypted_secrets
  where name = 'turnstile_secret_key'
  limit 1;

  if v_secret is null then
    return false;
  end if;

  select status, content
  into v_status, v_body
  from extensions.http_post(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    'secret=' || v_secret || '&response=' || p_token,
    'application/x-www-form-urlencoded'
  );

  if v_status is distinct from 200 then
    return false;
  end if;

  v_json := v_body::jsonb;
  return coalesce((v_json ->> 'success')::boolean, false);
exception when others then
  return false;
end;
$$;

-- ---------------------------------------------------------------------------
-- Posts: create / update / delete
-- ---------------------------------------------------------------------------

create or replace function public.create_post(
  p_title text,
  p_details text,
  p_client_id uuid,
  p_turnstile_token text,
  p_honeypot text default null
)
returns table (id uuid, edit_token text)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_token text;
  v_hash text;
  v_recent int;
begin
  if p_honeypot is not null and length(trim(p_honeypot)) > 0 then
    raise exception 'rejected';
  end if;

  if not public._verify_turnstile(p_turnstile_token) then
    raise exception 'turnstile_failed';
  end if;

  select count(*) into v_recent
  from public.posts
  where posts.client_id = p_client_id and posts.created_at > now() - interval '60 seconds';

  if v_recent > 0 then
    raise exception 'rate_limited';
  end if;

  v_token := encode(extensions.gen_random_bytes(18), 'base64');
  v_hash := extensions.crypt(v_token, extensions.gen_salt('bf'));

  return query
  insert into public.posts (title, details, client_id, edit_token_hash)
  values (trim(p_title), trim(p_details), p_client_id, v_hash)
  returning posts.id, v_token;
end;
$$;

grant execute on function public.create_post(text, text, uuid, text, text) to anon, authenticated;

create or replace function public.update_post(
  p_post_id uuid,
  p_title text,
  p_details text,
  p_edit_token text
)
returns boolean
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_hash text;
begin
  select edit_token_hash into v_hash from public.posts where id = p_post_id;

  if v_hash is null or v_hash <> extensions.crypt(p_edit_token, v_hash) then
    return false;
  end if;

  update public.posts
  set title = trim(p_title), details = trim(p_details), updated_at = now()
  where id = p_post_id;

  return true;
end;
$$;

grant execute on function public.update_post(uuid, text, text, text) to anon, authenticated;

create or replace function public.delete_post(p_post_id uuid, p_edit_token text)
returns boolean
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_hash text;
begin
  select edit_token_hash into v_hash from public.posts where id = p_post_id;

  if v_hash is null or v_hash <> extensions.crypt(p_edit_token, v_hash) then
    return false;
  end if;

  delete from public.posts where id = p_post_id;
  return true;
end;
$$;

grant execute on function public.delete_post(uuid, text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Comments: create / update / delete
-- ---------------------------------------------------------------------------

create or replace function public.create_comment(
  p_post_id uuid,
  p_body text,
  p_client_id uuid,
  p_turnstile_token text,
  p_honeypot text default null
)
returns table (id uuid, edit_token text)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_token text;
  v_hash text;
  v_recent int;
begin
  if p_honeypot is not null and length(trim(p_honeypot)) > 0 then
    raise exception 'rejected';
  end if;

  if not exists (select 1 from public.posts where posts.id = p_post_id) then
    raise exception 'post_not_found';
  end if;

  if not public._verify_turnstile(p_turnstile_token) then
    raise exception 'turnstile_failed';
  end if;

  select count(*) into v_recent
  from public.comments
  where comments.client_id = p_client_id and comments.created_at > now() - interval '20 seconds';

  if v_recent > 0 then
    raise exception 'rate_limited';
  end if;

  v_token := encode(extensions.gen_random_bytes(18), 'base64');
  v_hash := extensions.crypt(v_token, extensions.gen_salt('bf'));

  update public.posts set comments_count = comments_count + 1 where posts.id = p_post_id;

  return query
  insert into public.comments (post_id, body, client_id, edit_token_hash)
  values (p_post_id, trim(p_body), p_client_id, v_hash)
  returning comments.id, v_token;
end;
$$;

grant execute on function public.create_comment(uuid, text, uuid, text, text) to anon, authenticated;

create or replace function public.update_comment(
  p_comment_id uuid,
  p_body text,
  p_edit_token text
)
returns boolean
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_hash text;
begin
  select edit_token_hash into v_hash from public.comments where id = p_comment_id;

  if v_hash is null or v_hash <> extensions.crypt(p_edit_token, v_hash) then
    return false;
  end if;

  update public.comments
  set body = trim(p_body), updated_at = now()
  where id = p_comment_id;

  return true;
end;
$$;

grant execute on function public.update_comment(uuid, text, text) to anon, authenticated;

create or replace function public.delete_comment(p_comment_id uuid, p_edit_token text)
returns boolean
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_hash text;
  v_post_id uuid;
begin
  select edit_token_hash, post_id into v_hash, v_post_id
  from public.comments where id = p_comment_id;

  if v_hash is null or v_hash <> extensions.crypt(p_edit_token, v_hash) then
    return false;
  end if;

  delete from public.comments where id = p_comment_id;
  update public.posts set comments_count = greatest(comments_count - 1, 0) where id = v_post_id;

  return true;
end;
$$;

grant execute on function public.delete_comment(uuid, text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Votes: toggle upvote
-- ---------------------------------------------------------------------------

create or replace function public.toggle_vote(p_post_id uuid, p_client_id uuid)
returns table (voted boolean, votes_count integer)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_existing boolean;
begin
  select exists(
    select 1 from public.post_votes
    where post_votes.post_id = p_post_id and post_votes.client_id = p_client_id
  ) into v_existing;

  if v_existing then
    delete from public.post_votes
    where post_votes.post_id = p_post_id and post_votes.client_id = p_client_id;
    update public.posts set votes_count = greatest(votes_count - 1, 0) where id = p_post_id;
  else
    insert into public.post_votes (post_id, client_id) values (p_post_id, p_client_id);
    update public.posts set votes_count = votes_count + 1 where id = p_post_id;
  end if;

  return query select not v_existing, posts.votes_count from public.posts where id = p_post_id;
end;
$$;

grant execute on function public.toggle_vote(uuid, uuid) to anon, authenticated;
