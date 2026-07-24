import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

function getClientIp(request) {
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) return forwarded.split(',')[0].trim();
    return request.headers.get('x-real-ip') || null;
}

export async function POST(request) {
    try {
        const { email, source_tool, issue_count } = await request.json();

        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });
        }
        if (!source_tool || typeof source_tool !== 'string') {
            return NextResponse.json({ ok: false, error: 'missing_source_tool' }, { status: 400 });
        }

        const ip = getClientIp(request);
        const userAgent = request.headers.get('user-agent') || null;

        const supabase = await createClient();
        const { data, error } = await supabase.rpc('submit_lead', {
            p_email: email,
            p_source_tool: source_tool,
            p_issue_count: Number.isFinite(issue_count) ? issue_count : 0,
            p_user_agent: userAgent,
            p_ip: ip,
        });

        if (error) {
            console.error('submit_lead RPC error:', error);
            return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
        }

        if (!data?.ok) {
            const status = data?.error === 'rate_limited' ? 429 : 400;
            return NextResponse.json(data, { status });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('Leads route error:', err);
        return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
    }
}
