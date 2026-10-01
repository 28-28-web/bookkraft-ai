'use client';

import { useState } from 'react';
import { isValidEmail } from '@/lib/email';

// Inline email capture for the KDP Preflight Checklist. Adds the contact to the
// Brevo list via /api/newsletter/subscribe; the list's welcome automation emails
// the PDF, and the download link is shown right away so nobody waits for it.
//
// `source` is stored in Brevo SOURCE_TOOL and sent to GA as email_captured.
// `variant`: 'compact' (mid-article) or 'full' (end of page, with bullets).

const CHECKLIST_URL = '/kdp-preflight-checklist.pdf';
const BULLETS = [
    'Manuscript, file and table-of-contents checks',
    'Metadata, keyword and category rules in one place',
    'Cover, image, validation and pricing checks',
];

export default function ChecklistOptin({ source, variant = 'compact', style }) {
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState(''); // honeypot: real people never see it
    const [status, setStatus] = useState('idle'); // idle | loading | done | error
    const [isNew, setIsNew] = useState(false);
    const [error, setError] = useState('');
    const full = variant === 'full';

    async function handleSubmit(e) {
        e.preventDefault();
        const value = email.trim();
        if (!isValidEmail(value)) {
            setStatus('error');
            setError('Enter a valid email address.'); // one line on mobile: no height change
            return;
        }
        setStatus('loading');
        setError('');
        try {
            const res = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: value, source, company }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);
            setIsNew(data.isNew === true);
            setStatus('done');
            // Same flag NewsletterPopup checks, so the exit-intent popup never shows.
            try { localStorage.setItem('bk_newsletter_done', 'true'); } catch {}
            try { window.gtag?.('event', 'email_captured', { source, placement: variant }); } catch {}
        } catch (err) {
            setStatus('error');
            setError(err?.message || 'Something went wrong. Try again.');
        }
    }

    const done = status === 'done';

    return (
        <aside
            aria-label="Free KDP Preflight Checklist"
            style={{
                margin: full ? '48px 0 0' : '0 0 48px',
                padding: full ? '28px 24px' : '20px',
                background: 'rgba(201,168,76,0.07)',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: 12,
                color: 'var(--ink, #1a1a1a)',
                ...style,
            }}
        >
            {/* Form and success share one grid cell, so the box keeps its height
                when one replaces the other (no layout shift). */}
            <div style={{ display: 'grid' }}>
                <div style={{ gridArea: '1 / 1', visibility: done ? 'hidden' : 'visible' }} aria-hidden={done}>
                    <p style={{ fontSize: full ? 22 : 18, fontWeight: 700, lineHeight: 1.3, margin: '0 0 6px' }}>
                        Get the free KDP Preflight Checklist
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.8, margin: '0 0 14px' }}>
                        35 checks to run before you upload, plus one Kindle fix a week. Unsubscribe anytime.
                    </p>
                    {full && (
                        <ul style={{ margin: '0 0 18px', paddingLeft: 20, fontSize: 15, lineHeight: 1.7, listStyle: 'disc' }}>
                            {BULLETS.map((b) => <li key={b}>{b}</li>)}
                        </ul>
                    )}
                    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        <label htmlFor={`optin-email-${variant}`} style={SR_ONLY}>Email address</label>
                        <input
                            id={`optin-email-${variant}`}
                            type="email"
                            autoComplete="email"
                            placeholder="you@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={done}
                            aria-invalid={status === 'error'}
                            aria-describedby={`optin-msg-${variant}`}
                            style={{
                                flex: '1 1 220px', minWidth: 0, padding: '11px 14px', fontSize: 16,
                                border: `1px solid ${status === 'error' ? '#d9534f' : 'rgba(0,0,0,0.2)'}`,
                                borderRadius: 8, background: '#fff', color: '#1a1a1a',
                            }}
                        />
                        {/* Honeypot: off-screen and skipped by keyboard and screen readers. */}
                        <input
                            type="text"
                            name="company"
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, opacity: 0 }}
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading' || done}
                            style={{
                                flex: '0 0 auto', padding: '11px 20px', fontSize: 15, fontWeight: 700,
                                background: '#c9a84c', color: '#1a1a1a', border: 'none', borderRadius: 8,
                                cursor: status === 'loading' ? 'default' : 'pointer', opacity: status === 'loading' ? 0.7 : 1,
                            }}
                        >
                            {status === 'loading' ? 'Sending…' : 'Send me the checklist'}
                        </button>
                    </form>
                    <p id={`optin-msg-${variant}`} role="alert" style={{ minHeight: 20, lineHeight: '20px', margin: '6px 0 0', fontSize: 13, color: '#b03a2e' }}>
                        {status === 'error' ? error : ''}
                    </p>
                    <p style={{ fontSize: 12, opacity: 0.6, margin: '2px 0 0' }}>
                        <a href="/privacy" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacy policy</a>
                    </p>
                </div>

                <div
                    style={{ gridArea: '1 / 1', visibility: done ? 'visible' : 'hidden', alignSelf: 'center' }}
                    aria-hidden={!done}
                >
                    {/* Always rendered (hidden until done) so the box reserves
                        this height from the start; only the text depends on state. */}
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                        <span aria-hidden="true" style={{
                            flex: '0 0 auto', width: 36, height: 36, borderRadius: '50%',
                            background: '#c9a84c', color: '#1a1a1a', fontSize: 20, fontWeight: 700,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>✓</span>
                        <div style={{ minWidth: 0 }}>
                            {/* Both headings share one cell so the longer one always
                                reserves the height, new or existing contact. */}
                            <p style={{ display: 'grid', fontSize: full ? 20 : 17, fontWeight: 700, lineHeight: 1.3, margin: '0 0 8px' }}>
                                <span style={{ gridArea: '1 / 1', visibility: isNew ? 'visible' : 'hidden' }}>
                                    Check your inbox, the checklist and your first fix are on the way.
                                </span>
                                <span style={{ gridArea: '1 / 1', visibility: isNew ? 'hidden' : 'visible' }}>
                                    You&apos;re already subscribed.
                                </span>
                            </p>
                            <p style={{ fontSize: 15, lineHeight: 1.6, margin: '0 0 8px' }}>
                                No need to wait:{' '}
                                <a href={CHECKLIST_URL} target="_blank" rel="noopener" tabIndex={done ? 0 : -1} style={{ color: '#9c7f35', fontWeight: 700 }}>
                                    Download the KDP Preflight Checklist (PDF) →
                                </a>
                            </p>
                            {full && <p style={{ fontSize: 13, fontWeight: 700, opacity: 0.7, margin: '0 0 2px' }}>What&apos;s inside</p>}
                            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.6, listStyle: 'disc' }}>
                                {BULLETS.map((b) => <li key={b}>{b}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <p role="status" style={SR_ONLY}>
                {done ? (isNew ? 'Subscribed. Check your inbox; the checklist download link is below.' : "You're already subscribed. The checklist download link is below.") : ''}
            </p>
        </aside>
    );
}

const SR_ONLY = {
    position: 'absolute', width: 1, height: 1, padding: 0, margin: -1,
    overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0,
};
