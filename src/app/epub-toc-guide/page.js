import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'EPUB Table of Contents Guide — nav.xhtml, toc.ncx, and KDP Navigation | BookKraft AI',
  description: 'Every EPUB needs a nav.xhtml navigation document (EPUB 3) and a toc.ncx for backward compatibility. This guide covers the format for both, nested TOC structure, and what to check before uploading to KDP.',
  alternates: { canonical: 'https://bookkraftai.com/epub-toc-guide' },
  robots: 'index, follow',
};

const faqs = [
  {
    q: 'Do I need both nav.xhtml and toc.ncx, or just one?',
    a: 'A valid EPUB 3 file requires nav.xhtml as its primary navigation document. Including toc.ncx as well is strongly recommended: it provides backward compatibility for older reading systems and some validators check for it. Most EPUB build tools generate both automatically. If you are building an EPUB manually and only have one, you must have nav.xhtml — a toc.ncx alone is not sufficient for EPUB 3.',
  },
  {
    q: 'What happens if nav.xhtml is missing from my EPUB?',
    a: 'EPUBCheck reports a missing navigation document error and the file fails validation. KDP will reject the upload with a navigation error. Apple Books and Kobo also require a valid navigation document. This is one of the most common structural errors in manually edited EPUB files — the nav.xhtml must exist and be listed in the OPF manifest.',
  },
  {
    q: 'Does KDP use my nav.xhtml to build the Kindle in-book table of contents?',
    a: 'KDP uses the navigation document to generate the in-book Kindle TOC that readers access from the Go To menu on their device. The entries in your nav.xhtml become the navigable chapters in the Kindle reading experience. Entries that point to non-existent content files will cause navigation errors on the device.',
  },
  {
    q: 'Can the nav.xhtml TOC have different entries than the toc.ncx TOC?',
    a: 'Technically yes, but they should match. The nav.xhtml is the authoritative navigation document for EPUB 3 readers. The toc.ncx serves older systems. If they differ, users on different platforms will see different TOC entries — which creates a confusing experience. Keep them consistent.',
  },
  {
    q: 'My EPUB validator says "Missing NCX navigation (toc.ncx)" — what does that mean?',
    a: 'The OPF manifest references toc.ncx but the file is absent from the EPUB archive. This commonly happens with Scrivener and older Calibre exports that generate the OPF reference without creating the actual file. The fix is to either generate a valid toc.ncx and add it to the archive, or remove the OPF reference to it — though for backward compatibility, generating the file is the better option. The BookKraft TOC Generator outputs a valid toc.ncx alongside nav.xhtml.',
  },
  {
    q: 'Does BookKraft\'s TOC Generator output both nav.xhtml and toc.ncx?',
    a: 'Yes. The TOC Generator outputs Kindle HTML format (for direct manuscript insertion), EPUB 3 nav.xhtml, and NCX XML (toc.ncx) — all three from one set of chapter headings. You get both navigation files in the correct format for each platform.',
  },
];

