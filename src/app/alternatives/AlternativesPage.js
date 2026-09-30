import Link from 'next/link';
import { TOOLS } from '@/lib/tools';
import { FREE_TOOLS } from '@/lib/constants';
import { VS_ALTERNATIVES } from '@/lib/vsAlternatives';

const faqs = [
  {
    q: 'Do I need to install anything to use BookKraft AI?',
    a: `No. BookKraft AI runs entirely in your browser. There is nothing to download or install, and ${FREE_TOOLS.length} tools — EPUB Validator, Metadata Builder, Cover Checker, Word Manuscript Cleanup Checker, and Full Manuscript Mode — are free with no signup required.`,
  },
  {
    q: 'I publish directly to KDP without a formatter. Is BookKraft AI useful?',
    a: "Yes — especially the Word Cleanup Checker, EPUB Validator, Metadata Builder, and KDP Keyword Finder. KDP's internal converter handles a lot, but it doesn't tell you what it silently changed or what it rejected outright. Running your file through validation first removes that guesswork.",
  },
];

const steps = [
  {
    n: '01',
    title: 'Write',
    tool: 'Word, Scrivener, Google Docs',
    desc: "Wherever you already draft — BookKraft AI doesn't touch this stage.",
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
  { name: 'Vellum', href: '/vellum-alternative' },
  { name: 'Atticus', href: '/atticus-alternative' },
  { name: 'Calibre', href: '/calibre-alternative' },
  ...VS_ALTERNATIVES.map((a) => ({ name: a.tool, href: `/alternatives/${a.slug}` })),
];

export default function AlternativesPage() {
  return (
    <>
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px', color: 'var(--ink, #1a1a1a)' }}>
        <h1 style={{ fontFamily: "var(--font-playfair),serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          Alternatives to Popular Book Formatting Tools
        </h1>

        <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 48, opacity: 0.9 }}>
          BookKraft AI isn't trying to replace your formatter. It's the pre-flight step that runs before it: cleaning up formatting artifacts, validating your EPUB, and building metadata so the file you hand off is already clean. Pick the tool you use to see how the two fit together.
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

        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
          Compare BookKraft AI with your tool
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, marginBottom: 48 }}>
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              style={{
                display: 'block',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: 12,
                padding: '20px 24px',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>BookKraft AI vs {c.name}</h3>
              <span style={{ color: '#c9a84c', fontWeight: 600, fontSize: 15 }}>See comparison →</span>
            </Link>
          ))}
        </div>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          What BookKraft AI includes
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          {TOOLS.length} tools covering the full pre-flight workflow: <Link href="/tools/kindle-format-fixer" style={{ color: '#9c7f35', textDecoration: 'none' }}>Kindle Format Fixer</Link>, EPUB Formatter, TOC Generator, Front Matter Generator, Back Matter Generator, CSS Snippet Generator, EPUB Validator, EPUB Validator Pro, Style Sheet Auditor, Print-to-Digital Adapter, Metadata Builder, <Link href="/tools/kdp-keyword-finder" style={{ color: '#9c7f35', textDecoration: 'none' }}>KDP Keyword Finder</Link>, AI-powered Manuscript Cleanup, Word Manuscript Cleanup Checker, Cover Checker, and Full Manuscript Mode. {FREE_TOOLS.length} tools — EPUB Validator, Metadata Builder, Cover Checker, Word Manuscript Cleanup Checker, and Full Manuscript Mode — are free with no signup required.
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
