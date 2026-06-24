'use client';

import { useEffect, useState } from 'react';

export default function StampCounter() {
    const [count, setCount] = useState(null);
    const [stamping, setStamping] = useState(false);

    useEffect(() => {
        fetch('/api/stamp-counter')
            .then((r) => r.json())
            .then((d) => setCount(d.count))
            .catch(() => setCount(0));
    }, []);

    async function handleStamp() {
        if (stamping) return;
        setStamping(true);

        // Optimistic update so the click feels instant
        setCount((c) => (c === null ? 1 : c + 1));

        try {
            const res = await fetch('/api/stamp-counter', { method: 'POST' });
            const data = await res.json();
            if (typeof data.count === 'number') {
                setCount(data.count);
            }
        } catch {
            // Optimistic value stays on failure — not critical for a fun widget
        }

        setTimeout(() => setStamping(false), 420);
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                padding: '32px 24px',
                userSelect: 'none',
            }}
        >
            <button
                onClick={handleStamp}
                aria-label="Stamp a book"
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    lineHeight: 0,
                }}
            >
                <svg
                    width="72"
                    height="72"
                    viewBox="0 0 72 72"
                    style={{
                        transform: stamping ? 'scale(0.86) rotate(-6deg)' : 'scale(1) rotate(0deg)',
                        transition: 'transform 180ms cubic-bezier(.34,1.56,.64,1)',
                    }}
                >
                    {/* Book body */}
                    <rect x="14" y="20" width="44" height="34" rx="3" fill="#c9a84c" />
                    <rect x="14" y="20" width="44" height="34" rx="3" fill="none" stroke="#1a1a1a" strokeWidth="1.5" opacity="0.15" />
                    <line x1="36" y1="20" x2="36" y2="54" stroke="#1a1a1a" strokeWidth="1.5" opacity="0.2" />

                    {/* Wax seal stamp, scales/fades in on click */}
                    <circle
                        cx="36"
                        cy="37"
                        r="13"
                        fill="#8b1e1e"
                        style={{
                            transformOrigin: '36px 37px',
                            transform: stamping ? 'scale(1)' : 'scale(0)',
                            opacity: stamping ? 1 : 0,
                            transition: 'transform 220ms cubic-bezier(.34,1.56,.64,1), opacity 150ms ease-out',
                        }}
                    />
                    <path
                        d="M30 37l4 4 8-9"
                        stroke="#f5f0e6"
                        strokeWidth="2.4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                            opacity: stamping ? 1 : 0,
                            transition: 'opacity 200ms ease-out 80ms',
                        }}
                    />
                </svg>
            </button>

            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Playfair Display',serif" }}>
                    {count === null ? '—' : count.toLocaleString()}
                </div>
                <div style={{ fontSize: 13, opacity: 0.65, marginTop: 2 }}>
                    books formatted by indie authors — tap to celebrate one
                </div>
            </div>
        </div>
    );
}