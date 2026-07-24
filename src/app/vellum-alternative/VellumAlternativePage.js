import Link from 'next/link';
import { TOOLS } from '@/lib/tools';
import { FREE_TOOLS } from '@/lib/constants';

const faqs = [
  {
    q: 'Does BookKraft AI replace Vellum?',
    a: 'No, and it isn\'t trying to. Vellum is a full visual design tool for ebook and print formatting. BookKraft AI is a pre-flight toolkit that runs before Vellum — cleaning up your manuscript, validating your EPUB, and building metadata so the file you import into Vellum is already clean. And unlike Vellum, it works on Windows, Linux, and Chromebook, not just Mac.',
  },
  {
    q: 'When should I use BookKraft AI if I\'m using Vellum?',
    a: 'Before you import into Vellum. Run your draft through BookKraft AI to catch formatting errors, smart-quote issues, and encoding artifacts left over from Word or Google Docs, validate the exported EPUB, and build your metadata — then bring the clean file into Vellum for design.',
  },
  {
    q: 'Does BookKraft AI produce the same output quality as Vellum?',
    a: 'They do different jobs. BookKraft AI generates valid EPUB 3.0 files and Kindle-ready formatting that pass KDP, Apple Books, and Kobo validation — discrete tools (formatter, validator, TOC generator) rather than one all-in-one visual editor. Vellum handles the visual theme-based design layer that BookKraft AI doesn\'t attempt.',
  },
  {
    q: 'Can I format a print book with BookKraft AI?',
    a: 'BookKraft AI focuses on ebook formatting and pre-flight checks (EPUB, Kindle/KFX, MOBI). It does not generate print-ready PDFs — that\'s Vellum\'s job, and one more reason the two work well together rather than as competitors.',
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
  { n: '03', title: 'Format & Design', tool: 'Vellum', desc: 'Import the clean file into Vellum for visual theming and print/ebook design.' },
];

export default function VellumAlternativePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px', color: 'var(--ink, #1a1a1a)' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          Vellum Alternative for Windows
        </h1>

        <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 32, opacity: 0.9 }}>
          Vellum is Mac-only, which is the real reason most Windows authors land here — not because it isn't good software. BookKraft AI isn't a Vellum replacement; it's a pre-flight toolkit that runs on any platform and handles the cleanup, validation, and metadata work <em>before</em> your manuscript goes into Vellum (on a Mac) or straight to KDP.
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
          Why Windows authors search for a Vellum alternative
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          Vellum has been Mac-only since launch. Windows authors are usually pointed toward renting a Mac in the cloud or running macOS in a virtual machine, both of which add cost and complexity Mac users never deal with just to reach Vellum's design step.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          BookKraft AI doesn't solve that platform problem by replacing Vellum's design tools — it solves a different, earlier problem: getting your manuscript clean, validated, and metadata-complete on any platform, before design even starts. If you do have Mac access for Vellum, running BookKraft AI first still saves you a cleanup pass; if you don't, BookKraft AI plus KDP's own tools gets a properly formatted book published without ever needing a Mac.
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
