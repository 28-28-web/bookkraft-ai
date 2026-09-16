'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HANDBOOK, handbookEditionFor } from '@/lib/bookDownloads';

// Dashboard card for the handbook EPUB. What it shows follows the profile
// already loaded by AuthProvider; the route re-checks the plan in the
// database before it sends a byte, so this card grants nothing by itself.
export default function HandbookDownloadCard({ profile }) {
    const [state, setState] = useState('idle'); // idle | downloading | error
    const [message, setMessage] = useState('');
    const edition = handbookEditionFor(profile);

    const download = async () => {
        setState('downloading');
        setMessage('');
        try {
            const res = await fetch(HANDBOOK.route, { credentials: 'same-origin' });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                setState('error');
                setMessage(data.error === 'upgrade_required'
                    ? 'Your plan does not include this download.'
                    : 'The download did not start. Please try again.');
                return;
            }
            // Name the file after what the server actually sent, not what
            // this card assumed, in case the plan changed since the page loaded.
            const sent = res.headers.get('X-Handbook-Edition');
            const { downloadName } = HANDBOOK.editions[sent] || HANDBOOK.editions[edition];
            const url = URL.createObjectURL(await res.blob());
            const a = document.createElement('a');
            a.href = url;
            a.download = downloadName;
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

    const copy = {
        full: {
            badge: 'LIFETIME',
            text: 'Included with Lifetime: the full EPUB, all 100 fixes.',
            button: 'Download the full EPUB',
        },
        sampler: {
            badge: 'SAMPLER',
            text: 'Your plan includes the sampler, 20 of the 100 fixes. The full edition comes with Lifetime.',
            button: 'Download the sampler',
        },
    }[edition];

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
                    <h2 style={{ fontSize: 'var(--text-base)', fontWeight: 700, margin: 0 }}>{HANDBOOK.title}</h2>
                    {copy && (
                        <span style={{
                            background: 'var(--gold)', color: 'var(--ink)', fontSize: '10px',
                            fontWeight: 700, padding: '2px 8px', borderRadius: '100px',
                        }}>{copy.badge}</span>
                    )}
                </div>
                <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--mid)' }}>
                    {copy ? copy.text : 'A visual Kindle formatting handbook, one fix per page. Available with a paid plan.'}
                </p>
                {state === 'error' && (
                    <p role="alert" style={{ margin: '6px 0 0', fontSize: 'var(--text-sm)', color: 'var(--rust)' }}>
                        {message}
                    </p>
                )}
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {copy ? (
                    <>
                        <button className="btn btn-gold btn-sm" onClick={download}
                            disabled={state === 'downloading'} style={{ whiteSpace: 'nowrap' }}>
                            {state === 'downloading' ? 'Preparing…' : copy.button}
                        </button>
                        {edition === 'sampler' && (
                            <Link href="/pricing" className="btn btn-outline btn-sm"
                                style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}>
                                Get the full edition
                            </Link>
                        )}
                    </>
                ) : (
                    <Link href="/pricing" className="btn btn-gold btn-sm"
                        style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}>
                        Upgrade to download →
                    </Link>
                )}
            </div>
        </div>
    );
}
