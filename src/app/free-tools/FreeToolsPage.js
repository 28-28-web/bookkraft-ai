'use client';
import Link from 'next/link';
import React from 'react';

// ─── THUMBNAIL ILLUSTRATIONS ─────────────────────────────────────────

function ValidatorThumb() {
  const rows = [
    ['mimetype', 'pass'], ['container.xml', 'pass'],
    ['OPF manifest', 'fail'], ['spine order', 'pass'], ['nav.xhtml', 'warn'],
  ];
  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {rows.map(([label, status]) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
            background: status === 'pass' ? 'var(--green)' : status === 'fail' ? 'var(--terracotta)' : 'var(--amber)',
          }} />
          <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--mid)', flex: 1 }}>{label}</span>
          <span style={{
            fontSize: 9, fontFamily: 'monospace', fontWeight: 700,
            color: status === 'pass' ? 'var(--green)' : status === 'fail' ? 'var(--terracotta)' : 'var(--amber)',
          }}>{status === 'pass' ? 'PASS' : status === 'fail' ? 'FAIL' : 'WARN'}</span>
        </div>
      ))}
    </div>
  );
}

function MetadataThumb() {
  return (
    <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 9 }}>
      {[['Title', '80%'], ['Author', '55%'], ['ISBN', '42%'], ['Keywords', '70%']].map(([field, w]) => (
        <div key={field}>
          <div style={{ fontSize: 9, color: 'var(--mid)', fontFamily: 'monospace', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{field}</div>
          <div style={{ height: 14, background: 'var(--border)', borderRadius: 3, width: w }} />
        </div>
      ))}
    </div>
  );
}

function WordCleanupThumb() {
  return (
    <div style={{ padding: '18px 24px' }}>
      <div style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--mid)', lineHeight: 1.8 }}>
        <span>She walked</span>
        <span style={{ background: '#FEF2F2', color: 'var(--terracotta)', padding: '1px 4px', borderRadius: 2, margin: '0 1px' }}>&nbsp;&nbsp;</span>
        <span>into the</span>
        <br />
        <span style={{ background: '#FEF2F2', color: 'var(--terracotta)', padding: '1px 3px', borderRadius: 2 }}>&quot;</span>
        <span>He said</span>
        <span style={{ background: '#FEF2F2', color: 'var(--terracotta)', padding: '1px 3px', borderRadius: 2 }}>&quot;</span>
        <br />
      </div>
      <div style={{ marginTop: 10, fontSize: 9, fontFamily: 'monospace', color: 'var(--amber)', fontWeight: 700 }}>⚠ 3 issues found</div>
    </div>
  );
}

function CoverCheckerThumb() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <div style={{ position: 'relative' }}>
        <div style={{
          width: 68, height: 96, borderRadius: 4,
          background: 'linear-gradient(135deg, #C9933A 0%, #8B6520 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '3px 3px 8px rgba(0,0,0,0.14)',
        }}>
          <div style={{ width: 48, height: 66, border: '1px solid rgba(255,255,255,0.28)', borderRadius: 2 }} />
        </div>
        <div style={{ position: 'absolute', top: -12, right: -50, fontSize: 9, fontFamily: 'monospace', color: 'var(--green)', whiteSpace: 'nowrap', fontWeight: 600 }}>2560px ✓</div>
        <div style={{ position: 'absolute', bottom: -12, left: -48, fontSize: 9, fontFamily: 'monospace', color: 'var(--green)', whiteSpace: 'nowrap', fontWeight: 600 }}>ratio 1.6:1 ✓</div>
      </div>
    </div>
  );
}

function ManuscriptThumb() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, height: '100%' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 42, height: 52, background: '#2563EB', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#fff', margin: '0 auto 6px', letterSpacing: '0.02em' }}>DOCX</div>
        <div style={{ fontSize: 9, color: 'var(--mid)', fontFamily: 'monospace' }}>input</div>
      </div>
      <div style={{ fontSize: 20, color: 'var(--border)', flexShrink: 0 }}>→</div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 42, height: 52, background: 'var(--gold)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#0d0a06', margin: '0 auto 6px', letterSpacing: '0.02em' }}>EPUB</div>
        <div style={{ fontSize: 9, color: 'var(--green)', fontFamily: 'monospace', fontWeight: 700 }}>valid 3.0</div>
      </div>
    </div>
  );
}

