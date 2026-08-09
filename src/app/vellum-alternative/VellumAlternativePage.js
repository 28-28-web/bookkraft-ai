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
  {
    q: 'Can BookKraft AI export the same visual themes as Vellum?',
    a: "No. Vellum's visual themes — fonts, chapter headers, drop caps, and page layout — are the core of what it does. BookKraft AI generates structurally valid EPUB files with clean formatting, but it doesn't offer Vellum-style visual design templates. If visual theme variety matters to you, Vellum with Mac access is still the right tool for that layer.",
  },
  {
    q: "What's the cheapest way to use Vellum if I'm on Windows?",
    a: 'The most common options are MacinCloud (Mac rental by the hour or month) or asking a Mac-owning friend to run Vellum once you hand them the formatted file. BookKraft AI handles everything up to the design step on any platform, so the Mac time you\'d need in Vellum is shorter — you\'d be importing a clean, validated file rather than doing cleanup inside Vellum itself.',
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
          Why Vellum doesn&apos;t work on Windows
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          Vellum is built using macOS-only frameworks — Apple&apos;s AppKit and native Mac APIs that have no Windows equivalent. It isn&apos;t a licensing decision. The software literally cannot run outside of macOS. Wine, emulators, and cloud Mac services like MacinCloud can technically host it, but each adds cost, lag, and setup overhead that Mac users never deal with.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 32, opacity: 0.9 }}>
          So most Windows authors either skip Vellum entirely or borrow Mac access just for the formatting step. BookKraft AI doesn&apos;t change that — but it handles the steps that happen before formatting, which means less time needed in Vellum when you get there.
        </p>

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
          Step-by-step: preparing your manuscript before Vellum
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 20, opacity: 0.9 }}>
          Whether you&apos;re using Vellum on a Mac or going straight to KDP from Windows, these steps are the same. Do them before your manuscript goes anywhere near a formatter.
        </p>
        {[
          {
            n: 1,
            title: 'Run the Word Manuscript Cleanup Checker',
            href: '/tools/word-cleanup',
            body: 'Upload your .docx file. It flags double spaces, straight quotes, broken em dashes, and encoding artifacts that become visible errors after conversion. Fix them in Word using find-and-replace, then re-save.',
          },
          {
            n: 2,
            title: 'Check style consistency',
            href: '/tools/style-sheet-auditor',
            body: "Before formatting, scan your draft for character name inconsistencies, capitalisation drift, and dialogue punctuation errors. These don't show up in Word's spell checker but become visible to readers — catch them before your manuscript goes into Vellum.",
          },
          {
            n: 3,
            title: 'Generate your Table of Contents',
            href: '/tools/toc-generator',
            body: "KDP requires a clickable, properly structured TOC. Vellum generates one automatically during design, but if you're going straight to KDP or another platform, you'll need one before upload. The TOC Generator builds it in the right format.",
          },
          {
            n: 4,
            title: 'Add front and back matter',
            href: '/tools/front-matter-generator',
            body: 'Title page, copyright page, and author bio at minimum. These need to exist before you import into Vellum so the design step includes them. The Front Matter and Back Matter generators produce ready-to-use text.',
          },
          {
            n: 5,
            title: 'Validate your EPUB',
            href: '/tools/epub-validator',
            body: "If you're exporting from Vellum and uploading to Apple Books or Kobo, run the EPUB Validator on the output before submitting. Vellum's exports are generally clean, but Apple Books has strict validation that catches edge cases Vellum doesn't test for.",
          },
          {
            n: 6,
            title: 'Build your metadata',
            href: '/tools/metadata-builder',
            body: 'Title, author, description, BISAC categories, and language need to match across KDP, your EPUB file, and any other platform you\'re submitting to. The Metadata Builder outputs all of it in the formats each platform expects.',
          },
        ].map((step) => (
          <div key={step.n} style={{ marginBottom: 24, paddingLeft: 16, borderLeft: '3px solid rgba(201,168,76,0.4)' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
              {step.n}. <Link href={step.href} style={{ color: '#9c7f35', textDecoration: 'none' }}>{step.title} →</Link>
            </h3>
            <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.85, margin: 0 }}>{step.body}</p>
          </div>
        ))}

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          What BookKraft AI includes
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          {TOOLS.length} tools covering the full pre-flight workflow: <Link href="/tools/kindle-format-fixer" style={{ color: '#9c7f35', textDecoration: 'none' }}>Kindle Format Fixer</Link>, EPUB Formatter, TOC Generator, Front Matter Generator, Back Matter Generator, CSS Snippet Generator, EPUB Validator, EPUB Validator Pro, Style Sheet Auditor, Print-to-Digital Adapter, Metadata Builder, KDP Keyword Finder, AI-powered Manuscript Cleanup, Word Manuscript Cleanup Checker, Cover Checker, and Full Manuscript Mode. {FREE_TOOLS.length} tools are free with no signup required.
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
          Need a step-by-step walkthrough of the full EPUB formatting workflow before your manuscript goes into Vellum? See the{' '}
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
