import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Accessible EPUB — Alt Text, Heading Structure, Language, and Reading Order | BookKraft AI',
  description: 'Apple Books rejects EPUBs with missing alt text. This guide covers every accessibility requirement for EPUB files: alt text, language declarations, heading hierarchy, epub:type semantics, and logical reading order.',
  alternates: { canonical: 'https://bookkraftai.com/epub-accessibility' },
  robots: 'index, follow',
};

const faqs = [
  {
    q: 'Why does Apple Books reject EPUB files for missing alt text?',
    a: 'Apple Books enforces an accessibility requirement that all img elements in EPUB content files must have an alt attribute. A missing alt attribute — even on one image — causes the submission to be rejected with an accessibility error. The fix is straightforward: add an alt attribute to every img element. For images that convey meaning, describe the image. For purely decorative images, use alt="" (an empty string) to explicitly mark them as presentational.',
  },
  {
    q: 'Is EPUB accessibility required for KDP publishing?',
    a: 'KDP does not currently reject files for accessibility issues the way Apple Books does. However, the EPUB Accessibility 1.0 and 1.1 specifications define requirements that are becoming industry standards, and platform requirements can change. More practically: screen reader users are a real segment of your readership, and alt text, heading structure, and logical reading order improve the reading experience for everyone. These are low-effort requirements that also prevent Apple Books rejections.',
  },
  {
    q: 'What epub:type values should I use in my EPUB?',
    a: 'The most broadly useful epub:type values are: epub:type="toc" on the nav element in your navigation document; epub:type="chapter" on section or div elements containing chapter content; and landmark types (epub:type="cover", epub:type="frontmatter", epub:type="bodymatter", epub:type="backmatter") on nav element links in the landmarks nav. Note that epub:type attributes are semantic annotations — reading systems that support EPUB semantics use them to improve navigation, but they do not guarantee specific behavior or visual rendering on all platforms. Their support varies by reading system.',
  },
  {
    q: 'Does the dc:language metadata affect screen readers?',
    a: 'Yes. The dc:language element in the OPF package document declares the primary language of the publication. Screen readers use this to select the correct text-to-speech engine and pronunciation rules. An incorrect or missing language declaration causes screen readers to mispronounce the text. Use an IETF language tag — "en" for English, "fr" for French, "es" for Spanish. For regional variants, use "en-US", "en-GB", and so on. See the EPUB metadata guide for the full dc:language reference.',
  },
  {
    q: 'What is a logical reading order and why does it matter?',
    a: 'The logical reading order is the order in which content should be read from beginning to end — title page, copyright, dedication, chapters in sequence, and back matter. In an EPUB, this is determined by the spine element in the OPF: the sequence of itemref elements in the spine defines the reading order. If the spine order differs from the intended reading order — for example if chapters are listed out of sequence — screen readers and reading apps that follow the spine will present content in the wrong order. The fix is to ensure the spine sequence matches the intended reading sequence.',
  },
  {
    q: 'How do I test my EPUB for accessibility issues?',
    a: 'The primary tool for EPUB accessibility validation is EPUBCheck combined with the Ace by DAISY accessibility checker. EPUBCheck validates the EPUB structure and flags missing alt text as an error. Ace by DAISY performs a full accessibility audit against the EPUB Accessibility specification, checking heading structure, color contrast, reading order, and semantic markup. For quick validation without installing tools, BookKraft AI\'s EPUB Validator checks image references, missing alt text, and manifest declarations in the browser.',
  },
];

