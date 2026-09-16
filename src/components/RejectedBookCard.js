'use client';

import { useState } from 'react';
import Link from 'next/link';
import { REJECTED_BOOK, rejectedBookAccessFor, rejectedBookUnlockDate } from '@/lib/bookDownloads';

// Dashboard card for "Why Your Book Got Rejected".
// Lifetime → download immediately.
// Starter/Pro → unlocks 3 months after signup; shows countdown until then.
// Free → upgrade CTA.
// The route re-checks the plan before serving the file; this card grants nothing by itself.
export default function RejectedBookCard({ profile, user }) {
    const [state, setState] = useState('idle'); // idle | downloading | error
    const [message, setMessage] = useState('');

    const access = rejectedBookAccessFor(profile, user?.created_at);

    const download = async () => {
        setState('downloading');
        setMessage('');
        try {
            const res = await fetch(REJECTED_BOOK.route, { credentials: 'same-origin' });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                setState('error');
                setMessage(
                    data.error === 'not_yet_unlocked'
                        ? 'This book unlocks 3 months after your signup date.'
                        : data.error === 'upgrade_required'
                            ? 'Your plan does not include this download.'
                            : 'The download did not start. Please try again.',
                );
                return;
            }
            const url = URL.createObjectURL(await res.blob());
            const a = document.createElement('a');
            a.href = url;
            a.download = REJECTED_BOOK.editions.full.downloadName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
            setState('idle');
        } catch {
            setState('error');
            setMessage('The download did not start. Please try again.');
        }
    };

    let badge = null;
    let badgeStyle = {};
    let bodyText = '';
    let actions = null;

    if (access === 'full') {
        badge = 'INCLUDED';
        badgeStyle = { background: 'var(--gold)', color: 'var(--ink)' };
        bodyText = 'The complete guide to understanding and preventing KDP rejections.';
        actions = (
            <button
                className="btn btn-gold btn-sm"
                onClick={download}
                disabled={state === 'downloading'}
                style={{ whiteSpace: 'nowrap' }}
            >
                {state === 'downloading' ? 'Preparing…' : 'Download now'}
            </button>
        );
    } else if (access === 'locked') {
        const unlockDate = rejectedBookUnlockDate(user.created_at);
        const daysLeft = Math.max(1, Math.ceil((unlockDate - new Date()) / (1000 * 60 * 60 * 24)));
        badge = 'COMING SOON';
        badgeStyle = { background: 'var(--border)', color: 'var(--mid)' };
        bodyText = `Unlocks in ${daysLeft} day${daysLeft !== 1 ? 's' : ''} — 3 months after signup, automatically.`;
        actions = (
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--mid)', whiteSpace: 'nowrap' }}>
                Unlocks {unlockDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
        );
    } else {
        bodyText = 'Why manuscripts get rejected — and how to fix every one. Included with paid plans.';
        actions = (
            <Link href="/pricing" className="btn btn-gold btn-sm" style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}>
                Upgrade to access →
            </Link>
        );
    }

    return (
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 'var(--space-4)', padding: 'var(--space-4)',
            marginBottom: 'var(--space-6)', background: 'var(--cream)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius)',
            flexWrap: 'wrap',
        }}>
            <div style={{ flex: '1 1 280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h2 style={{ fontSize: 'var(--text-base)', fontWeight: 700, margin: 0 }}>{REJECTED_BOOK.title}</h2>
                    {badge && (
                        <span style={{
                            fontSize: '10px', fontWeight: 700, padding: '2px 8px',
                            borderRadius: '100px', ...badgeStyle,
                        }}>
                            {badge}
                        </span>
                    )}
                </div>
                <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--mid)' }}>{bodyText}</p>
                {state === 'error' && (
                    <p role="alert" style={{ margin: '6px 0 0', fontSize: 'var(--text-sm)', color: 'var(--rust)' }}>
                        {message}
                    </p>
                )}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                {actions}
            </div>
        </div>
    );
}
