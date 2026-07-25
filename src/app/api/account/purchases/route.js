import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getPool } from '@/lib/db/pool';

/**
 * purchases has RLS enabled with zero policies — it's written only by the
 * Paddle webhook over the direct Postgres connection, by design (see
 * supabase/migrations/20260726180000_create_purchases.sql). It must never
 * be queried from the browser client directly, and no policy should ever
 * be added to expose it there. This route authenticates the request via
 * the normal Supabase session cookie, then reads purchases server-side
 * over the same privileged connection, scoped strictly to that user's
 * own id.
 */
export async function GET() {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    try {
        const db = getPool();
        const { rows } = await db.query(
            `select purchase_type, amount_paid, credits_added, created_at
             from purchases
             where user_id = $1
             order by created_at desc
             limit 20`,
            [user.id]
        );
        return NextResponse.json({ purchases: rows });
    } catch (err) {
        console.error('Failed to load purchase history:', err.message);
        return NextResponse.json({ error: 'load_failed' }, { status: 500 });
    }
}
