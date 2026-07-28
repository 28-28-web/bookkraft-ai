import Link from 'next/link';
import CreditsClient from './CreditsClient';

export const metadata = {
  title: 'Complete Your HeadshotMaker AI Purchase | BookKraft AI',
  description: 'Secure checkout for HeadshotMaker AI credits. Powered by Paddle.',
  robots: { index: false },
};

// Maps the plan slug (from artrating.art redirect) to display info and price ID.
// Price IDs must match artrating.art's Paddle catalog — set them in Coolify as
// NEXT_PUBLIC_PADDLE_PRICE_HEADSHOT_STARTER / _PRO / _UNLIMITED, copying the
// values from artrating.art's NEXT_PUBLIC_PADDLE_PRICE_STARTER / _PRO / _UNLIMITED.
const PLAN_CONFIGS = {
  'headshot-10': {
    credits: 10,
    priceLabel: '$5',
    priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_HEADSHOT_STARTER,
  },
  'headshot-50': {
    credits: 50,
    priceLabel: '$19',
    priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_HEADSHOT_PRO,
  },
  'headshot-200': {
    credits: 200,
    priceLabel: '$39',
    priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_HEADSHOT_UNLIMITED,
  },
};

export default async function CreditsPage({ searchParams }) {
  const { plan, user: userEmail } = await searchParams;

  // Missing or invalid params — send them back
  if (!plan || !userEmail || !PLAN_CONFIGS[plan]) {
    return (
      <main
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-4)',
          padding: 'var(--space-8)',
          textAlign: 'center',
        }}
      >
        <p style={{ fontFamily: 'var(--font-playfair)', fontSize: 'var(--text-xl)', color: 'var(--ink)' }}>
          Invalid or missing purchase details.
        </p>
        <Link
          href="https://artrating.art/credits"
          className="btn btn-gold"
          style={{ display: 'inline-block' }}
        >
          ← Back to HeadshotMaker AI
        </Link>
      </main>
    );
  }

  const config = PLAN_CONFIGS[plan];

  return (
    <main
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-16) var(--space-6)',
        gap: 'var(--space-8)',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <p
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: 'var(--text-xs)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--gold)',
            marginBottom: 'var(--space-3)',
          }}
        >
          HeadshotMaker AI · Secure Checkout
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 700,
            color: 'var(--ink)',
            marginBottom: 'var(--space-2)',
          }}
        >
          Complete Your Purchase
        </h1>
        <p style={{ color: 'var(--mid)', fontSize: 'var(--text-sm)' }}>
          Credits will be added to your HeadshotMaker AI account after payment.
        </p>
      </div>

      {/* Paddle checkout widget */}
      <CreditsClient
        plan={plan}
        credits={config.credits}
        priceLabel={config.priceLabel}
        priceId={config.priceId ?? null}
        userEmail={userEmail}
      />

      <Link
        href="https://artrating.art/credits"
        style={{ color: 'var(--mid)', fontSize: 'var(--text-sm)', textDecoration: 'underline' }}
      >
        ← Cancel and go back
      </Link>
    </main>
  );
}
