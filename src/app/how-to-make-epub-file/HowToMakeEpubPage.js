import Link from 'next/link';

const faqs = [
  {
    q: 'What is an EPUB file?',
    a: 'EPUB (Electronic Publication) is the standard ebook format used by Apple Books, Kobo, IngramSpark, and most non-Amazon retailers. It\'s a ZIP file containing HTML, CSS, images, and a metadata manifest. Amazon KDP accepts EPUB too, though it converts it to its own format internally. Kindle devices can read EPUB directly via the Kindle app on iOS and Android.',
  },
  {
    q: 'Do I need software to make an EPUB file?',
    a: "No. BookKraft AI's EPUB Formatter runs in a browser — upload a Word .docx file and download the EPUB. No software to install, no account required.",
  },
  {
    q: 'Can I make an EPUB file from Google Docs?',
    a: 'Yes. Export your Google Doc as a .docx file (File → Download → Microsoft Word .docx), then upload it to the EPUB Formatter. Google Docs exports clean Word files that convert well.',
  },
  {
    q: 'What file formats can I convert to EPUB?',
    a: 'The EPUB Formatter accepts .docx files (Word and Google Docs exports). If your manuscript is in a different format — Scrivener, InDesign, plain text — export to .docx first, then convert.',
  },
  {
    q: 'Will my EPUB pass Amazon KDP validation?',
    a: "BookKraft AI outputs EPUB 3.0 files that pass KDP's EPUB validator and epubcheck. KDP also has content requirements (cover image, image resolution, font embedding) that are manuscript-specific — run the free EPUB Validator to check for those before uploading.",
  },
  {
    q: 'What\'s the difference between EPUB 2 and EPUB 3?',
    a: 'EPUB 3 is the current standard, required by Apple Books and Kobo. EPUB 2 is the older format — it still works on most e-readers but lacks support for modern HTML5 features, proper nav documents, and accessibility metadata. BookKraft AI outputs EPUB 3.0.',
  },
];

const options = [
  {
    n: '01',
    title: 'Convert from a Word Document',
    desc: 'If your manuscript is in Microsoft Word or Google Docs, this is the fastest path. Export as .docx, upload to the EPUB Formatter, and download a valid EPUB 3.0 file in under a minute.',
    href: '/word-to-epub',
    linkLabel: 'Full Word to EPUB guide →',
    highlight: true,
  },
  {
    n: '02',
    title: 'Use an Online EPUB Formatter',
    desc: 'The BookKraft AI EPUB Formatter accepts .docx files and handles all the structural conversion — Heading styles become chapter breaks, a nav document is generated automatically, and the output passes epubcheck.',
    href: '/tools/epub-formatter',
    linkLabel: 'Open EPUB Formatter →',
    highlight: false,
  },
  {
    n: '03',
    title: 'Build from HTML (Advanced)',
    desc: 'EPUB files are ZIP archives containing HTML and CSS. You can hand-code one in a text editor, but this requires understanding the OPF package manifest, nav document structure, and spine ordering. Useful for custom layouts; unnecessary for standard books.',
    href: null,
    linkLabel: null,
    highlight: false,
  },
];

const whatGoesInEpub = [
  { item: 'content.opf', desc: 'Package document — lists every file in the book and its metadata (title, author, language, ISBN, cover image declaration).' },
  { item: 'nav.xhtml', desc: 'Navigation document — the clickable table of contents. Required by EPUB 3.0. Apple Books rejects files without it.' },
  { item: 'chapter-01.xhtml…', desc: 'One XHTML file per chapter (or section). Content must be valid HTML5, not Word HTML or Google Docs HTML.' },
  { item: 'stylesheet.css', desc: 'A single external CSS file that controls text styling, margins, and spacing across all chapters.' },
  { item: 'images/', desc: 'Cover image and any inline images. Cover must be declared as a cover-image item in the OPF manifest.' },
  { item: 'mimetype', desc: 'A plain text file containing the string "application/epub+zip" — exactly, no newline. Required by the EPUB spec.' },
];

