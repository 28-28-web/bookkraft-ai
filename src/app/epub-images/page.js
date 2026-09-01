import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Images in EPUB Files — Formats, Alt Text, Cover Declaration, and Manifest | BookKraft AI',
  description: 'Every image in an EPUB must be declared in the OPF manifest, referenced correctly in content files, and include alt text. This guide covers safe image formats, the cover image manifest property, and common image errors.',
  alternates: { canonical: 'https://bookkraftai.com/epub-images' },
  robots: 'index, follow',
};

const formatRows = [
  { format: 'JPEG / JPG', support: 'Supported', mediaType: 'image/jpeg', notes: 'Safe for all platforms. Use for photos and complex images with gradients.' },
  { format: 'PNG', support: 'Supported', mediaType: 'image/png', notes: 'Safe for all platforms. Use for illustrations, diagrams, and images with transparency.' },
  { format: 'GIF', support: 'Variable', mediaType: 'image/gif', notes: 'Static GIF works in most readers. Animations are generally not rendered — e-readers do not play animated GIFs.' },
  { format: 'SVG', support: 'Variable', mediaType: 'image/svg+xml', notes: 'Support varies significantly by reading system. Not safe for all platforms — test before relying on SVG.' },
  { format: 'WebP', support: 'Avoid', mediaType: 'image/webp', notes: 'Not part of the core EPUB image format specification. Avoid for maximum compatibility.' },
];

const faqs = [
  {
    q: 'What image formats are safe to use in EPUB?',
    a: 'JPEG and PNG are the safe choices for EPUB images — both are in the EPUB core media types specification and supported across all major reading systems. GIF works for static images but animations are not rendered by e-readers. SVG support varies significantly across reading systems; if you need to use SVG, test your file on the specific platforms you are targeting. WebP is not in the EPUB core media types and should be avoided.',
  },
  {
    q: 'Does every image in my EPUB need alt text?',
    a: 'Yes. Every <img> element in your EPUB content files requires an alt attribute. Apple Books has enforced this requirement since 2022 — files with img elements missing alt attributes are rejected at submission. KDP is more permissive, but omitting alt text also breaks accessibility for screen reader users. Use a descriptive alt value for images that convey meaning; use an empty alt="" for purely decorative images to indicate they should be skipped by assistive technology.',
  },
  {
    q: 'How do I declare the cover image in the OPF?',
    a: 'The cover image must be declared in the OPF manifest with properties="cover-image" on the item element. This is separate from the cover.xhtml content file — the properties attribute marks the image file itself, not the HTML page that contains it. Missing this declaration is one of the most common EPUB errors: the image is present in the archive but not flagged as the cover, so KDP and Apple Books show a blank cover in store listings.',
  },
  {
    q: 'What size should interior images be in my ebook?',
    a: "Interior image sizing recommendations vary by platform and device. In general, keep individual image file sizes small to avoid large EPUB archives — very large EPUBs can fail upload size limits. For image pixel dimensions, e-readers display images at the screen's native resolution, so very high-resolution images add file size without visible benefit on most devices. Check current KDP and Apple Books documentation for their current file size guidelines, as these change.",
  },
  {
    q: 'Can I use SVG images in EPUB?',
    a: 'SVG is in the EPUB 3 core media types specification, but support in reading systems varies. Some platforms render SVG inline images correctly; others do not. If you use SVG, declare it in the OPF manifest with media-type="image/svg+xml". For critical images — chapter headers, illustrations — use JPEG or PNG instead to ensure they render on all platforms. SVG is more reliably supported when used as a fallback or for simple decorative graphics.',
  },
  {
    q: 'My EPUB validator says "missing manifest resource" for an image — what does that mean?',
    a: 'A "missing manifest resource" error for an image means one of two things: either the image is referenced in a content file (via <img src="...">) but not declared in the OPF manifest, or the image is declared in the manifest but the actual file is absent from the EPUB archive. Fix: open your OPF manifest and confirm every image that appears in your XHTML files has a corresponding <item> entry with the correct href path and media-type. Then confirm the image file itself exists at that path inside the archive.',
  },
];

