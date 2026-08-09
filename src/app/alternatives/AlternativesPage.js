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
  {
    q: 'Does BookKraft AI work with Atticus?',
    a: 'Yes. After you export an EPUB from Atticus, run it through the free EPUB Validator to check structure, metadata, and cover dimensions before uploading. Atticus generates valid EPUBs in most cases, but validation catches edge cases that cause KDP or Apple Books rejections.',
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

        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
          How BookKraft AI fits into your workflow
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          It depends on which tool you're publishing with. Here's how the pre-flight step works with each one.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>If you're using Vellum</strong> — Vellum is Mac-only and handles design. BookKraft AI runs on any platform and handles what comes before design: manuscript cleanup, metadata, EPUB validation. Run BookKraft AI first, then bring the clean file into Vellum on a Mac.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>If you're using Atticus</strong> — Atticus formats and exports on Windows and Mac. But it doesn't validate the EPUB output or build KDP-ready metadata. BookKraft AI does both. Use Atticus for writing and formatting, then run the exported file through the validator before uploading.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 32, opacity: 0.9 }}>
          <strong>If you're uploading directly to KDP</strong> — KDP accepts Word documents and EPUBs, converts them internally, and sometimes silently fixes errors and sometimes rejects the file. Running cleanup and validation before upload means you know what you're sending and why it should pass.
        </p>

        <div style={{ overflowX: 'auto', marginBottom: 56 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.1)' }}>
                <th style={{ textAlign: 'left', padding: '12px 8px' }}></th>
                <th style={{ textAlign: 'left', padding: '12px 8px', opacity: 0.7 }}>Vellum</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', opacity: 0.7 }}>Atticus</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#c9a84c' }}>BookKraft AI</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Platform', 'Mac only', 'Windows + Mac', 'Any browser'],
                ['Price', '$249.99 ebook / $499.99 with print', '$147 one-time', `$19 one-time, or free for ${FREE_TOOLS.length} tools`],
                ['Formatting & design', '✓', '✓', '—'],
                ['Print PDF output', '✓', '✓', '—'],
                ['EPUB Validator', '—', '—', '✓ Free'],
                ['KDP Metadata builder', '—', '—', '✓ Free'],
                ['Manuscript cleanup', '—', 'Basic', '✓'],
                [<Link key="kdp" href="/tools/kdp-keyword-finder" style={{ color: 'inherit', textDecoration: 'none' }}>KDP keyword finder</Link>, '—', '—', '✓'],
                ['No install needed', '—', '—', '✓'],
              ].map(([label, vellum, atticus, bk], i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                  <td style={{ padding: '12px 8px', fontWeight: 600, opacity: 0.85 }}>{label}</td>
                  <td style={{ padding: '12px 8px', opacity: 0.7 }}>{vellum}</td>
                  <td style={{ padding: '12px 8px', opacity: 0.7 }}>{atticus}</td>
                  <td style={{ padding: '12px 8px' }}>{bk}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ fontSize: 13, opacity: 0.6, marginTop: 10 }}>
            BookKraft AI handles pre-flight — not design. The two aren't in competition.
          </p>
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