export default function HowToMakeEpubPage() {
  return (
    <>
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px', color: 'var(--ink, #1a1a1a)' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          How to Make an EPUB File
        </h1>

        <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 32, opacity: 0.9 }}>
          An EPUB file is what every major ebook retailer — Apple Books, Kobo, IngramSpark, and Amazon KDP — actually wants. Most authors write in Word or Google Docs, which means the first step is converting that manuscript into a valid EPUB 3.0 file. Here&apos;s how, from the simplest path to the most hands-on.
        </p>

        {/* Three options */}
        <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 20 }}>Three ways to make an EPUB file</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 48 }}>
          {options.map((o) => (
            <div
              key={o.n}
              style={{
                border: o.highlight ? '2px solid #c9a84c' : '1px solid rgba(201,168,76,0.25)',
                borderRadius: 12,
                padding: '28px 24px',
                background: o.highlight ? 'rgba(201,168,76,0.06)' : 'transparent',
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', color: '#c9a84c', marginBottom: 10 }}>
                OPTION {o.n}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{o.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.85, marginBottom: o.href ? 16 : 0 }}>{o.desc}</p>
              {o.href && (
                <Link href={o.href} style={{ color: '#9c7f35', fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>
                  {o.linkLabel}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* What's inside an EPUB */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          What&apos;s inside an EPUB file
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 20, opacity: 0.9 }}>
          Understanding the structure helps when troubleshooting validation errors. An EPUB is a renamed ZIP file. Unzip any .epub and you&apos;ll find:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 40 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
            <thead>
              <tr style={{ background: 'rgba(201,168,76,0.1)', borderBottom: '2px solid rgba(201,168,76,0.3)' }}>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700 }}>File</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700 }}>Purpose</th>
              </tr>
            </thead>
            <tbody>
              {whatGoesInEpub.map(({ item, desc }, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(201,168,76,0.15)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                  <td style={{ padding: '10px 16px', fontFamily: 'monospace', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>{item}</td>
                  <td style={{ padding: '10px 16px', opacity: 0.85 }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 32, opacity: 0.9 }}>
          The EPUB Formatter generates all of these from a .docx upload — you don&apos;t need to create any of them manually.
        </p>

        {/* Step by step from Word */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 8 }}>
          Making an EPUB from a Word document
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 24, opacity: 0.9 }}>
          This is the fastest route for most authors. Full details are in the{' '}
          <Link href="/word-to-epub" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            Word to EPUB conversion guide
          </Link>
          , but the short version:
        </p>

        {[
          {
            n: 1,
            title: 'Apply Heading 1 to every chapter title in Word',
            body: 'The EPUB Formatter uses Word\'s Heading styles to generate chapter breaks and the nav table of contents. If chapter titles are just bold text, there will be no chapter structure in the output.',
          },
          {
            n: 2,
            title: 'Export as .docx',
            body: 'From Word: File → Save As → Word Document (.docx). From Google Docs: File → Download → Microsoft Word (.docx).',
          },
          {
            n: 3,
            title: 'Upload to the EPUB Formatter',
            href: '/tools/epub-formatter',
            body: 'Upload the .docx file. The formatter outputs a valid EPUB 3.0 file with a proper nav document, clean CSS, and correct package metadata.',
          },
          {
            n: 4,
            title: 'Validate before submitting',
            href: '/tools/epub-validator',
            body: 'Run the EPUB through the free EPUB Validator. Catches KDP, Apple Books, and Kobo-specific errors before you hit a rejection.',
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
          Converting from Word specifically? See the full{' '}
          <Link href="/word-to-epub" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            Word to EPUB guide
          </Link>
          . For EPUB errors you&apos;re getting after conversion, see the{' '}
          <Link href="/epub-errors" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB error reference
          </Link>
          . Full workflow including metadata, TOC, and front matter is in the{' '}
          <Link href="/epub-formatting-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB formatting guide
          </Link>
          .
        </p>

        {/* CTA */}
        <div style={{ marginTop: 48, padding: '28px 24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Make your EPUB file — free, no account needed.</p>
          <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 20 }}>Upload a .docx file. Download EPUB 3.0. Passes retailer validation.</p>
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
