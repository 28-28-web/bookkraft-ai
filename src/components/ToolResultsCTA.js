'use client';

import { useState } from 'react';

export default function ToolResultsCTA({ toolSlug, subjectNoun = 'file', issueCount, fixTool }) {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const hasIssues = issueCount > 0;

    const submitLead = async (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        setEmailError('');
        setSubmitting(true);
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source_tool: toolSlug, issue_count: issueCount || 0 }),
            });
            const data = await res.json();
            if (!res.ok || !data.ok) {
                setEmailError(
                    data.error === 'rate_limited'
                        ? 'Too many requests — try again in a bit.'
                        : 'Something went wrong. Please try again.'
                );
                setSubmitting(false);
                return;
            }
            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'lead_captured', { tool_name: toolSlug, issue_count: issueCount || 0 });
            }
            setSubmitted(true);
        } catch {
            setEmailError('Network error. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const fixHref = fixTool
        ? `/tools/${fixTool.slug}?ref=${toolSlug}&issues=${issueCount || 0}`
        : `/pricing?ref=${toolSlug}&issues=${issueCount || 0}`;
    const fixLabel = fixTool ? `Fix all with ${fixTool.label} →` : 'Unlock the full toolkit →';

    const gdprLine = (
        <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 10 }}>
            We use this to send your report and occasional product updates. Unsubscribe anytime — see our{' '}
            <a href="/privacy" style={{ color: '#9ca3af', textDecoration: 'underline' }}>Privacy Policy</a>.
        </p>
    );

    if (submitted) {
        return (
            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 12, padding: 24, marginTop: 24, textAlign: 'center' }}>
                <p style={{ color: '#166534', fontWeight: 600, fontSize: '0.95rem' }}>
                    📬 Report on its way to <strong>{email}</strong>.
                </p>
            </div>
        );
    }

    if (!hasIssues) {
        return (
            <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24, marginTop: 24, textAlign: 'center' }}>
                <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 6, color: '#166534' }}>✅ Your {subjectNoun} looks clean.</p>
                <p style={{ color: '#6b7280', fontSize: '0.88rem', marginBottom: 16 }}>
                    Want to know when we ship new free tools? Leave your email — no spam, unsubscribe anytime.
                </p>
                <form onSubmit={submitLead} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <input
                        type="email"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ padding: '10px 14px', border: `1px solid ${emailError ? '#fca5a5' : '#d1d5db'}`, borderRadius: 8, fontSize: '0.9rem', outline: 'none', flex: '1', minWidth: 220, maxWidth: 320 }}
                    />
                    <button type="submit" disabled={submitting} style={{ background: '#1a1a1a', color: '#fff', padding: '10px 20px', borderRadius: 8, fontWeight: 600, fontSize: '0.9rem', border: 'none', cursor: submitting ? 'default' : 'pointer', whiteSpace: 'nowrap', opacity: submitting ? 0.6 : 1 }}>
                        {submitting ? 'Sending…' : 'Notify Me'}
                    </button>
                </form>
                {emailError && <p style={{ color: '#c53030', fontSize: '0.85rem', marginTop: 6 }}>{emailError}</p>}
                {gdprLine}
            </div>
        );
    }

    return (
        <div style={{ background: '#1a1a1a', color: '#fff', borderRadius: 12, padding: 24, marginTop: 24 }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 20 }}>
                We found {issueCount} {issueCount === 1 ? 'issue' : 'issues'} in your {subjectNoun}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: 18 }}>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>📬 Email me this report</p>
                    <p style={{ color: '#9ca3af', fontSize: '0.82rem', marginBottom: 14 }}>Fix issues at your own pace. No spam.</p>
                    <form onSubmit={submitLead} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <input
                            type="email"
                            placeholder="you@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ padding: '10px 14px', border: `1px solid ${emailError ? '#fca5a5' : 'rgba(255,255,255,0.2)'}`, borderRadius: 8, fontSize: '0.9rem', outline: 'none', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                        />
                        <button type="submit" disabled={submitting} style={{ background: '#C9933A', color: '#1a1a1a', padding: '10px 16px', borderRadius: 8, fontWeight: 700, fontSize: '0.88rem', border: 'none', cursor: submitting ? 'default' : 'pointer', opacity: submitting ? 0.6 : 1 }}>
                            {submitting ? 'Sending…' : 'Send Report'}
                        </button>
                    </form>
                    {emailError && <p style={{ color: '#fca5a5', fontSize: '0.82rem', marginTop: 6 }}>{emailError}</p>}
                    {gdprLine}
                </div>

                <div style={{ background: 'rgba(201,147,58,0.12)', border: '1px solid rgba(201,147,58,0.35)', borderRadius: 10, padding: 18, display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>🔧 Fix all of these automatically</p>
                    <p style={{ color: '#d1b98a', fontSize: '0.82rem', marginBottom: 14, flex: 1 }}>
                        {fixTool
                            ? `${fixTool.label} fixes these issues for you.`
                            : 'Unlock every BookKraft tool to fix issues like these.'}
                    </p>
                    <a href={fixHref} style={{ display: 'block', textAlign: 'center', background: '#C9933A', color: '#1a1a1a', padding: '10px 16px', borderRadius: 8, fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none' }}>
                        {fixLabel}
                    </a>
                </div>
            </div>
        </div>
    );
}
