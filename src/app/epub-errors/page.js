import Link from 'next/link';
import { EPUB_ERRORS } from '@/lib/epubErrors';
import { PLATFORM_REJECTIONS } from '@/lib/platformRejections';
import Footer from '@/components/Footer';
import { buildBreadcrumbSchema } from '@/lib/seo';

const PAGE_URL = 'https://bookkraftai.com/epub-errors';
const DESCRIPTION = 'Every common EPUB error by type (package, TOC, XHTML, images, fonts) with what it means and how to fix it. Check your file free in the browser.';

export const metadata = {
  title: 'EPUB Errors: What Each One Means and How to Fix It | BookKraft AI',
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  robots: 'index, follow',
};

// One-line summaries per error page. EPUBCheck codes appear only where they
// match EPUBCheck's MessageBundle.properties; otherwise the error is described
// in words. Every EPUB_ERRORS slug must appear in exactly one group.
const GROUPS = [
  {
    heading: 'Package and container',
    items: [
      ['invalid-mimetype', 'The mimetype file is missing, isn\'t the first file in the ZIP, or doesn\'t contain application/epub+zip (PKG-006, PKG-007).'],
      ['missing-container-xml', 'META-INF/container.xml, which tells reading systems where the OPF file is, is missing (RSC-002) or can\'t be parsed.'],
      ['invalid-opf-structure', 'The OPF package document doesn\'t follow the expected structure, such as an element in the wrong place (RSC-005).'],
      ['unique-identifier-not-found', 'The package element\'s unique-identifier attribute points to an ID that no dc:identifier has (OPF-030).'],
      ['missing-dc-identifier', 'The OPF metadata has no dc:identifier element, which every EPUB needs.'],
      ['missing-language-declaration', 'The OPF metadata has no dc:language element.'],
      ['opf-role-attribute-not-allowed', 'An EPUB 2 opf:role attribute is used where EPUB 3 doesn\'t allow it (RSC-005).'],
    ],
  },
  {
    heading: 'Manifest and spine',
    items: [
      ['missing-manifest-resource', 'A file in the EPUB isn\'t declared in the OPF manifest (OPF-003).'],
      ['invalid-opf-manifest-reference', 'The manifest or a content file points to a file that isn\'t in the EPUB (RSC-007).'],
      ['duplicate-manifest-item', 'The same file or ID is declared more than once in the manifest (OPF-074 for a repeated file).'],
      ['broken-spine-order', 'A spine itemref points to a manifest ID that doesn\'t exist (OPF-049) or repeats one (OPF-034).'],
    ],
  },
  {
    heading: 'Navigation and table of contents',
    items: [
      ['missing-nav-document', 'An EPUB 3 file has no navigation document: no manifest item has the nav property.'],
      ['missing-ncx-navigation', 'The OPF references a toc.ncx file that isn\'t in the EPUB.'],
      ['toc-ncx-navpoint-mismatch', 'TOC entries point to a missing file (RSC-007) or a missing anchor (RSC-012), so the TOC jumps to the wrong place.'],
      ['broken-internal-link', 'A link inside the book points to a missing file (RSC-007) or a missing #anchor (RSC-012).'],
    ],
    more: [['/epub-toc-guide', 'EPUB table of contents guide'], ['/blog/kdp-no-toc-found-fix', 'KDP "No TOC Found" error'], ['/blog/fix-broken-toc-kindle', 'fixing a broken Kindle TOC']],
  },
  {
    heading: 'Content files (XHTML)',
    items: [
      ['malformed-xhtml-unclosed-tag', 'A chapter file isn\'t well-formed XHTML, for example an unclosed <br> or <img> tag (RSC-005).'],
      ['unescaped-ampersand-xhtml', 'A bare & in the text breaks XHTML parsing; it has to be written as &amp; (RSC-005).'],
      ['duplicate-id-epub', 'The same id value is used twice in one document (RSC-005).'],
    ],
  },
  {
    heading: 'Images and cover',
    items: [
      ['cover-image-not-declared', 'The cover image is in the EPUB but isn\'t marked with properties="cover-image" in the manifest.'],
      ['invalid-image-format', 'An image uses a format that isn\'t allowed where it\'s used, such as a TIFF in a chapter file.'],
      ['emf-image-fallback', 'A non-core resource such as an EMF image has no fallback (RSC-032).'],
      ['missing-alt-text', 'An img element has no alt attribute.'],
    ],
    more: [['/epub-images', 'images in EPUB files']],
  },
  {
    heading: 'Fonts and CSS',
    items: [
      ['font-link-validation', 'An embedded or referenced font couldn\'t be validated.'],
      ['invalid-font-file-corrupted', 'An embedded font file is damaged or isn\'t a valid font.'],
      ['ghost-spacing-epub', 'Not a validation error: extra blank lines show up between paragraphs in e-reader previews.'],
    ],
    more: [['/epub-fonts', 'fonts in EPUB files'], ['/epub-css-for-ebooks', 'EPUB CSS for ebooks'], ['/blog/ghost-spacing-opf-errors-epub-fix', 'ghost spacing and OPF errors']],
  },
  {
    heading: 'Store-specific',
    items: [
      ['title-tag-empty-kobo', 'The title element in content.opf is empty.'],
    ],
    more: [['/blog/epub-rejected-apple-books-fix', 'KDP accepted, Apple Books rejected']],
    stores: true,
  },
];

