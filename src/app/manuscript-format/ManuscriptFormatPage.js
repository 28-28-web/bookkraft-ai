import Link from 'next/link';

const faqs = [
  {
    q: "What's the difference between traditional manuscript format and ebook manuscript format?",
    a: "Traditional manuscript format (Courier 12pt, double-spaced, 1-inch margins, header with name/title/page number) is designed for literary agents and editors reading printed pages. Ebook manuscript format is designed for conversion to EPUB — Heading styles for chapter breaks, paragraph-style indents rather than tab indents, no manual spacing, and a single consistent body font. The two formats have almost nothing in common because they serve different purposes.",
  },
  {
    q: 'Do I need to format my manuscript before converting to EPUB?',
    a: "Yes, in the sense that how your Word document is structured determines the quality of the EPUB output. A document with Heading 1 on chapter titles, consistent Normal-style body text, and paragraph-style indentation converts cleanly. A document with manually bolded chapter titles, tab indents, and multiple blank lines for spacing produces a messy EPUB with no chapter structure.",
  },
  {
    q: 'What font should I use in a manuscript for ebook?',
    a: "Font choice in your Word file doesn't carry into the EPUB the way print fonts do. Most EPUB files specify a generic font stack (serif for body, sans-serif for headings) and let the e-reader apply the reader's preferred font. The important thing is consistency — use one body font throughout, apply it via the Normal paragraph style, and don't mix font families within the manuscript. The formatting tool handles the final font definition.",
  },
  {
    q: 'What line spacing should I use for an ebook manuscript?',
    a: "Single or 1.15 spacing in Word for ebook manuscripts. The EPUB renderer applies its own line height based on the CSS and the reader's font size preference — the line spacing in your Word document doesn't transfer directly to the EPUB. What matters is avoiding double-spacing or 2.0 spacing, which produces extra blank paragraph artifacts in the converted file.",
  },
  {
    q: 'Should I use tab indents or paragraph indentation?',
    a: "Paragraph-style indentation only. Tab characters (\t) become literal tab elements in EPUB HTML and render inconsistently across e-readers — some show them as large gaps, others ignore them entirely. Use Word's paragraph First Line Indent setting (Format → Paragraph → Indentation → Special → First line) to set a 0.3–0.5 inch first-line indent. This converts cleanly.",
  },
  {
    q: 'What spacing should I use between paragraphs in an ebook?',
    a: "No extra spacing between paragraphs. Ebook fiction uses first-line indentation to signal paragraph breaks — not the space-between-paragraphs style common in web writing. Extra blank paragraphs or Space After settings in Word become empty elements in the EPUB that can trigger validation warnings. The exception is scene breaks, which use a single centered asterisk or three asterisks on their own line.",
  },
  {
    q: 'Can BookKraft AI fix manuscript formatting issues automatically?',
    a: "The Manuscript Cleanup Checker catches and flags the most common formatting artifacts — double spaces, straight quotes where smart quotes should be, tab indents, multiple consecutive blank lines, and broken em dashes. It identifies what needs fixing so you can correct it in Word before converting. The EPUB Formatter then handles the structural conversion from a clean .docx to a valid EPUB 3.0 file.",
  },
];

const standards = [
  {
    element: 'Chapter titles',
    standard: 'Heading 1 style in Word',
    why: 'Heading 1 is how EPUB formatters detect chapter breaks and generate the nav table of contents. Bold body text looks identical on screen but creates no chapter structure in the EPUB.',
  },
  {
    element: 'Body text',
    standard: 'Normal style, no direct formatting',
    why: "Apply the Normal paragraph style consistently throughout. Don't manually override font size, family, or spacing at the paragraph level — these become inline CSS in the EPUB and break e-reader rendering.",
  },
  {
    element: 'Paragraph indentation',
    standard: 'First-line indent 0.3–0.5 inch via paragraph settings',
    why: 'Tab characters convert to literal tab elements in EPUB HTML. Use Word\'s First Line Indent setting — it exports as a CSS text-indent value that e-readers understand.',
  },
  {
    element: 'Line spacing',
    standard: 'Single or 1.15',
    why: "Double-spaced documents introduce extra vertical space between paragraphs in the converted EPUB, since the line height is applied to empty paragraph elements that Word uses for spacing.",
  },
  {
    element: 'Between-paragraph spacing',
    standard: 'None (0pt Space Before / After)',
    why: "EPUB prose uses first-line indentation, not space between paragraphs. Extra Space After settings become padding on each paragraph element — the spacing adds up visually on long chapters.",
  },
  {
    element: 'Scene breaks',
    standard: 'Single line with * or ***',
    why: 'A centered row of asterisks on its own line converts cleanly. Multiple blank lines used as visual spacers become a run of empty elements that some validators flag.',
  },
  {
    element: 'Bold and italic',
    standard: 'Word\'s bold/italic (Ctrl+B / Ctrl+I)',
    why: "These export as <strong> and <em> elements — correct semantic HTML that e-readers render properly. Decorative fonts or manual weight changes don't convert.",
  },
  {
    element: 'Em dashes',
    standard: 'Proper em dash character (—)',
    why: 'Word\'s autocorrect sometimes produces double hyphens (--) instead of em dashes. These appear as -- in the EPUB. Check with the Manuscript Cleanup Checker before converting.',
  },
];

