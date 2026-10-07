'use client';

import Link from 'next/link';
import { track } from '@/lib/analytics';
import { planFixAll, fixHref, priceText, toolName } from '@/lib/fixMap';

// Primary "Fix these N issues" box shown right under a result summary when
// checks failed. Names the tool that fixes the most of them and its price,
// offers a free tool when one also helps, and says how many are left to fix
// by hand. Renders nothing when nothing failed or nothing in fixMap applies.
export default function FixAllCta({ tool, failedChecks, eventExtra, dark = false }) {
    const n = failedChecks.length;
    const { primary, secondary, unhandled } = planFixAll(tool, failedChecks);
    if (!n || !primary) return null;

    const c = dark
        ? { bg: 'rgba(201,147,58,0.10)', border: 'rgba(201,147,58,0.4)', text: '#fff', muted: 'rgba(255,255,255,0.6)', link: '#C9933A' }
        : { bg: '#fff8eb', border: '#C9933A', text: '#1a1a1a', muted: '#6b7280', link: '#b8860b' };

    const log = (entry, cta) => track('fix_clicked', {
        ...eventExtra,
        tool,
        check: entry.covered.join('|'),
        fix_tool: entry.fix.slug || entry.fix.href,
        fix_kind: entry.fix.kind,
        issue_count: n,
        cta,
    });

    const isGuide = primary.fix.kind === 'guide';
    const k = primary.covered.length;
    const heading = isGuide
        ? (n === 1 ? 'How to fix this issue' : `How to fix these ${n} issues`)
        : k === n
            ? (n === 1 ? 'Fix this issue' : `Fix all ${n} issues`)
            : `Fix ${k} of these ${n} issues`;
    const meta = (entry) => [entry.fix.slug && priceText(entry.fix.slug), entry.fix.note].filter(Boolean).join(', ');
    const primaryMeta = meta(primary);
    const u = unhandled.length;

    return (
        <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 12, padding: '18px 20px', margin: '16px 0 20px', color: c.text }}>
            <p style={{ fontWeight: 700, fontSize: '1rem', margin: '0 0 4px' }}>🔧 {heading}</p>
            <p style={{ fontSize: '0.9rem', color: c.muted, margin: '0 0 14px' }}>
                {primary.fix.label}{primaryMeta && ` — ${primaryMeta}`}
            </p>
            <Link
                href={fixHref(primary.fix, tool)}
                onClick={() => log(primary, 'fix_all')}
                style={{ display: 'inline-block', background: '#C9933A', color: '#fff', padding: '11px 22px', borderRadius: 8, fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none' }}
            >
                {isGuide ? `${primary.fix.label} →` : `Open ${toolName(primary.fix.slug)} →`}
            </Link>
            {secondary && (
                <p style={{ fontSize: '0.88rem', margin: '12px 0 0' }}>
                    Free option:{' '}
                    <Link href={fixHref(secondary.fix, tool)} onClick={() => log(secondary, 'fix_all_free')} style={{ color: c.link, fontWeight: 600, textDecoration: 'none' }}>
                        {toolName(secondary.fix.slug)}
                    </Link>
                    {' '}fixes {secondary.covered.length === n ? (n === 1 ? 'it' : 'all of them') : `${secondary.covered.length} of them`}
                    {meta(secondary) && <span style={{ color: c.muted }}> ({meta(secondary)})</span>}
                </p>
            )}
            {!isGuide && u > 0 && (
                <p style={{ fontSize: '0.85rem', color: c.muted, margin: '10px 0 0' }}>
                    {u} {u === 1 ? 'issue needs' : 'issues need'} a different fix — see the notes under each check below.
                </p>
            )}
        </div>
    );
}
