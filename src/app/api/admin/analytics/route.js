import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getPool } from '@/lib/db/pool';

// Admin-only funnel analytics. is_admin is verified server-side before any
// read; the reads run over the direct Postgres connection (DATABASE_URL),
// never through Supabase's REST API — same model as /api/admin/data.

const FUNNEL_STEPS = ['tool_start', 'file_processed', 'report_completed', 'fix_clicked', 'checkout_started', 'purchase'];

export async function GET() {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
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

        // Event counts per name, 7-day and 30-day.
        const { rows: counts } = await db.query(
            `select event_name,
                    count(*) filter (where created_at > now() - interval '7 days')::int  as last_7d,
                    count(*) filter (where created_at > now() - interval '30 days')::int as last_30d
             from events
             group by event_name
             order by last_30d desc`
        );

        // Funnel counts (last 30 days).
        const { rows: funnelRows } = await db.query(
            `select event_name, count(*)::int as n
             from events
             where created_at > now() - interval '30 days'
               and event_name = any($1)
             group by event_name`,
            [FUNNEL_STEPS]
        );
        const fm = Object.fromEntries(funnelRows.map((r) => [r.event_name, r.n]));
        const topN = fm[FUNNEL_STEPS[0]] || 0;
        const funnel = FUNNEL_STEPS.map((step, i) => {
            const n = fm[step] || 0;
            const prev = i === 0 ? n : (fm[FUNNEL_STEPS[i - 1]] || 0);
            return {
                step,
                count: n,
                pctOfPrev: i === 0 ? 100 : (prev > 0 ? +(n / prev * 100).toFixed(1) : 0),
                pctOfTop: topN > 0 ? +(n / topN * 100).toFixed(1) : 0,
            };
        });

        // Email capture rate = email_report / report_completed (last 30 days).
        const reportN = fm['report_completed'] || 0;
        const { rows: emailRows } = await db.query(
            `select count(*)::int as n from events
             where event_name = 'email_report' and created_at > now() - interval '30 days'`
        );
        const emailN = emailRows[0]?.n || 0;

        // Top tools by tool_start (from event_data.tool), last 30 days.
        const { rows: topTools } = await db.query(
            `select coalesce(event_data->>'tool', '(unknown)') as tool, count(*)::int as n
             from events
             where event_name = 'tool_start' and created_at > now() - interval '30 days'
             group by 1
             order by n desc
             limit 15`
        );

        // Top referral sources (from ?ref=), last 30 days. referral_source is
        // auto-attached to every event, so distinct session/user gives visitors,
        // and filtered counts give tool_starts and checkouts per partner.
        const { rows: referralSources } = await db.query(
            `select event_data->>'referral_source' as source,
                    count(distinct coalesce(user_id::text, session_id))::int   as visitors,
                    count(*) filter (where event_name = 'tool_start')::int      as tool_starts,
                    count(*) filter (where event_name = 'checkout_started')::int as checkouts
             from events
             where created_at > now() - interval '30 days'
               and event_data->>'referral_source' is not null
             group by 1
             order by visitors desc
             limit 20`
        );

        return NextResponse.json({
            counts,
            funnel,
            emailCapture: { emailN, reportN, rate: reportN > 0 ? +(emailN / reportN * 100).toFixed(1) : 0 },
            topTools,
            referralSources,
        });
    } catch (err) {
        console.error('Admin analytics load failed:', err.message);
        return NextResponse.json({ error: 'load_failed' }, { status: 500 });
    }
}
