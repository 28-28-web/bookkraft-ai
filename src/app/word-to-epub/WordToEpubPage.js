import Link from 'next/link';

const faqs = [
  {
    q: 'Can I convert a Word document to EPUB for free?',
    a: "Yes. BookKraft AI's EPUB Formatter is free with no account required. Upload your .docx file, and it outputs a valid EPUB 3.0 file that passes KDP, Apple Books, and Kobo validation.",
  },
  {
    q: 'Why does Word\'s built-in "Save as EPUB" produce broken files?',
    a: "Word's EPUB export was designed for Microsoft's own ecosystem, not for ebook retailers. It generates EPUB 2.0 files with proprietary Word styling embedded as inline CSS, no proper nav document, and missing package metadata — all of which KDP and Apple Books flag as validation errors. A dedicated converter strips those artifacts and outputs EPUB 3.0 with clean structure.",
  },
  {
    q: 'What Word formatting survives the EPUB conversion?',
    a: 'Heading styles (Heading 1–6 → chapter titles and section breaks), paragraph text, bold, italic, underline, and blockquotes. Decorative fonts, custom page layouts, columns, headers/footers, and tables of contents are either converted to their EPUB equivalent or stripped — EPUB reflowable layout doesn\'t support fixed page design.',
  },
  {
    q: 'Do I need to clean up my Word file before converting?',
    a: 'It helps. Common Word artifacts — double spaces, straight quotes, broken em dashes, multiple blank paragraphs, and manually added tab indents — all appear as formatting errors in the converted EPUB. The free Manuscript Cleanup Checker flags these before conversion so you can fix them in Word first.',
  },
  {
    q: 'Will the converted EPUB pass KDP validation?',
    a: "BookKraft AI outputs EPUB 3.0 files that pass KDP's built-in EPUB validator and epubcheck. That said, KDP has additional content rules (image resolution, cover aspect ratio, font embedding) that are content-specific — the EPUB Validator in the free tools checks for those too.",
  },
  {
    q: 'Can I convert a .doc file (not .docx) to EPUB?',
    a: 'The converter accepts .docx files. If your file is in the older .doc format, save it as .docx first in Word (File → Save As → Word Document .docx) before uploading. The conversion then works identically.',
  },
];

const steps = [
  { n: '01', title: 'Write in Word', tool: 'Microsoft Word / Google Docs', desc: 'Draft using standard Heading styles (Heading 1 for chapter titles). Avoid manual formatting like tab indents or decorative fonts — these don\'t survive conversion cleanly.' },
  { n: '02', title: 'Convert to EPUB', tool: 'BookKraft AI', desc: 'Upload your .docx file. The EPUB Formatter maps Word styles to EPUB 3.0 structure, strips proprietary formatting, and outputs a clean file that passes retailer validation.', highlight: true },
  { n: '03', title: 'Upload to Retailers', tool: 'KDP / Apple Books / Kobo', desc: 'Submit the EPUB file directly to KDP, Apple Books, Kobo, or IngramSpark. No further conversion needed — the output is in the format each platform expects.' },
];

const comparisonRows = [
  ['Output format', 'EPUB 2.0 (outdated)', 'EPUB 3.0 (current standard)'],
  ['Nav document', '— (missing)', '✓ Required by Apple Books'],
  ['Package metadata', 'Incomplete', '✓ Full OPF metadata'],
  ['Inline CSS', 'Word-specific styles embedded', '✓ Clean semantic CSS'],
  ['KDP validation', 'Often fails', '✓ Passes epubcheck'],
  ['Apple Books validation', 'Frequently rejected', '✓ Passes strict validator'],
  ['File size', 'Large (Word assets included)', 'Optimised'],
];

