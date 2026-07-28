'use client';

import { useState } from 'react';
import { usePaddle } from '@/app/hooks/usePaddle';

const CHECKOUT_WATCHDOG_MS = 5000;

export default function CreditsClient({ plan, credits, priceLabel, priceId, userEmail }) {
  const { paddle } = usePaddle();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!priceId) {
    return (
      <p style={{ color: 'var(--rust)', textAlign: 'center', padding: 'var(--space-6)' }}>
        This credit pack is not available yet. Please return to{' '}
        <a href="https://artrating.art/credits" style={{ color: 'var(--gold)' }}>
          artrating.art/credits
        </a>{' '}
        and try again.
      </p>
    );
  }

  const handleCheckout = () => {
    if (!paddle) {
      setError('Payment system loading — please wait a moment and try again.');
      return;
    }

    setError('');
    setLoading(true);

    let settled = false;
    const watchdog = setTimeout(() => {
      if (settled) return;
      settled = true;
      setLoading(false);
      setError('Checkout timed out. Please try again.');
    }, CHECKOUT_WATCHDOG_MS);

    const payload = {
      items: [{ priceId, quantity: 1 }],
      customData: { purchaseType: plan, userEmail },
      customer: { email: userEmail },
      settings: {
        successUrl: `https://artrating.art/credits?success=true`,
      },
    };

    try {
      paddle.Checkout.open(payload);
    } catch (err) {
      console.error('Checkout.open threw:', err);
      if (!settled) {
        settled = true;
        clearTimeout(watchdog);
        setLoading(false);
        setError('Checkout could not open. Please try again.');
      }
      return;
    }

    settled = true;
    clearTimeout(watchdog);
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' }}>
      {/* Pack summary */}
      <div
        style={{
          background: 'var(--white)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: 'var(--space-8)',
          textAlign: 'center',
          width: '100%',
          maxWidth: 360,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: 'var(--text-xs)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--mid)',
            marginBottom: 'var(--space-2)',
          }}
        >
          Author Headshots
        </p>
        <p
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'var(--text-4xl)',
            fontWeight: 700,
            color: 'var(--gold)',
            margin: '0 0 var(--space-1)',
          }}
        >
          {priceLabel}
        </p>
        <p style={{ color: 'var(--mid)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)' }}>
          {credits} headshot credits · one-time
        </p>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="btn btn-gold hover-lift"
          style={{ width: '100%', cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Opening checkout…' : `Pay ${priceLabel} — Secure Checkout`}
        </button>
      </div>

      {error && (
        <p style={{ color: 'var(--rust)', fontSize: 'var(--text-sm)', textAlign: 'center' }}>{error}</p>
      )}

      <p style={{ color: 'var(--mid)', fontSize: 'var(--text-xs)', textAlign: 'center' }}>
        Checkout by Paddle · Credits added to{' '}
        <strong style={{ color: 'var(--ink)' }}>{userEmail}</strong> on artrating.art after payment
      </p>
    </div>
  );
}