const FAQS = [
  {
    q: 'What is an EPUB error?',
    a: "An EPUB error is a place where your file doesn't conform to the EPUB specification. EPUBCheck, the W3C's conformance checker for EPUB publications, reports each problem with a message code, such as RSC-005, and a severity.",
  },
  {
    q: "What's the difference between an EPUBCheck error and a warning?",
    a: "EPUBCheck messages have a severity: fatal, error, warning, usage or info. Apple says books must pass the latest version of EPUBCheck, so fix every error it reports; clearing warnings too is good practice.",
  },
  {
    q: 'How do I find out which EPUB error my file has?',
    a: "Run EPUBCheck, a command-line tool, for a full conformance check, or the free BookKraft EPUB Validator for 11 structural checks in your browser. For KDP, also open the file in Kindle Previewer, which KDP recommends before you upload.",
  },
  {
    q: 'Will an EPUB error get my book rejected?',
    a: "It can. Apple says books must pass the latest version of EPUBCheck, and Draft2Digital validates uploaded EPUBs with EPUBCheck. KDP supports EPUB files that meet its Kindle Publishing Guidelines. Fix the errors before you upload, because an upload with them can fail.",
  },
  {
    q: 'Does KDP use EPUBCheck?',
    a: "KDP's help pages and Kindle Publishing Guidelines don't mention EPUBCheck. KDP recommends checking your EPUB in Kindle Previewer before you upload.",
  },
  {
    q: 'My EPUB passes EPUBCheck but still looks wrong. What next?',
    a: "Passing EPUBCheck means the file conforms to the specification; it doesn't guarantee how it looks. Check it in Kindle Previewer and in each store's preview, and see the store pages below. Display problems such as ghost spacing aren't conformance errors.",
  },
];

const LINK = { color: 'var(--gold, #c9a84c)', textDecoration: 'none' };
const H2 = { fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginTop: 40, marginBottom: 16 };
const P = { fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 20, opacity: 0.9 };

