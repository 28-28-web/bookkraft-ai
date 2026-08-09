import Link from 'next/link';
import { TOOLS } from '@/lib/tools';
import { FREE_TOOLS } from '@/lib/constants';

const faqs = [
  {
    q: 'Does BookKraft AI replace Atticus?',
    a: 'No, and it isn\'t trying to. Atticus combines writing and formatting in one app. BookKraft AI is a pre-flight toolkit — it cleans up formatting artifacts, validates your EPUB, and builds metadata before your manuscript goes into Atticus for design.',
  },
  {
    q: 'When should I use BookKraft AI if I\'m using Atticus?',
    a: 'Before you import your manuscript into Atticus. Run it through BookKraft AI first to catch smart-quote issues, encoding artifacts left over from Word or Google Docs, and formatting errors, then bring the cleaned file into Atticus for layout and design.',
  },
  {
    q: 'Does BookKraft AI have AI-powered tools like manuscript cleanup?',
    a: 'Yes. BookKraft AI includes AI-powered Manuscript Cleanup, a Style Sheet Auditor, and a Print-to-Digital Adapter — any length, full novels included. Atticus does not currently offer AI-assisted editing tools.',
  },
  {
    q: 'Do I need to install Atticus or BookKraft AI?',
    a: `Atticus runs in the browser with limited offline functionality. BookKraft AI runs entirely in the browser with no install at all, and ${FREE_TOOLS.length} tools — EPUB Validator, Metadata Builder, Cover Checker, Word Cleanup Checker, and Full Manuscript Mode — are free with no signup required.`,
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
  { n: '01', title: 'Write', tool: 'Word, Scrivener, Google Docs', desc: 'Draft wherever you already write — BookKraft AI doesn’t touch this stage.' },
  { n: '02', title: 'Clean & Validate', tool: 'BookKraft AI', desc: 'Strip formatting artifacts, validate your EPUB, build metadata, catch errors before they cause a rejection.', highlight: true },
  { n: '03', title: 'Format & Design', tool: 'Atticus', desc: 'Import the clean file into Atticus for layout, theming, and print/ebook design.' },
];

export default function AtticusAlternativePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px', color: 'var(--ink, #1a1a1a)' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          Atticus Alternative for Indie Authors
        </h1>

        <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 32, opacity: 0.9 }}>
          Atticus is a genuinely good writing-and-formatting app — this isn't a "switch away from Atticus" page. BookKraft AI is a pre-flight toolkit that runs <em>before</em> Atticus: cleaning up formatting artifacts, validating your EPUB, and building metadata so the file you import into Atticus is already clean.
        </p>

        {/* 3-step flow */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 48 }}>
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

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          Why authors search for an Atticus alternative — and what they usually need instead
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          Atticus bundles writing and formatting into one app, which is exactly what some authors want. But authors who already have a writing workflow they like — Word, Google Docs, Scrivener — often aren't looking to replace their editor. What they actually need is a formatting and validation step at the end, before the manuscript goes anywhere near a publishing platform.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          That's the gap BookKraft AI fills. It doesn't compete with Atticus's design and layout tools — it runs earlier in the pipeline, so whatever you hand off to Atticus (or KDP directly) is already clean.
        </p>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          What BookKraft AI includes
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          {TOOLS.length} tools covering the full pre-flight workflow: Kindle Format Fixer, EPUB Formatter, TOC Generator, Front Matter Generator, Back Matter Generator, CSS Snippet Generator, EPUB Validator, EPUB Validator Pro, Style Sheet Auditor, Print-to-Digital Adapter, Metadata Builder, KDP Keyword Finder, AI-powered Manuscript Cleanup, Word Manuscript Cleanup Checker, Cover Checker, and Full Manuscript Mode. {FREE_TOOLS.length} tools are free with no signup required.
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

        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 48, opacity: 0.9 }}>
          Need a step-by-step walkthrough of the full EPUB formatting workflow before you import into Atticus? See the{' '}
          <Link href="/epub-formatting-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB formatting guide
          </Link>
          .
        </p>

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
