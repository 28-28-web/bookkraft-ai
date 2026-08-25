import Link from 'next/link';

const faqs = [
  {
    q: 'What is an ebook template?',
    a: "An ebook template is a pre-built file structure — usually a .docx or HTML file — meant to give your manuscript a starting point for formatting. Most templates available online are Word .docx files with predefined styles for headings, body text, and indentation. The problem: Word templates export to EPUB with the same structural issues as any other Word document. BookKraft AI's EPUB Formatter bypasses the template step entirely — you write in a normal Word document, upload it, and the formatter applies correct EPUB structure automatically.",
  },
  {
    q: 'Why do Word ebook templates produce bad EPUBs?',
    a: "Word ebook templates are formatted for how the document looks in Word, not for how EPUB retailers read structure. They don't include a nav document (required by EPUB 3.0 and Apple Books), they embed proprietary inline CSS that breaks on e-readers, and they often output EPUB 2.0 rather than the EPUB 3.0 that current retailers require. A template that looks correct in Word will still fail KDP and Apple Books validation.",
  },
  {
    q: 'Do I need a separate template for KDP and Apple Books?',
    a: "No. EPUB 3.0 is the standard format accepted by Amazon KDP, Apple Books, Kobo, and IngramSpark. BookKraft AI outputs EPUB 3.0 regardless of where you plan to publish. Platform-specific differences (cover image specs, metadata fields, content requirements) are caught by the free EPUB Validator — not by using different templates.",
  },
  {
    q: 'What about Vellum or Atticus book templates?',
    a: "Vellum's themes and Atticus's styles are visual design templates, not structural ebook templates. They handle drop caps, chapter ornaments, and font choices. BookKraft AI handles the structural layer — clean EPUB output, valid metadata, correct nav document — that sits underneath those design layers. The two aren't competing: BookKraft AI prepares a clean file that Vellum or Atticus can import.",
  },
  {
    q: 'Can I use a Google Docs template to make an ebook?',
    a: "Yes, with a conversion step. Format your Google Doc with Heading 1 for chapter titles, export as .docx (File → Download → Microsoft Word .docx), then upload to the EPUB Formatter. The formatter generates a valid EPUB 3.0 file. Google Docs has no built-in EPUB export — it would route through Word format anyway, so the conversion step is unavoidable.",
  },
  {
    q: 'What heading styles does the EPUB Formatter use to create chapters?',
    a: "Heading 1 in Word becomes a chapter break in the EPUB. Heading 2 becomes a sub-section. Body text and paragraph spacing come from Word's Normal style. If chapter titles are manually bolded body text rather than Heading 1, the formatter has no way to detect chapter boundaries — the EPUB will be one long unsectioned file with no table of contents entries.",
  },
];

const steps = [
  {
    n: '01',
    title: 'Write in Word with Heading Styles',
    desc: "Apply Heading 1 to every chapter title. Use Normal for body text. Don't add tab indents or decorative fonts — these don't survive conversion cleanly.",
    highlight: false,
  },
  {
    n: '02',
    title: 'Upload to EPUB Formatter',
    desc: 'Upload your .docx file. The formatter applies EPUB 3.0 structure — chapter breaks from Heading 1, nav document, clean CSS, correct package metadata.',
    highlight: true,
  },
  {
    n: '03',
    title: 'Download Valid EPUB',
    desc: 'Download a file that passes KDP, Apple Books, and Kobo validation. No template to configure, no styles to match — the structure is handled automatically.',
    highlight: false,
  },
];

