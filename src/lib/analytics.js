// Client-side funnel tracking. Fire-and-forget: never blocks or breaks the
// UI, never throws. Sends event_name + metadata to /api/track, which derives
// the logged-in user from the auth cookie (the client cannot set user_id).
//
// PRIVACY: only pass metadata in `data` — tool name, file size range, counts.
// Never pass file names, manuscript text, or any user content.

const SESSION_KEY = 'bk_session_id';
const REF_KEY = 'bk_referral';
const REF_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30-day attribution window

// Stable anonymous id in localStorage. Persists across login so a visitor's
// pre-signup and post-signup events share a session_id.
export function getSessionId() {
    if (typeof window === 'undefined') return null;
    try {
        let id = localStorage.getItem(SESSION_KEY);
        if (!id) {
            id = (typeof crypto !== 'undefined' && crypto.randomUUID)
                ? crypto.randomUUID()
                : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
            localStorage.setItem(SESSION_KEY, id);
        }
        return id;
    } catch {
        return null; // private mode / blocked storage — track anonymously
    }
}

// Capture a ?ref=partner from the landing URL into localStorage. Last-touch:
// a newer ?ref overrides the old one. Call once per page load.
export function captureReferral() {
    if (typeof window === 'undefined') return;
    try {
        const params = new URLSearchParams(window.location.search);
        // ?ref is ALSO used internally for tool-source cross-links
        // (ToolResultsCTA: /tools/X?ref=<toolSlug>&issues=N). Those always carry
        // an `issues` param — skip them so an internal nav can't overwrite a real
        // partner referral with a tool slug.
        if (params.has('issues')) return;
        const ref = params.get('ref');
        if (ref && ref.trim()) {
            const value = ref.trim().slice(0, 64); // guard length
            localStorage.setItem(REF_KEY, JSON.stringify({ v: value, t: Date.now() }));
        }
    } catch {
        // blocked storage — no-op
    }
}

// Active referral source, or null if absent or past the 30-day window.
export function getReferral() {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem(REF_KEY);
        if (!raw) return null;
        const { v, t } = JSON.parse(raw);
        if (!v || !t || Date.now() - t > REF_TTL_MS) {
            localStorage.removeItem(REF_KEY); // expired — drop so it can't attribute a new visit
            return null;
        }
        return v;
    } catch {
        return null;
    }
}

export function track(eventName, data) {
    if (typeof window === 'undefined') return;
    try {
        // Auto-attach the referral source to every event, so partner
        // attribution flows through without touching each track() call site.
        const eventData = { ...(data || {}) };
        const ref = getReferral();
        if (ref && !eventData.referral_source) eventData.referral_source = ref;

        const payload = JSON.stringify({
            event_name: eventName,
            event_data: Object.keys(eventData).length ? eventData : null,
            page_url: window.location.pathname,
            session_id: getSessionId(),
        });
        // sendBeacon survives page navigation (important for checkout_started
        // right before the Paddle redirect) and sends same-origin cookies.
        if (navigator.sendBeacon) {
            navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }));
        } else {
            fetch('/api/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: payload,
                keepalive: true,
            }).catch(() => {});
        }
    } catch {
        // never let tracking break the UI
    }
}