export default function ManuscriptFormatPage() {
  return (
    <>
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px', color: 'var(--ink, #1a1a1a)' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          Manuscript Format for Ebooks
        </h1>

        <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 32, opacity: 0.9 }}>
          Ebook manuscript format is different from the traditional double-spaced format used for literary agent submissions. The goal here is a Word document that converts cleanly to EPUB — with proper chapter structure, correct paragraph indentation, and no formatting artifacts that break e-reader rendering. These are the standards for KDP, Apple Books, Kobo, and IngramSpark.
        </p>

        {/* Standards table */}
        <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 16 }}>Ebook manuscript formatting standards</h2>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
            <thead>
              <tr style={{ background: 'rgba(201,168,76,0.1)', borderBottom: '2px solid rgba(201,168,76,0.3)' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, minWidth: 160 }}>Element</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Standard</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Why it matters</th>
              </tr>
            </thead>
            <tbody>
              {standards.map(({ element, standard, why }, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(201,168,76,0.15)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                  <td style={{ padding: '10px 16px', fontWeight: 600, verticalAlign: 'top' }}>{element}</td>
                  <td style={{ padding: '10px 16px', opacity: 0.85, verticalAlign: 'top' }}>{standard}</td>
                  <td style={{ padding: '10px 16px', opacity: 0.8, fontSize: 14, verticalAlign: 'top' }}>{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Prep steps */}
        <h2 style={{ fontSize: 26, fontWeight: 700, marginTop: 48, marginBottom: 8 }}>
          How to prepare your manuscript for EPUB conversion
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 24, opacity: 0.9 }}>
          Apply these in order before uploading to the EPUB Formatter.
        </p>

        {[
          {
            n: 1,
            title: 'Apply Heading 1 to every chapter title',
            body: "In Word: select each chapter title, click Heading 1 in the Styles panel. Don't just make text bold and larger — apply the Heading 1 style. This is the signal the EPUB Formatter uses to generate chapter breaks and nav entries.",
          },
          {
            n: 2,
            title: 'Convert tab indents to paragraph indents',
            href: null,
            body: "Find and replace all tab characters (^t in Word's Find & Replace) with nothing, then set a First Line Indent of 0.3 inches on your Normal paragraph style. Tab characters produce literal tab elements in EPUB HTML.",
          },
          {
            n: 3,
            title: 'Remove extra blank lines',
            body: 'Use Find & Replace with two paragraph marks (^p^p in the Find box) to locate and remove runs of blank lines used for visual spacing. A single blank line for scene breaks is fine; multiples become empty EPUB elements.',
          },
          {
            n: 4,
            title: 'Run Manuscript Cleanup Checker',
            href: '/tools/manuscript-cleanup',
            body: 'The free checker flags double spaces, straight quotes, broken em dashes, and other artifacts that produce visible errors in the converted EPUB. Fix them in Word before uploading.',
          },
          {
            n: 5,
            title: 'Upload to EPUB Formatter',
            href: '/tools/epub-formatter',
            body: 'Upload the .docx file. The formatter converts to EPUB 3.0, maps Heading styles to chapters, generates the nav document, and outputs a file that passes epubcheck.',
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

        {/* Book format spacing callout */}
        <div style={{ margin: '48px 0', padding: '24px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 12 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>A note on &quot;book format spacing&quot;</h3>
          <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.9, margin: 0 }}>
            For ebooks, spacing is controlled by the CSS in the EPUB file — not by the spacing settings in your Word document. The EPUB Formatter applies standard ebook CSS: no space before paragraphs, a text-indent for first lines, and a line-height appropriate for body text. What matters in your manuscript is that you haven&apos;t used manual spacing (tab indents, blank-line gaps, Space After settings) that would create artifacts in the converted file. Get the structure right in Word; let the formatter handle the final spacing.
          </p>
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
          Ready to convert? See the{' '}
          <Link href="/word-to-epub" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            Word to EPUB guide
          </Link>{' '}
          for the full conversion walkthrough. For EPUB errors that appear after conversion, see the{' '}
          <Link href="/epub-errors" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB error reference
          </Link>
          . Full EPUB formatting workflow including metadata and TOC is in the{' '}
          <Link href="/epub-formatting-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB formatting guide
          </Link>
          .
        </p>

        {/* CTA */}
        <div style={{ marginTop: 48, padding: '28px 24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Check your manuscript before converting — free.</p>
          <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 20 }}>Catch formatting artifacts that cause EPUB errors. No account required.</p>
          <Link
            href="/tools/manuscript-cleanup"
            style={{ display: 'inline-block', padding: '13px 30px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}
          >
            Open Manuscript Cleanup Checker →
          </Link>
        </div>
      </main>
    </>
  );
}