// ─── TOOL CARD DATA ──────────────────────────────────────────────────

const TOOL_CARDS = [
  {
    name: 'EPUB Validator',
    href: '/tools/epub-validator',
    desc: 'Upload any .epub and get a full structural audit in seconds. Checks mimetype, OPF, spine, navigation, image refs, and CSS — with exact fixes for each error.',
    fileType: '.epub',
    thumbAlt: 'EPUB validation pass/fail results for mimetype, OPF manifest, spine order, and navigation checks',
    Thumb: ValidatorThumb,
  },
  {
    name: 'Metadata Builder',
    href: '/tools/metadata-builder',
    desc: 'Fill in one form, get perfectly formatted metadata for every platform. KDP, IngramSpark, Draft2Digital, and EPUB OPF output — copy-paste ready.',
    fileType: 'form input',
    thumbAlt: 'Book metadata form with title, author, ISBN, and keyword input fields for multiple publishing platforms',
    Thumb: MetadataThumb,
  },
  {
    name: 'Word Cleanup Checker',
    href: '/tools/word-cleanup',
    desc: 'Scan your .docx for double spaces, straight quotes, stacked blank paragraphs, and stray bold/italic formatting before you publish.',
    fileType: '.docx',
    thumbAlt: 'Manuscript text with double spaces and straight quotes highlighted as formatting issues to fix',
    Thumb: WordCleanupThumb,
  },
  {
    name: 'Cover Checker',
    href: '/tools/cover-checker',
    desc: 'Upload your cover and instantly check it against Amazon KDP and Apple Books pixel, ratio, and format requirements before you upload anywhere.',
    fileType: '.jpg, .png',
    thumbAlt: 'Book cover image with KDP pixel dimensions and aspect ratio passing platform requirements',
    Thumb: CoverCheckerThumb,
  },
  {
    name: 'Full Manuscript Mode',
    href: '/tools/manuscript-mode',
    desc: 'Upload your .docx or .txt and get a valid EPUB 3.0 back in one step — bold, italic, underline preserved, chapter detection, smart quotes, and em dashes included.',
    fileType: '.docx, .txt',
    thumbAlt: 'DOCX manuscript file converting to a valid EPUB 3.0 file format in one step',
    Thumb: ManuscriptThumb,
  },
];

// ─── CARD COMPONENTS ─────────────────────────────────────────────────

