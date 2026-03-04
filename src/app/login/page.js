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

    const handleForgotPassword = async () => {
        if (!email) { setError('Enter your email address first.'); return; }
        try {
            await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/account`,
            });
            showToast('Password reset email sent. Check your inbox.');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-wrap">
            <div className="auth-card">
                <h2>Welcome back</h2>
                <p>Sign in to continue writing your book.</p>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary btn-full" type="submit" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
                <div className="auth-divider"><span>or</span></div>
                <button className="btn btn-google btn-full" onClick={handleGoogleAuth}>
                    <img src="https://www.google.com/favicon.ico" width="16" height="16" alt="Google" /> Continue with Google
                </button>
                <p className="auth-switch">No account yet? <Link href="/signup">Sign up free</Link></p>
                <p className="auth-switch" style={{ marginTop: '.5rem' }}>
                    <a onClick={handleForgotPassword} style={{ cursor: 'pointer' }}>Forgot password?</a>
                </p>
            </div>
        </div>
    );
}
