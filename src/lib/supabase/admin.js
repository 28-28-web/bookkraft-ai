import { createClient } from '@supabase/supabase-js';

// Service-role client — bypasses RLS. Use only in server-side routes
// after verifying the caller's identity via the session client.
export function createAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        { auth: { autoRefreshToken: false, persistSession: false } }
    );
}