function FreeToolCard({ tool }) {
  return (
    <Link href={tool.href} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="ft-tool-card" style={{
        background: '#fff', border: '1px solid var(--border)', borderRadius: 12,
        overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%',
      }}>
        {/* Thumbnail */}
        <div
          style={{ height: 150, background: 'var(--paper-dim)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}
          role="img"
          aria-label={tool.thumbAlt}
        >
          <tool.Thumb />
        </div>
        {/* Body */}
        <div style={{ padding: '16px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{tool.name}</span>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--green)', color: '#fff', padding: '2px 8px', borderRadius: 100, flexShrink: 0 }}>Free</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--mid)', lineHeight: 1.55, flex: 1, marginBottom: 14 }}>{tool.desc}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--mid)' }}>{tool.fileType}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>Open →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function CtaCard() {
  return (
    <div style={{
      background: 'var(--charcoal, #23262d)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12,
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ padding: '32px 24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'monospace', color: 'rgba(255,255,255,0.38)', marginBottom: 16 }}>Going further?</div>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 12, lineHeight: 1.25 }}>Want the full Readiness Score?</h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.52)', lineHeight: 1.6, marginBottom: 28 }}>
          11 AI-powered tools — including the full Readiness Score — catch what the free tools can&apos;t: style inconsistencies, keyword gaps, back-matter structure, and platform-specific formatting errors.
        </p>
        <Link href="/tools" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'var(--gold)', color: '#0d0a06', fontWeight: 700,
          fontSize: 14, padding: '11px 20px', borderRadius: 8, textDecoration: 'none', alignSelf: 'flex-start',
        }}>See Paid Tools →</Link>
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────

export default function FreeToolsPage() {
  return (
    <>
      <style>{`
        .ft-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) {
          .ft-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 580px) {
          .ft-grid { grid-template-columns: 1fr; }
        }
        .ft-tool-card { transition: box-shadow 0.15s; }
        .ft-tool-card:hover { box-shadow: var(--shadow-md); }
      `}</style>

      {/* Page header */}
      <section style={{ background: 'var(--ink)', padding: '80px 32px 60px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(247,243,236,0.45)', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 20 }}>/free-tools</div>
          <h1 style={{ fontSize: 'clamp(1.9rem,4vw,2.75rem)', fontWeight: 800, color: 'var(--cream)', lineHeight: 1.1, marginBottom: 16 }}>
            Five free tools. No signup, no card, no limits.
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(247,243,236,0.62)', maxWidth: 540, lineHeight: 1.6 }}>
            AI-powered tools — including the full Readiness Score — live on a{' '}
            <Link href="/tools" style={{ color: 'var(--gold)', fontWeight: 600 }}>separate page</Link>.
          </p>
        </div>
      </section>

      {/* 3-column card grid */}
      <section style={{ padding: '56px 32px 64px', background: 'var(--paper-dim)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div className="ft-grid">
            {TOOL_CARDS.map((tool) => (
              <FreeToolCard key={tool.href} tool={tool} />
            ))}
            <CtaCard />
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section style={{ padding: 'var(--space-20) 0 var(--space-16)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: 900, margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--mid)', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 12 }}>How BookKraft AI compares</div>
            <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>
              BookKraft vs. Calibre, Reedsy, and Kindle Create
            </h2>
          </div>
          <p style={{ color: 'var(--mid)', textAlign: 'center', marginBottom: 'var(--space-8)', maxWidth: 600, margin: '0 auto var(--space-8)' }}>
            Different tools for different workflows. See what each one actually covers.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)', fontVariantNumeric: 'tabular-nums' }}>
              <thead>
                <tr style={{ background: 'var(--ink)', color: 'var(--cream)' }}>
                  <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, minWidth: 160 }}>Feature</th>
                  <th style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 600 }}>BookKraft</th>
                  <th style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 600 }}>Calibre</th>
                  <th style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 600 }}>Reedsy</th>
                  <th style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 600 }}>Kindle Create</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'EPUB Validator', bk: '✓ free, no signup — with error descriptions', calibre: 'Basic "Check Book"; full validation needs plugin + Java', reedsy: '✗', kc: '✗' },
                  { feature: 'Metadata Builder', bk: '✓ free, no signup — KDP, EPUB OPF, IngramSpark', calibre: 'Manual editing only; no platform-specific templates', reedsy: 'Metadata within writing workflow', kc: 'KDP only' },
                  { feature: 'Cover Checker', bk: '✓ free, no signup — KDP + Apple Books', calibre: '✗', reedsy: '✗', kc: 'Basic Kindle preview' },
                  { feature: 'Word Cleanup Checker', bk: '✓ free, no signup', calibre: '✗', reedsy: '✗', kc: '✗' },
                  { feature: 'DOCX → EPUB', bk: '✓ free (account required)', calibre: '✓ free; 200MB desktop app; manual cleanup often needed', reedsy: '✓ write in Reedsy, then export (not a standalone converter)', kc: '✓ free; reflowable books only, with limitations' },
                  { feature: 'Runs in browser', bk: '✓', calibre: '✗ desktop app', reedsy: '✓', kc: '✗ desktop app' },
                  { feature: 'Works offline', bk: '✗', calibre: '✓ fully offline, no account', reedsy: '✗', kc: '✓' },
                  { feature: 'Large library management', bk: '✗', calibre: '✓', reedsy: '✗', kc: '✗' },
                  { feature: 'Integrated writing workflow', bk: '✗', calibre: '✗', reedsy: '✓ write + format + export in one place', kc: '✓ format + Kindle preview' },
                  { feature: 'Price', bk: 'Free (5 tools) + from $19 one-time', calibre: 'Free, open-source', reedsy: 'Free', kc: 'Free' },
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--cream)', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{row.feature}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center', color: 'var(--ink)' }}>{row.bk}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center', color: 'var(--mid)' }}>{row.calibre}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center', color: 'var(--mid)' }}>{row.reedsy}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center', color: 'var(--mid)' }}>{row.kc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-8)' }}>
            {[
              { label: 'When Calibre is the better choice', body: "Managing a large personal library, converting between many formats offline, or doing deep EPUB surgery with plugins. Calibre's desktop depth is hard to match." },
              { label: 'When Reedsy is the better choice', body: "Writing and formatting in one place. If you want to draft, style, and export without switching apps, Reedsy's integrated workflow is built for that." },
              { label: 'When Kindle Create is the better choice', body: "Publishing exclusively to Amazon. Kindle Create's live Kindle preview and KDP-optimized output are purpose-built for that platform." },
            ].map(({ label, body }) => (
              <div key={label} style={{ padding: 'var(--space-5)', background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-2)', color: 'var(--ink)' }}>{label}</p>
                <p style={{ color: 'var(--mid)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform compatibility */}
      <section style={{ padding: 'var(--space-12) 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontWeight: 700, fontSize: '16px', color: 'var(--ink)', marginBottom: 'var(--space-6)' }}>
            Your formatted eBook works on every platform
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-8)', flexWrap: 'wrap', padding: '0 var(--space-4)' }}>
            {['Amazon KDP', 'Apple Books', 'Barnes & Noble', 'Kobo', 'Draft2Digital', 'Smashwords', 'OverDrive', 'Tolino', 'Scribd'].map((p) => (
              <span key={p} style={{ color: 'var(--mid)', fontWeight: 600, fontSize: 'var(--text-base)' }}>{p}</span>
            ))}
          </div>
          <p style={{ textAlign: 'center', color: 'var(--mid)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-6)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>And more...</p>
        </div>
      </section>

      {/* SEO Content */}
      <section style={{ padding: 'var(--space-16) 0', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>

          <h2>Free Ebook Formatting Tools — No Signup, No Watermark</h2>
          <p>Five tools covering the core technical tasks before publishing an ebook. Four work without an account — open the page and run them immediately, no email address, no credit card. The fifth (DOCX to EPUB conversion) requires a free BookKraft account so the converted file has somewhere to go. None of them add a watermark, attribution text, or branding to your output files. Your EPUB is yours.</p>

          <h2>How These Tools Compare to Calibre, Reedsy, and Kindle Create</h2>
          <p><strong>Calibre</strong> is desktop software — powerful but requires installation, has a steep learning curve for new users, and its conversion output often needs manual cleanup before uploading to KDP. <strong>Reedsy Book Editor</strong> handles formatting from inside its editor and exports clean EPUB and PDF, but your manuscript lives in Reedsy&apos;s system. <strong>Kindle Create</strong> is Amazon&apos;s own desktop tool, optimized specifically for KDP but produces a Kindle-optimized file, not a standard EPUB for other stores.</p>
          <p>BookKraft&apos;s tools run in your browser, work with the files you already have, and output files you own with no strings attached. They handle specific technical tasks — validation, metadata, cover checks, cleanup, conversion — rather than being an all-in-one editor. Use them alongside whatever writing tool you already use.</p>

          <h2>Pre-Publication Ebook Checklist — 5 Steps, 5 Tools</h2>
          <ol>
            <li><strong>Clean your manuscript.</strong> Run the <a href="/tools/word-cleanup" style={{ color: 'var(--gold)' }}>Word Cleanup Checker</a> on your .docx file before anything else. It catches double spaces, straight quotes, stacked blank lines, and em-dash problems — the issues formatters charge extra to fix.</li>
            <li><strong>Convert to EPUB.</strong> Use <a href="/tools/manuscript-mode" style={{ color: 'var(--gold)' }}>Full Manuscript Mode</a> to convert your cleaned .docx to a valid EPUB 3.0. Bold, italic, chapter breaks, and smart quotes are preserved automatically.</li>
            <li><strong>Validate the EPUB.</strong> Upload the converted file to the <a href="/tools/epub-validator" style={{ color: 'var(--gold)' }}>EPUB Validator</a>. It checks mimetype, container, OPF, spine, manifest, images, fonts, and navigation — and shows specific fixes for any errors found.</li>
            <li><strong>Build your metadata.</strong> Use the <a href="/tools/metadata-builder" style={{ color: 'var(--gold)' }}>Metadata Builder</a> to generate formatted metadata for KDP, Apple Books, IngramSpark, and Draft2Digital in one pass. Download as a text file to paste into each platform&apos;s publisher portal.</li>
            <li><strong>Check your cover.</strong> Before uploading to any store, run your cover file through the <a href="/tools/cover-checker" style={{ color: 'var(--gold)' }}>Cover Checker</a>. It verifies dimensions, DPI, file size, aspect ratio, and format against the requirements for KDP, Apple Books, Kobo, and IngramSpark.</li>
          </ol>

          <h2>Word to EPUB — What the Converter Handles and What It Doesn&apos;t</h2>
          <p>The DOCX to EPUB converter handles the most common manuscript structures: chapter headings (H1/H2), body text paragraphs, bold and italic inline formatting, scene breaks, front matter, and back matter. It normalizes smart quotes, fixes double hyphens to em dashes, strips manual formatting overrides (manually bolded paragraphs instead of styled headings), and corrects encoding issues from copy-pasted text.</p>
          <p>It does not handle complex layouts: multi-column text, tables, footnotes as endnotes, or heavily styled print interiors. If your manuscript is a straightforward novel, narrative nonfiction, or practical nonfiction with no complex layout, the converter output will typically pass EPUB validation without additional editing.</p>

          <h2>Frequently Asked Questions</h2>

          <h3>Do these tools add a watermark to my files?</h3>
          <p>No. None of the five tools add watermarks, attribution text, or BookKraft branding to your output. The EPUB you get back from the converter is a clean EPUB 3.0 file with your content and nothing else. Same for metadata output, cover reports, and cleanup reports — they are purely your content.</p>

          <h3>Do I need to create an account?</h3>
          <p>Four tools need no account: EPUB Validator, Metadata Builder, Cover Checker, and Word Cleanup Checker. Full Manuscript Mode (DOCX to EPUB) requires a free BookKraft account. No credit card required for any free tool.</p>

          <h3>What ebook format does Amazon KDP require?</h3>
          <p>KDP accepts EPUB and DOCX. The recommended format is EPUB 3.0 — use the <a href="/tools/manuscript-mode" style={{ color: 'var(--gold)' }}>DOCX to EPUB converter</a> to generate it and the <a href="/tools/epub-validator" style={{ color: 'var(--gold)' }}>EPUB Validator</a> to check it before uploading.</p>

          <h3>Are these tools really free, or is there a catch?</h3>
          <p>No catch. The four no-account tools are free with no usage limit. Full Manuscript Mode is also free with a BookKraft account. No payment required to access any free tool.</p>

          <h3>Do I need Calibre or Sigil?</h3>
          <p>No. These tools run entirely in your browser. No desktop software to download or install. If your browser can open a webpage, the tools work — on Windows, Mac, or Linux.</p>

          <h3>How do these compare to a paid book formatting service?</h3>
          <p>A book formatting service charges $100–$400+ and takes several days. These tools are self-serve — the technical work is automated and you get results in seconds. The tradeoff: you are doing it yourself rather than handing it off. Use a formatting service if you need a heavily designed interior (print books, illustrated books, textbooks). Use these tools for standard ebook formatting.</p>

          <h3>Can I format a book for self-publishing for free?</h3>
          <p>Yes. All five tools are free. No subscription, no credit card. The EPUB Converter needs a free account; the other four need nothing at all.</p>

          <h2>Need More Tools?</h2>
          <p>The free tools cover core ebook formatting. For AI-powered manuscript cleanup, KDP keyword research, back matter generation, print-to-digital conversion, and more — explore the full <a href="/tools" style={{ color: 'var(--gold)' }}>BookKraft AI toolkit</a>. One-time purchase, no monthly fees.</p>
        </div>
      </section>
    </>
  );
}
