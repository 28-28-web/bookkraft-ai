'use client';

import { useEffect, useState, useMemo } from 'react';

function FallingBook({ delay, left, rotateEnd, size }) {
    return (
        <div
            style={{
                position: 'absolute',
                left: `${left}%`,
                top: -40,
                width: size,
                height: size,
                animation: `bkFall 1.1s cubic-bezier(.34,.6,.64,1) ${delay}ms forwards`,
                opacity: 0,
            }}
        >
            <svg viewBox="0 0 40 40" width={size} height={size} style={{ '--rotateEnd': `${rotateEnd}deg` }}>
                <rect x="6" y="8" width="28" height="24" rx="2.5" fill="#c9a84c" />
                <rect x="6" y="8" width="28" height="24" rx="2.5" fill="none" stroke="#1a1a1a" strokeOpacity="0.15" strokeWidth="1" />
                <rect x="6" y="8" width="5" height="24" rx="1.5" fill="#1a1a1a" opacity="0.15" />
                <rect x="16" y="16" width="14" height="2" rx="1" fill="#1a1a1a" opacity="0.25" />
            </svg>
        </div>
    );
}

export default function StampCounter() {
    const [count, setCount] = useState(null);
    const [stamping, setStamping] = useState(false);
    const [bouncing, setBouncing] = useState(false);
    const [showFallers, setShowFallers] = useState(true);

    const fallers = useMemo(
        () =>
            Array.from({ length: 7 }).map((_, i) => ({
                id: i,
                delay: i * 90 + Math.random() * 100,
                left: 8 + i * 12 + (Math.random() * 6 - 3),
                rotateEnd: Math.random() * 60 - 30,
                size: 26 + Math.random() * 14,
            })),
        []
    );

    useEffect(() => {
        fetch('/api/stamp-counter')
            .then((r) => r.json())
            .then((d) => setCount(d.count))
            .catch(() => setCount(0));

        const t = setTimeout(() => setShowFallers(false), 2200);
        return () => clearTimeout(t);
    }, []);

    async function handleStamp() {
        if (bouncing) return;
        setBouncing(true);

        setTimeout(() => setStamping(true), 260);

        setCount((c) => (c === null ? 1 : c + 1));
        try {
            const res = await fetch('/api/stamp-counter', { method: 'POST' });
            const data = await res.json();
            if (typeof data.count === 'number') setCount(data.count);
        } catch {
            // optimistic value stands
        }

        setTimeout(() => setStamping(false), 1100);
        setTimeout(() => setBouncing(false), 1500);
    }

    return (
        <div
            style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 14,
                padding: '48px 24px',
                userSelect: 'none',
                overflow: 'hidden',
            }}
        >
            <style>{`
                @keyframes bkFall {
                    0%   { opacity: 0; transform: translateY(0) rotate(0deg); }
                    15%  { opacity: 1; }
                    70%  { transform: translateY(160px) rotate(calc(var(--rotateEnd) * 0.8)); }
                    85%  { transform: translateY(145px) rotate(var(--rotateEnd)); }
                    100% { opacity: 0.9; transform: translateY(150px) rotate(var(--rotateEnd)); }
                }
                @keyframes bkBounce {
                    0%   { transform: translateY(0) scale(1); }
                    30%  { transform: translateY(-22px) scale(1.04); }
                    50%  { transform: translateY(0) scale(0.97); }
                    65%  { transform: translateY(-8px) scale(1.01); }
                    100% { transform: translateY(0) scale(1); }
                }
            `}</style>

            {showFallers && (
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                    {fallers.map((f) => (
                        <FallingBook key={f.id} {...f} />
                    ))}
                </div>
            )}

            <button
                onClick={handleStamp}
                aria-label="Tap the book"
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    lineHeight: 0,
                    position: 'relative',
                    zIndex: 1,
                    animation: bouncing ? 'bkBounce 1.1s cubic-bezier(.34,1.2,.64,1)' : 'none',
                }}
            >
                <svg width="160" height="140" viewBox="0 0 160 140">
                    <ellipse cx="80" cy="120" rx="50" ry="6" fill="#1a1a1a" opacity="0.08" />

                    <rect
                        x="30" y="32" width="100" height="66" rx="3"
                        fill="#fdfbf6" stroke="#e3dcc8" strokeWidth="1"
                        style={{ opacity: stamping ? 1 : 0, transition: 'opacity 160ms ease-out' }}
                    />
                    <g style={{ opacity: stamping ? 0.5 : 0, transition: 'opacity 200ms ease-out 60ms' }}>
                        <line x1="40" y1="44" x2="90" y2="44" stroke="#c9bfa3" strokeWidth="1.5" />
                        <line x1="40" y1="52" x2="100" y2="52" stroke="#c9bfa3" strokeWidth="1.5" />
                        <line x1="40" y1="60" x2="78" y2="60" stroke="#c9bfa3" strokeWidth="1.5" />
                    </g>

                    <g style={{
                        transformOrigin: '30px 65px',
                        transform: stamping ? 'rotateY(-35deg) translateX(-2px)' : 'rotateY(0deg)',
                        transition: 'transform 280ms cubic-bezier(.34,1.2,.64,1)',
                        transformStyle: 'preserve-3d',
                    }}>
                        <rect x="30" y="30" width="50" height="70" rx="3" fill="#c9a84c" />
                        <rect x="30" y="30" width="50" height="70" rx="3" fill="none" stroke="#1a1a1a" strokeOpacity="0.12" strokeWidth="1.5" />
                        <rect x="30" y="30" width="7" height="70" rx="2" fill="#1a1a1a" opacity="0.12" />
                        <rect x="48" y="48" width="26" height="4" rx="2" fill="#1a1a1a" opacity="0.25" />
                        <rect x="48" y="58" width="18" height="3" rx="1.5" fill="#1a1a1a" opacity="0.18" />
                    </g>

                    <g style={{
                        transformOrigin: '130px 65px',
                        transform: stamping ? 'rotateY(35deg) translateX(2px)' : 'rotateY(0deg)',
                        transition: 'transform 280ms cubic-bezier(.34,1.2,.64,1)',
                        transformStyle: 'preserve-3d',
                    }}>
                        <rect x="80" y="30" width="50" height="70" rx="3" fill="#c9a84c" />
                        <rect x="80" y="30" width="50" height="70" rx="3" fill="none" stroke="#1a1a1a" strokeOpacity="0.12" strokeWidth="1.5" />
                        <rect x="122" y="32" width="8" height="66" fill="#f5f0e6" />
                        <line x1="125" y1="34" x2="125" y2="96" stroke="#d8cdb0" strokeWidth="1" />
                    </g>

                    <path
                        d="M80 30 v22 l-6 -6 -6 6 v-22 z"
                        fill="#8b1e1e"
                        opacity={stamping ? 0 : 0.85}
                        style={{ transition: 'opacity 140ms ease-out' }}
                    />

                    <circle
                        cx="80" cy="68" r="22" fill="#2E5E28"
                        style={{
                            transformOrigin: '80px 68px',
                            transform: stamping ? 'scale(1)' : 'scale(0)',
                            opacity: stamping ? 1 : 0,
                            transition: 'transform 260ms cubic-bezier(.34,1.56,.64,1) 220ms, opacity 160ms ease-out 220ms',
                        }}
                    />
                    <circle
                        cx="80" cy="68" r="18" fill="none" stroke="#f5f0e6" strokeWidth="1.1"
                        opacity={stamping ? 0.55 : 0}
                        style={{ transition: 'opacity 200ms ease-out 320ms' }}
                    />
                    <text x="80" y="65" textAnchor="middle" fontFamily="'Playfair Display',serif" fontWeight="700" fontSize="9" fill="#f5f0e6"
                        style={{ opacity: stamping ? 1 : 0, transition: 'opacity 200ms ease-out 320ms' }}>
                        BOOKKRAFT
                    </text>
                    <text x="80" y="77" textAnchor="middle" fontFamily="'Playfair Display',serif" fontWeight="600" fontSize="7" letterSpacing="1.5" fill="#f5f0e6"
                        style={{ opacity: stamping ? 1 : 0, transition: 'opacity 200ms ease-out 340ms' }}>
                        AI
                    </text>
                </svg>
            </button>

            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
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