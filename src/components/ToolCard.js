'use client';

import Link from 'next/link';

export default function ToolCard({ tool, hasAccess }) {
    const isFree = tool.free;
    const isOwned = hasAccess && !isFree;
    const isLocked = !hasAccess && !isFree;

    const badgeStyle = (type) => ({
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: '100px',
        fontSize: '11px',
        fontWeight: 600,
        ...(type === 'free' && { background: 'rgba(122,158,126,0.15)', color: '#7a9e7e' }),
        ...(type === 'gold' && { background: 'rgba(201,147,58,0.15)', color: '#C9933A' }),
        ...(type === 'locked' && { background: 'rgba(247,243,236,0.06)', color: 'rgba(247,243,236,0.5)' }),
    });

    return (
        <div style={{
            background: '#18160f',
            border: `1px solid ${isLocked ? 'rgba(247,243,236,0.06)' : 'rgba(201,147,58,0.15)'}`,
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            opacity: isLocked ? 0.75 : 1,
            transition: 'border-color 0.2s',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '28px', lineHeight: 1 }}>{tool.icon}</span>
                {isFree && <span style={badgeStyle('free')}>FREE</span>}
                {isOwned && <span style={badgeStyle('gold')}>✓ Owned</span>}
                {isLocked && <span style={badgeStyle('locked')}>🔒 ${tool.price}</span>}
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F7F3EC', margin: 0 }}>{tool.name}</h3>
            <p style={{ fontSize: '13px', color: 'rgba(247,243,236,0.55)', margin: 0, lineHeight: 1.5, flexGrow: 1 }}>{tool.desc}</p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                <span style={{
                    fontSize: '13px', fontWeight: 600,
                    color: isFree ? '#7a9e7e' : 'rgba(247,243,236,0.4)',
                }}>
                    {isFree ? 'Free' : isOwned ? 'Owned' : `$${tool.price}`}
                </span>
                {isLocked ? (
                    <Link href={`/checkout?tool=${tool.slug}`} style={{
                        fontSize: '13px', fontWeight: 600, color: '#C9933A',
                        textDecoration: 'none', padding: '6px 14px',
                        border: '1px solid rgba(201,147,58,0.3)',
                        borderRadius: '6px',
                    }}>
                        Unlock — ${tool.price} →
                    </Link>
                ) : (
                    <Link href={`/tools/${tool.slug}`} style={{
                        fontSize: '13px', fontWeight: 600, color: '#C9933A',
                        textDecoration: 'none', padding: '6px 14px',
                        border: '1px solid rgba(201,147,58,0.3)',
                        borderRadius: '6px',
                    }}>
                        Open →
                    </Link>
                )}
            </div>
        </div>
    );
}