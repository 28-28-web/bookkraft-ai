import Link from 'next/link';

const faqs = [
  {
    q: 'What is the best book formatting software?',
    a: "Depends on your platform and what you're formatting. Vellum produces the best-looking ebooks and print files but is Mac-only and costs $249.99. Atticus works on any browser, handles both ebook and print, and costs $147. Reedsy Book Editor is free but browser-only with limited export options. BookKraft AI is free for pre-flight work — manuscript cleanup, EPUB validation, metadata, and conversion — and runs on any platform. Most authors use two tools: one for formatting design (Vellum or Atticus) and one for validation and pre-flight (BookKraft AI).",
  },
  {
    q: 'Is Vellum worth it for Windows users?',
    a: "Only if you're willing to use a Mac, MacinCloud, or run macOS in a virtual machine — Vellum is Mac-only and always has been. Windows authors typically use Atticus (cross-platform, similar feature set) or format in Word and validate with BookKraft AI. Vellum's output quality is excellent; the platform restriction is real.",
  },
  {
    q: "What's the difference between a book builder and book formatting software?",
    a: 'The terms are used interchangeably. A book builder is a tool that assembles a manuscript into a finished ebook or print file — structuring chapters, generating a table of contents, and outputting the correct file format. Book formatting software does the same thing, often with more emphasis on visual design options like fonts and chapter headers.',
  },
  {
    q: 'Can I format an ebook for free?',
    a: "Yes. Reedsy Book Editor is free and exports EPUB. BookKraft AI's EPUB Formatter converts Word .docx files to EPUB 3.0 for free with no account required. Both produce valid EPUB files. Neither offers the visual design themes that Vellum and Atticus provide — free tools prioritize structural correctness over visual customization.",
  },
  {
    q: 'Does Calibre produce good EPUB files?',
    a: "Calibre's conversion engine is capable but produces inconsistent output depending on the source format. Converting .docx to EPUB through Calibre often preserves Word's inline formatting artifacts rather than cleaning them. Calibre is better used as a format-conversion utility and library manager than as a primary formatting tool for submission to retailers.",
  },
  {
    q: 'Which formatting software works on Linux or Chromebook?',
    a: "Browser-based tools work everywhere: Reedsy Book Editor, BookKraft AI, and the Atticus web app all run in any browser. Vellum is Mac-only. Desktop Atticus requires a download but has browser access. Calibre has a Linux build. BookKraft AI's full toolset — formatter, validator, cleanup, metadata — runs entirely in-browser.",
  },
];

const tools = [
  {
    name: 'BookKraft AI',
    platform: 'Any browser',
    price: 'Free (pre-flight tools)',
    output: 'EPUB 3.0, Kindle',
    printSupport: '—',
    bestFor: 'Manuscript cleanup, EPUB validation, metadata, pre-flight before Vellum or Atticus',
    isBookKraft: true,
  },
  {
    name: 'Vellum',
    platform: 'Mac only',
    price: '$249.99 (one-time)',
    output: 'EPUB 3.0, MOBI, print PDF',
    printSupport: '✓',
    bestFor: 'Visual design themes, high-quality print formatting',
    isBookKraft: false,
  },
  {
    name: 'Atticus',
    platform: 'Any browser / desktop',
    price: '$147 (one-time)',
    output: 'EPUB 3.0, print PDF',
    printSupport: '✓',
    bestFor: 'Cross-platform Vellum alternative, ebook + print in one tool',
    isBookKraft: false,
  },
  {
    name: 'Reedsy Book Editor',
    platform: 'Any browser',
    price: 'Free',
    output: 'EPUB, PDF',
    printSupport: '✓ (basic)',
    bestFor: 'Free entry-level formatting, clean output for simple manuscripts',
    isBookKraft: false,
  },
  {
    name: 'Calibre',
    platform: 'Windows, Mac, Linux',
    price: 'Free',
    output: 'EPUB, MOBI, AZW3, PDF',
    printSupport: '—',
    bestFor: 'Format conversion, library management, batch processing',
    isBookKraft: false,
  },
];

const steps = [
  {
    n: '01',
    title: 'Clean & Validate',
    tool: 'BookKraft AI',
    desc: 'Catch manuscript errors, strip Word artifacts, validate EPUB structure, and build metadata before the manuscript goes into a formatting tool.',
    highlight: true,
  },
  {
    n: '02',
    title: 'Design & Format',
    tool: 'Vellum / Atticus',
    desc: 'Import the clean file into your formatting software of choice. Apply visual themes, set fonts and chapter headers, and export the finished ebook and print files.',
    highlight: false,
  },
  {
    n: '03',
    title: 'Submit',
    tool: 'KDP / Apple Books / Kobo',
    desc: 'Upload the formatted EPUB to retailers. Run the output through BookKraft AI\'s EPUB Validator before submission to catch any retailer-specific errors introduced during design.',
    highlight: false,
  },
];

