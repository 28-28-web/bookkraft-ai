// Client-side funnel tracking. Fire-and-forget: never blocks or breaks the
// UI, never throws. Sends event_name + metadata to /api/track, which derives
// the logged-in user from the auth cookie (the client cannot set user_id).
//
// PRIVACY: only pass metadata in `data` — tool name, file size range, counts.
// Never pass file names, manuscript text, or any user content.

const SESSION_KEY = 'bk_session_id';

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

export function track(eventName, data) {
    if (typeof window === 'undefined') return;
    try {
        const payload = JSON.stringify({
            event_name: eventName,
            event_data: data || null,
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
