'use client';

import { useState } from 'react';
import Link from 'next/link';
import { track } from '@/lib/analytics';
import { isValidEmail } from '@/lib/email';

// The one email box on a tool's result page, placed under the summary. Each
// tool passes onSubmit with its own endpoints (report email, leads, ...);
// this box owns the form, validation, and the email_report + email_captured
// events. onSubmit may return { error } to show a message instead of success.
export default function ResultEmailCapture({
    tool,
    issueCount = 0,
    gtagParams,
    heading,
    subtext,
    buttonLabel = 'Send',
    showName = false,
    honeypot = false,
    footnote,
    renderSuccess,
    onSubmit,
    dark = false,
    bare = false,
}) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [sent, setSent] = useState(false);

    const c = dark
        ? { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.12)', text: '#fff', muted: 'rgba(255,255,255,0.6)', input: 'rgba(255,255,255,0.08)', inputBorder: 'rgba(255,255,255,0.2)', ok: '#3DDC97', err: '#fca5a5' }
        : { bg: '#f9fafb', border: '#e5e7eb', text: '#1a1a1a', muted: '#6b7280', input: '#fff', inputBorder: '#d1d5db', ok: '#166534', err: '#c53030' };

    const submit = async (e) => {
        e.preventDefault();
        const clean = email.trim();
        if (!isValidEmail(clean)) {
            setError('Please enter a valid email address.');
            return;
        }
        setError('');
        setSubmitting(true);
        try {
            const res = await onSubmit({ email: clean, name: name.trim(), company });
            if (res?.error) {
                setError(res.error);
                return;
            }
            track('email_report', { tool, issue_count: issueCount });
            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'email_captured', gtagParams);
            }
            setSent(true);
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const box = bare ? {} : { background: c.bg, border: `1px solid ${c.border}`, borderRadius: 12, padding: '16px 20px', margin: '0 0 20px' };
    const input = { padding: '10px 14px', border: `1px solid ${c.inputBorder}`, borderRadius: 8, fontSize: '0.9rem', outline: 'none', background: c.input, color: c.text };

    if (sent) {
        return (
            <div style={{ ...box, textAlign: 'center', color: c.ok, fontWeight: 600, fontSize: '0.95rem' }}>
                {renderSuccess ? renderSuccess(email.trim()) : <>📬 Thanks — <strong>{email.trim()}</strong> is on the list.</>}
            </div>
        );
    }

    return (
        <div style={{ ...box, color: c.text }}>
            <p style={{ fontWeight: 600, fontSize: '0.95rem', margin: subtext ? '0 0 4px' : '0 0 10px' }}>{heading}</p>
            {subtext && <p style={{ color: c.muted, fontSize: '0.88rem', margin: '0 0 12px' }}>{subtext}</p>}
            <form onSubmit={submit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {honeypot && (
                    // Off-screen, skipped by keyboard and screen readers; bots fill it.
                    <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" value={company} onChange={(e) => setCompany(e.target.value)} style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, opacity: 0 }} />
                )}
                {showName && (
                    <input type="text" placeholder="First name (optional)" value={name} onChange={(e) => setName(e.target.value)} style={{ ...input, flex: '1', minWidth: 140 }} />
                )}
                <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required aria-label="Your email" style={{ ...input, border: `1px solid ${error ? c.err : c.inputBorder}`, flex: '2', minWidth: 180 }} />
                <button type="submit" disabled={submitting} style={{ background: dark ? '#C9933A' : '#1a1a1a', color: dark ? '#1a1a1a' : '#fff', padding: '10px 20px', borderRadius: 8, fontWeight: 600, fontSize: '0.9rem', border: 'none', cursor: submitting ? 'default' : 'pointer', whiteSpace: 'nowrap', opacity: submitting ? 0.6 : 1 }}>
                    {submitting ? 'Sending…' : buttonLabel}
                </button>
            </form>
            {error && <p style={{ color: c.err, fontSize: '0.85rem', margin: '6px 0 0' }}>{error}</p>}
            {footnote && <p style={{ color: c.muted, fontSize: '0.8rem', margin: '10px 0 0' }}>{footnote}</p>}
        </div>
    );
}

// Shared submit for tools that only save the lead (no report email). /api/leads
// stores the address and adds it to the Brevo tool-leads list.
export async function submitLead({ email, tool, issueCount = 0 }) {
    const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source_tool: tool, issue_count: issueCount }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) {
        return { error: data.error === 'rate_limited' ? 'Too many requests — try again in a bit.' : 'Something went wrong. Please try again.' };
    }
    return null;
}

// Footnote for the "tips" sign-up: matches what /api/leads actually does.
export const TIPS_FOOTNOTE = (
    <>We use this to send occasional tips and product updates. Unsubscribe anytime — see our <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacy Policy</Link>.</>
);
