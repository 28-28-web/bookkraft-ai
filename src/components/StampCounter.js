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

        setTimeout(() => setStamping(false), 1400);
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
                <svg width="160" height="140" viewBox="0 0 160 140">
                    {/* Shadow under the book */}
                    <ellipse cx="80" cy="120" rx="50" ry="6" fill="#1a1a1a" opacity="0.08" />

                    {/* Open white page (revealed when stamping) */}
                    <rect
                        x="30"
                        y="32"
                        width="100"
                        height="66"
                        rx="3"
                        fill="#fdfbf6"
                        stroke="#e3dcc8"
                        strokeWidth="1"
                        style={{
                            opacity: stamping ? 1 : 0,
                            transition: 'opacity 160ms ease-out',
                        }}
                    />
                    {/* Faint lines on the open page, like text */}
                    <g style={{ opacity: stamping ? 0.5 : 0, transition: 'opacity 200ms ease-out 60ms' }}>
                        <line x1="40" y1="44" x2="90" y2="44" stroke="#c9bfa3" strokeWidth="1.5" />
                        <line x1="40" y1="52" x2="100" y2="52" stroke="#c9bfa3" strokeWidth="1.5" />
                        <line x1="40" y1="60" x2="78" y2="60" stroke="#c9bfa3" strokeWidth="1.5" />
                    </g>

                    {/* Left cover, swings open to the left */}
                    <g
                        style={{
                            transformOrigin: '30px 65px',
                            transform: stamping ? 'rotateY(-35deg) translateX(-2px)' : 'rotateY(0deg)',
                            transition: 'transform 280ms cubic-bezier(.34,1.2,.64,1)',
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        <rect x="30" y="30" width="50" height="70" rx="3" fill="#c9a84c" />
                        <rect x="30" y="30" width="50" height="70" rx="3" fill="none" stroke="#1a1a1a" strokeOpacity="0.12" strokeWidth="1.5" />
                        <rect x="30" y="30" width="7" height="70" rx="2" fill="#1a1a1a" opacity="0.12" />
                        <rect x="48" y="48" width="26" height="4" rx="2" fill="#1a1a1a" opacity="0.25" />
                        <rect x="48" y="58" width="18" height="3" rx="1.5" fill="#1a1a1a" opacity="0.18" />
                    </g>

                    {/* Right cover, swings open to the right */}
                    <g
                        style={{
                            transformOrigin: '130px 65px',
                            transform: stamping ? 'rotateY(35deg) translateX(2px)' : 'rotateY(0deg)',
                            transition: 'transform 280ms cubic-bezier(.34,1.2,.64,1)',
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        <rect x="80" y="30" width="50" height="70" rx="3" fill="#c9a84c" />
                        <rect x="80" y="30" width="50" height="70" rx="3" fill="none" stroke="#1a1a1a" strokeOpacity="0.12" strokeWidth="1.5" />
                        {/* Page edges peeking from the right */}
                        <rect x="122" y="32" width="8" height="66" fill="#f5f0e6" />
                        <line x1="125" y1="34" x2="125" y2="96" stroke="#d8cdb0" strokeWidth="1" />
                    </g>

                    {/* Bookmark ribbon, only visible when closed */}
                    <path
                        d="M80 30 v22 l-6 -6 -6 6 v-22 z"
                        fill="#8b1e1e"
                        opacity={stamping ? 0 : 0.85}
                        style={{ transition: 'opacity 140ms ease-out' }}
                    />

                    {/* Wax seal stamp, scales/fades in on top of the open page */}
                    <circle
                        cx="80"
                        cy="68"
                        r="22"
                        fill="#2E5E28"
                        style={{
                            transformOrigin: '80px 68px',
                            transform: stamping ? 'scale(1)' : 'scale(0)',
                            opacity: stamping ? 1 : 0,
                            transition: 'transform 260ms cubic-bezier(.34,1.56,.64,1) 220ms, opacity 160ms ease-out 220ms',
                        }}
                    />
                    <circle
                        cx="80"
                        cy="68"
                        r="18"
                        fill="none"
                        stroke="#f5f0e6"
                        strokeWidth="1.1"
                        opacity={stamping ? 0.55 : 0}
                        style={{ transition: 'opacity 200ms ease-out 320ms' }}
                    />
                    <text
                        x="80"
                        y="65"
                        textAnchor="middle"
                        fontFamily="'Playfair Display',serif"
                        fontWeight="700"
                        fontSize="9"
                        fill="#f5f0e6"
                        style={{ opacity: stamping ? 1 : 0, transition: 'opacity 200ms ease-out 320ms' }}
                    >
                        BOOKKRAFT
                    </text>
                    <text
                        x="80"
                        y="77"
                        textAnchor="middle"
                        fontFamily="'Playfair Display',serif"
                        fontWeight="600"
                        fontSize="7"
                        letterSpacing="1.5"
                        fill="#f5f0e6"
                        style={{ opacity: stamping ? 1 : 0, transition: 'opacity 200ms ease-out 340ms' }}
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