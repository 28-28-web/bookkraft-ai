import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'CSS for EPUB Files — Safe Styles for Kindle, Apple Books, and Kobo | BookKraft AI',
  description: 'EPUB CSS is not browser CSS. E-readers support a limited subset of CSS 2.1 — and override many properties at the reader level. This guide covers safe, broadly-supported styles for paragraphs, headings, and page breaks.',
  alternates: { canonical: 'https://bookkraftai.com/epub-css-for-ebooks' },
  robots: 'index, follow',
};

const safeRows = [
  { prop: 'font-family', support: 'Supported', notes: 'Readers may override with their chosen font. Use as a suggestion, not a guarantee.' },
  { prop: 'font-size (em / %)', support: 'Supported', notes: 'Use em or % — not px. Pixel values can block reader font-scaling on some platforms.' },
  { prop: 'font-weight: bold / normal', support: 'Supported', notes: 'Numeric weights (400, 700) work in most readers; avoid values like 300 or 600 where rendering is inconsistent.' },
  { prop: 'font-style: italic / normal', support: 'Supported', notes: '' },
  { prop: 'text-align', support: 'Supported', notes: 'left, center, right, justify all work. justify can produce uneven spacing on narrow e-ink screens.' },
  { prop: 'text-indent', support: 'Supported', notes: 'Standard method for paragraph first-line indent. Use em units.' },
  { prop: 'line-height', support: 'Supported', notes: 'Unitless values (e.g., 1.5) are most reliable across reading systems.' },
  { prop: 'margin / padding', support: 'Supported', notes: 'Use em units. Large pixel margins behave unpredictably on small screens.' },
  { prop: 'color', support: 'Supported', notes: 'May be overridden by reader color/contrast/night mode settings.' },
  { prop: 'background-color', support: 'Variable', notes: 'Often overridden by reader themes. Do not rely on background color to convey meaning.' },
  { prop: 'page-break-before / after', support: 'Supported', notes: 'Reliable for forcing chapter starts onto a new page. Use on h1 elements.' },
  { prop: 'display: block / inline', support: 'Supported', notes: '' },
  { prop: 'display: flex / grid', support: 'Avoid', notes: 'Support varies significantly across reading systems. Not suitable for primary layout.' },
  { prop: '@font-face (custom fonts)', support: 'Platform-specific', notes: 'Subject to platform-specific embedding rules. Check current KDP and Apple Books documentation.' },
  { prop: 'CSS custom properties (--var)', support: 'Avoid', notes: 'Not supported in older reading systems and some current e-readers.' },
  { prop: 'CSS transitions / animations', support: 'Not supported', notes: 'E-reader environments do not run CSS animations.' },
  { prop: '@media queries', support: 'Limited', notes: 'Support is inconsistent across reading systems. Avoid for critical layout decisions.' },
];

const faqs = [
  {
    q: 'Can I use Flexbox or CSS Grid in my EPUB?',
    a: 'Support for Flexbox and Grid varies significantly across reading systems and is generally unreliable. Kindle, older Kobo devices, and some e-ink readers have limited or no support for these layout models. For reliable results across all platforms, use block-level layout — standard div, p, and heading elements with margin and padding — rather than Flexbox or Grid.',
  },
  {
    q: 'Can I embed custom fonts in an EPUB?',
    a: "EPUB supports font embedding via @font-face, but each platform has its own rules for how embedded fonts are handled. Readers can override fonts at the system level regardless. Platform-specific font obfuscation requirements, licensing restrictions, and the reader's own font settings all affect whether a custom font actually renders. If font rendering is critical to your design, check current documentation for each platform you are publishing to.",
  },
  {
    q: 'Why does my EPUB look different on Kindle versus Apple Books?',
    a: "Kindle converts EPUB to its own internal format during processing — CSS is reinterpreted, not rendered directly. Apple Books renders EPUB closer to a browser environment. Kobo sits between the two. Each reading system applies its own default styles on top of yours. This is why EPUB CSS is always about providing suggestions that reading systems apply within their own rendering rules, not controlling exact visual output the way a web page controls a browser.",
  },
  {
    q: 'Should I use px, em, or % for font sizes?',
    a: "Use em or % — not px. Pixel font sizes can interfere with the reader's own font-scaling controls on some platforms, meaning readers who increase font size in their device settings may not see the change take effect. em values scale with the reader's base font size, which is the correct behavior for accessible ebook typography.",
  },
  {
    q: 'How do I prevent the first paragraph of a chapter from being indented?',
    a: "Use the adjacent sibling selector: h1 + p { text-indent: 0; }. This removes the indent from the first paragraph immediately after an h1 heading — the standard typographic convention for book layout. Apply the same rule for h2 + p if your book has section headings. Note that not all e-readers support the adjacent sibling selector; test in your target platforms if this detail is important to your design.",
  },
  {
    q: 'Can I use CSS to add a drop cap to the first chapter paragraph?',
    a: "Drop caps via CSS (using ::first-letter with float: left and a large font-size) have inconsistent support in e-readers. Some reading systems render them correctly; others produce layout breaks or ignore the styles. If you include a drop cap, test it in Kindle Previewer and any other target platform before publishing. If cross-platform consistency matters more than the drop cap effect, skip it.",
  },
];

