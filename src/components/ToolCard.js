'use client';

import Link from 'next/link';

export default function ToolCard({ tool, hasAccess }) {
    const isFree = tool.free;
    const isOwned = hasAccess && !isFree;
    const isLocked = !hasAccess && !isFree;

    return (
        <div className={`tool-card ${isLocked ? 'tool-card-locked' : ''}`}>
            <div className="tool-card-top">
                <span className="tool-icon">{tool.icon}</span>
                {isFree && <span className="badge badge-free">FREE</span>}
                {isOwned && <span className="badge badge-gold">✓ Owned</span>}
                {isLocked && <span className="badge badge-locked">🔒 ${tool.price}</span>}
            </div>
            <h3>{tool.name}</h3>
            <p>{tool.desc}</p>
            <div className="tool-card-bottom">
                <span className={`tool-card-price ${isFree ? 'free' : ''}`}>
                    {isFree ? 'Free' : isOwned ? 'Owned' : `$${tool.price}`}
                </span>
                {isLocked ? (
                    <Link href={`/checkout?tool=${tool.slug}`} className="tool-card-cta" style={{ textDecoration: 'none' }}>
                        Unlock — ${tool.price} →
                    </Link>
                ) : (
                    <Link href={`/tools/${tool.slug}`} className="tool-card-cta" style={{ textDecoration: 'none' }}>
                        Open →
                    </Link>
                )}
            </div>
        </div>
    );
}
