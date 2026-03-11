'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/components/Toast';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { showToast } = useToast();
    const supabase = createClient();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email || !password) { setError('Please fill in all fields.'); return; }
        if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }

        setLoading(true);
        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: { emailRedirectTo: `https://bookkraftai.com/auth/callback?next=/onboarding` }
            });
            if (signUpError) throw signUpError;

            if (data.user && !data.user.identities?.length) {
                setError('An account with this email already exists.');
            } else if (data.session) {
                // Auto-confirmed, go to onboarding
                router.push('/onboarding');
            } else {
                setSuccess('Check your email for a confirmation link, then sign in.');
            }
        } catch (err) {
            setError(err.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        try {
            await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: `${window.location.origin}/auth/callback?next=/onboarding` }
            });
        } catch (err) {
            showToast('Google sign-in failed: ' + err.message, 'error');
        }
    };

    return (
        <div className="auth-wrap">
            <div className="auth-card">
                <h2>Create your account</h2>
                <p>Join 2,400+ authors using BookKraft to write better books, faster.</p>
                {error && <div className="auth-error">{error}</div>}
                {success && <div className="auth-success">{success}</div>}
                <form onSubmit={handleSignup}>
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
                            placeholder="At least 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary btn-full" type="submit" disabled={loading}>
                        {loading ? 'Creating account...' : 'Create Free Account'}
                    </button>
                </form>
                <div className="auth-divider"><span>or</span></div>
                <button className="btn btn-google btn-full" onClick={handleGoogleAuth}>
                    <img src="https://www.google.com/favicon.ico" width="16" height="16" alt="Google" /> Continue with Google
                </button>
                <p className="auth-switch">Already have an account? <Link href="/login">Sign in</Link></p>
            </div>
        </div>
    );
}
