'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const triggered = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem('exitPopupDismissed')) return;

    const handleMouseLeave = (e) => {
      if (e.clientY <= 10 && !triggered.current) {
        triggered.current = true;
        setVisible(true);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 8000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem('exitPopupDismissed', 'true');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setTimeout(() => dismiss(), 2500);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <>
      <div onClick={dismiss} style={{ position: 'fixed', inset: 0, background: 'rgba(15,14,12,0.75)', zIndex: 9998 }} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)', zIndex: 9999,
        background: 'var(--ink, #0f0e0c)',
        border: '1px solid rgba(201,168,76,0.3)',
        borderRadius: 14, padding: 'clamp(28px, 4vw, 48px)',
        width: 'min(520px, 92vw)', textAlign: 'center',
      }}>
        <button onClick={dismiss} aria-label="Close" style={{
          position: 'absolute', top: 16, right: 16,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(247,243,236,0.4)', fontSize: 18,
        }}>✕</button>

        {!submitted ? (
          <>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: 'rgba(201,168,76,0.12)',
              border: '1px solid rgba(201,168,76,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', fontSize: 22,
            }}>✦</div>

            <p style={{ color: 'rgba(201,168,76,0.8)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 10 }}>
              Before you go
            </p>

            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 700, fontStyle: 'italic',
              color: 'var(--cream, #f7f3ec)', lineHeight: 1.2, marginBottom: 12,
            }}>
              Get the Free 47-Point<br />Kindle Formatting Checklist
            </h2>

            <p style={{ fontSize: 14, color: 'rgba(247,243,236,0.55)', lineHeight: 1.6, marginBottom: 24, maxWidth: 360, margin: '0 auto 24px' }}>
              The exact checklist 3,000+ indie authors use before submitting to KDP. Free. Straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input
                type="email" required placeholder="Your email address"
                value={email} onChange={e => setEmail(e.target.value)}
                style={{
                  padding: '13px 16px', borderRadius: 7,
                  border: '1px solid rgba(247,243,236,0.15)',
                  background: 'rgba(247,243,236,0.06)',
                  color: 'var(--cream, #f7f3ec)', fontSize: 14, outline: 'none',
                  width: '100%', boxSizing: 'border-box',
                }}
              />
              {error && <p style={{ color: '#ff6b6b', fontSize: 12, margin: 0 }}>{error}</p>}
              <button type="submit" disabled={loading} style={{
                padding: '13px 16px', background: 'var(--gold, #c9a84c)',
                color: 'var(--ink, #0f0e0c)', fontWeight: 700, fontSize: 14,
                border: 'none', borderRadius: 7, cursor: loading ? 'wait' : 'pointer',
                width: '100%', opacity: loading ? 0.7 : 1,
              }}>
                {loading ? 'Sending...' : 'Send Me the Checklist →'}
              </button>
            </form>

            <p style={{ fontSize: 11, color: 'rgba(247,243,236,0.28)', marginTop: 12 }}>No spam. Unsubscribe anytime.</p>

            <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(247,243,236,0.08)' }}>
              <p style={{ fontSize: 12, color: 'rgba(247,243,236,0.35)', marginBottom: 10 }}>Or jump straight in —</p>
              <Link href="/pricing" onClick={dismiss} style={{ fontSize: 13, color: 'var(--gold, #c9a84c)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                Get all 12 tools for $4.99 →
              </Link>
            </div>
          </>
        ) : (
          <div style={{ padding: '20px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--cream)', fontSize: 22, marginBottom: 8 }}>Checklist on its way!</h3>
            <p style={{ color: 'rgba(247,243,236,0.55)', fontSize: 14 }}>Check your inbox in the next few minutes.</p>
          </div>
        )}
      </div>
    </>
  );
}