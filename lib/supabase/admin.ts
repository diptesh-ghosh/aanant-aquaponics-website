import { createClient } from '@supabase/supabase-js'

// This client should ONLY be used on the server side
// It bypasses RLS policies and should never be exposed to the client
export const createAdminClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}