import Link from 'next/link';

const faqs = [
  {
    q: 'What is the best Vellum alternative for Windows authors?',
    a: 'BookKraft AI is browser-based, so it works on Windows, Mac, Linux, and Chromebook, unlike Vellum which is Mac-only. It starts at $4.99 one-time for formatting tools, with Full Access at $9.99 for all 12 tools including AI-powered manuscript cleanup.',
  },
  {
    q: 'What is the best Calibre alternative for KDP authors?',
    a: 'BookKraft AI focuses specifically on the formatting and validation steps indie authors need before publishing to KDP, Apple Books, or Kobo. It runs in the browser with no install, unlike Calibre which requires a desktop download and is built for library management rather than KDP-specific formatting.',
  },
  {
    q: 'Is BookKraft AI cheaper than Vellum and Calibre?',
    a: 'BookKraft AI is cheaper than Vellum, which costs $250 for the ebook and print bundle. Calibre is free, but BookKraft AI adds KDP-specific validation, metadata building, and AI-powered manuscript cleanup that Calibre does not offer.',
  },
  {
    q: 'Do I need to install anything to use BookKraft AI?',
    a: 'No. BookKraft AI runs entirely in your browser. There is nothing to download or install, and two tools, EPUB Validator and Metadata Builder, are free with no signup required.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const cards = [
  {
    name: 'Vellum',
    href: '/vellum-alternative',
    tagline: 'For Mac-only authors looking for a Windows-friendly option',
    price: '$250',
    priceLabel: 'ebook + print bundle',
    points: [
      'Mac only — BookKraft AI runs in any browser',
      'No AI manuscript cleanup',
      'No built-in EPUB validation before upload',
    ],
  },
  {
    name: 'Calibre',
    href: '/calibre-alternative',
    tagline: 'For authors who find Calibre too complex for simple formatting tasks',
    price: 'Free',
    priceLabel: 'desktop install required',
    points: [
      'Built for library management, not KDP formatting',
      'Steep learning curve, 200MB+ download',
      'No KDP-specific guidance or AI tools',
    ],
  },
];

export default function AlternativesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px', color: 'var(--ink, #1a1a1a)' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          BookKraft AI Alternatives Comparison
        </h1>

        <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 48, opacity: 0.9 }}>
          Most ebook formatting tools force a tradeoff: pay a lot, install something heavy, or settle for software built for a different job. BookKraft AI runs in any browser, starts at $4.99 one-time, and is built specifically for indie authors formatting for KDP, Apple Books, and Kobo. See how it compares to the two most common alternatives.
        </p>

        <div style={{ display: 'grid', gap: 24, marginBottom: 48 }}>
          {cards.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              style={{
                display: 'block',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: 12,
                padding: '32px',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
                <div>
                  <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>
                    BookKraft AI vs {c.name}
                  </h2>
                  <p style={{ fontSize: 15, opacity: 0.75, margin: 0 }}>{c.tagline}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 28, fontWeight: 700, opacity: 0.7 }}>{c.price}</div>
                  <div style={{ fontSize: 13, opacity: 0.6 }}>{c.priceLabel}</div>
                </div>
              </div>

              <ul style={{ margin: '16px 0 20px', paddingLeft: 20 }}>
                {c.points.map((p, i) => (
                  <li key={i} style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.85, marginBottom: 4 }}>
                    {p}
                  </li>
                ))}
              </ul>

              <span style={{ color: '#c9a84c', fontWeight: 600, fontSize: 15 }}>
                See full comparison →
              </span>
            </Link>
          ))}
        </div>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          What BookKraft AI includes
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          12 tools covering the full ebook formatting workflow: Kindle Format Fixer, EPUB Formatter, TOC Generator, Front Matter Generator, Back Matter Generator, CSS Snippet Generator, EPUB Validator, EPUB Validator Pro, Style Sheet Auditor, Metadata Builder, KDP Keyword Finder, and AI-powered Manuscript Cleanup. Two tools, EPUB Validator and Metadata Builder, are free with no signup required.
        </p>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          Frequently asked questions
        </h2>
        {faqs.map((f, i) => (
          <div key={i} style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 19, fontWeight: 600, marginBottom: 8 }}>{f.q}</h3>
            <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.85 }}>{f.a}</p>
          </div>
        ))}

        <div style={{ marginTop: 48, padding: '24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 16 }}>Try the free EPUB Validator — no signup needed.</p>
          <Link href="/free-tools" style={{ display: 'inline-block', padding: '12px 28px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 600, textDecoration: 'none' }}>
            Start Free →
          </Link>
        </div>
      </main>
    </>
  );
}