'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

// ─── EXIT INTENT POPUP ────────────────────────────────────────────────
// Shows when the user moves their mouse toward the top of the browser
// (about to close the tab or go to address bar).
// Add this once to your layout.js or page.js.
// Usage: <ExitIntentPopup />

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem('exitPopupDismissed')) return;

    const handleMouseLeave = (e) => {
      // Trigger when mouse moves above top 10px of viewport
      if (e.clientY <= 10 && !triggered.current) {
        triggered.current = true;
        setVisible(true);
      }
    };

    // Small delay before activating (don't trigger on page load)
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to your email service (Resend, Mailchimp, etc.)
    console.log('Email captured:', email);
    setSubmitted(true);
    setTimeout(() => dismiss(), 2500);
  };

  if (!visible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={dismiss}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(15,14,12,0.75)',
          zIndex: 9998,
          animation: 'bkFadeIn 0.2s ease forwards',
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        background: 'var(--ink, #0f0e0c)',
        border: '1px solid rgba(201,168,76,0.3)',
        borderRadius: 14,
        padding: 'clamp(28px, 4vw, 48px)',
        width: 'min(520px, 92vw)',
        textAlign: 'center',
        animation: 'bkSlideUp 0.3s cubic-bezier(0.22,1,0.36,1) forwards',
      }}>
        {/* Close */}
        <button
          onClick={dismiss}
          aria-label="Close"
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(247,243,236,0.4)', fontSize: 18,
          }}
        >✕</button>

        {!submitted ? (
          <>
            {/* Gold accent */}
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: 'rgba(201,168,76,0.12)',
              border: '1px solid rgba(201,168,76,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: 22,
            }}>✦</div>

            <p style={{
              color: 'rgba(201,168,76,0.8)',
              fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '2px',
              marginBottom: 10,
            }}>
              Before you go
            </p>

            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(22px, 4vw, 30px)',
              fontWeight: 700, fontStyle: 'italic',
              color: 'var(--cream, #f7f3ec)',
              lineHeight: 1.2, marginBottom: 12,
            }}>
              Get the Free 47-Point<br />Kindle Formatting Checklist
            </h2>

            <p style={{
              fontSize: 14, color: 'rgba(247,243,236,0.55)',
              lineHeight: 1.6, marginBottom: 24, maxWidth: 360, margin: '0 auto 24px',
            }}>
              The exact checklist 3,000+ indie authors use before submitting to KDP.
              Free. Straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  padding: '13px 16px',
                  borderRadius: 7,
                  border: '1px solid rgba(247,243,236,0.15)',
                  background: 'rgba(247,243,236,0.06)',
                  color: 'var(--cream, #f7f3ec)',
                  fontSize: 14, outline: 'none',
                  width: '100%', boxSizing: 'border-box',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '13px 16px',
                  background: 'var(--gold, #c9a84c)',
                  color: 'var(--ink, #0f0e0c)',
                  fontWeight: 700, fontSize: 14,
                  border: 'none', borderRadius: 7,
                  cursor: 'pointer', width: '100%',
                }}
              >
                Send Me the Checklist →
              </button>
            </form>

            <p style={{ fontSize: 11, color: 'rgba(247,243,236,0.28)', marginTop: 12 }}>
              No spam. Unsubscribe anytime.
            </p>

            {/* Secondary CTA */}
            <div style={{
              marginTop: 20, paddingTop: 20,
              borderTop: '1px solid rgba(247,243,236,0.08)',
            }}>
              <p style={{ fontSize: 12, color: 'rgba(247,243,236,0.35)', marginBottom: 10 }}>
                Or jump straight in —
              </p>
              <Link
                href="/pricing"
                onClick={dismiss}
                style={{
                  fontSize: 13, color: 'var(--gold, #c9a84c)',
                  textDecoration: 'underline', textUnderlineOffset: 3,
                }}
              >
                Get all 12 tools for $4.99 →
              </Link>
            </div>
          </>
        ) : (
          // Success state
          <div style={{ padding: '20px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              color: 'var(--cream)', fontSize: 22, marginBottom: 8,
            }}>
              Checklist on its way!
            </h3>
            <p style={{ color: 'rgba(247,243,236,0.55)', fontSize: 14 }}>
              Check your inbox in the next few minutes.
            </p>
          </div>
        )}

        <style>{`
          @keyframes bkFadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes bkSlideUp {
            from { opacity: 0; transform: translate(-50%, calc(-50% + 20px)); }
            to   { opacity: 1; transform: translate(-50%, -50%); }
          }
        `}</style>
      </div>
    </>
  );
}