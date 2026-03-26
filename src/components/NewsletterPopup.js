'use client';

import { useState, useEffect } from 'react';

export default function NewsletterPopup({ triggerType = 'default' }) {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (localStorage.getItem('bk_newsletter_done')) return;
        if (triggerType === 'manual') return;
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
        return () => { clearTimeout(timer); window.removeEventListener('scroll', handleScroll); };
    }, [triggerType]);

    useEffect(() => {
        function handleTrigger() {
            if (!localStorage.getItem('bk_newsletter_done')) setShow(true);
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
        <div
            onClick={handleDismiss}
            style={{
                position: 'fixed', inset: 0, background: 'rgba(15,14,12,0.7)',
                zIndex: 250, display: 'flex', alignItems: 'center',
                justifyContent: 'center', padding: '16px',
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: '#0F0E0C', borderRadius: '12px', padding: '40px',
                    maxWidth: '480px', width: '100%', position: 'relative',
                }}
            >
                <button
                    onClick={handleDismiss}
                    style={{
                        position: 'absolute', top: '16px', right: '16px',
                        background: 'none', border: 'none', fontSize: '18px',
                        cursor: 'pointer', color: 'rgba(247,243,236,0.5)',
                    }}
                >✕</button>

                {status === 'success' ? (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <div style={{
                            width: '56px', height: '56px', borderRadius: '50%',
                            background: '#C9933A', color: '#0F0E0C', fontSize: '24px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 16px',
                        }}>✓</div>
                        <p style={{ color: '#F7F3EC' }}>{message}</p>
                    </div>
                ) : (
                    <>
                        <h3 style={{
                            fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 700,
                            color: '#F7F3EC', marginBottom: '8px', lineHeight: 1.3,
                        }}>Get the Free 47-Point Kindle Formatting Checklist</h3>
                        <p style={{ color: 'rgba(247,243,236,0.6)', marginBottom: '24px', fontSize: '14px' }}>
                            Join 3,000+ authors. Straight to your inbox.
                        </p>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <input
                                type="email"
                                placeholder="Your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(247,243,236,0.2)',
                                    background: 'rgba(247,243,236,0.08)', color: '#F7F3EC',
                                    fontSize: '14px', outline: 'none', width: '100%',
                                }}
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                style={{
                                    padding: '12px 24px', borderRadius: '8px', border: 'none',
                                    background: '#C9933A', color: '#0F0E0C', fontWeight: 600,
                                    fontSize: '14px', cursor: 'pointer', width: '100%',
                                }}
                            >
                                {status === 'loading' ? 'Sending...' : 'Send Me the Checklist →'}
                            </button>
                        </form>
                        {status === 'error' && (
                            <p style={{ color: '#e57373', fontSize: '13px', marginTop: '8px' }}>{message}</p>
                        )}
                        <p style={{ color: 'rgba(247,243,236,0.4)', fontSize: '12px', marginTop: '12px', textAlign: 'center' }}>
                            No spam. Unsubscribe anytime.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
