import Link from 'next/link';
import { TOOLS } from '@/lib/tools';
import { FREE_TOOLS } from '@/lib/constants';

const faqs = [
  {
    q: 'Does BookKraft AI replace Vellum or Atticus?',
    a: 'No, and it is not trying to. Vellum and Atticus are full writing and design environments. BookKraft AI is a pre-flight toolkit that runs before you get to that stage — cleaning up your manuscript, validating your EPUB, and building metadata so whatever formatter you use next has a clean file to work with.',
  },
  {
    q: 'When do I use BookKraft AI if I already use Vellum or Atticus?',
    a: 'Before you import into either one. Run your draft through BookKraft AI to catch formatting errors, smart-quote issues, and encoding artifacts left over from Word or Google Docs, validate the exported EPUB, and build your metadata — then hand a clean file to Vellum or Atticus for design.',
  },
  {
    q: 'What is the best Calibre alternative for KDP authors?',
    a: 'BookKraft AI focuses specifically on the formatting and validation steps indie authors need before publishing to KDP, Apple Books, or Kobo. It runs in the browser with no install, unlike Calibre which requires a desktop download and is built for library management rather than KDP-specific formatting.',
  },
  {
    q: 'Do I need to install anything to use BookKraft AI?',
    a: `No. BookKraft AI runs entirely in your browser. There is nothing to download or install, and ${FREE_TOOLS.length} tools — EPUB Validator, Metadata Builder, Cover Checker, Word Manuscript Cleanup Checker, and Full Manuscript Mode — are free with no signup required.`,
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

const steps = [
  {
    n: '01',
    title: 'Write',
    tool: 'Word, Scrivener, Google Docs',
    desc: 'Wherever you already draft — BookKraft AI doesn’t touch this stage.',
  },
  {
    n: '02',
    title: 'Clean & Validate',
    tool: 'BookKraft AI',
    desc: 'Strip formatting artifacts, validate your EPUB, build metadata, catch errors before they cause a rejection.',
    highlight: true,
  },
  {
    n: '03',
    title: 'Format & Design',
    tool: 'Vellum, Atticus, or KDP directly',
    desc: 'Hand off a clean, validated file to whichever formatter you already use.',
  },
];

const cards = [
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
          BookKraft AI Runs Before Your Formatter
        </h1>

        <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 48, opacity: 0.9 }}>
          Vellum and Atticus are full writing and design environments — BookKraft AI isn't trying to be either. It's the pre-flight step that happens before your manuscript reaches them: cleaning up formatting artifacts, validating your EPUB, and building metadata so the file you hand off is already clean.
        </p>

        {/* 3-step flow */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 56 }}>
          {steps.map((s) => (
            <div
              key={s.n}
              style={{
                border: s.highlight ? '2px solid #c9a84c' : '1px solid rgba(201,168,76,0.25)',
                borderRadius: 12,
                padding: '28px 24px',
                background: s.highlight ? 'rgba(201,168,76,0.06)' : 'transparent',
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', color: '#c9a84c', marginBottom: 10 }}>
                STEP {s.n}
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{s.title}</h2>
              <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.6, marginBottom: 12 }}>{s.tool}</p>
              <p style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.85, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {cards.length > 0 && (
          <>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
              Compared to other tools
            </h2>
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
                      <h3 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>
                        BookKraft AI vs {c.name}
                      </h3>
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
          </>
        )}

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          What BookKraft AI includes
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          {TOOLS.length} tools covering the full pre-flight workflow: Kindle Format Fixer, EPUB Formatter, TOC Generator, Front Matter Generator, Back Matter Generator, CSS Snippet Generator, EPUB Validator, EPUB Validator Pro, Style Sheet Auditor, Print-to-Digital Adapter, Metadata Builder, KDP Keyword Finder, AI-powered Manuscript Cleanup, Word Manuscript Cleanup Checker, Cover Checker, and Full Manuscript Mode. {FREE_TOOLS.length} tools — EPUB Validator, Metadata Builder, Cover Checker, Word Manuscript Cleanup Checker, and Full Manuscript Mode — are free with no signup required.
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
