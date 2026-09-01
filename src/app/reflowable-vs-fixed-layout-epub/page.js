import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Reflowable vs Fixed-Layout EPUB — Which Format You Need | BookKraft AI',
  description: 'Most ebooks should use reflowable EPUB — text adapts to any screen. Fixed-layout locks content to fixed pixel dimensions and is only needed for picture books, comics, and design-critical content.',
  alternates: { canonical: 'https://bookkraftai.com/reflowable-vs-fixed-layout-epub' },
  robots: 'index, follow',
};

const decisionRows = [
  { type: 'Novel, memoir, narrative nonfiction', format: 'Reflowable', reason: 'Prose flows naturally to any screen size; reader controls font size' },
  { type: 'Self-help, how-to, business nonfiction', format: 'Reflowable', reason: 'No layout-critical elements; standard HTML handles images and tables' },
  { type: 'Textbook with tables and figures', format: 'Reflowable', reason: 'HTML tables adapt to screen width better than fixed-position elements' },
  { type: "Children's picture book", format: 'Fixed-layout', reason: 'Text is positioned at specific coordinates over or beside illustrations' },
  { type: 'Comics, manga, graphic novel', format: 'Fixed-layout', reason: 'Panel layout and reading order are part of the experience' },
  { type: 'Poetry with visual spacing', format: 'Fixed-layout', reason: 'Specific line breaks and spacing carry meaning that reflowing would destroy' },
  { type: 'Cookbook with photo layouts', format: 'Reflowable (usually)', reason: 'Inline images work; fixed-layout only needed when text overlays photos at specific positions' },
];

const faqs = [
  {
    q: 'Do most self-published ebooks use reflowable or fixed-layout?',
    a: 'Reflowable. The vast majority of self-published ebooks — novels, nonfiction, memoirs, how-to guides — are reflowable EPUBs. Fixed-layout is a specialized format for content where the spatial relationship between text and images is part of the reading experience and cannot be approximated by standard HTML flow.',
  },
  {
    q: 'Can I switch a finished EPUB from reflowable to fixed-layout?',
    a: 'Not by changing a setting. Fixed-layout and reflowable EPUBs require different OPF metadata and different content file structures. Fixed-layout content must also be designed to specific pixel dimensions upfront. Converting between them means rebuilding the content files from source.',
  },
  {
    q: 'Does KDP accept fixed-layout EPUBs?',
    a: 'Yes, KDP accepts fixed-layout EPUBs. Display quality varies by device: Kindle apps on iOS, Android, and Fire tablets render fixed-layout content well. Support on older dedicated Kindle e-ink devices is more limited. Test fixed-layout files in Kindle Previewer before submitting.',
  },
  {
    q: 'My cookbook has lots of photos — should I use fixed-layout?',
    a: "Most cookbooks work well as reflowable EPUBs with inline images. Fixed-layout is only necessary when text must appear at a specific position on a photo — for example, a step annotation overlaid on an illustration. If your cookbook uses the standard pattern of recipe text with images above or below it, reflowable handles that correctly.",
  },
  {
    q: "Does BookKraft's EPUB Formatter support fixed-layout?",
    a: "BookKraft's EPUB tools are optimized for reflowable EPUBs, which is the correct format for prose and most nonfiction. The EPUB Validator checks both types for structural errors. For fixed-layout picture books or comics, design tools like Adobe InDesign or Affinity Publisher handle fixed-layout EPUB export natively.",
  },
  {
    q: 'Why do some authors try to use fixed-layout for prose?',
    a: "Usually because they want their ebook to look exactly like their Word document — specific fonts, exact line breaks, the same page layout they designed on screen. Fixed-layout achieves that at the cost of accessibility (readers cannot change font size), poor rendering on small screens, and compatibility problems on e-ink devices. For prose, the right solution is a well-formatted reflowable EPUB with appropriate CSS, not a fixed-layout file.",
  },
];

