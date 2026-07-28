'use client';

import { useState } from 'react';
import { usePaddle } from '@/app/hooks/usePaddle';
import { useAuth } from '@/components/AuthProvider';

const HEADSHOT_PRICE_ID = 'pri_01kyn524fh7j4ae7dw45zx1x26';
const SUCCESS_URL = 'https://artrating.art?headshot_credits=10&success=true';
const CHECKOUT_WATCHDOG_MS = 5000;

function HeadshotCheckoutButton({ children, fullWidth }) {
  const { paddle } = usePaddle();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (!user) {
      window.location.href = '/signup?plan=headshot';
      return;
    }

    if (!paddle) {
      window.location.href = '/checkout?plan=headshot';
      return;
    }

    setLoading(true);

    let settled = false;
    const watchdog = setTimeout(() => {
      if (settled) return;
      settled = true;
      setLoading(false);
      window.location.href = '/checkout?plan=headshot';
    }, CHECKOUT_WATCHDOG_MS);

    const payload = {
      items: [{ priceId: HEADSHOT_PRICE_ID, quantity: 1 }],
      customData: { userId: user.id, purchaseType: 'headshot' },
      customer: { email: user.email },
      settings: { successUrl: SUCCESS_URL },
    };

    try {
      paddle.Checkout.open(payload);
    } catch (err) {
      console.error('Headshot Checkout.open threw:', err);
      if (!settled) {
        settled = true;
        clearTimeout(watchdog);
        setLoading(false);
        window.location.href = '/checkout?plan=headshot';
      }
      return;
    }

    settled = true;
    clearTimeout(watchdog);
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="btn btn-gold btn-lg hover-lift"
      style={{
        cursor: loading ? 'wait' : 'pointer',
        opacity: loading ? 0.7 : 1,
        width: fullWidth ? '100%' : undefined,
      }}
    >
      {loading ? 'Opening checkout…' : children}
    </button>
  );
}

const WHY_CARDS = [
  {
    icon: '📚',
    title: 'KDP Author Page',
    body: 'Readers judge books by author photos. A professional headshot on your Amazon author page builds the trust that converts browsers into buyers.',
  },
  {
    icon: '📖',
    title: 'Book Back Cover',
    body: 'The back-cover author photo is the first human element readers look for. A blurry selfie undermines an otherwise polished book.',
  },
  {
    icon: '🌐',
    title: 'Social Media & Press',
    body: 'A consistent, professional image across your website, social media, and press kit makes your author brand look deliberate and credible.',
  },
];

const HOW_STEPS = [
  {
    n: 1,
    title: 'Purchase 10 credits — one-time $9',
    body: 'Secure Paddle checkout. Pay once, use your 10 credits any time you need them. No recurring charge, no expiry date.',
  },
  {
    n: 2,
    title: 'Upload your selfie on HeadshotMaker AI',
    body: 'After purchase you\'re redirected to HeadshotMaker AI. Upload any selfie — front-facing, decent lighting, any background.',
  },
  {
    n: 3,
    title: 'Download professional headshots instantly',
    body: 'Your AI-generated headshots are ready in about 30 seconds. Download and use on your KDP author page, book back cover, and press kit.',
  },
];

const FEATURES = [
  '10 AI-generated headshots',
  'Ready in 30 seconds',
  'Amazon author page ready',
  'No subscription, ever',
];