export default function EpubCssForEbooksPage() {
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
      { '@type': 'ListItem', position: 3, name: 'CSS for EPUB Files', item: 'https://bookkraftai.com/epub-css-for-ebooks' },
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
          <span style={{ color: 'var(--ink)' }}>CSS for EPUB Files</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 16 }}>
          CSS for EPUB Files
        </h1>
        <p style={{ fontSize: 17, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 48 }}>
          EPUB CSS is not the same as browser CSS. E-readers support a limited subset of CSS — and override many properties based on reader settings for font size, color theme, and line spacing. Writing CSS for ebooks means providing reliable baseline styles while accepting that readers control the final rendering. This guide covers the properties that work consistently, the ones to avoid, and the standard patterns for ebook typography.
        </p>

        {/* How EPUB CSS works */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          How EPUB CSS works differently from browser CSS
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          In a web browser, your CSS controls the page. In an e-reader, your CSS is one input among several — the reading system applies its own default styles, the reader's chosen font and font-size override yours, and night mode or sepia themes change colors regardless of what you set. This is by design: ebook readers exist to give readers control over their reading experience.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Kindle adds another layer: KDP converts EPUB to an internal format during processing. Your CSS is reinterpreted rather than rendered directly. Some properties survive the conversion intact; others are dropped or transformed. Apple Books renders EPUB more directly, closer to a browser environment. Kobo and other readers sit at various points in between.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          The practical rule: write CSS that establishes good defaults for readers who have not changed their settings, and avoid relying on any property that a reader could legitimately override — colors, fonts, and font sizes especially.
        </p>

        {/* Paragraph styles */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Paragraph styles
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Paragraph styling is the most important CSS decision in an ebook. The standard book-typography pattern is first-line indent with no space between paragraphs — not the web convention of space between paragraphs and no indent. Apply this globally and remove the indent from the first paragraph after each heading:
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 16, fontFamily: 'monospace' }}>
          <code>{`/* Standard book paragraph style */
p {
  margin: 0;
  padding: 0;
  text-indent: 1.5em;
  line-height: 1.6;
  text-align: left;
}

/* No indent for first paragraph after heading */
h1 + p,
h2 + p,
h3 + p {
  text-indent: 0;
}

/* Block quotes — indent the whole element */
blockquote {
  margin: 1em 2em;
  text-indent: 0;
}`}</code>
        </pre>
        <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.65, marginBottom: 48 }}>
          The adjacent sibling selector (<code style={{ fontFamily: 'monospace', fontSize: 13, background: 'var(--cream)', padding: '1px 4px', borderRadius: 3 }}>h1 + p</code>) removes the indent from the paragraph directly after a heading. Support for this selector varies across older reading systems — if your target audience includes older Kobo or NOOK devices, test this pattern specifically.
        </p>

        {/* Headings */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Heading styles
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Chapter titles are typically h1 elements. Use centered alignment and enough top margin to visually separate them from preceding content. Most e-readers also apply their own heading styles, so these values are defaults that can be overridden:
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 48, fontFamily: 'monospace' }}>
          <code>{`h1 {
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  margin-top: 2em;
  margin-bottom: 1.5em;
  line-height: 1.3;
  page-break-before: always; /* start on new page */
}

h2 {
  font-size: 1.2em;
  font-weight: bold;
  text-align: left;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

h3 {
  font-size: 1em;
  font-weight: bold;
  text-align: left;
  margin-top: 1em;
  margin-bottom: 0.25em;
}`}</code>
        </pre>

        {/* Page breaks */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Page breaks between chapters
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          In EPUB, each chapter is a separate XHTML content file — the spine in the OPF declares the reading order. Within a single content file, you can also force a page break using CSS:
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 16, fontFamily: 'monospace' }}>
          <code>{`/* Force a new page before the element */
.chapter-title {
  page-break-before: always;
}

/* Prevent a break inside an element */
.no-break {
  page-break-inside: avoid;
}`}</code>
        </pre>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          If your EPUB splits each chapter into its own XHTML file — which is the recommended structure — the reading system automatically starts each file on a new page. CSS page breaks are mainly useful when multiple sections exist within a single content file.
        </p>

        {/* Safe properties table */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>
          CSS properties — what works and what to avoid
        </h2>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--cream)', borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--ink)', fontFamily: 'monospace' }}>Property</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--ink)', whiteSpace: 'nowrap' }}>Support</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--ink)', minWidth: 220 }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {safeRows.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: 13, color: 'var(--ink)', fontWeight: 500, whiteSpace: 'nowrap' }}>{r.prop}</td>
                  <td style={{
                    padding: '10px 14px',
                    whiteSpace: 'nowrap',
                    fontWeight: 600,
                    color: r.support === 'Supported' ? 'var(--ink)' : r.support === 'Avoid' || r.support === 'Not supported' ? '#c0392b' : 'var(--gold)',
                  }}>{r.support}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--mid)', lineHeight: 1.5 }}>{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Linking CSS */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Linking CSS to your EPUB content files
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Each XHTML content file in your EPUB links to the stylesheet via a standard <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>{'<link>'}</code> element in the <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>{'<head>'}</code>:
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 16, fontFamily: 'monospace' }}>
          <code>{`<!-- In each chapter XHTML file's <head> -->
<link href="../Styles/style.css" rel="stylesheet" type="text/css"/>`}</code>
        </pre>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          The CSS file must also be declared in the OPF manifest:
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 16, fontFamily: 'monospace' }}>
          <code>{`<!-- In content.opf, inside <manifest> -->
<item id="stylesheet"
      href="Styles/style.css"
      media-type="text/css"/>`}</code>
        </pre>
        <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.65, marginBottom: 48 }}>
          A CSS file present in the EPUB archive but not listed in the OPF manifest will not cause a validation error, but it may be ignored by some reading systems. Always declare it in the manifest.
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
          For the full EPUB build workflow — manuscript cleanup, TOC, metadata, and platform submission — see the{' '}
          <Link href="/epub-formatting-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB formatting guide
          </Link>
          . For EPUB nav.xhtml and toc.ncx — the navigation documents that store TOC entries — see the{' '}
          <Link href="/epub-toc-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB TOC guide
          </Link>
          . For how chapter breaks in your content files relate to EPUB spine structure, see{' '}
          <Link href="/chapter-breaks-epub" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            chapter breaks in EPUB
          </Link>
          .
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          For Kindle-specific EPUB structure and formatting requirements, see the{' '}
          <Link href="/kindle-epub-format" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            Kindle EPUB format guide
          </Link>
          .
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 32, opacity: 0.9 }}>
          For font selection decisions — which typefaces to embed, licensing (OFL vs commercial), and subsetting — see the{' '}
          <Link href="/epub-fonts" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            fonts in EPUB files guide
          </Link>
          . That page covers the design-decision layer; this page covers the CSS syntax.
        </p>

        {/* CTA */}
        <div style={{ padding: '28px 24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Generate CSS snippets for common EPUB formatting patterns.</p>
          <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 20 }}>Paragraph indent, drop caps, blockquote styles, heading layouts — copy correct EPUB CSS directly into your stylesheet.</p>
          <Link
            href="/tools/css-snippet-generator"
            style={{ display: 'inline-block', padding: '13px 30px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}
          >
            Open CSS Snippet Generator →
          </Link>
        </div>

      </main>
      <Footer />
    </>
  );
}
