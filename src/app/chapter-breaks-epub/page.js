import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Chapter Breaks in EPUB — Spine Splitting, Headings, and TOC Structure | BookKraft AI',
  description: 'Chapter breaks in EPUB work at two levels: how your content is split into separate XHTML files (spine structure) and how headings create TOC entries. This guide covers both, with OPF spine code and FAQ.',
  alternates: { canonical: 'https://bookkraftai.com/chapter-breaks-epub' },
  robots: 'index, follow',
};

const breakRows = [
  { method: 'One XHTML file per chapter', effect: 'Hard break — reading system always starts a new page', when: 'Recommended for all prose ebooks' },
  { method: 'page-break-before: always on h1', effect: 'CSS page break — reading system usually honors it', when: 'When multiple sections exist in one file' },
  { method: 'h1 heading inside a shared file', effect: 'No automatic page break — just a heading', when: 'Section title within a chapter' },
  { method: 'epub:type="chapter" on section', effect: 'Semantic annotation — no rendering effect on its own', when: 'EPUB 3 accessibility metadata' },
];

const faqs = [
  {
    q: 'Should each chapter be its own XHTML file, or can the whole book be one file?',
    a: 'Each chapter should be its own XHTML file. A single large XHTML file causes slow loading on e-ink devices, navigation problems — the TOC cannot link to a position inside a file on all platforms — and issues with how some reading systems render very long documents. The EPUB spine defines the reading order across multiple files. One file per chapter is the standard and most reliable structure.',
  },
  {
    q: 'How does the chapter break in my content relate to the TOC entry in nav.xhtml?',
    a: 'Each entry in nav.xhtml links to a content file — and optionally to a specific id within that file. If each chapter is its own XHTML file, the TOC entry links to that file: <a href="chapter01.xhtml">Chapter 1</a>. If multiple chapters share one file, the TOC entry must link to an id anchor inside the file: <a href="content.xhtml#ch1">Chapter 1</a>. The one-file-per-chapter structure is simpler: TOC entries are just file links, no id anchors needed.',
  },
  {
    q: 'What is the EPUB spine and how does it control chapter order?',
    a: "The spine element in content.opf lists the EPUB's content files in the order a reader encounters them. Each itemref element in the spine points to a manifest item by its id. The spine is separate from the TOC — the spine controls what files exist and their order; the TOC controls what readers see in the in-book navigation menu. Both should reflect the same chapter order.",
  },
  {
    q: 'How do I add a chapter break in Microsoft Word before converting to EPUB?',
    a: 'Apply the Heading 1 style — not Bold text, but the actual Heading 1 paragraph style from the Styles panel — to each chapter title. When you export or convert to EPUB, tools that respect Word heading styles will split on Heading 1 and create separate XHTML files for each chapter. If the converter does not split on Heading 1, look for a "split on heading" or "chapter splitting" option in its export settings. BookKraft\'s Full Manuscript Mode detects Word heading styles automatically.',
  },
  {
    q: 'Can I have front matter (title page, copyright) before Chapter 1?',
    a: 'Yes. Front matter files — title page, copyright, dedication, table of contents page — appear as separate XHTML files in the spine before the first chapter file. Add them to nav.xhtml only if you want them as navigable TOC entries. Most ebooks list front matter in the spine but not in the visible TOC navigation — readers navigate to front matter through the file order, not the TOC menu.',
  },
  {
    q: 'Does KDP require a specific number of chapters or a minimum XHTML file count?',
    a: 'No minimum chapter count or file count is required. KDP does require that the EPUB has a valid navigation document — nav.xhtml or toc.ncx — with at least one entry. Very long single-file EPUBs can cause issues during conversion. Splitting into separate chapter files avoids this and is the recommended structure regardless of chapter count.',
  },
];