export default function EpubAccessibilityPage() {
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
      { '@type': 'ListItem', position: 3, name: 'Accessible EPUB', item: 'https://bookkraftai.com/epub-accessibility' },
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
          <span style={{ color: 'var(--ink)' }}>Accessible EPUB</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 16 }}>
          Accessible EPUB
        </h1>
        <p style={{ fontSize: 17, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 48 }}>
          Apple Books rejects EPUB files where any img element is missing an alt attribute — one omission causes the entire submission to fail. Beyond that single hard requirement, accessible EPUBs have a correct language declaration, a logical heading structure, meaningful epub:type annotations, and a spine that matches the intended reading order. These are the requirements this page covers: what they are, how to implement them, and how to validate them.
        </p>

        {/* Alt text */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Alt text on images
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Every <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>{'<img>'}</code> element in your EPUB content files must have an <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>alt</code> attribute. Apple Books enforces this and rejects files where any img element is missing the attribute. The attribute serves two roles: it describes images to screen reader users, and it tells automated validators that you have considered each image's accessibility:
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 16, fontFamily: 'monospace' }}>
          <code>{`<!-- Image that conveys content — describe what it shows -->
<img src="../Images/world-map.jpg"
     alt="Map showing the three expedition routes across the continent"/>

<!-- Decorative image — empty alt tells screen readers to skip it -->
<img src="../Images/chapter-divider.png" alt=""/>`}</code>
        </pre>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          A missing <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>alt</code> attribute and an empty <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>alt=""</code> are different things. Missing alt is an error that triggers Apple Books rejection. Empty alt is a valid signal that the image is decorative. For image format reference, manifest declarations, and cover image requirements, see{' '}
          <Link href="/epub-images" style={{ color: '#9c7f35', textDecoration: 'none' }}>images in EPUB files</Link>.
        </p>

        {/* Language declaration */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Language declaration
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          The <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>dc:language</code> element in the OPF package document declares the primary language of the publication. Screen readers use this declaration to select the correct text-to-speech engine and pronunciation rules. An incorrect or missing language declaration causes mispronunciation:
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 16, fontFamily: 'monospace' }}>
          <code>{`<!-- In content.opf, inside <metadata> -->
<dc:language>en</dc:language>

<!-- For regional variants -->
<dc:language>en-US</dc:language>
<dc:language>en-GB</dc:language>
<dc:language>fr-CA</dc:language>`}</code>
        </pre>
        <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.65, marginBottom: 48 }}>
          Use IETF BCP 47 language tags: "en" for English, "fr" for French, "de" for German, "es" for Spanish. For the full metadata reference including dc:language, see the{' '}
          <Link href="/epub-metadata-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>EPUB metadata guide</Link>.
        </p>

        {/* Heading structure */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Heading structure
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Headings in EPUB content files function as navigation landmarks. Screen readers and e-reader navigation panels let users jump between headings, so a correct heading hierarchy is as important as a correct table of contents. Use headings in sequence — don't skip from h1 to h3, don't use a heading tag for visual styling when the content isn't a structural heading:
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 16, fontFamily: 'monospace' }}>
          <code>{`<!-- Each chapter file typically has one h1 -->
<h1>Chapter 3: The Journey North</h1>

<!-- Sections within a chapter use h2 -->
<h2>Crossing the Border</h2>

<!-- Sub-sections use h3 -->
<h3>The First Night</h3>`}</code>
        </pre>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          The heading structure in content files should match the TOC structure in nav.xhtml. A chapter that appears in the TOC should have a heading in the content file at the corresponding level. For how EPUB TOC structure works — nav.xhtml and toc.ncx formats — see the{' '}
          <Link href="/epub-toc-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>EPUB TOC guide</Link>.
        </p>

        {/* epub:type */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          epub:type semantic annotations
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          The <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>epub:type</code> attribute adds semantic meaning to structural elements. Reading systems that support EPUB semantics use these annotations to improve navigation — for example, allowing users to jump directly to the table of contents or skip to the beginning of body content. These annotations assist reading systems and assistive technology that recognize EPUB semantics; their rendering effect varies by platform and is not guaranteed:
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 16, fontFamily: 'monospace' }}>
          <code>{`<!-- Navigation document — the toc nav element -->
<nav epub:type="toc" id="toc">
  <ol>...</ol>
</nav>

<!-- Landmarks nav — links to structural divisions -->
<nav epub:type="landmarks">
  <ol>
    <li><a epub:type="toc" href="nav.xhtml#toc">Table of Contents</a></li>
    <li><a epub:type="bodymatter" href="chapter01.xhtml">Start of Content</a></li>
  </ol>
</nav>

<!-- In chapter content files -->
<section epub:type="chapter">
  <h1>Chapter 1</h1>
  ...
</section>`}</code>
        </pre>
        <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.65, marginBottom: 48 }}>
          Common epub:type values include: <code style={{ fontFamily: 'monospace', fontSize: 13 }}>toc</code> (navigation document), <code style={{ fontFamily: 'monospace', fontSize: 13 }}>chapter</code> (chapter section), <code style={{ fontFamily: 'monospace', fontSize: 13 }}>cover</code> (cover page), <code style={{ fontFamily: 'monospace', fontSize: 13 }}>frontmatter</code> / <code style={{ fontFamily: 'monospace', fontSize: 13 }}>bodymatter</code> / <code style={{ fontFamily: 'monospace', fontSize: 13 }}>backmatter</code> (structural divisions), <code style={{ fontFamily: 'monospace', fontSize: 13 }}>copyright-page</code>, <code style={{ fontFamily: 'monospace', fontSize: 13 }}>dedication</code>.
        </p>

        {/* Reading order */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Reading order and the spine
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          The <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>&lt;spine&gt;</code> element in the OPF package document defines the logical reading order — the sequence in which content files should be read from beginning to end. Screen readers and reading apps that follow the EPUB specification present content in spine order. If spine order differs from intended reading order, the book reads incorrectly for these users:
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 16, fontFamily: 'monospace' }}>
          <code>{`<!-- In content.opf -->
<spine toc="ncx">
  <itemref idref="cover-page"/>
  <itemref idref="title-page"/>
  <itemref idref="copyright-page"/>
  <itemref idref="dedication"/>
  <itemref idref="toc-page"/>
  <itemref idref="chapter01"/>
  <itemref idref="chapter02"/>
  <itemref idref="chapter03"/>
  <itemref idref="about-author"/>
</spine>`}</code>
        </pre>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          Every content file in the spine must also be declared in the manifest. Files present in the manifest but absent from the spine are valid (for example, image files, CSS files) but content XHTML files that should be readable must appear in the spine. For how spine ordering relates to chapter structure, see the{' '}
          <Link href="/chapter-breaks-epub" style={{ color: '#9c7f35', textDecoration: 'none' }}>chapter breaks in EPUB guide</Link>.
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
          For EPUB validation that checks alt text, missing manifest resources, and structural issues, see the{' '}
          <Link href="/epub-errors" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB error reference
          </Link>
          . For the image-specific requirements — format support, cover image manifest declaration, and alt text — see{' '}
          <Link href="/epub-images" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            images in EPUB files
          </Link>
          .
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 32, opacity: 0.9 }}>
          For the full EPUB build workflow — TOC, metadata, CSS, chapter structure, and platform submission — see the{' '}
          <Link href="/epub-formatting-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB formatting guide
          </Link>
          .
        </p>

        {/* CTA */}
        <div style={{ padding: '28px 24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Check your EPUB for accessibility errors before submitting.</p>
          <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 20 }}>Validates alt text, heading structure, manifest completeness, and language declarations. Catches Apple Books rejection causes before upload.</p>
          <Link
            href="/tools/epub-validator-premium"
            style={{ display: 'inline-block', padding: '13px 30px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}
          >
            Run Accessibility Check →
          </Link>
        </div>

      </main>
      <Footer />
    </>
  );
}
