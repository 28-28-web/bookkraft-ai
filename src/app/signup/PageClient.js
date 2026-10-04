'use client';



import { useState } from 'react';

import { useRouter } from 'next/navigation';

import Link from 'next/link';

import { createClient } from '@/lib/supabase/client';

import { useToast } from '@/components/Toast';

import Turnstile, { TURNSTILE_ENABLED } from '@/components/Turnstile';

import { track } from '@/lib/analytics';



function SignupPageClient() {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const [success, setSuccess] = useState('');

    const [loading, setLoading] = useState(false);

    const [captchaToken, setCaptchaToken] = useState('');

    const [captchaKey, setCaptchaKey] = useState(0);

    const resetCaptcha = () => { setCaptchaToken(''); setCaptchaKey((k) => k + 1); };

    const router = useRouter();

    const { showToast } = useToast();

    const supabase = createClient();

    const [pendingPlan] = useState(() => {
        if (typeof window === 'undefined') return null;
        return new URLSearchParams(window.location.search).get('plan') || null;
    });

    // Optional post-signup destination (e.g. the gated Readiness report). Only
    // accept a local path — never an absolute/protocol-relative URL — so this
    // can't be turned into an open redirect. Defaults to /onboarding.
    const [pendingRedirect] = useState(() => {
        if (typeof window === 'undefined') return null;
        const r = new URLSearchParams(window.location.search).get('redirect');
        return r && r.startsWith('/') && !r.startsWith('//') ? r : null;
    });
    // Always run onboarding (it saves profile fields), but carry the final
    // destination so onboarding lands the user there instead of the dashboard.
    const nextPath = pendingRedirect
        ? `/onboarding?redirect=${encodeURIComponent(pendingRedirect)}`
        : '/onboarding';



    const handleSignup = async (e) => {

        e.preventDefault();

        setError('');

        setSuccess('');



        if (!email || !password) { setError('Please fill in all fields.'); return; }

        if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }

        if (TURNSTILE_ENABLED && !captchaToken) { setError('Please complete the CAPTCHA below.'); return; }



        setLoading(true);

        try {

            const { data, error: signUpError } = await supabase.auth.signUp({

                email,

                password,

                options: { emailRedirectTo: `https://bookkraftai.com/auth/callback?next=${encodeURIComponent(nextPath)}`, captchaToken: captchaToken || undefined }

            });

            if (signUpError) throw signUpError;



            if (data.user && !data.user.identities?.length) {

                setError('An account with this email already exists.');

            } else if (data.session) {

                // Auto-confirmed, go to onboarding

                track('account_created', { method: 'email' });
                if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'sign_up', { method: 'email' });
                }
                if (pendingPlan) {
                    try { localStorage.setItem('bk_pending_plan', pendingPlan); } catch {}
                }
                router.push(nextPath);

            } else {

                track('account_created', { method: 'email' });
                // No gtag sign_up here: the confirmation link lands on
                // /auth/callback?next=/onboarding, which fires sign_up server-side.
                if (pendingPlan) {
                    try { localStorage.setItem('bk_pending_plan', pendingPlan); } catch {}
                }
                setSuccess('Check your email for a confirmation link, then sign in.');

            }

        } catch (err) {

            setError(err.message || 'Signup failed. Please try again.');

            resetCaptcha();

        } finally {

            setLoading(false);

        }

    };



    const handleGoogleAuth = async () => {

        try {

            if (pendingPlan) {
                try { localStorage.setItem('bk_pending_plan', pendingPlan); } catch {}
            }

            await supabase.auth.signInWithOAuth({

                provider: 'google',

                options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}` }

            });

        } catch (err) {

            showToast('Google sign-in failed: ' + err.message, 'error');

        }

    };



    return (

        <div className="auth-wrap">

            <div className="auth-card">

                <h2>Create your account</h2>

                <p>Join 300+ indie authors in the BookKraft community.</p>

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

                        {password.length > 0 && (
                            <p style={{ fontSize: '12px', margin: '4px 0 0', color: password.length >= 8 ? 'var(--sage)' : 'var(--mid)' }}>
                                {password.length >= 8
                                    ? '✓ 8+ characters'
                                    : `✗ ${8 - password.length} more character${8 - password.length !== 1 ? 's' : ''} needed`}
                            </p>
                        )}

                    </div>

                    <Turnstile key={captchaKey} onVerify={setCaptchaToken} onExpire={resetCaptcha} onError={() => { resetCaptcha(); setError('CAPTCHA check failed — please try again.'); }} />

                    <button className="btn btn-primary btn-full" type="submit" disabled={loading}>

                        {loading ? 'Creating account...' : 'Create Free Account'}

                    </button>

                </form>

                <div className="auth-divider"><span>or</span></div>

                <button className="btn btn-google btn-full" onClick={handleGoogleAuth}>

                    <img src="https://www.google.com/favicon.ico" width="16" height="16" alt="Google" /> Continue with Google

                </button>

                <p className="auth-switch">Already have an account? <Link href={pendingRedirect ? `/login?redirect=${encodeURIComponent(pendingRedirect)}` : '/login'}>Sign in</Link></p>

            </div>

        </div>

    );

}
export default SignupPageClient;