export default function ReflowableVsFixedLayoutPage() {
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
      { '@type': 'ListItem', position: 3, name: 'Reflowable vs Fixed-Layout EPUB', item: 'https://bookkraftai.com/reflowable-vs-fixed-layout-epub' },
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
          <span style={{ color: 'var(--ink)' }}>Reflowable vs Fixed-Layout</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 16 }}>
          Reflowable vs Fixed-Layout EPUB
        </h1>
        <p style={{ fontSize: 17, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 48 }}>
          Two fundamentally different EPUB formats. Most authors need reflowable — and choosing fixed-layout for a prose book creates compatibility and accessibility problems with no benefit. Here is how to tell which one your book actually requires.
        </p>

        {/* Reflowable */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          What is a reflowable EPUB?
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          A reflowable EPUB adapts to whatever device and settings the reader uses. When a reader increases the font size on their Kindle, the text reflows — fewer words per line, more pages. When they switch from a phone to a tablet, the text fills the wider screen. The reading system (Kindle app, Apple Books, Kobo) controls layout; the reader controls their preferences.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Reflowable is the standard for all prose: novels, memoirs, self-help books, narrative nonfiction, how-to guides, essays. It works on every e-reader, phone, and tablet. It is also what screen readers and accessibility tools rely on — text-to-speech, adjustable contrast, and large-print mode all depend on text that can reflow.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          If your book is prose and someone asks what format to publish it in, the answer is reflowable EPUB.
        </p>

        {/* Fixed-layout */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          What is a fixed-layout EPUB?
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          A fixed-layout EPUB locks each page to specific pixel dimensions. Nothing reflows. Text appears at exact coordinates — like a PDF. The reader cannot change the font size because the font size is part of the design. The reading system scales the fixed canvas to fit the screen and adds letterbox bars where needed.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Fixed-layout exists for content where the spatial relationship between text and images is part of the experience — where you cannot use standard HTML flow because the position of each element matters. Picture books are the primary case: a character's name appears at a specific point on an illustration, not above or below it. Comics and manga use fixed-layout for the same reason: panel layout and reading order are integral to how the story works.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          Fixed-layout EPUBs are significantly more complex to build. They require specific OPF metadata declarations, content files with explicit viewport dimensions, and content designed to those exact pixel dimensions from the start. Most self-publishing tools generate reflowable EPUBs; fixed-layout typically requires design software like Adobe InDesign or Affinity Publisher.
        </p>

        {/* Decision table */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>
          Which format does your book need?
        </h2>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
            <thead>
              <tr style={{ background: 'var(--cream)', borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--ink)' }}>Book type</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--ink)', whiteSpace: 'nowrap' }}>Format</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--ink)', minWidth: 200 }}>Why</th>
              </tr>
            </thead>
            <tbody>
              {decisionRows.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                  <td style={{ padding: '10px 14px', color: 'var(--ink)', fontWeight: 500 }}>{r.type}</td>
                  <td style={{ padding: '10px 14px', color: r.format.startsWith('Fixed') ? 'var(--gold)' : 'var(--ink)', fontWeight: r.format.startsWith('Fixed') ? 600 : 400, whiteSpace: 'nowrap' }}>{r.format}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--mid)', fontSize: 14, lineHeight: 1.5 }}>{r.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Platform support */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Platform support
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          <strong>Amazon KDP</strong> accepts both reflowable and fixed-layout EPUBs. For fixed-layout, display quality varies by device: Kindle apps on iOS, Android, and Fire tablets render fixed-layout content well. Older dedicated Kindle e-ink devices have more limited support. Always test fixed-layout files in Kindle Previewer before submitting.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          <strong>Apple Books</strong> supports both types. Fixed-layout renders well in the Books app on iPad, which has the screen space to display fixed-canvas pages without excessive letterboxing.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          For reflowable EPUBs, platform compatibility is not a concern — they work on every major platform and device. This is one more reason to default to reflowable: there is no device-specific testing to do beyond standard EPUB validation.
        </p>

        {/* Why not fixed-layout for prose */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Why fixed-layout is wrong for prose
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Some authors try to use fixed-layout because they want their ebook to look exactly like their Word document — specific fonts, exact line breaks, the same page layout they see on screen. Fixed-layout achieves that at a real cost:
        </p>
        <ul style={{ fontSize: 16, lineHeight: 1.9, color: 'var(--ink)', paddingLeft: '1.4em', marginBottom: 48, opacity: 0.9 }}>
          <li><strong>Readers cannot change font size</strong> — a significant accessibility problem and a frustration for anyone with vision difficulties.</li>
          <li><strong>Small screens zoom and pan</strong> — a fixed canvas designed for one screen size will appear miniaturized on a phone, forcing readers to pinch-zoom and scroll.</li>
          <li><strong>Accessibility tools break</strong> — text-to-speech, high-contrast mode, and screen readers work with reflowing text, not absolutely positioned elements in a fixed canvas.</li>
          <li><strong>More complex to validate and update</strong> — fixed-layout files have more structural requirements and are harder to edit after the fact.</li>
        </ul>

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
          For the full reflowable EPUB build workflow — manuscript cleanup, TOC, metadata, and platform submission — see the{' '}
          <Link href="/epub-formatting-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB formatting guide
          </Link>
          . For Kindle-specific EPUB structure and OPF requirements, see the{' '}
          <Link href="/kindle-epub-format" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            Kindle EPUB format guide
          </Link>
          . For a comparison of book formatting tools — desktop apps, online tools, and browser-based converters — see{' '}
          <Link href="/book-formatting-software" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            book formatting software
          </Link>
          .
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 32, opacity: 0.9 }}>
          For the EPUB navigation document format — nav.xhtml structure, toc.ncx, and KDP navigation requirements — see the{' '}
          <Link href="/epub-toc-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB TOC guide
          </Link>
          . For a complete OPF metadata reference — required fields, ISBNs, language codes, and how stores use each field — see the{' '}
          <Link href="/epub-metadata-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB metadata guide
          </Link>
          .
        </p>

        {/* CTA */}
        <div style={{ padding: '28px 24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Build a valid reflowable EPUB — free, no Calibre needed.</p>
          <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 20 }}>Paste your manuscript or upload a .docx file. Valid EPUB 3.0 output with correct structure, metadata, and navigation.</p>
          <Link
            href="/tools/epub-formatter"
            style={{ display: 'inline-block', padding: '13px 30px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}
          >
            Open EPUB Formatter →
          </Link>
        </div>

      </main>
      <Footer />
    </>
  );
}
