'use client';

import { useState } from 'react';

export default function PromoCodeInput({ onSuccess }) {
    const [code, setCode] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | ok | error
    const [message, setMessage] = useState('');

    const ERROR_MESSAGES = {
        invalid_code:  'Enter a valid promo code (letters and numbers only).',
        code_not_found: 'That code doesn\'t exist. Double-check and try again.',
        code_exhausted: 'This code has reached its maximum uses.',
        already_used:  'You\'ve already used this code.',
        unauthorized:  'Sign in to apply a promo code.',
        server_error:  'Something went wrong — please try again.',
    };

    const apply = async () => {
        const trimmed = code.trim().toUpperCase();
        if (!trimmed) return;
        setStatus('loading');
        setMessage('');
        try {
            const res = await fetch('/api/promo/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: trimmed }),
                credentials: 'same-origin',
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setStatus('error');
                setMessage(ERROR_MESSAGES[data.error] || ERROR_MESSAGES.server_error);
                return;
            }
            setStatus('ok');
            setCode('');
            const until = new Date(data.expires_at).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'short', year: 'numeric',
            });
            setMessage(`Starter access activated until ${until}.`);
            if (onSuccess) onSuccess(data);
        } catch {
            setStatus('error');
            setMessage(ERROR_MESSAGES.server_error);
        }
    };

    const handleKey = (e) => { if (e.key === 'Enter') apply(); };

    return (
        <div style={{
            padding: 'var(--space-4)',
            marginBottom: 'var(--space-6)',
            background: 'var(--cream)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
        }}>
            <p style={{ margin: '0 0 12px', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ink)' }}>
                Have a promo code?
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <input
                    className="form-input"
                    type="text"
                    placeholder="Enter code"
                    value={code}
                    onChange={e => setCode(e.target.value.toUpperCase())}
                    onKeyDown={handleKey}
                    disabled={status === 'loading' || status === 'ok'}
                    style={{ flex: '1 1 180px', minWidth: 0, letterSpacing: '0.05em', fontWeight: 600 }}
                    aria-label="Promo code"
                />
                <button
                    className="btn btn-gold btn-sm"
                    onClick={apply}
                    disabled={status === 'loading' || status === 'ok' || !code.trim()}
                    style={{ whiteSpace: 'nowrap' }}
                >
                    {status === 'loading' ? 'Applying…' : status === 'ok' ? 'Applied ✓' : 'Apply'}
                </button>
            </div>
            {message && (
                <p role="alert" style={{
                    margin: '8px 0 0',
                    fontSize: 'var(--text-sm)',
                    color: status === 'ok' ? 'var(--sage)' : 'var(--rust)',
                }}>
                    {message}
                </p>
            )}
        </div>
    );
}
