import Link from 'next/link';

export const metadata = {
  title: 'AI Author Headshots — Professional Photos from $5 | BookKraft AI',
  description:
    'Get professional AI-generated author headshots from a single selfie. No photographer, no studio. From $5. Perfect for your KDP author page and book back cover.',
  alternates: { canonical: 'https://bookkraftai.com/headshot' },
  openGraph: {
    title: 'AI Author Headshots — Professional Photos from $5',
    description:
      'Upload any selfie — get Amazon author page-ready headshots in 30 seconds. From $5, no subscription.',
    url: 'https://bookkraftai.com/headshot',
  },
  twitter: {
    title: 'AI Author Headshots — Professional Photos from $5',
    description: 'Upload a selfie, get professional author headshots instantly. From $5.',
  },
};

const CTA_URL = 'https://artrating.art/credits';

const WHY_CARDS = [
  {
    icon: '📚',
    title: 'KDP Author Page',
    body: 'Readers judge your book by your author photo. A professional headshot on your Amazon author page builds the trust that converts browsers into buyers.',
  },
  {
    icon: '📖',
    title: 'Book Back Cover',
    body: 'The back-cover author photo is the first human element readers look for. A professional headshot builds reader trust before they read a single word.',
  },
  {
    icon: '🌐',
    title: 'Social Media & Press Kit',
    body: 'A consistent, professional image across your website, social media, and press kit makes your author brand look deliberate and credible.',
  },
];

const HOW_STEPS = [
  {
    n: 1,
    title: 'Click "Get My Author Headshot"',
    body: 'Go to HeadshotMaker AI. Choose the credit pack that works for you — starting from $5 for 10 headshots.',
  },
  {
    n: 2,
    title: 'Upload your selfie on HeadshotMaker AI',
    body: 'Upload any selfie — front-facing, decent lighting, any background. The AI handles the rest.',
  },
  {
    n: 3,
    title: 'Download professional headshots instantly — from $5',
    body: 'Your AI-generated headshots are ready in about 30 seconds. Download and use on KDP, your website, book back cover, and press kits.',
  },
];

const PRICING_TIERS = [
  { credits: 10, price: 5, label: 'Starter', desc: 'Try it out — 10 professional author headshots.' },
  { credits: 50, price: 19, label: 'Standard', desc: 'Best for authors who need variety across platforms.', featured: true },
  { credits: 200, price: 39, label: 'Pro', desc: 'Full creative control — 200 headshots to mix and match.' },
];

export default function HeadshotPage() {
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
          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold btn-lg hover-lift"
            style={{ display: 'inline-block' }}
          >
            Get My Author Headshot →
          </a>
          <p
            style={{
              marginTop: 'var(--space-3)',
              fontSize: 'var(--text-sm)',
              color: 'rgba(247,243,236,0.45)',
            }}
          >
            From $5 · No subscription · Instant delivery
          </p>
        </div>
      </section>

      {/* ── Why Authors Need a Pro Photo ── */}
      <section style={{ background: 'var(--cream)', padding: 'var(--space-20) var(--space-6)' }}>
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
                <p style={{ color: 'var(--mid)', lineHeight: 1.65, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ background: 'var(--gold-light)', padding: 'var(--space-20) var(--space-6)' }}>
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

      {/* ── Pricing Preview ── */}
      <section style={{ background: 'var(--cream)', padding: 'var(--space-20) var(--space-6)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 700,
              textAlign: 'center',
              marginBottom: 'var(--space-3)',
              color: 'var(--ink)',
            }}
          >
            Simple, One-Time Pricing
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: 'var(--mid)',
              marginBottom: 'var(--space-10)',
              fontSize: 'var(--text-base)',
            }}
          >
            No subscription. Credits never expire. Use them whenever you need a new photo.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'var(--space-5)',
              marginBottom: 'var(--space-10)',
            }}
          >
            {PRICING_TIERS.map(({ credits, price, label, desc, featured }) => (
              <div
                key={credits}
                style={{
                  background: featured ? 'var(--ink)' : 'var(--white)',
                  color: featured ? 'var(--cream)' : 'var(--ink)',
                  border: featured ? 'none' : '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: 'var(--space-8)',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                {featured && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--gold)',
                      color: 'var(--ink)',
                      fontFamily: 'var(--font-jetbrains)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      padding: '3px 12px',
                      borderRadius: '20px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Most Popular
                  </span>
                )}
                <p
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: 'var(--text-xs)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: featured ? 'var(--gold)' : 'var(--mid)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontSize: 'var(--text-4xl)',
                    fontWeight: 700,
                    color: featured ? 'var(--gold)' : 'var(--ink)',
                    margin: '0 0 var(--space-1)',
                  }}
                >
                  ${price}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: 'var(--text-sm)',
                    color: featured ? 'rgba(247,243,236,0.5)' : 'var(--mid)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  {credits} headshots · one-time
                </p>
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: featured ? 'rgba(247,243,236,0.7)' : 'var(--mid)',
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <a
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold btn-lg hover-lift"
              style={{ display: 'inline-block' }}
            >
              Get Started →
            </a>
            <p
              style={{
                marginTop: 'var(--space-3)',
                fontSize: 'var(--text-sm)',
                color: 'var(--mid)',
              }}
            >
              Secure payment · Instant access · Credits never expire
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
