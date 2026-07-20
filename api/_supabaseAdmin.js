/* global process */
import { createClient } from '@supabase/supabase-js'

let cachedClient = null

export function getSupabaseAdmin() {
  if (cachedClient) {
    return cachedClient
  }

  const url = process.env.VITE_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    return null
  }

  cachedClient = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  return cachedClient
}
