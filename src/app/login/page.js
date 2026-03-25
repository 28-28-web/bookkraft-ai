'use client';

import { Suspense } from 'react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/components/Toast';

function LoginContent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [magicLinkSent, setMagicLinkSent] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { showToast } = useToast();
    const supabase = createClient();

    const redirectTo = searchParams.get('redirect') || '/dashboard';
    const reason = searchParams.get('reason');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) { setError('Please fill in all fields.'); return; }

        setLoading(true);
        try {
            const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
            if (loginError) throw loginError;
            router.push(redirectTo);
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        try {
            await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: `https://bookkraftai.com/auth/callback?next=${encodeURIComponent(redirectTo)}` }
            });
        } catch (err) {
            showToast('Google sign-in failed: ' + err.message, 'error');
        }
    };

    const handleMagicLink = async () => {
        if (!email) { setError('Enter your email address first.'); return; }
        setError('');
        setLoading(true);
        try {
            const { error: otpError } = await supabase.auth.signInWithOtp({
                email,
                options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}` }
            });
            if (otpError) throw otpError;
            setMagicLinkSent(true);
        } catch (err) {
            setError(err.message || 'Failed to send magic link.');
        } finally {
            setLoading(false);
        }
    };

    if (magicLinkSent) {
        return (
            <div className="auth-wrap">
                <div className="auth-card">
                    <p style={{ fontSize: '48px', textAlign: 'center' }}>✉</p>
                    <h2>Check your email</h2>
                    <p>
                        We sent a magic link to <strong>{email}</strong>.<br />
                        Click the link in the email to sign in.
                    </p>
                    <button className="btn btn-outline btn-full" onClick={() => setMagicLinkSent(false)}>
                        Try another method
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-wrap">
            <div className="auth-card">
                <h2>Welcome back</h2>
                <p>Sign in to continue formatting your book.</p>

                {reason === 'auth-required' && (
                    <div className="auth-notice" role="alert">
                        Sign in to access this tool. You'll be redirected back automatically.
                    </div>
                )}

                {error && <p className="form-error">{error}</p>}

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-input" placeholder="you@example.com"
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-input" placeholder="Your password"
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="btn btn-primary btn-full" type="submit" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="auth-divider"><span>or</span></div>

                <button className="btn btn-google btn-full" onClick={handleGoogleAuth}>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                </button>
                <button className="btn btn-outline btn-full" style={{ marginTop: 'var(--space-3)' }} onClick={handleMagicLink}>
                    Send Magic Link
                </button>

                <p className="auth-switch">No account yet? <Link href="/signup">Sign up free</Link></p>
                <p className="auth-switch" style={{ marginTop: '.5rem' }}>
                    <Link href="/forgot-password">Forgot password?</Link>
                </p>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginContent />
        </Suspense>
    );
}