const whyTemplatesFail = [
  {
    problem: 'Word templates output EPUB 2.0',
    detail: "Most downloadable ebook templates were built for older formatting tools. When exported through Word, they produce EPUB 2.0 files — the format Apple Books and Kobo reject in favor of EPUB 3.0.",
  },
  {
    problem: 'No nav document is generated',
    detail: 'EPUB 3.0 requires a nav.xhtml file — a clickable table of contents that links to each chapter. Word cannot generate this file. Apple Books rejects EPUBs that lack a conforming nav document.',
  },
  {
    problem: 'Inline CSS from Word styles breaks e-readers',
    detail: "Word embeds its paragraph formatting as inline style attributes on every HTML element. This produces bloated output that breaks on Kobo's rendering engine and causes layout inconsistencies on older Kindle models.",
  },
  {
    problem: 'Template styles conflict with EPUB CSS',
    detail: "Even when a template uses Word's built-in styles correctly, those styles get exported as Word-specific class names that don't map to EPUB semantics. The formatting that looks right in Word doesn't transfer.",
  },
];

const comparisonRows = [
  ['Output format', 'EPUB 2.0 (requires template setup)', 'EPUB 3.0 (generated automatically)'],
  ['Nav document', '— (not generated)', '✓ Auto-generated from Heading styles'],
  ['Chapter breaks', 'Manual page breaks', '✓ From Heading 1 style'],
  ['CSS', 'Inline Word styles', '✓ Clean external stylesheet'],
  ['KDP validation', 'Often fails', '✓ Passes epubcheck'],
  ['Apple Books', 'Frequently rejected', '✓ Passes strict validator'],
  ['Setup required', 'Yes — match template styles', 'None — upload and convert'],
];

export default function EbookTemplatePage() {
  return (
    <>
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px', color: 'var(--ink, #1a1a1a)' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          Ebook Template
        </h1>

        <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 32, opacity: 0.9 }}>
          Most downloadable ebook templates are Word .docx files — which means they share the same structural problem as any other Word document: they can&apos;t generate a valid EPUB 3.0 file on their own. Instead of starting from a template, BookKraft AI&apos;s EPUB Formatter converts your existing Word document into a valid EPUB 3.0 file that passes KDP, Apple Books, and Kobo validation automatically.
        </p>

        {/* 3-step flow */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 40 }}>
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
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{s.title}</h2>
              <p style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.85, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 48, textAlign: 'center' }}>
          <Link
            href="/tools/epub-formatter"
            style={{ display: 'inline-block', padding: '14px 32px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 17 }}
          >
            Convert Your Document to EPUB Free →
          </Link>
        </div>

        {/* Why templates fail */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          Why Word ebook templates don&apos;t produce valid EPUBs
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 24, opacity: 0.9 }}>
          An ebook template built in Word can only produce what Word produces — and Word&apos;s EPUB output has four structural problems that cause retailer rejections:
        </p>
        {whyTemplatesFail.map((item, i) => (
          <div key={i} style={{ marginBottom: 24, paddingLeft: 16, borderLeft: '3px solid rgba(201,168,76,0.4)' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{item.problem}</h3>
            <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.85, margin: 0 }}>{item.detail}</p>
          </div>
        ))}

        {/* Comparison */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 56, marginBottom: 16 }}>
          Word ebook template vs. BookKraft AI EPUB Formatter
        </h2>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
            <thead>
              <tr style={{ background: 'rgba(201,168,76,0.1)', borderBottom: '2px solid rgba(201,168,76,0.3)' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Feature</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Word Template</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>BookKraft AI</th>
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
          Converting from Word specifically? See the{' '}
          <Link href="/word-to-epub" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            Word to EPUB conversion guide
          </Link>
          . For the full EPUB formatting workflow including metadata and table of contents, see the{' '}
          <Link href="/epub-formatting-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB formatting guide
          </Link>
          . If you&apos;re starting from scratch, see{' '}
          <Link href="/how-to-make-epub-file" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            how to make an EPUB file
          </Link>
          .
        </p>

        {/* CTA */}
        <div style={{ marginTop: 48, padding: '28px 24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Format your ebook — free, no account needed.</p>
          <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 20 }}>Upload a .docx file. Download EPUB 3.0. Passes KDP, Apple Books, and Kobo validation.</p>
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