const problems = [
  {
    problem: 'Smart quotes become question marks or boxes',
    cause: 'Word uses Unicode curly quotes; EPUB files need explicit UTF-8 encoding declared in the OPF package document.',
    fix: 'The EPUB Formatter declares UTF-8 encoding throughout. Run the free Manuscript Cleanup Checker first to catch any straight-quote artifacts left over from copy-paste.',
    href: '/tools/manuscript-cleanup',
    linkLabel: 'Manuscript Cleanup Checker',
  },
  {
    problem: 'Chapter breaks are missing or in the wrong place',
    cause: "Word's chapter breaks rely on page breaks, which have no EPUB equivalent. EPUB chapters are defined by Heading 1 styles in the source document.",
    fix: 'Before converting, make sure every chapter title uses the Heading 1 style in Word — not bold text at the same size as body copy, which looks identical on screen but produces no structural chapter break in EPUB.',
    href: null,
    linkLabel: null,
  },
  {
    problem: 'Table of contents is missing or links to nothing',
    cause: "Word's TOC field is dynamic — it doesn't export as a static clickable list. EPUB requires a separate nav document with anchor links to each chapter.",
    fix: 'The EPUB Formatter generates a proper nav document from your Heading styles automatically. For further control over TOC formatting, use the TOC Generator tool.',
    href: '/tools/toc-generator',
    linkLabel: 'TOC Generator',
  },
  {
    problem: 'Cover image is missing from the converted file',
    cause: 'Word cover images are inserted as inline images; EPUB requires the cover to be declared separately in the package manifest as a cover-image item.',
    fix: 'Upload your cover separately in the EPUB Formatter. Cover images must be JPEG or PNG, minimum 1600px on the short edge, and declared explicitly — not embedded as a document image.',
    href: null,
    linkLabel: null,
  },
];