export default function ChapterBreaksEpubPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bookkraftai.com/' },
      { '@type': 'ListItem', position: 2, name: 'EPUB Formatting Guide', item: 'https://bookkraftai.com/epub-formatting-guide' },
      { '@type': 'ListItem', position: 3, name: 'Chapter Breaks in EPUB', item: 'https://bookkraftai.com/chapter-breaks-epub' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '56px 24px 80px' }}>

        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--mid)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <Link href="/epub-formatting-guide" style={{ color: 'var(--mid)', textDecoration: 'none' }}>EPUB Formatting Guide</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>Chapter Breaks in EPUB</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 16 }}>
          Chapter Breaks in EPUB
        </h1>
        <p style={{ fontSize: 17, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 48 }}>
          Chapter breaks in EPUB operate at two distinct levels. The first is structural: each chapter is its own XHTML content file, and the EPUB spine in the OPF package document lists those files in reading order. The second is navigational: headings inside those files — and the nav.xhtml TOC — create the chapter entries readers see in the in-book menu. Getting both right is what separates a well-structured EPUB from one that causes navigation errors and slow loading on e-ink devices.
        </p>

        {/* Two levels */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Two levels of chapter structure
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Authors coming from word processors often think of a chapter break as a heading — press Enter, type "Chapter 2", and the reader sees a new chapter. In EPUB, the concept splits into two separate things: the file structure (which XHTML files exist in the archive) and the heading structure (which h1/h2 elements are inside those files). The file structure controls actual page breaks; the heading structure controls TOC labels.
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--cream)', borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--ink)', minWidth: 200 }}>Method</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--ink)', minWidth: 220 }}>Effect</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--ink)', minWidth: 180 }}>When to use</th>
              </tr>
            </thead>
            <tbody>
              {breakRows.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                  <td style={{ padding: '10px 14px', color: 'var(--ink)', fontWeight: 500, lineHeight: 1.4 }}>{r.method}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--mid)', lineHeight: 1.4 }}>{r.effect}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--mid)', lineHeight: 1.4, fontSize: 13 }}>{r.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Spine splitting */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          How spine splitting works
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          The OPF package document (<code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>content.opf</code>) has two sections that handle chapter structure: the <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>{'<manifest>'}</code> declares every file in the archive, and the <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>{'<spine>'}</code> lists the content files in reading order:
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 16, fontFamily: 'monospace' }}>
          <code>{`<!-- In content.opf -->
<manifest>
  <item id="nav"        href="nav.xhtml"        media-type="application/xhtml+xml" properties="nav"/>
  <item id="ncx"        href="toc.ncx"          media-type="application/x-dtbncx+xml"/>
  <item id="titlepage"  href="titlepage.xhtml"  media-type="application/xhtml+xml"/>
  <item id="copyright"  href="copyright.xhtml"  media-type="application/xhtml+xml"/>
  <item id="chapter01"  href="chapter01.xhtml"  media-type="application/xhtml+xml"/>
  <item id="chapter02"  href="chapter02.xhtml"  media-type="application/xhtml+xml"/>
  <item id="chapter03"  href="chapter03.xhtml"  media-type="application/xhtml+xml"/>
</manifest>

<spine toc="ncx">
  <itemref idref="titlepage"/>
  <itemref idref="copyright"/>
  <itemref idref="chapter01"/>
  <itemref idref="chapter02"/>
  <itemref idref="chapter03"/>
</spine>`}</code>
        </pre>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Every file listed in the spine must be declared in the manifest. The reading system renders the spine items in order — each file naturally starts on a new page. There is no CSS required to force a page break when files are split correctly.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          Front matter — title page, copyright, dedication — goes in the spine before the first chapter. These files are typically not listed in the visible nav.xhtml TOC, though they must still be in the manifest and spine.
        </p>

        {/* Headings and TOC */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Heading structure and TOC entries
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Inside each chapter XHTML file, the h1 element holds the chapter title. This h1 is what a TOC generator reads to produce the nav.xhtml entry for that chapter. The nav.xhtml link points to the chapter file:
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 16, fontFamily: 'monospace' }}>
          <code>{`<!-- chapter01.xhtml -->
<body>
  <h1>Chapter 1: The Beginning</h1>
  <p>The story opens...</p>
</body>

<!-- nav.xhtml TOC entry for this chapter -->
<li><a href="chapter01.xhtml">Chapter 1: The Beginning</a></li>`}</code>
        </pre>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          If a chapter file contains subsections (h2 elements), those can also appear as nested TOC entries. See the{' '}
          <Link href="/epub-toc-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB TOC guide
          </Link>
          {' '}for the nested nav.xhtml format.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          One common mistake: using Bold + large font-size to style a chapter title instead of the h1 element. Bold text styled to look like a heading does not create a TOC entry. TOC generators — including BookKraft's — detect h1/h2/h3 elements, not visual styling. The chapter title must use a real heading element.
        </p>

        {/* CSS page breaks */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          CSS page breaks within a single file
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          When chapter content is split into separate XHTML files, no CSS is needed to force page breaks — the file boundary is a hard break. When multiple sections exist within one file, <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>page-break-before: always</code> on the h1 element requests a new page from the reading system:
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 16, fontFamily: 'monospace' }}>
          <code>{`h1 {
  page-break-before: always;
}`}</code>
        </pre>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          This CSS approach is less reliable than file splitting — not every reading system honors it, and it does not solve the navigation problems that come from a single large file. For more on EPUB CSS and page-break properties, see the{' '}
          <Link href="/epub-css-for-ebooks" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            CSS for EPUB files guide
          </Link>
          .
        </p>

        {/* Front and back matter */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Front matter, back matter, and spine order
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          A complete ebook spine typically follows this order:
        </p>
        <ol style={{ fontSize: 16, lineHeight: 1.9, color: 'var(--ink)', paddingLeft: '1.4em', marginBottom: 16, opacity: 0.9 }}>
          <li><strong>Title page</strong> — book title, author, publisher</li>
          <li><strong>Copyright page</strong> — copyright statement, ISBN, disclaimers</li>
          <li><strong>Dedication</strong> (optional)</li>
          <li><strong>Table of contents page</strong> (optional — separate from nav.xhtml)</li>
          <li><strong>Chapters</strong> — one file each, in reading order</li>
          <li><strong>Back matter</strong> — author bio, acknowledgments, also-by list, sample chapters</li>
        </ol>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          All of these are separate XHTML files listed in the spine. Front matter files are typically not included in the nav.xhtml TOC — readers reach them by navigating backward from Chapter 1, or through a separate TOC page in the book. Back matter items like an author bio or also-by section can optionally appear in the TOC if they are long enough to warrant navigation.
        </p>

        {/* FAQ */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>
          Frequently asked questions
        </h2>
        {faqs.map((f, i) => (
          <div key={i} style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: 'var(--ink)' }}>{f.q}</h3>
            <p style={{ fontSize: 16, lineHeight: 1.65, opacity: 0.85, margin: 0 }}>{f.a}</p>
          </div>
        ))}

        {/* Cross-links */}
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginTop: 48, marginBottom: 16, opacity: 0.9 }}>
          For nav.xhtml and toc.ncx format — how chapter TOC entries are written and what KDP validates — see the{' '}
          <Link href="/epub-toc-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB TOC guide
          </Link>
          . For OPF metadata — the required fields in content.opf alongside the spine — see the{' '}
          <Link href="/epub-metadata-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB metadata guide
          </Link>
          . For CSS applied to chapter headings and page breaks, see{' '}
          <Link href="/epub-css-for-ebooks" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            CSS for EPUB files
          </Link>
          .
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 32, opacity: 0.9 }}>
          For the full EPUB build workflow — from manuscript to store-ready file — see the{' '}
          <Link href="/epub-formatting-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB formatting guide
          </Link>
          .
        </p>

        {/* CTA */}
        <div style={{ padding: '28px 24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Convert your Word manuscript to a split-chapter EPUB — free.</p>
          <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 20 }}>Upload a .docx or .txt file. Chapter detection splits on Word heading styles and Chapter N patterns automatically. Valid EPUB 3.0 output.</p>
          <Link
            href="/tools/manuscript-mode"
            style={{ display: 'inline-block', padding: '13px 30px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}
          >
            Open Full Manuscript Mode →
          </Link>
          <p style={{ fontSize: 13, color: 'var(--mid)', marginTop: 16, marginBottom: 0 }}>
            Already have chapter files? Generate nav.xhtml and toc.ncx from your headings with the{' '}
            <Link href="/tools/toc-generator" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
              TOC Generator
            </Link>
            .
          </p>
        </div>

      </main>
      <Footer />
    </>
  );
}
