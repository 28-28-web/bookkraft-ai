// Server-only event logging over the direct Postgres connection.
//
// This is the single insert path for the events table (see the
// 20260923120000_create_events migration). Both /api/track and the Paddle
// webhook go through here. Never pass user file/manuscript content in
// eventData — only metadata (tool name, size range, counts).

import { getPool } from '@/lib/db/pool';

// The eight funnel events. `purchase` is logged server-side only (from the
// Paddle webhook), never accepted from a client.
export const EVENT_NAMES = new Set([
    'tool_start',
    'file_processed',
    'report_completed',
    'fix_clicked',
    'email_report',
    'checkout_started',
    'purchase',
    'repeat_session',
]);

// Events a browser is allowed to send to /api/track. `purchase` is excluded
// on purpose: it must be spoof-resistant and comes only from the webhook.
export const CLIENT_EVENTS = new Set([
    'tool_start',
    'file_processed',
    'report_completed',
    'fix_clicked',
    'email_report',
    'checkout_started',
]);

export async function logEvent({ eventName, userId = null, sessionId = null, eventData = null, pageUrl = null }) {
    if (!EVENT_NAMES.has(eventName)) return { ok: false, error: 'invalid_event' };
    const db = getPool();
    await db.query(
        `insert into events (user_id, session_id, event_name, event_data, page_url)
         values ($1, $2, $3, $4, $5)`,
        [userId, sessionId, eventName, eventData ? JSON.stringify(eventData) : null, pageUrl]
    );
    return { ok: true };
}

// On a new tool_start, log a repeat_session if the same user OR session
// already started a tool earlier — between 30 minutes and 7 days ago. The
// 30-minute floor excludes the same sitting, so this counts genuine return
// visits, not every tool run in one session. Call this BEFORE inserting the
// current tool_start so it isn't counted as its own prior.
export async function maybeLogRepeatSession({ userId = null, sessionId = null, pageUrl = null }) {
    if (!userId && !sessionId) return { ok: false, error: 'no_identity' };
    const db = getPool();
    const { rows } = await db.query(
        `select 1 from events
         where event_name = 'tool_start'
           and created_at < now() - interval '30 minutes'
           and created_at > now() - interval '7 days'
           and ( ($1::uuid is not null and user_id = $1)
              or ($2::text is not null and session_id = $2) )
         limit 1`,
        [userId, sessionId]
    );
    if (rows.length > 0) {
        return logEvent({ eventName: 'repeat_session', userId, sessionId, pageUrl });
    }
    return { ok: true, repeat: false };
}
