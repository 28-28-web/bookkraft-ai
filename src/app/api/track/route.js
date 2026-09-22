import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logEvent, maybeLogRepeatSession, CLIENT_EVENTS } from '@/lib/events';

// Fire-and-forget event ingest. Always returns 200 so the client's beacon
// never surfaces an error. user_id is derived server-side from the auth
// cookie — the client cannot set it. `purchase` is not in CLIENT_EVENTS, so
// it is rejected here and only ever logged from the Paddle webhook.

const MAX_DATA_BYTES = 2048; // event_data is metadata only, never content

export async function POST(request) {
    try {
        let body;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json({ ok: false }, { status: 200 });
        }

        const { event_name, event_data, page_url, session_id } = body || {};

        if (!event_name || !CLIENT_EVENTS.has(event_name)) {
            return NextResponse.json({ ok: false, error: 'invalid_event' }, { status: 200 });
        }

        // Only keep small metadata payloads. Anything oversized is dropped
        // rather than stored — a guard against accidentally logging content.
        let data = null;
        if (event_data && typeof event_data === 'object') {
            try {
                if (JSON.stringify(event_data).length <= MAX_DATA_BYTES) data = event_data;
            } catch {
                data = null;
            }
        }

        const sessionId = (typeof session_id === 'string' && session_id.length <= 128) ? session_id : null;
        const pageUrl = (typeof page_url === 'string' && page_url.length <= 512) ? page_url : null;

        const supabase = await createClient();
        const { data: auth } = await supabase.auth.getUser();
        const userId = auth?.user?.id || null;

        if (event_name === 'tool_start') {
            // Check for a prior tool_start (30min–7d ago) before inserting the
            // current one, so a returning visitor gets a repeat_session event.
            await maybeLogRepeatSession({ userId, sessionId, pageUrl }).catch(() => {});
        }

        await logEvent({ eventName: event_name, userId, sessionId, eventData: data, pageUrl });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('track route error:', err.message);
        return NextResponse.json({ ok: false }, { status: 200 });
    }
}
