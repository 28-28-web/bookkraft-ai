import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getPool } from '@/lib/db/pool';

/**
 * Admin dashboard data — users, purchases, aggregate stats.
 *
 * Previously the admin page queried users/purchases/credit_transactions
 * directly from a client component, gated only by "the page redirects
 * non-admins away." That is not a security model — any logged-in user
 * could run the exact same supabase-js queries from the browser console
 * with the public anon key, regardless of what the page renders. The
 * only thing that actually stopped that was RLS, and there's no RLS
 * policy that would have let a non-admin see this data (nor should there
 * be one for admins either — see below).
 *
 * is_admin is verified server-side here before anything is read. The
 * actual reads go over the direct Postgres connection (DATABASE_URL),
 * not through Supabase's REST API — same reasoning as the Paddle webhook
 * and purchases table: no RLS policy should ever expose purchases (or a
 * full user listing) to any authenticated-role client, admin or not,
 * because that policy would be reachable directly via PostgREST with any
 * valid user's session token, not just from this route.
 */
export async function GET() {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    // A user reading their own row is fine under normal RLS (auth.uid() = id) —
    // this is not the same as the broad admin listing below.
    const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', user.id)
        .single();

    if (profileError || !profile?.is_admin) {
        return NextResponse.json({ error: 'forbidden' }, { status: 403 });
    }

    try {
        const db = getPool();

        const { rows: users } = await db.query(
            `select id, email, credits_balance, has_full_access, has_logic_bundle, is_lifetime, created_at
             from users
             order by created_at desc
             limit 50`
        );

        const { rows: purchases } = await db.query(
            `select purchase_type, amount_paid, credits_added, created_at
             from purchases
             order by created_at desc
             limit 50`
        );

        const { rows: countRows } = await db.query(`select count(*)::int as n from users`);
        const { rows: creditsSoldRows } = await db.query(
            `select coalesce(sum(credits_added), 0)::int as total from purchases`
        );

        return NextResponse.json({
            users,
            purchases,
            totalUserCount: countRows[0]?.n ?? users.length,
            creditsSold: creditsSoldRows[0]?.total ?? 0,
        });
    } catch (err) {
        console.error('Admin data load failed:', err.message);
        return NextResponse.json({ error: 'load_failed' }, { status: 500 });
    }
}
