'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';
import Footer from '@/components/Footer';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const handleReset = async (e) => {
        e.preventDefault();
        setError('');
        if (!email) { setError('Please enter your email address.'); return; }

        setLoading(true);
        try {
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/account`,
            });
            if (resetError) throw resetError;
            setSent(true);
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="auth-wrap">
                <div className="auth-card" style={{ maxWidth: '440px' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-2)' }}>Reset Password</h2>

                    {!sent ? (
                        <>
                            <p style={{ textAlign: 'center', color: 'var(--mid)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)' }}>
                                Enter the email you signed up with and we&apos;ll send you a reset link.
                            </p>
                            <form onSubmit={handleReset}>
                                <div className="form-group">
                                    <label className="form-label">Email address</label>
                                    <input className="form-input" type="email" value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com" required autoFocus />
                                </div>
                                {error && <p style={{ color: 'var(--rust)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>{error}</p>}
                                <button type="submit" className="btn btn-gold btn-full" disabled={loading}>
                                    {loading ? 'Sending...' : 'Send Reset Link'}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>&#9993;</div>
                            <p style={{ marginBottom: 'var(--space-4)' }}>
                                Reset link sent to <strong>{email}</strong>.
                            </p>
                            <p style={{ color: 'var(--mid)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)' }}>
                                Check your inbox (and spam folder). The link expires in 1 hour.
                            </p>
                            <button className="btn btn-outline btn-sm" onClick={() => { setSent(false); setEmail(''); }}>
                                Try another email
                            </button>
                        </div>
                    )}

                    <div style={{ textAlign: 'center', marginTop: 'var(--space-6)' }}>
                        <Link href="/login" style={{ fontSize: 'var(--text-sm)', color: 'var(--gold)' }}>&#8592; Back to Sign In</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
