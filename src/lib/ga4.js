/**
 * Generalized GA4 Measurement Protocol helper for server-side event firing.
 * Failure is always non-fatal — analytics must never block the request.
 *
 * @param {object} opts
 * @param {string} opts.clientId   - GA4 client_id (_ga cookie value)
 * @param {string} [opts.sessionId] - GA4 session_id (_ga_<id> cookie); joins the event to the visit
 * @param {string} [opts.userId]   - Supabase user UUID
 * @param {string} opts.eventName  - GA4 event name
 * @param {object} [opts.params]   - Event parameters
 */
export async function fireGA4Event({ clientId, sessionId, userId, eventName, params = {} }) {
    const measurementId = process.env.GA4_MEASUREMENT_ID;
    const apiSecret = process.env.GA4_MP_SECRET;
    if (!measurementId || !apiSecret) {
        console.warn('[GA4 MP] env vars missing — GA4_MEASUREMENT_ID or GA4_MP_SECRET not set');
        return;
    }
    if (!clientId) {
        console.warn(`[GA4 MP] ${eventName}: no client_id (no _ga cookie) — sending random id, GA4 will show it as (not set)/Unassigned`);
    }
    const payload = {
        client_id: clientId || `${Math.floor(Math.random() * 1e9)}.${Math.floor(Date.now() / 1000)}`,
        ...(userId ? { user_id: userId } : {}),
        non_personalized_ads: true,
        events: [{
            name: eventName,
            params: sessionId ? { ...params, session_id: String(sessionId), engagement_time_msec: 1 } : params,
        }],
    };
    try {
        const res = await fetch(
            `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`,
            { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
        );
        if (!res.ok) console.warn(`[GA4 MP] ${eventName} HTTP ${res.status}`);
    } catch (err) {
        console.warn('[GA4 MP] fetch failed:', err.message);
    }
}