export default function HeadshotClient() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          background: 'var(--ink)',
          color: 'var(--cream)',
          padding: 'var(--space-24) var(--space-6) var(--space-20)',
        }}
      >
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: 'var(--text-xs)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--gold)',
              marginBottom: 'var(--space-4)',
            }}
          >
            AI Author Headshots
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: 'var(--space-5)',
              color: 'var(--cream)',
            }}
          >
            Your Author Photo.<br />
            Professional Results.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 'var(--text-lg)',
              color: 'rgba(247,243,236,0.75)',
              maxWidth: 560,
              margin: '0 auto var(--space-8)',
              lineHeight: 1.65,
            }}
          >
            Upload any selfie — get an Amazon author page-ready headshot in 30 seconds.
            No photographer, no studio, no waiting.
          </p>
          <HeadshotCheckoutButton>Get 10 Headshots — $9</HeadshotCheckoutButton>
          <p
            style={{
              marginTop: 'var(--space-3)',
              fontSize: 'var(--text-sm)',
              color: 'rgba(247,243,236,0.45)',
            }}
          >
            One-time purchase · No subscription
          </p>
        </div>
      </section>

      {/* ── Why Authors Need a Pro Photo ── */}
      <section
        style={{ background: 'var(--cream)', padding: 'var(--space-20) var(--space-6)' }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 700,
              textAlign: 'center',
              marginBottom: 'var(--space-12)',
              color: 'var(--ink)',
            }}
          >
            Why Authors Need a Professional Photo
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {WHY_CARDS.map(({ icon, title, body }) => (
              <div
                key={title}
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: 'var(--space-8)',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: 'var(--space-3)' }}>{icon}</div>
                <h3
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 700,
                    marginBottom: 'var(--space-3)',
                    color: 'var(--ink)',
                  }}
                >
                  {title}
                </h3>
                <p style={{ color: 'var(--mid)', lineHeight: 1.65 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section
        style={{ background: 'var(--gold-light)', padding: 'var(--space-20) var(--space-6)' }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 700,
              textAlign: 'center',
              marginBottom: 'var(--space-12)',
              color: 'var(--ink)',
            }}
          >
            How It Works
          </h2>
          <ol
            style={{
              listStyle: 'none',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-8)',
            }}
          >
            {HOW_STEPS.map(({ n, title, body }) => (
              <li key={n} style={{ display: 'flex', gap: 'var(--space-5)', alignItems: 'flex-start' }}>
                <span
                  style={{
                    flexShrink: 0,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'var(--gold)',
                    color: 'var(--ink)',
                    fontFamily: 'var(--font-playfair)',
                    fontWeight: 700,
                    fontSize: 'var(--text-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {n}
                </span>
                <div>
                  <strong
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontSize: 'var(--text-lg)',
                      color: 'var(--ink)',
                      display: 'block',
                      marginBottom: 'var(--space-1)',
                    }}
                  >
                    {title}
                  </strong>
                  <p style={{ color: 'var(--mid)', lineHeight: 1.65, margin: 0 }}>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Pricing Box ── */}
      <section
        style={{ background: 'var(--cream)', padding: 'var(--space-20) var(--space-6)' }}
      >
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <div
            style={{
              background: 'var(--ink)',
              color: 'var(--cream)',
              borderRadius: 'calc(var(--radius) * 3)',
              padding: 'var(--space-10)',
              textAlign: 'center',
              boxShadow: '0 16px 48px rgba(0,0,0,0.18)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: 'var(--text-xs)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--gold)',
                marginBottom: 'var(--space-2)',
              }}
            >
              One-Time Purchase
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'var(--text-2xl)',
                fontWeight: 700,
                marginBottom: 'var(--space-1)',
              }}
            >
              10 Author Headshots
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'var(--text-5xl)',
                fontWeight: 700,
                color: 'var(--gold)',
                margin: 'var(--space-4) 0',
              }}
            >
              $9
            </p>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 var(--space-8)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
              }}
            >
              {FEATURES.map((f) => (
                <li
                  key={f}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--space-2)',
                    fontSize: 'var(--text-sm)',
                    color: 'rgba(247,243,236,0.8)',
                  }}
                >
                  <span style={{ color: 'var(--gold)' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <HeadshotCheckoutButton fullWidth>Get 10 Headshots — $9</HeadshotCheckoutButton>
            <p
              style={{
                marginTop: 'var(--space-4)',
                fontSize: 'var(--text-xs)',
                color: 'rgba(247,243,236,0.4)',
              }}
            >
              No subscription. No photographer. Instant delivery.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
