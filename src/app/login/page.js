'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
    const { showToast } = useToast();
    const supabase = createClient();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) { setError('Please fill in all fields.'); return; }

        setLoading(true);
        try {
            const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
            if (loginError) throw loginError;
            router.push('/dashboard');
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
                options: { redirectTo: `${window.location.origin}/auth/callback?next=/dashboard` }
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
                options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard` }
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
                <div className="auth-card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>&#9993;</div>
                    <h2>Check your email</h2>
                    <p style={{ color: 'var(--mid)', margin: 'var(--space-4) 0' }}>
                        We sent a magic link to <strong>{email}</strong>.<br />Click the link in the email to sign in.
                    </p>
                    <button className="btn btn-outline btn-sm" onClick={() => setMagicLinkSent(false)}>
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
                {error && <div className="auth-error">{error}</div>}
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
