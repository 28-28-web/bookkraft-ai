'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StickyUpgradeBanner() {
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const [cookieResolved, setCookieResolved] = useState(false);

    useEffect(() => {
        // Don't show if dismissed within last 7 days
        const dismissedAt = localStorage.getItem('sticky-banner-dismissed-at');
        if (dismissedAt && Date.now() - Number(dismissedAt) < 7 * 24 * 60 * 60 * 1000) return;

        // Don't show until cookie consent has been resolved (accepted or declined)
        const consent = localStorage.getItem('bk_cookie_consent');
        if (consent) setCookieResolved(true);

        // Poll briefly for cookie resolution (in case user accepts mid-session)
        const cookieCheck = setInterval(() => {
            if (localStorage.getItem('bk_cookie_consent')) {
                setCookieResolved(true);
                clearInterval(cookieCheck);
            }
        }, 500);

        const timer = setTimeout(() => setVisible(true), 20000);

        const handleScroll = () => {
            const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            if (scrolled > 0.55) setVisible(true);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            clearTimeout(timer);
            clearInterval(cookieCheck);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleDismiss = () => {
        setDismissed(true);
        localStorage.setItem('sticky-banner-dismissed-at', String(Date.now()));
    };

    if (dismissed || !visible || !cookieResolved) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 999,
            background: '#0F0E0C',
            borderTop: '1px solid rgba(201,147,58,0.4)',
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            boxShadow: '0 -4px 24px rgba(0,0,0,0.35)',
            animation: 'slideUp 0.3s ease forwards',
        }}>
            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>

            <button
                onClick={handleDismiss}
                aria-label="Dismiss"
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '16px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'rgba(247,243,236,0.35)',
                    fontSize: '16px',
                    lineHeight: 1,
                    padding: '4px',
                }}
            >✕</button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#C9933A', fontSize: '18px' }}>✦</span>
                <p style={{
                    color: 'rgba(247,243,236,0.8)',
                    fontSize: '14px',
                    margin: 0,
                    lineHeight: 1.4,
                }}>
                    Enjoying this free tool?{' '}
                    <strong style={{ color: '#F7F3EC' }}>
                        Get all 12 tools for $9.99
                    </strong>
                    {' '}— one-time, no subscription.
                </p>
            </div>

            <Link
                href="/pricing"
                style={{
                    background: '#C9933A',
                    color: '#0F0E0C',
                    fontWeight: 700,
                    fontSize: '13px',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                }}
            >
                Get Full Access — $9.99 →
            </Link>
        </div>
    );
}
