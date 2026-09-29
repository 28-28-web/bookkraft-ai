import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logEvent } from '@/lib/events';
import { isValidEmail } from '@/lib/email';

function getClientIp(request) {
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) return forwarded.split(',')[0].trim();
    return request.headers.get('x-real-ip') || null;
}

export async function POST(request) {
    try {
        const { name, email: rawEmail, blockId } = await request.json();
        const email = typeof rawEmail === 'string' ? rawEmail.trim() : '';

        if (!isValidEmail(email)) {
            return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });
        }
        if (!name || typeof name !== 'string' || name.trim().length < 1) {
            return NextResponse.json({ ok: false, error: 'invalid_name' }, { status: 400 });
        }
        if (!blockId || typeof blockId !== 'string') {
            return NextResponse.json({ ok: false, error: 'missing_block_id' }, { status: 400 });
        }

        const source_tool = `block-${blockId}`;
        const ip = getClientIp(request);
        const userAgent = request.headers.get('user-agent') || null;

        const supabase = await createClient();
        const { data, error } = await supabase.rpc('submit_lead', {
            p_email: email,
            p_source_tool: source_tool,
            p_issue_count: 0,
            p_user_agent: userAgent,
            p_ip: ip,
        });

        if (error) {
            console.error('block-lead submit_lead error:', error);
            return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
        }

        if (!data?.ok) {
            const status = data?.error === 'rate_limited' ? 429 : 400;
            return NextResponse.json(data, { status });
        }

        // Funnel event — server-side only, spoof-resistant. Fire-and-forget.
        logEvent({ eventName: 'lead_captured', eventData: { source: source_tool } }).catch(() => {});

        try {
            const brevoKey = process.env.BREVO_API_KEY_TWO;
            const brevoListId = parseInt(process.env.BREVO_TOOL_LEADS_LIST_ID || '0', 10);
            if (brevoKey && brevoListId) {
                await fetch('https://api.brevo.com/v3/contacts', {
                    method: 'POST',
                    headers: { 'api-key': brevoKey, 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: email.toLowerCase().trim(),
                        listIds: [brevoListId],
                        updateEnabled: true,
                        attributes: {
                            FIRSTNAME: name.trim(),
                            SOURCE_TOOL: source_tool,
                        },
                    }),
                });
            }
        } catch {
            // intentionally silent — Supabase write is source of truth
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('block-lead route error:', err);
        return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
    }
}
