import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase env vars are missing — the feedback board will not work until VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  )
}

// createClient throws synchronously on an empty/invalid URL, which would crash
// the whole app at import time (every route, not just /feedback) if envs are
// unset. Fall back to a syntactically valid placeholder so import never throws;
// real requests just fail (and are caught) when misconfigured.
export const supabase = createClient(url || 'https://placeholder.supabase.co', anonKey || 'placeholder-anon-key')
