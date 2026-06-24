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
                gap: 14,
                padding: '48px 24px',
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
                    width="140"
                    height="140"
                    viewBox="0 0 140 140"
                    style={{
                        transform: stamping ? 'scale(0.9) rotate(-4deg)' : 'scale(1) rotate(0deg)',
                        transition: 'transform 180ms cubic-bezier(.34,1.56,.64,1)',
                    }}
                >
                    {/* Shadow under the book */}
                    <ellipse cx="70" cy="118" rx="42" ry="6" fill="#1a1a1a" opacity="0.08" />

                    {/* Back cover edge (gives it thickness) */}
                    <rect x="22" y="34" width="92" height="68" rx="3" fill="#9c7f35" />

                    {/* Pages stack, visible at the right edge */}
                    <rect x="100" y="36" width="10" height="64" fill="#f5f0e6" />
                    <line x1="103" y1="38" x2="103" y2="98" stroke="#d8cdb0" strokeWidth="1" />
                    <line x1="106" y1="38" x2="106" y2="98" stroke="#d8cdb0" strokeWidth="1" />

                    {/* Front cover */}
                    <rect x="18" y="30" width="86" height="68" rx="3" fill="#c9a84c" />
                    <rect x="18" y="30" width="86" height="68" rx="3" fill="none" stroke="#1a1a1a" strokeOpacity="0.12" strokeWidth="1.5" />

                    {/* Spine accent line */}
                    <rect x="18" y="30" width="8" height="68" rx="2" fill="#1a1a1a" opacity="0.12" />

                    {/* Title lines on the cover */}
                    <rect x="38" y="48" width="48" height="4" rx="2" fill="#1a1a1a" opacity="0.25" />
                    <rect x="38" y="58" width="34" height="3" rx="1.5" fill="#1a1a1a" opacity="0.18" />

                    {/* Bookmark ribbon */}
                    <path d="M70 30 v22 l-6 -6 -6 6 v-22 z" fill="#8b1e1e" opacity="0.85" />

                    {/* Wax seal stamp, scales/fades in on click */}
                    <circle
                        cx="78"
                        cy="78"
                        r="24"
                        fill="#8b1e1e"
                        style={{
                            transformOrigin: '78px 78px',
                            transform: stamping ? 'scale(1)' : 'scale(0)',
                            opacity: stamping ? 1 : 0,
                            transition: 'transform 220ms cubic-bezier(.34,1.56,.64,1), opacity 150ms ease-out',
                        }}
                    />
                    <circle
                        cx="78"
                        cy="78"
                        r="19"
                        fill="none"
                        stroke="#f5f0e6"
                        strokeWidth="1.2"
                        opacity={stamping ? 0.6 : 0}
                        style={{ transition: 'opacity 200ms ease-out 100ms' }}
                    />
                    <text
                        x="78"
                        y="74"
                        textAnchor="middle"
                        fontFamily="'Playfair Display',serif"
                        fontWeight="700"
                        fontSize="9.5"
                        fill="#f5f0e6"
                        style={{
                            opacity: stamping ? 1 : 0,
                            transition: 'opacity 200ms ease-out 90ms',
                        }}
                    >
                        BOOKKRAFT
                    </text>
                    <text
                        x="78"
                        y="86"
                        textAnchor="middle"
                        fontFamily="'Playfair Display',serif"
                        fontWeight="600"
                        fontSize="7.5"
                        letterSpacing="1.5"
                        fill="#f5f0e6"
                        style={{
                            opacity: stamping ? 1 : 0,
                            transition: 'opacity 200ms ease-out 110ms',
                        }}
                    >
                        AI
                    </text>
                </svg>
            </button>

            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 34, fontWeight: 700, fontFamily: "'Playfair Display',serif" }}>
                    {count === null ? '—' : count.toLocaleString()}
                </div>
                <div style={{ fontSize: 14, opacity: 0.65, marginTop: 4 }}>
                    books formatted by indie authors — tap to celebrate one
                </div>
            </div>
        </div>
    );
}