export default function EpubTocGuidePage() {
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
      { '@type': 'ListItem', position: 3, name: 'EPUB Table of Contents Guide', item: 'https://bookkraftai.com/epub-toc-guide' },
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
          <span style={{ color: 'var(--ink)' }}>EPUB Table of Contents Guide</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 16 }}>
          EPUB Table of Contents Guide
        </h1>
        <p style={{ fontSize: 17, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 48 }}>
          Every EPUB needs two navigation files: nav.xhtml for EPUB 3 readers and toc.ncx for backward compatibility with older systems. A missing or malformed navigation document is one of the most common causes of KDP rejection and EPUBCheck failures. This guide covers the format for both files, nested TOC structure, and what validators check.
        </p>

        {/* Two TOC files */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          The two navigation files in every EPUB
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          A valid EPUB 3 file contains two table of contents documents, serving different reading systems:
        </p>
        <ul style={{ fontSize: 16, lineHeight: 1.9, color: 'var(--ink)', paddingLeft: '1.4em', marginBottom: 16, opacity: 0.9 }}>
          <li><strong>nav.xhtml</strong> — the primary navigation document required by the EPUB 3 specification. An XHTML file with a <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>{'<nav epub:type="toc">'}</code> element containing links to every content file in reading order. EPUB 3 reading systems — Kindle apps, Apple Books, Kobo — read this file for in-app navigation.</li>
          <li><strong>toc.ncx</strong> — the legacy navigation document from EPUB 2, included in EPUB 3 files for backward compatibility. Older e-readers, some EPUB validators, and certain platform checks look for this file. Most EPUB build tools generate both automatically; if you are editing an EPUB manually and only have nav.xhtml, adding toc.ncx is strongly recommended.</li>
        </ul>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          Both files must be listed in the OPF manifest. The OPF <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>spine</code> element references the content reading order; the navigation files are separate from the spine but must point to the same content files.
        </p>

        {/* nav.xhtml format */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          nav.xhtml format (EPUB 3)
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          The nav.xhtml file is a complete XHTML document. The TOC itself lives inside a <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>{'<nav epub:type="toc">'}</code> element. Each chapter is an <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>{'<li>'}</code> containing a link to the chapter's XHTML file:
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 16, fontFamily: 'monospace' }}>
          <code>{`<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:epub="http://www.idpf.org/2007/ops">
<head>
  <meta charset="utf-8"/>
  <title>Table of Contents</title>
</head>
<body>
  <nav epub:type="toc" id="toc">
    <ol>
      <li><a href="chapter01.xhtml">Chapter 1: The Beginning</a></li>
      <li><a href="chapter02.xhtml">Chapter 2: The Middle</a></li>
      <li><a href="chapter03.xhtml">Chapter 3: The End</a></li>
    </ol>
  </nav>
</body>
</html>`}</code>
        </pre>
        <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.65, marginBottom: 48 }}>
          The <code style={{ fontFamily: 'monospace', fontSize: 13, background: 'var(--cream)', padding: '1px 4px', borderRadius: 3 }}>epub:type="toc"</code> attribute on the <code style={{ fontFamily: 'monospace', fontSize: 13, background: 'var(--cream)', padding: '1px 4px', borderRadius: 3 }}>{'<nav>'}</code> element is required — it signals to reading systems that this element is the table of contents. Without it, the nav.xhtml file exists but may not be recognized as navigation.
        </p>

        {/* toc.ncx format */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          toc.ncx format (EPUB 2 / backward compatibility)
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          The toc.ncx file uses a different XML structure. Each chapter is a <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>{'<navPoint>'}</code> element with a sequential <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>playOrder</code> attribute. The <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>dtb:uid</code> meta value should match the book's unique identifier from the OPF:
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 48, fontFamily: 'monospace' }}>
          <code>{`<?xml version="1.0" encoding="utf-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid"   content="urn:uuid:YOUR-BOOK-UUID-HERE"/>
    <meta name="dtb:depth" content="1"/>
  </head>
  <docTitle><text>Book Title Here</text></docTitle>
  <navMap>
    <navPoint id="np-1" playOrder="1">
      <navLabel><text>Chapter 1: The Beginning</text></navLabel>
      <content src="chapter01.xhtml"/>
    </navPoint>
    <navPoint id="np-2" playOrder="2">
      <navLabel><text>Chapter 2: The Middle</text></navLabel>
      <content src="chapter02.xhtml"/>
    </navPoint>
    <navPoint id="np-3" playOrder="3">
      <navLabel><text>Chapter 3: The End</text></navLabel>
      <content src="chapter03.xhtml"/>
    </navPoint>
  </navMap>
</ncx>`}</code>
        </pre>

        {/* Nested TOC */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Nested TOCs — parts and chapters
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          For books with a hierarchy — parts containing chapters, or chapters with sections — both nav.xhtml and toc.ncx support nesting. In nav.xhtml, nest a second <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>{'<ol>'}</code> inside the parent <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>{'<li>'}</code>:
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 16, fontFamily: 'monospace' }}>
          <code>{`<nav epub:type="toc" id="toc">
  <ol>
    <li>
      <a href="part1.xhtml">Part One: The Storm</a>
      <ol>
        <li><a href="chapter01.xhtml">Chapter 1</a></li>
        <li><a href="chapter02.xhtml">Chapter 2</a></li>
      </ol>
    </li>
    <li>
      <a href="part2.xhtml">Part Two: The Calm</a>
      <ol>
        <li><a href="chapter03.xhtml">Chapter 3</a></li>
      </ol>
    </li>
  </ol>
</nav>`}</code>
        </pre>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          In toc.ncx, nest <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>{'<navPoint>'}</code> elements as children of a parent <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>{'<navPoint>'}</code>. Update the <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>dtb:depth</code> meta value to reflect the maximum nesting depth — 2 for two levels, 3 for three.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          Nested TOCs work well for books with parts. For prose novels without parts, a flat single-level TOC is simpler and sufficient.
        </p>

        {/* OPF manifest declarations */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          OPF manifest declarations
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Both navigation files must be declared in the OPF manifest. nav.xhtml requires the <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>properties="nav"</code> attribute so reading systems can locate it:
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 16, fontFamily: 'monospace' }}>
          <code>{`<!-- In content.opf, inside <manifest> -->
<item id="nav"    href="nav.xhtml"
      media-type="application/xhtml+xml"
      properties="nav"/>
<item id="ncx"    href="toc.ncx"
      media-type="application/x-dtbncx+xml"/>`}</code>
        </pre>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          The <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>spine</code> element also needs a <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>toc</code> attribute pointing to the NCX item id:
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 48, fontFamily: 'monospace' }}>
          <code>{`<spine toc="ncx">
  <itemref idref="chapter01"/>
  <itemref idref="chapter02"/>
  <itemref idref="chapter03"/>
</spine>`}</code>
        </pre>

        {/* KDP requirements */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          KDP navigation requirements
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          KDP validates that an uploaded EPUB contains a navigation document before accepting the file. Files missing nav.xhtml fail with a navigation error. KDP uses the navigation document to generate the in-book Kindle TOC — the table of contents readers access from the Go To menu on their device.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Each entry in your nav.xhtml should link to a content file that exists in the EPUB archive and is listed in the OPF manifest. Links to files that are present in the nav but missing from the archive cause navigation errors on Kindle devices.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          Apple Books is stricter: it requires EPUB 3 and validates nav.xhtml more rigorously than KDP. Run your EPUB through the{' '}
          <Link href="/tools/epub-validator" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            free EPUB Validator
          </Link>
          {' '}before uploading to any platform to catch navigation errors before the store sees them.
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
          For the full EPUB build workflow — manuscript cleanup, formatting, and platform submission — see the{' '}
          <Link href="/epub-formatting-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB formatting guide
          </Link>
          . For Kindle-specific EPUB structure and OPF requirements, see the{' '}
          <Link href="/kindle-epub-format" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            Kindle EPUB format guide
          </Link>
          . For a complete reference on OPF metadata fields — dc:title, dc:language, dc:identifier, and how stores use each field — see the{' '}
          <Link href="/epub-metadata-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB metadata guide
          </Link>
          . For EPUB CSS — safe properties for paragraphs, headings, and page breaks — see{' '}
          <Link href="/epub-css-for-ebooks" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            CSS for EPUB files
          </Link>
          .
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 32, opacity: 0.9 }}>
          For common validation errors related to navigation — missing nav.xhtml, malformed toc.ncx, broken content references — see the{' '}
          <Link href="/epub-errors/missing-ncx-navigation" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            missing NCX navigation error guide
          </Link>
          {' '}and the full{' '}
          <Link href="/epub-errors" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB error reference
          </Link>
          . For how chapter file splitting relates to TOC entry structure — how spine items map to navigable chapters — see{' '}
          <Link href="/chapter-breaks-epub" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            chapter breaks in EPUB
          </Link>
          .
        </p>

        {/* CTA */}
        <div style={{ padding: '28px 24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Generate nav.xhtml and toc.ncx from your chapter headings.</p>
          <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 20 }}>Paste your manuscript or chapter list. Get correct nav.xhtml (EPUB 3) and toc.ncx (NCX) output — no hand-coding.</p>
          <Link
            href="/tools/toc-generator"
            style={{ display: 'inline-block', padding: '13px 30px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}
          >
            Open TOC Generator →
          </Link>
        </div>

      </main>
      <Footer />
    </>
  );
}