export default function BookFormattingSoftwarePage() {
  return (
    <>
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px', color: 'var(--ink, #1a1a1a)' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          Book Formatting Software
        </h1>

        <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 32, opacity: 0.9 }}>
          Book formatting software converts a manuscript into a finished ebook or print file — generating the correct file structure, table of contents, and styling for KDP, Apple Books, Kobo, and IngramSpark. Most authors use two tools: a visual formatter for design and a pre-flight checker for validation. Here&apos;s how they compare.
        </p>

        {/* Comparison table */}
        <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 16 }}>Comparison</h2>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'rgba(201,168,76,0.1)', borderBottom: '2px solid rgba(201,168,76,0.3)' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Tool</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Platform</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Price</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Output</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Print</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, minWidth: 200 }}>Best for</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((t, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: '1px solid rgba(201,168,76,0.15)',
                    background: t.isBookKraft ? 'rgba(201,168,76,0.06)' : i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)',
                  }}
                >
                  <td style={{ padding: '10px 16px', fontWeight: t.isBookKraft ? 700 : 600 }}>
                    {t.isBookKraft ? <strong>{t.name}</strong> : t.name}
                  </td>
                  <td style={{ padding: '10px 16px', opacity: 0.85 }}>{t.platform}</td>
                  <td style={{ padding: '10px 16px', opacity: 0.85, whiteSpace: 'nowrap' }}>{t.price}</td>
                  <td style={{ padding: '10px 16px', opacity: 0.85 }}>{t.output}</td>
                  <td style={{ padding: '10px 16px', opacity: 0.85 }}>{t.printSupport}</td>
                  <td style={{ padding: '10px 16px', opacity: 0.85, fontSize: 13 }}>{t.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Workflow */}
        <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 16 }}>How most authors use these tools together</h2>
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
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{s.title}</h3>
              <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.6, marginBottom: 12 }}>{s.tool}</p>
              <p style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.85, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* What BookKraft AI does */}
        <h2 style={{ fontSize: 26, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          What BookKraft AI does (and what it doesn&apos;t)
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          BookKraft AI is a pre-flight and conversion toolkit, not a visual design tool. It handles the work that happens before and after the design step:
        </p>
        <ul style={{ fontSize: 17, lineHeight: 1.9, opacity: 0.9, paddingLeft: 24, marginBottom: 24 }}>
          <li><strong>Before formatting:</strong> Manuscript Cleanup catches double spaces, smart quote errors, and encoding artifacts that cause formatting errors downstream.</li>
          <li><strong>EPUB conversion:</strong> The EPUB Formatter converts Word .docx files to valid EPUB 3.0 — Heading 1 becomes chapter breaks, a nav document is generated, and clean CSS replaces Word inline styles.</li>
          <li><strong>After formatting:</strong> The EPUB Validator catches KDP, Apple Books, and Kobo-specific errors before you hit a rejection email.</li>
          <li><strong>Metadata and TOC:</strong> The Metadata Builder and TOC Generator produce correctly structured metadata and navigation for the completed file.</li>
        </ul>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 32, opacity: 0.9 }}>
          BookKraft AI does not produce visual design themes, chapter ornaments, print-ready PDFs, or the layout customization that Vellum and Atticus offer. Those tools are complementary, not competing.
        </p>

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
          Comparing specific tools?{' '}
          <Link href="/vellum-alternative" style={{ color: '#9c7f35', textDecoration: 'none' }}>Vellum alternatives for Windows</Link>
          {', '}
          <Link href="/atticus-alternative" style={{ color: '#9c7f35', textDecoration: 'none' }}>Atticus alternatives</Link>
          {', and '}
          <Link href="/calibre-alternative" style={{ color: '#9c7f35', textDecoration: 'none' }}>Calibre alternatives</Link>
          {' '}are covered in the dedicated comparison pages. Full list of BookKraft AI tools is at{' '}
          <Link href="/free-tools" style={{ color: '#9c7f35', textDecoration: 'none' }}>free tools</Link>
          .
        </p>

        {/* CTA */}
        <div style={{ marginTop: 48, padding: '28px 24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Start with the pre-flight tools — free, no account needed.</p>
          <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 20 }}>Manuscript cleanup, EPUB formatting, validation, metadata. Everything before the design step.</p>
          <Link
            href="/free-tools"
            style={{ display: 'inline-block', padding: '13px 30px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}
          >
            See Free Tools →
          </Link>
        </div>
      </main>
    </>
  );
}
