'use client';

import { useState, useEffect } from 'react';

export default function NewsletterPopup({ triggerType = 'default' }) {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Don't show if already dismissed/subscribed
        if (localStorage.getItem('bk_newsletter_done')) return;

        if (triggerType === 'manual') return; // Manual trigger — don't auto-show

        // Default: 20 seconds OR 60% scroll — whichever first
        const timer = setTimeout(() => {
            if (!localStorage.getItem('bk_newsletter_done')) {
                if (sessionStorage.getItem('bk_newsletter_shown')) return;
                setShow(true);
                sessionStorage.setItem('bk_newsletter_shown', 'true');
            }
        }, 20000);

        function handleScroll() {
            const scrollPct = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
            if (scrollPct > 0.6) {
                if (!sessionStorage.getItem('bk_newsletter_shown') && !localStorage.getItem('bk_newsletter_done')) {
                    setShow(true);
                    sessionStorage.setItem('bk_newsletter_shown', 'true');
                }
                window.removeEventListener('scroll', handleScroll);
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [triggerType]);

    // Public method to trigger manually (for EPUB Validator, Metadata Builder)
    useEffect(() => {
        function handleTrigger() {
            if (!localStorage.getItem('bk_newsletter_done')) {
                setShow(true);
            }
        }
        window.addEventListener('bk-newsletter-trigger', handleTrigger);
        return () => window.removeEventListener('bk-newsletter-trigger', handleTrigger);
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            const res = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (data.success) {
                setStatus('success');
                setMessage(data.message);
                localStorage.setItem('bk_newsletter_done', 'true');
                setTimeout(() => setShow(false), 3000);
            } else {
                setStatus('error');
                setMessage(data.message || 'Something went wrong.');
            }
        } catch {
            setStatus('error');
            setMessage('Something went wrong. Try again.');
        }
    }

    function handleDismiss() {
        setShow(false);
        sessionStorage.setItem('bk_newsletter_shown', 'true');
    }

    if (!show) return null;

    return (
        <div className="newsletter-overlay" onClick={handleDismiss}>
            <div className="newsletter-popup" onClick={(e) => e.stopPropagation()}>
                <button className="newsletter-close" onClick={handleDismiss}>✕</button>

                {status === 'success' ? (
                    <div className="newsletter-success">
                        <div className="newsletter-success-icon">✓</div>
                        <p>{message}</p>
                    </div>
                ) : (
                    <>
                        <h3>Get the Free 47-Point Kindle Formatting Checklist</h3>
                        <p className="newsletter-sub">Join 3,000+ authors. Straight to your inbox.</p>

                        <form onSubmit={handleSubmit} className="newsletter-form">
                            <input
                                type="email"
                                className="form-input"
                                placeholder="Your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="btn btn-gold btn-full" disabled={status === 'loading'}>
                                {status === 'loading' ? 'Sending...' : 'Send Me the Checklist →'}
                            </button>
                        </form>

                        {status === 'error' && <p className="newsletter-error">{message}</p>}
                        <p className="newsletter-small">No spam. Unsubscribe anytime.</p>
                    </>
                )}
            </div>
        </div>
    );
}