export default function EpubErrorsIndexPage() {
  const bySlug = Object.fromEntries(EPUB_ERRORS.map((e) => [e.slug, e]));

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://bookkraftai.com/' },
    { name: 'EPUB Errors', url: PAGE_URL },
  ]);
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'EPUB Errors and How to Fix Them',
    url: PAGE_URL,
    description: DESCRIPTION,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: EPUB_ERRORS.length,
      itemListElement: EPUB_ERRORS.map((e, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: e.title,
        url: `${PAGE_URL}/${e.slug}`,
      })),
    },
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main style={{ maxWidth: 700, margin: '0 auto', padding: '56px 24px 80px' }}>

        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--mid)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>EPUB Errors</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 16 }}>
          EPUB Errors and How to Fix Them
        </h1>

        <p style={P}>
          An EPUB error is a place where your file doesn&apos;t conform to the EPUB specification.{' '}
          <a href="https://www.w3.org/publishing/epubcheck/" target="_blank" rel="noopener nofollow" style={LINK}>EPUBCheck</a>, the W3C&apos;s conformance checker for EPUB publications, reports each problem with a code (such as RSC-005) and a severity: fatal, error, warning, usage or info.
        </p>
        <p style={P}>
          To find yours, run EPUBCheck (a command-line tool) for a full conformance check, or the free{' '}
          <Link href="/tools/epub-validator" style={LINK}>EPUB Validator</Link> for 11 structural checks in your browser. Then find the code or message below; each one links to a fix.
        </p>
        <p style={{ ...P, marginBottom: 32 }}>
          Apple says books must pass the latest version of EPUBCheck, and Draft2Digital validates uploaded EPUBs with EPUBCheck. KDP supports EPUB files that meet its Kindle Publishing Guidelines and recommends checking them in Kindle Previewer. An error EPUBCheck reports can make an upload fail.
        </p>

        <nav aria-label="Error groups" style={{ fontSize: 14, lineHeight: 1.9, marginBottom: 8 }}>
          {GROUPS.map((g, i) => (
            <span key={g.heading}>
              {i > 0 && <span aria-hidden="true" style={{ color: 'var(--mid)' }}> · </span>}
              <a href={`#${g.heading.toLowerCase().replace(/[^a-z]+/g, '-')}`} style={LINK}>{g.heading}</a>
            </span>
          ))}
        </nav>

        {GROUPS.map((g) => (
          <section key={g.heading} aria-labelledby={g.heading.toLowerCase().replace(/[^a-z]+/g, '-')}>
            <h2 id={g.heading.toLowerCase().replace(/[^a-z]+/g, '-')} style={H2}>{g.heading}</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {g.items.map(([slug, summary]) => (
                <li key={slug} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px' }}>
                  <Link href={`/epub-errors/${slug}`} style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', textDecoration: 'none' }}>
                    {bySlug[slug].title}
                  </Link>
                  <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.6, margin: '6px 0 0' }}>{summary}</p>
                </li>
              ))}
            </ul>
            {g.stores && (
              <p style={{ ...P, fontSize: 15, marginTop: 16, marginBottom: 8 }}>
                Store rejection guides:{' '}
                {PLATFORM_REJECTIONS.map((r, i) => (
                  <span key={r.slug}>
                    {i > 0 && ', '}
                    <Link href={`/platform-rejection/${r.slug}`} style={LINK}>{r.platform}</Link>
                  </span>
                ))}
                .
              </p>
            )}
            {g.more && (
              <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>
                More:{' '}
                {g.more.map(([href, label], i) => (
                  <span key={href}>
                    {i > 0 && ' · '}
                    <Link href={href} style={LINK}>{label}</Link>
                  </span>
                ))}
              </p>
            )}
          </section>
        ))}

        <h2 style={H2}>Frequently asked questions</h2>
        {FAQS.map((f) => (
          <div key={f.q} style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{f.q}</h3>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink)', opacity: 0.9, margin: 0 }}>{f.a}</p>
          </div>
        ))}

        <div style={{ marginTop: 40, marginBottom: 32, padding: '24px', background: 'var(--cream, #f7f3ec)', border: '1px solid var(--border)', borderRadius: 10 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Further reading</p>
          <ul style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.8, margin: 0, paddingLeft: 20 }}>
            <li><Link href="/blog/common-epub-validation-errors" style={LINK}>Common EPUB validation errors and how to fix them</Link></li>
            <li><Link href="/blog/pass-epubcheck-before-amazon" style={LINK}>How to pass EPUBCheck before uploading to Amazon</Link></li>
            <li><Link href="/blog/why-your-book-got-rejected" style={LINK}>Why your book got rejected</Link></li>
            <li><Link href="/mistakes/epub-formatting-mistakes" style={LINK}>EPUB formatting mistakes</Link> and <Link href="/mistakes/kindle-toc-mistakes" style={LINK}>Kindle TOC mistakes</Link></li>
            <li><Link href="/epub-formatting-guide" style={LINK}>EPUB formatting guide</Link>, to build the file correctly from the start</li>
            <li><Link href="/checklist" style={LINK}>Pre-upload publishing checklists</Link></li>
          </ul>
        </div>

        <div style={{ paddingTop: 32, borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: 14, color: 'var(--mid)', marginBottom: 16 }}>
            Not sure which error you have? The EPUB Validator runs 11 structural checks in your browser; your file isn&apos;t uploaded.
          </p>
          <Link
            href="/tools/epub-validator"
            style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--ink)', padding: '11px 24px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}
          >
            Validate Your EPUB Free →
          </Link>
        </div>

      </main>

      <Footer />
    </>
  );
}
