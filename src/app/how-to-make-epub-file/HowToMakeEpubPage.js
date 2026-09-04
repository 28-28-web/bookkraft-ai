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
    desc: 'EPUB files are ZIP archives containing HTML and CSS. You can hand-code one in a text editor, but this means writing the OPF package manifest, the nav document, and the spine order yourself. Useful for custom layouts and for debugging; unnecessary for standard books.',
    href: '#build-from-html',
    linkLabel: 'See the manual build steps →',
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

// ── Shared presentation helpers ──────────────────────────────────────────────
// Same palette as the rest of the page: #c9a84c gold accent, #9c7f35 links,
// 12px card radius, rgba(201,168,76,·) borders.
const GOLD_LINK = '#9c7f35';

function CodeBlock({ label, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      {label && (
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: GOLD_LINK, marginBottom: 6, fontFamily: 'monospace' }}>
          {label}
        </div>
      )}
      <pre
        style={{
          background: 'rgba(26,26,26,0.04)',
          border: '1px solid rgba(201,168,76,0.28)',
          borderRadius: 8,
          padding: '16px 18px',
          overflowX: 'auto',
          fontSize: 13,
          lineHeight: 1.65,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
          margin: 0,
          whiteSpace: 'pre',
        }}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}

function DataTable({ head, rows, monoFirst = true }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 40 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
        <thead>
          <tr style={{ background: 'rgba(201,168,76,0.1)', borderBottom: '2px solid rgba(201,168,76,0.3)' }}>
            {head.map((h, i) => (
              <th key={i} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, i) => (
            <tr key={i} style={{ borderBottom: '1px solid rgba(201,168,76,0.15)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
              {cells.map((c, j) => (
                <td
                  key={j}
                  style={{
                    padding: '10px 16px',
                    opacity: j === 0 ? 1 : 0.85,
                    fontFamily: monoFirst && j === 0 ? 'monospace' : 'inherit',
                    fontSize: monoFirst && j === 0 ? 13 : 15,
                    fontWeight: j === 0 ? 600 : 400,
                    verticalAlign: 'top',
                  }}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const H2_STYLE = { fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 };
const H3_STYLE = { fontSize: 19, fontWeight: 700, marginTop: 28, marginBottom: 8 };
const P_STYLE = { fontSize: 17, lineHeight: 1.7, marginBottom: 20, opacity: 0.9 };
const INLINE_LINK = { color: GOLD_LINK, textDecoration: 'none', fontWeight: 600 };

const EPUB_TREE = `book.epub
├── mimetype                  ← must be first, uncompressed
├── META-INF/
│   └── container.xml         ← tells readers where to find content.opf
└── OEBPS/
    ├── content.opf           ← the manifest: every file, plus metadata
    ├── nav.xhtml             ← the table of contents (EPUB 3)
    ├── toc.ncx               ← legacy TOC, still read by Kindle
    ├── chapter-1.xhtml       ← your content, one file per chapter
    ├── chapter-2.xhtml
    ├── styles.css            ← formatting for all chapters
    └── images/
        └── cover.jpg`;

const FILE_ROLES = [
  ['mimetype', 'Identifies the file as an EPUB to the operating system.', 'Compressed, or not the first entry in the zip.'],
  ['container.xml', 'Points reading apps to content.opf.', 'Wrong path — the reader cannot find your book at all.'],
  ['content.opf', 'Lists every file, the metadata, and the reading order.', 'A listed file is missing, or the spine order is wrong.'],
  ['nav.xhtml', 'Modern table of contents, required by EPUB 3.', 'Links point to IDs that do not exist.'],
  ['toc.ncx', 'Older TOC format some Kindle devices still expect.', 'Missing — some readers show no navigation at all.'],
  ['chapter-X.xhtml', 'Your actual text, as valid XHTML.', 'Unescaped ampersands, unclosed tags, or non-UTF-8 encoding.'],
  ['styles.css', 'Formatting shared across every chapter.', 'Not declared in the manifest, so readers ignore it.'],
  ['images/', 'Cover art and any inline images.', 'A src path does not match the real file location.'],
];

const TOOL_COMPARISON = [
  ['Cost', 'Free', 'Free', 'Free'],
  ['Install required', 'Yes — desktop app', 'Yes — desktop app', 'No — browser only'],
  ['Learning curve', 'Moderate — many options', 'Steep — direct XHTML and CSS editing', 'Low — upload, then download'],
  ['Best for', 'Batch conversions and format-shifting existing ebooks', 'Fine-grained control over EPUB internals', 'Starting from a Word or Google Docs manuscript'],
  ['Output control', 'Good, though conversion defaults can surprise you', 'Full — you write the XHTML yourself', 'Good for standard structure'],
  ['Time for a 200-page book', 'About 10–15 minutes', 'An hour or more from scratch', 'About 5 minutes'],
];

const BUILD_TREE = `mybook/
├── mimetype
├── META-INF/
│   └── container.xml
└── OEBPS/
    ├── content.opf
    ├── nav.xhtml
    ├── chapter-1.xhtml
    └── styles.css`;

const CONTAINER_SAMPLE = `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf"
              media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`;

const OPF_SAMPLE = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="BookId">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>Your Book Title</dc:title>
    <dc:creator>Your Name</dc:creator>
    <dc:identifier id="BookId">urn:uuid:REPLACE-WITH-UUID</dc:identifier>
    <dc:language>en</dc:language>
  </metadata>
  <manifest>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="chapter1" href="chapter-1.xhtml" media-type="application/xhtml+xml"/>
    <item id="css" href="styles.css" media-type="text/css"/>
  </manifest>
  <spine>
    <itemref idref="chapter1"/>
  </spine>
</package>`;

const NAV_SAMPLE = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:epub="http://www.idpf.org/2007/ops">
<head><title>Table of Contents</title></head>
<body>
  <nav epub:type="toc">
    <ol>
      <li><a href="chapter-1.xhtml">Chapter 1</a></li>
    </ol>
  </nav>
</body>
</html>`;

const ZIP_SAMPLE = `zip -X0 mybook.epub mimetype
zip -Xr9D mybook.epub META-INF OEBPS`;

const EPUBCHECK_ERRORS = [
  ['Fatal: not well-formed', 'An unclosed tag or an invalid character somewhere in your XHTML.', 'Open the file and line the error names, and look for an unescaped ampersand or angle bracket.'],
  ['OPF-014', 'A file, usually an image, is used but never listed in content.opf.', 'Add an item entry for it in the manifest.'],
  ['RSC-005', 'Malformed XML, most often a mismatched tag.', 'Open that .xhtml file and check the tag nesting.'],
  ['NCX-002', 'toc.ncx points at a chapter file that does not exist or was renamed.', 'Match the src paths to your actual filenames.'],
  ['MED-003', 'An image src path does not match where the file actually sits.', 'Check the relative path — usually a missing images/ prefix.'],
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

        {/* Quick decision table */}
        <h2 style={H2_STYLE}>Which tool should you use?</h2>
        <p style={P_STYLE}>
          All three routes produce a valid EPUB. They differ in what you have to install, how much control you get, and how long it takes.
        </p>
        <DataTable
          head={['', 'Calibre', 'Sigil', 'Online converter']}
          rows={TOOL_COMPARISON}
          monoFirst={false}
        />
        <p style={P_STYLE}>
          Calibre is the right tool when you already have an ebook in one format and need it in another. Sigil is right when you need to hand-edit EPUB internals — repairing a specific broken tag, or adjusting CSS precisely. An online converter is right when you are starting from a manuscript and want a clean, valid file without installing anything.
        </p>
        <p style={P_STYLE}>
          Whichever route you take, the output still has to pass the same checks — run it through the free{' '}
          <Link href="/tools/epub-validator" style={INLINE_LINK}>EPUB Validator</Link>
          {' '}before uploading. For the wider workflow around the file itself — metadata, front and back matter, cover requirements — see the{' '}
          <Link href="/epub-formatting-guide" style={INLINE_LINK}>EPUB formatting guide</Link>.
        </p>

        {/* What's inside an EPUB */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          What&apos;s inside an EPUB file
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 20, opacity: 0.9 }}>
          An EPUB is not one file. It is a ZIP archive with a <code style={{ fontFamily: 'monospace', fontSize: 14 }}>.epub</code> extension, holding a specific folder structure. Unzip any .epub and you&apos;ll find:
        </p>
        <CodeBlock label="Inside a .epub archive">{EPUB_TREE}</CodeBlock>
        <p style={P_STYLE}>
          Every reading app — Kindle, Apple Books, Kobo — knows how to walk this structure. Here is what each file does, and what goes wrong when it is not right:
        </p>
        <DataTable head={['File', 'Purpose', 'Breaks if…']} rows={FILE_ROLES} />
        <p style={P_STYLE}>
          The most common cause of a &ldquo;broken&rdquo; EPUB is not missing content. It is one of these structural files pointing at the wrong place, or the <code style={{ fontFamily: 'monospace', fontSize: 14 }}>mimetype</code> file being compressed when the spec requires it stored raw.
        </p>

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

        {/* Google Docs */}
        <h2 style={H2_STYLE}>From Google Docs to EPUB</h2>
        <p style={P_STYLE}>
          Google Docs has no direct EPUB export, but the path is short.
        </p>

        <h3 style={H3_STYLE}>1. Use real heading styles</h3>
        <p style={P_STYLE}>
          In Google Docs, apply <strong>Format → Paragraph styles → Heading 1</strong> to every chapter title. This is non-negotiable — it is what lets any converter detect your chapter breaks. Manually bolding and enlarging text does not work, because the converter looks for the style tag, not the appearance.
        </p>

        <h3 style={H3_STYLE}>2. Download the file</h3>
        <p style={P_STYLE}>
          <strong>File → Download → Microsoft Word (.docx)</strong> keeps your heading styles intact and is the route we recommend. Plain text is simpler but strips those styles entirely; HTML preserves bold and italic but carries Google-specific span classes and inline styles that need cleaning up first.
        </p>
        <p style={P_STYLE}>
          Google Docs exports also carry the usual artifacts — straight quotes, double spaces, stacked empty paragraphs. The free{' '}
          <Link href="/tools/word-cleanup" style={INLINE_LINK}>Word Manuscript Cleanup Checker</Link>
          {' '}scans a .docx for those before you convert, which is quicker than finding them in the finished EPUB.
        </p>

        <h3 style={H3_STYLE}>3. Convert</h3>
        <p style={P_STYLE}>
          Upload the .docx to the{' '}
          <Link href="/tools/epub-formatter" style={INLINE_LINK}>EPUB Formatter</Link>
          . If you exported plain text instead, mark each chapter title with a leading <code style={{ fontFamily: 'monospace', fontSize: 14 }}>#</code> before pasting — as in <code style={{ fontFamily: 'monospace', fontSize: 14 }}># Chapter One</code> — since the converter has no other way to see where chapters begin.
        </p>

        {/* Build from HTML */}
        <h2 id="build-from-html" style={H2_STYLE}>Build from HTML — the manual way</h2>
        <p style={P_STYLE}>
          This is what a converter does for you. Worth walking through once if you want to understand the format or debug a file by hand; not something you will want to repeat for every book.
        </p>

        <h3 style={H3_STYLE}>1. Create the folder structure</h3>
        <CodeBlock>{BUILD_TREE}</CodeBlock>

        <h3 style={H3_STYLE}>2. Write the mimetype file</h3>
        <p style={P_STYLE}>
          No file extension, and no trailing line break — the file contains exactly this one string:
        </p>
        <CodeBlock label="mimetype">application/epub+zip</CodeBlock>

        <h3 style={H3_STYLE}>3. Write META-INF/container.xml</h3>
        <p style={P_STYLE}>
          This is the entry point. It tells a reading app where the package document lives.
        </p>
        <CodeBlock label="META-INF/container.xml">{CONTAINER_SAMPLE}</CodeBlock>

        <h3 style={H3_STYLE}>4. Write OEBPS/content.opf</h3>
        <p style={P_STYLE}>
          The manifest. Every file in the book needs an entry here, and the <code style={{ fontFamily: 'monospace', fontSize: 14 }}>spine</code> sets the reading order.
        </p>
        <CodeBlock label="OEBPS/content.opf">{OPF_SAMPLE}</CodeBlock>

        <h3 style={H3_STYLE}>5. Write OEBPS/nav.xhtml</h3>
        <CodeBlock label="OEBPS/nav.xhtml">{NAV_SAMPLE}</CodeBlock>

        <h3 style={H3_STYLE}>6. Write your chapters</h3>
        <p style={P_STYLE}>
          Each chapter is valid XHTML: every tag closed, every ampersand written as <code style={{ fontFamily: 'monospace', fontSize: 14 }}>&amp;amp;</code>, and no bare angle brackets in body text. This is where most hand-built EPUBs fail validation.
        </p>

        <h3 style={H3_STYLE}>7. Zip it correctly</h3>
        <p style={P_STYLE}>
          This is the step almost everyone gets wrong. The <code style={{ fontFamily: 'monospace', fontSize: 14 }}>mimetype</code> file must be added first and stored uncompressed:
        </p>
        <CodeBlock label="Terminal">{ZIP_SAMPLE}</CodeBlock>
        <p style={P_STYLE}>
          Using &ldquo;Compress&rdquo; in Finder or &ldquo;Send to → Compressed folder&rdquo; in File Explorer will not do this. Those compress everything including <code style={{ fontFamily: 'monospace', fontSize: 14 }}>mimetype</code>, which some readers reject outright.
        </p>

        {/* Validation */}
        <h2 style={H2_STYLE}>Validating your EPUB</h2>
        <p style={P_STYLE}>
          A file that opens fine in one reader can still fail Amazon&apos;s or Apple&apos;s stricter checks. Validate before uploading anywhere. These are the epubcheck errors you are most likely to meet:
        </p>
        <DataTable head={['Error', 'What it means', 'Fix']} rows={EPUBCHECK_ERRORS} />
        <p style={P_STYLE}>
          Every error carries a filename and a line number — start there, not in the whole manuscript. Nearly all of them trace back to one of two causes: a file referenced but never delivered, or a path that is one directory level off from where the reader expects it.
        </p>
        <p style={P_STYLE}>
          Run this check with the free{' '}
          <Link href="/tools/epub-validator" style={INLINE_LINK}>EPUB Validator</Link>
          {' '}before uploading. It flags the same categories of error KDP&apos;s own system checks for, without spending a submission cycle to find out.
        </p>
        <p style={P_STYLE}>
          The table above covers the errors that come up most often. For the full reference — every epubcheck and retailer error code, with the cause and fix for each — see the{' '}
          <Link href="/epub-errors" style={INLINE_LINK}>EPUB error reference</Link>.
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
