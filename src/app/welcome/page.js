'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PRICING } from '@/lib/constants';

// Paddle successUrl for plan purchases (pricing + checkout pages). Access is
// granted by the webhook, not here, so this page never gates anything: the
// dashboard link is always shown and the survey below it is optional.
// No footer: the cookie banner renders in-flow here (CookieBanner
// INLINE_ROUTES), so it lands right under the survey instead of covering it.

const SOURCES = [
    { value: 'google', label: 'Google search' },
    { value: 'ai', label: 'ChatGPT or other AI' },
    { value: 'amazon_book', label: 'Amazon book' },
    { value: 'reddit_facebook', label: 'Reddit or Facebook' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'friend', label: 'A friend' },
    { value: 'other', label: 'Other' },
];

export default function WelcomePage() {
    return (
        <Suspense fallback={null}>
            <WelcomeContent />
        </Suspense>
    );
}

function WelcomeContent() {
    const plan = useSearchParams().get('plan');
    const planName = PRICING[plan]?.name;
    // hidden until the server says this user hasn't answered or skipped yet
    const [survey, setSurvey] = useState('hidden'); // hidden | open | other | done
    const [otherText, setOtherText] = useState('');

    useEffect(() => {
        fetch('/api/purchase-survey')
            .then(r => r.json())
            .then(d => { if (d.show) setSurvey('open'); })
            .catch(() => {});
    }, []);

    const submit = (body) => {
        fetch('/api/purchase-survey', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ plan, ...body }),
        }).catch(() => {});
    };

    const answer = (source) => {
        if (source === 'other' && survey !== 'other') {
            setSurvey('other');
            return;
        }
        submit({ source, other_text: source === 'other' ? otherText : undefined });
        // free text never goes to GA, only the option key
        try { window.gtag?.('event', 'purchase_source', { source, plan: plan || undefined }); } catch {}
        setSurvey('done');
    };

    const skip = () => {
        submit({ skipped: true });
        setSurvey('hidden');
    };

    return (
        <>
            <div style={{ maxWidth: 560, margin: '0 auto', padding: 'var(--space-24) var(--space-6) var(--space-16)', textAlign: 'center' }}>
                <h1 style={{ marginBottom: 'var(--space-2)' }}>Payment received — thank you!</h1>
                <p style={{ color: 'var(--mid)', marginBottom: 'var(--space-6)' }}>
                    {planName ? `Your ${planName} access` : 'Your access'} is being activated. If a tool still looks locked, refresh the dashboard in a minute.
                </p>
                <Link href="/dashboard" className="btn btn-gold" style={{ textDecoration: 'none', display: 'inline-flex' }}>
                    Go to your dashboard →
                </Link>

                {survey !== 'hidden' && (
                    <div style={{
                        marginTop: 'var(--space-12)', padding: 'var(--space-6)', textAlign: 'left',
                        background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                    }}>
                        {survey === 'done' ? (
                            <p style={{ margin: 0, textAlign: 'center' }}>Thanks, that helps a lot.</p>
                        ) : (
                            <>
                                <p style={{ fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                                    How did you hear about BookKraft? <span style={{ fontWeight: 400, color: 'var(--mid)' }}>(optional)</span>
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                                    {SOURCES.map(s => (
                                        <button
                                            key={s.value}
                                            type="button"
                                            className="btn btn-outline btn-sm"
                                            aria-pressed={survey === 'other' && s.value === 'other'}
                                            onClick={() => answer(s.value)}
                                        >
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                                {survey === 'other' && (
                                    <form
                                        onSubmit={(e) => { e.preventDefault(); answer('other'); }}
                                        style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}
                                    >
                                        <input
                                            className="form-input"
                                            aria-label="Where did you hear about BookKraft? (optional)"
                                            placeholder="Where? (optional)"
                                            maxLength={200}
                                            value={otherText}
                                            onChange={(e) => setOtherText(e.target.value)}
                                            autoFocus
                                            style={{ flex: 1 }}
                                        />
                                        <button type="submit" className="btn btn-gold btn-sm">Send</button>
                                    </form>
                                )}
                                <button
                                    type="button"
                                    onClick={skip}
                                    style={{ marginTop: 'var(--space-4)', background: 'none', border: 0, padding: 0, color: 'var(--mid)', fontSize: 'var(--text-sm)', textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    Skip
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
