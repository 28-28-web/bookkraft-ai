'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/components/Toast';

export default function LoginPage() {
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
                    <img src="https://www.google.com/favicon.ico" width="16" height="16" alt="Google" /> Continue with Google
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
