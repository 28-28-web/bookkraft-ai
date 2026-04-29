'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StickyUpgradeBanner() {
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        // Check if already dismissed in this session
        const isDismissed = sessionStorage.getItem('sticky-banner-dismissed');
        if (isDismissed) return;

        // Show after 8 seconds or when user scrolls 40% down
        const timer = setTimeout(() => setVisible(true), 8000);

        const handleScroll = () => {
            const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            if (scrolled > 0.4) setVisible(true);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleDismiss = () => {
        setDismissed(true);
        sessionStorage.setItem('sticky-banner-dismissed', 'true');
    };

    if (dismissed || !visible) return null;

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

            {/* Dismiss button */}
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

            {/* Message */}
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

            {/* CTA */}
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