'use client';

// Cloudflare Turnstile widget. Renders only when NEXT_PUBLIC_TURNSTILE_SITE_KEY
// is set at build time — so auth forms keep working before the key is
// configured (safe rollout order). Reset by remounting with a changed `key`.
//
// NOTE: NEXT_PUBLIC_* vars are inlined at BUILD time, so the site key must be
// present in the environment when the app is built/deployed for the widget to
// appear.

import { useEffect, useRef } from 'react';

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
let scriptPromise = null;

function loadTurnstileScript() {
    if (typeof window === 'undefined') return Promise.reject(new Error('no window'));
    if (window.turnstile) return Promise.resolve();
    if (scriptPromise) return scriptPromise;
    scriptPromise = new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = SCRIPT_SRC;
        s.async = true;
        s.defer = true;
        s.onload = () => resolve();
        s.onerror = () => { scriptPromise = null; reject(new Error('turnstile script failed')); };
        document.head.appendChild(s);
    });
    return scriptPromise;
}

// True when the site key is configured — forms use this to decide whether a
// token is required before submitting.
export const TURNSTILE_ENABLED = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function Turnstile({ onVerify, onExpire, onError }) {
    const containerRef = useRef(null);
    const widgetIdRef = useRef(null);
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

    useEffect(() => {
        if (!siteKey) return;
        let cancelled = false;
        loadTurnstileScript()
            .then(() => {
                if (cancelled || !containerRef.current || !window.turnstile) return;
                widgetIdRef.current = window.turnstile.render(containerRef.current, {
                    sitekey: siteKey,
                    theme: 'dark',
                    callback: (token) => onVerify && onVerify(token),
                    'expired-callback': () => onExpire && onExpire(),
                    'error-callback': () => onError && onError(),
                });
            })
            .catch(() => onError && onError());
        return () => {
            cancelled = true;
            try {
                if (widgetIdRef.current && window.turnstile) {
                    window.turnstile.remove(widgetIdRef.current);
                }
            } catch {
                // widget already gone — no-op
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [siteKey]);

    if (!siteKey) return null;
    return <div ref={containerRef} style={{ margin: '0 0 var(--space-4)' }} />;
}