export default function WordToEpubPage() {
  return (
    <>
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px', color: 'var(--ink, #1a1a1a)' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          How to Convert a Word Document to EPUB
        </h1>

        <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 32, opacity: 0.9 }}>
          Word&apos;s built-in &ldquo;Save as EPUB&rdquo; option exists, but it produces EPUB 2.0 files with broken structure that KDP, Apple Books, and Kobo routinely reject. A dedicated Word-to-EPUB converter strips the proprietary Word formatting and outputs a valid EPUB 3.0 file — the format all major retailers actually require.
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

        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <Link
            href="/tools/epub-formatter"
            style={{ display: 'inline-block', padding: '14px 32px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 17 }}
          >
            Convert Word to EPUB Free →
          </Link>
        </div>

        {/* Why Word's native export fails */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          Why saving Word as EPUB doesn&apos;t work
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          Microsoft Word can export .epub files directly (File → Export → Create PDF/XPS → change format to .epub in some versions), but the result almost always fails retailer validation for three reasons:
        </p>
        <ul style={{ fontSize: 17, lineHeight: 1.9, opacity: 0.9, paddingLeft: 24, marginBottom: 24 }}>
          <li><strong>It outputs EPUB 2.0, not EPUB 3.0.</strong> Apple Books and Kobo require EPUB 3.0. KDP accepts EPUB 2.0 but converts it internally, introducing additional errors in the process.</li>
          <li><strong>Word styles become inline CSS.</strong> Word&apos;s paragraph formatting, font references, and spacing values are embedded as inline style attributes on every element — not as a clean external stylesheet. This produces bloated, fragile files that break on some e-readers.</li>
          <li><strong>The nav document is missing or malformed.</strong> EPUB 3.0 requires a nav.xhtml file with a clickable table of contents. Word&apos;s exporter either omits it or produces a non-conforming version that fails epubcheck.</li>
        </ul>

        {/* Comparison table */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          Word&apos;s built-in EPUB export vs. BookKraft AI
        </h2>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
            <thead>
              <tr style={{ background: 'rgba(201,168,76,0.1)', borderBottom: '2px solid rgba(201,168,76,0.3)' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Feature</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Word Save as EPUB</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>BookKraft AI Converter</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map(([feat, word, bk], i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(201,168,76,0.15)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                  <td style={{ padding: '10px 16px', fontWeight: 600 }}>{feat}</td>
                  <td style={{ padding: '10px 16px', opacity: 0.8 }}>{word}</td>
                  <td style={{ padding: '10px 16px', opacity: 0.8 }}>{bk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Step-by-step */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 8 }}>
          How to convert a Word document to EPUB: step by step
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 24, opacity: 0.9 }}>
          Before converting, prepare your Word file. The conversion quality depends almost entirely on how consistently the source document is structured.
        </p>

        {[
          {
            n: 1,
            title: 'Use Heading styles for chapter titles',
            body: 'In Word, apply the Heading 1 style to every chapter title (Chapter One, Prologue, Author\'s Note, etc.). Heading 2 for sub-sections. Do not use manually bolded large text — it looks the same on screen but creates no chapter structure in the converted EPUB.',
          },
          {
            n: 2,
            title: 'Remove manual formatting',
            body: 'Replace tab indents with paragraph-style first-line indents (Format → Paragraph → Indentation → First line). Delete multiple blank paragraphs used for spacing. These become empty elements in the EPUB and make the file fail validation.',
          },
          {
            n: 3,
            title: 'Run the Manuscript Cleanup Checker',
            href: '/tools/manuscript-cleanup',
            body: 'The free checker flags double spaces, straight quotes, broken em dashes, and other artifacts that produce visible errors after conversion. Fix them in Word before uploading.',
          },
          {
            n: 4,
            title: 'Upload to the EPUB Formatter',
            href: '/tools/epub-formatter',
            body: 'Upload your .docx file. The formatter converts the document to EPUB 3.0, maps Heading styles to chapter breaks, generates a nav document, and outputs a file that passes epubcheck.',
          },
          {
            n: 5,
            title: 'Validate the output',
            href: '/tools/epub-validator',
            body: 'Run the converted EPUB through the free EPUB Validator. It checks for the specific errors KDP, Apple Books, and Kobo flag at submission — better to catch them here than in a rejection email.',
          },
        ].map((step) => (
          <div key={step.n} style={{ marginBottom: 24, paddingLeft: 16, borderLeft: '3px solid rgba(201,168,76,0.4)' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
              {step.n}.{' '}
              {step.href
                ? <Link href={step.href} style={{ color: '#9c7f35', textDecoration: 'none' }}>{step.title} →</Link>
                : step.title}
            </h3>
            <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.85, margin: 0 }}>{step.body}</p>
          </div>
        ))}

        {/* Common problems */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 56, marginBottom: 8 }}>
          Common Word-to-EPUB conversion problems
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 28, opacity: 0.9 }}>
          These are the errors that appear most often after conversion — and what causes them.
        </p>
        {problems.map((p, i) => (
          <div key={i} style={{ marginBottom: 32, padding: '20px 24px', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 10 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: 'var(--ink, #1a1a1a)' }}>{p.problem}</h3>
            <p style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.85, marginBottom: 8 }}><strong>Cause:</strong> {p.cause}</p>
            <p style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.85, margin: 0 }}>
              <strong>Fix:</strong> {p.fix}{' '}
              {p.href && (
                <Link href={p.href} style={{ color: '#9c7f35', textDecoration: 'none' }}>
                  {p.linkLabel} →
                </Link>
              )}
            </p>
          </div>
        ))}

        {/* FAQ */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 56, marginBottom: 16 }}>
          Frequently asked questions
        </h2>
        {faqs.map((f, i) => (
          <div key={i} style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 19, fontWeight: 600, marginBottom: 8 }}>{f.q}</h3>
            <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.85 }}>{f.a}</p>
          </div>
        ))}

        {/* Cross-links */}
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9, marginTop: 32 }}>
          Looking for a general guide to EPUB formatting? See the{' '}
          <Link href="/epub-formatting-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB formatting guide
          </Link>
          . For a broader overview of how to make an EPUB file from any source format, see{' '}
          <Link href="/how-to-make-epub-file" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            how to make an EPUB file
          </Link>
          . Common EPUB validation errors are listed in the{' '}
          <Link href="/epub-errors" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB error reference
          </Link>
          .
        </p>

        {/* CTA */}
        <div style={{ marginTop: 48, padding: '28px 24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Convert your Word document to EPUB — free, no account needed.</p>
          <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 20 }}>EPUB 3.0 output. Passes KDP, Apple Books, and Kobo validation.</p>
          <Link
            href="/tools/epub-formatter"
            style={{ display: 'inline-block', padding: '13px 30px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}
          >
            Open EPUB Formatter →
          </Link>
        </div>
      </main>
    </>
  );
}
