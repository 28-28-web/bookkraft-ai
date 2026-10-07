'use client';

import Link from 'next/link';
import { track } from '@/lib/analytics';
import { fixesFor, fixHref, priceText } from '@/lib/fixMap';

// Per-row "fix" links under a failed check. Renders nothing when the check has
// no known fix. Every link logs fix_clicked with the tool and check; eventExtra
// keeps older params (e.g. EPUB's `issue`) so past analytics still line up.
export default function FixLinks({ tool, check, eventExtra, color = '#b8860b', mutedColor = '#6b7280' }) {
    const fixes = fixesFor(tool, check);
    if (!fixes.length) return null;
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', marginTop: 8, fontSize: '0.85rem', lineHeight: 1.45 }}>
            {fixes.map((f) => {
                const href = fixHref(f, tool);
                const meta = [f.slug && priceText(f.slug), f.note].filter(Boolean).join(', ');
                return (
                    <Link
                        key={href}
                        href={href}
                        onClick={() => track('fix_clicked', { ...eventExtra, tool, check, fix_tool: f.slug || f.href, fix_kind: f.kind })}
                        style={{ color, fontWeight: 600, textDecoration: 'none' }}
                    >
                        → {f.label}
                        {meta && <span style={{ color: mutedColor, fontWeight: 400 }}> ({meta})</span>}
                    </Link>
                );
            })}
        </div>
    );
}