export default function EpubImagesPage() {
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
      { '@type': 'ListItem', position: 3, name: 'Images in EPUB Files', item: 'https://bookkraftai.com/epub-images' },
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
          <span style={{ color: 'var(--ink)' }}>Images in EPUB Files</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 16 }}>
          Images in EPUB Files
        </h1>
        <p style={{ fontSize: 17, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 48 }}>
          Every image in an EPUB must be declared in the OPF manifest, referenced correctly in content files, and include alt text. A missing manifest entry is one of the most common causes of EPUB validation failures. A missing alt attribute on an img element causes Apple Books to reject the file at submission. This guide covers image formats, how to add images to chapter content, the special cover image declaration, and what validators check.
        </p>

        {/* Image formats */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Image formats — what's safe and what to hedge
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          The EPUB specification defines a set of core media types that all reading systems must support. JPEG and PNG are in the core set. Other formats have varying support:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--cream)', borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--ink)' }}>Format</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--ink)', whiteSpace: 'nowrap' }}>Support</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--ink)', fontFamily: 'monospace', fontSize: 12 }}>media-type</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--ink)', minWidth: 200 }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {formatRows.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                  <td style={{ padding: '10px 14px', color: 'var(--ink)', fontWeight: 500 }}>{r.format}</td>
                  <td style={{
                    padding: '10px 14px', whiteSpace: 'nowrap', fontWeight: 600,
                    color: r.support === 'Supported' ? 'var(--ink)' : r.support === 'Avoid' ? '#c0392b' : 'var(--gold)',
                  }}>{r.support}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: 12, color: 'var(--mid)', whiteSpace: 'nowrap' }}>{r.mediaType}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--mid)', lineHeight: 1.5 }}>{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Inline images */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Inline images in chapter content
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Images appear in chapter XHTML files using a standard <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>{'<img>'}</code> element. The <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>src</code> path is relative to the content file's location in the archive:
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 16, fontFamily: 'monospace' }}>
          <code>{`<!-- In a chapter XHTML file -->
<img src="../Images/chapter01-illustration.jpg"
     alt="A map of the island showing the three villages"/>`}</code>
        </pre>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Every image referenced in content files must also be declared in the OPF manifest:
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 16, fontFamily: 'monospace' }}>
          <code>{`<!-- In content.opf, inside <manifest> -->
<item id="img-chapter01"
      href="Images/chapter01-illustration.jpg"
      media-type="image/jpeg"/>

<item id="img-diagram"
      href="Images/diagram.png"
      media-type="image/png"/>`}</code>
        </pre>
        <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.65, marginBottom: 48 }}>
          An image present in the archive but not in the manifest triggers a "missing manifest resource" validation error. An image referenced in a content file but physically absent from the archive also fails validation. Both must match.
        </p>

        {/* Cover image */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Cover image — the special manifest declaration
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          The cover image requires a specific <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>properties="cover-image"</code> attribute on its manifest item. This is what tells KDP and Apple Books which image to display in their store listings and library views. Without it, the cover image may be physically present but not recognized — resulting in a blank or default cover on the store page:
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 16, fontFamily: 'monospace' }}>
          <code>{`<!-- In content.opf, inside <manifest> -->
<!-- The image file itself gets properties="cover-image" -->
<item id="cover-image"
      href="Images/cover.jpg"
      media-type="image/jpeg"
      properties="cover-image"/>

<!-- The cover XHTML page is a separate item without that property -->
<item id="cover-page"
      href="cover.xhtml"
      media-type="application/xhtml+xml"/>`}</code>
        </pre>
        <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.65, marginBottom: 48 }}>
          The <code style={{ fontFamily: 'monospace', fontSize: 13, background: 'var(--cream)', padding: '1px 4px', borderRadius: 3 }}>properties="cover-image"</code> attribute goes on the image file item, not on the XHTML page that displays it. A cover.xhtml file may contain the cover image via an <code style={{ fontFamily: 'monospace', fontSize: 13, background: 'var(--cream)', padding: '1px 4px', borderRadius: 3 }}>{'<img>'}</code> tag, but it is the image item in the manifest that needs the property.
        </p>

        {/* Alt text */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Alt text — required, not optional
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Every <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>{'<img>'}</code> element in an EPUB must have an <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>alt</code> attribute. Apple Books enforces this requirement and rejects EPUB files where img elements are missing alt attributes. The attribute serves two purposes: it describes the image to screen readers, and it provides text if the image fails to load.
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 16, fontFamily: 'monospace' }}>
          <code>{`<!-- Image that conveys meaning — describe it -->
<img src="../Images/chart.png"
     alt="Bar chart showing annual sales by region from 2020 to 2024"/>

<!-- Purely decorative image — use empty alt to skip in screen readers -->
<img src="../Images/divider.png" alt=""/>`}</code>
        </pre>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          The distinction matters: a missing <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>alt</code> attribute is an error. An empty <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>alt=""</code> is valid — it explicitly signals that the image is decorative and should be ignored by assistive technology.
        </p>

        {/* Image sizing */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Image sizing and file size
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          E-readers display images at the screen's native resolution — very high-resolution images add file size without visible benefit on most devices. For interior images, a resolution that matches common e-reader screen densities is sufficient; you do not need print-quality 300 DPI images in an ebook.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          KDP and other platforms have upload size limits for EPUB files. Very large image files — especially uncompressed PNG files — are the most common cause of oversized EPUBs. Compress images before including them in your EPUB, particularly JPEGs where quality above 80–85% is rarely visible on e-ink screens.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          For specific file size limits and cover image dimension requirements, check current KDP and Apple Books documentation — these numbers change and any specific figure here may be outdated.
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
          . For EPUB OPF metadata — the manifest and package document structure that declares all files including images — see the{' '}
          <Link href="/epub-metadata-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB metadata guide
          </Link>
          . For alt text and other accessibility requirements, see{' '}
          <Link href="/epub-accessibility" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            accessible EPUB
          </Link>
          .
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 32, opacity: 0.9 }}>
          For image-related validation errors — missing manifest resource, cover image not declared, missing alt text — see the{' '}
          <Link href="/epub-errors" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB error reference
          </Link>
          .
        </p>

        {/* CTA */}
        <div style={{ padding: '28px 24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Validate your EPUB — free, including image and manifest checks.</p>
          <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 20 }}>Checks image references, cover image declaration, missing manifest resources, and alt text — no Java, no install, runs in the browser.</p>
          <Link
            href="/tools/epub-validator"
            style={{ display: 'inline-block', padding: '13px 30px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}
          >
            Validate Your EPUB Free →
          </Link>
        </div>

      </main>
      <Footer />
    </>
  );
}
