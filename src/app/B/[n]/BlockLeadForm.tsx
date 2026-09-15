'use client';

import { useState, FormEvent } from 'react';

export default function BlockLeadForm({ blockId }: { blockId: string }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setStatus('loading');
        try {
            const res = await fetch('/api/block-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, blockId }),
            });
            const data = await res.json();
            setStatus(data.ok ? 'ok' : 'error');
        } catch {
            setStatus('error');
        }
    }

    if (status === 'ok') {
        return (
            <div style={{
                background: 'var(--gold-light)',
                border: '1px solid var(--gold)',
                borderRadius: 10,
                padding: '20px 24px',
                textAlign: 'center',
            }}>
                <p style={{ margin: 0, fontWeight: 700, color: 'var(--ink)', fontSize: 16 }}>
                    You&apos;re in.
                </p>
                <p style={{ margin: '6px 0 0', color: 'var(--mid)', fontSize: 14 }}>
                    Check your inbox — more blocks arrive weekly.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                style={{
                    padding: '11px 14px',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    fontSize: 15,
                    background: 'var(--white)',
                    color: 'var(--ink)',
                    outline: 'none',
                    width: '100%',
                    boxSizing: 'border-box',
                }}
            />
            <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                    padding: '11px 14px',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    fontSize: 15,
                    background: 'var(--white)',
                    color: 'var(--ink)',
                    outline: 'none',
                    width: '100%',
                    boxSizing: 'border-box',
                }}
            />
            <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                    padding: '12px 24px',
                    background: status === 'loading' ? 'var(--border)' : 'var(--gold)',
                    color: status === 'loading' ? 'var(--mid)' : 'var(--white)',
                    fontWeight: 700,
                    fontSize: 15,
                    border: 'none',
                    borderRadius: 8,
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    transition: 'background 0.15s',
                }}
            >
                {status === 'loading' ? 'Sending…' : 'Get the weekly block →'}
            </button>
            {status === 'error' && (
                <p style={{ margin: 0, color: 'var(--terracotta)', fontSize: 13 }}>
                    Something went wrong — try again.
                </p>
            )}
        </form>
    );
}
