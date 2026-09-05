import { supabase } from './supabase'
import { getClientId } from './clientId'
import type { Post, Comment, SortOption } from '../types/feedback'

function escapeIlike(value: string) {
  return value.replace(/[%_,]/g, (char) => `\\${char}`)
}

export async function fetchPosts(opts: { sort: SortOption; search: string }): Promise<Post[]> {
  let query = supabase.from('posts').select('*')

  const term = opts.search.trim()
  if (term) {
    const escaped = escapeIlike(term)
    query = query.or(`title.ilike.%${escaped}%,details.ilike.%${escaped}%`)
  }

  if (opts.sort === 'new') {
    query = query.order('created_at', { ascending: false })
  } else if (opts.sort === 'discussed') {
    query = query.order('comments_count', { ascending: false }).order('created_at', { ascending: false })
  } else {
    query = query.order('votes_count', { ascending: false }).order('created_at', { ascending: false })
  }

  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

export async function fetchPost(id: string): Promise<Post | null> {
  const { data, error } = await supabase.from('posts').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data
}

export async function fetchComments(postId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function fetchVotedPostIds(postIds: string[]): Promise<Set<string>> {
  if (postIds.length === 0) return new Set()
  const clientId = getClientId()
  const { data, error } = await supabase
    .from('post_votes')
    .select('post_id')
    .eq('client_id', clientId)
    .in('post_id', postIds)
  if (error) throw error
  return new Set((data ?? []).map((row) => row.post_id as string))
}

export async function createPost(input: {
  title: string
  details: string
  turnstileToken: string
  honeypot: string
}) {
  const { data, error } = await supabase.rpc('create_post', {
    p_title: input.title,
    p_details: input.details,
    p_client_id: getClientId(),
    p_turnstile_token: input.turnstileToken,
    p_honeypot: input.honeypot || null,
  })
  if (error) throw error
  return data?.[0] as { id: string; edit_token: string }
}

export async function updatePost(input: {
  postId: string
  title: string
  details: string
  editToken: string
}) {
  const { data, error } = await supabase.rpc('update_post', {
    p_post_id: input.postId,
    p_title: input.title,
    p_details: input.details,
    p_edit_token: input.editToken,
  })
  if (error) throw error
  return data as boolean
}

export async function deletePost(input: { postId: string; editToken: string }) {
  const { data, error } = await supabase.rpc('delete_post', {
    p_post_id: input.postId,
    p_edit_token: input.editToken,
  })
  if (error) throw error
  return data as boolean
}

export async function createComment(input: {
  postId: string
  body: string
  turnstileToken: string
  honeypot: string
}) {
  const { data, error } = await supabase.rpc('create_comment', {
    p_post_id: input.postId,
    p_body: input.body,
    p_client_id: getClientId(),
    p_turnstile_token: input.turnstileToken,
    p_honeypot: input.honeypot || null,
  })
  if (error) throw error
  return data?.[0] as { id: string; edit_token: string }
}

export async function updateComment(input: { commentId: string; body: string; editToken: string }) {
  const { data, error } = await supabase.rpc('update_comment', {
    p_comment_id: input.commentId,
    p_body: input.body,
    p_edit_token: input.editToken,
  })
  if (error) throw error
  return data as boolean
}

export async function deleteComment(input: { commentId: string; editToken: string }) {
  const { data, error } = await supabase.rpc('delete_comment', {
    p_comment_id: input.commentId,
    p_edit_token: input.editToken,
  })
  if (error) throw error
  return data as boolean
}

export async function toggleVote(postId: string) {
  const { data, error } = await supabase.rpc('toggle_vote', {
    p_post_id: postId,
    p_client_id: getClientId(),
  })
  if (error) throw error
  return data?.[0] as { voted: boolean; votes_count: number }
}
