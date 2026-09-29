import Link from 'next/link';
import Footer from '@/components/Footer';
import { buildBreadcrumbSchema } from '@/lib/seo';

export const metadata = {
  title: 'KDP Quality Issues: Why Your Book Was Flagged & How to Fix',
  description: 'KDP rejected your book or sent a quality notice? Every official KDP quality issue in plain English, with the fix for each. Check your EPUB free first.',
  alternates: { canonical: 'https://bookkraftai.com/kdp-quality-issues' },
  robots: 'index, follow',
};

const KDP = {
  quality: 'https://kdp.amazon.com/en_US/help/topic/G200952510',
  content: 'https://kdp.amazon.com/en_US/help/topic/G200672390',
  metadata: 'https://kdp.amazon.com/en_US/help/topic/G201097560',
  dashboard: 'https://kdp.amazon.com/en_US/help/topic/GWCUU33VBJHFSRYN',
  status: 'https://kdp.amazon.com/en_US/help/topic/G200627450',
  conversion: 'https://kdp.amazon.com/help?topicId=G202124410',
  cover: 'https://kdp.amazon.com/en_US/help/topic/G6GTK3T3NUHKLEFX',
  coverCriteria: 'https://kdp.amazon.com/en_US/help/topic/G200645690',
  publicDomain: 'https://kdp.amazon.com/en_US/help/topic/G200743940',
};

const STATUSES = [
  {
    name: 'Rejected in review',
    meaning: 'Your book went back to Draft and KDP emailed you the reason.',
    action: 'Fix the issue named in the email, then submit again. Review takes up to 3 business days (up to 10 for low-content books).',
  },
  {
    name: 'Quality notice',
    meaning: 'Your book is live, and a reader or KDP reported a problem. It appears in the Quality Notifications Dashboard.',
    action: 'Pick a response in the dashboard (I will fix, Not an issue, Cannot fix, Appeal or Decline). If you fix it, upload the new file from your Bookshelf. KDP reviews revised files within 3 days.',
  },
  {
    name: 'Blocked',
    meaning: 'KDP says the book does not meet its content guidelines. You cannot publish, edit or delete it.',
    action: 'Contact KDP support to ask what triggered the block.',
  },
];

// tools: free ones first. An empty list means BookKraft has no tool for it.
const REASONS = [
  {
    title: 'Typos',
    severity: 'Distracting',
    cause: 'Misspelled words, OCR errors, wrong punctuation, missing letters or junk characters. Readers report these most often.',
    fix: 'Fix the reported spot, then search the whole manuscript for the same mistake. KDP expects you to fix every instance, not only the one a reader found.',
    tools: [
      { href: '/tools/manuscript-cleanup', label: 'Manuscript Cleanup', note: 'AI credits. Catches repeated words and dialogue punctuation.' },
      { href: '/tools/style-sheet-auditor', label: 'Style Sheet Auditor', note: 'AI credits. Catches inconsistent names, capitalisation and hyphenation.' },
    ],
    toolNote: 'No BookKraft tool is a spell checker. Run your word processor’s spell check first.',
  },
  {
    title: 'Unsupported characters',
    severity: 'Critical when the text can’t be read',
    cause: 'Letters show up as boxes, question marks or jumbled strings. This usually comes from non-Unicode fonts or text run through OCR.',
    fix: 'Convert the document to Unicode. KDP’s own advice: create a new Word document, copy the text in and save again. Don’t use OCR to convert a PDF.',
    tools: [
      { href: '/tools/word-cleanup', label: 'Word Cleanup Checker', note: 'Free. Flags leftover Word formatting before you convert.' },
      { href: '/tools/kindle-format-fixer', label: 'Kindle Format Fixer', note: 'Starter. Fixes garbled encoding characters from Word exports.' },
    ],
  },
  {
    title: 'Metadata issues',
    cause: 'The title, subtitle, author or series on your cover doesn’t match what you typed in KDP. Or the title has extra keywords, “bestselling” or “free” in it. Or the description has URLs, email addresses or review quotes. Or your keywords and categories don’t match the book.',
    fix: 'Make every field match the cover and the file exactly. Keep title plus subtitle under 200 characters. Remove anything KDP’s metadata guidelines forbid.',
    tools: [
      { href: '/tools/metadata-builder', label: 'Metadata Builder', note: 'Free. Formats title, keywords and categories correctly.' },
    ],
  },
  {
    title: 'Cover issues',
    severity: 'Distracting',
    cause: 'The cover is blurry, has extra white margins, is missing, or includes promotional text.',
    fix: 'Upload a new cover at 1,600 × 2,560 px (width × height), RGB, as a JPEG or TIFF. Don’t stretch a small image to fit, because that makes it blurrier.',
    tools: [
      { href: '/tools/cover-checker', label: 'Cover Checker', note: 'Free. Checks size, ratio, colour profile and format.' },
    ],
  },
  {
    title: 'Formatting problems',
    severity: 'Critical for some',
    cause: 'KDP removes books from sale when body text is all bold, italic, underlined or linked; when text colour is forced (including white text or a black background); when margins take more than a quarter of the screen; or when print page numbers appear in the text. Forced alignment, forced font size and extra spacing are lesser issues.',
    fix: 'Remove the forced styles so the Kindle reader’s own settings take over. Check the result in Amazon’s free Kindle Previewer.',
    tools: [
      { href: '/tools/css-snippet-generator', label: 'CSS Snippet Generator', note: 'Starter. Gives Kindle-safe CSS to replace forced styles.' },
    ],
    toolNote: 'The free EPUB Validator checks structure, not styling, so it won’t catch these.',
  },
  {
    title: 'Links and navigation',
    severity: 'Critical or Destructive',
    cause: 'Broken table-of-contents links, footnotes that aren’t linked, or a missing navigation file. It is Critical if bonus content or links sit before the start of the book, or if the book links to banned sites such as stores or adult content.',
    fix: 'Rebuild the table of contents so every entry opens the right chapter. Move bonus material and links to the back.',
    tools: [
      { href: '/tools/epub-validator', label: 'EPUB Validator', note: 'Free. Checks that the navigation file exists and is declared.' },
      { href: '/tools/toc-generator', label: 'TOC Generator', note: 'Starter. Builds a clickable TOC and NCX.' },
    ],
  },
  {
    title: 'Tables',
    severity: 'Critical',
    cause: 'A table is cut off at the bottom of the screen at font size 3, or a table is used for layout rather than real data.',
    fix: 'Split big tables into smaller ones. KDP suggests no more than 5 columns and 50 rows. Use tables only for tabular data.',
    tools: [],
    toolNote: 'None. Check tables at several font sizes in Kindle Previewer.',
  },
  {
    title: 'Images',
    severity: 'Destructive, or Critical for full scans',
    cause: 'Blurry images or text inside images that can’t be read. A book made of scanned pages is removed from sale.',
    fix: 'Replace images with sharp JPEG or PNG files. Never upload body text as scanned images.',
    tools: [
      { href: '/tools/epub-validator', label: 'EPUB Validator', note: 'Free. Flags unsupported EMF/WMF images and oversized files.' },
    ],
  },
  {
    title: 'Duplicated or missing content',
    severity: 'Critical for a repeated, mislabelled chapter or large gaps',
    cause: 'A chapter appears twice, part of the text is missing, or the description promises images, audio or extras that aren’t in the book. These usually come from a bad export or merge.',
    fix: 'Compare your chapter list with the finished file, then export again from the source document.',
    tools: [
      { href: '/tools/manuscript-mode', label: 'Full Manuscript Mode', note: 'Free account. Rebuilds an EPUB from DOCX with chapters detected.' },
    ],
  },
  {
    title: 'Wrong content',
    severity: 'Always removed from sale',
    cause: 'Readers got something different from what the listing promised, usually because the wrong file was uploaded.',
    fix: 'Upload the correct file.',
    tools: [],
  },
  {
    title: 'Content unsuited for Kindle',
    severity: 'Rejected or removed',
    cause: 'Puzzle books, blank journals, colouring books, pattern books and facing-page translations don’t work as ebooks.',
    fix: 'Publish these as a paperback instead.',
    tools: [],
  },
  {
    title: 'Disappointing content',
    severity: 'Destructive',
    cause: 'The book is too short, is mostly content that’s free online, exists mainly to advertise, pushes readers to a subscription, has a poor translation, or puts bonus content before the book.',
    fix: 'Rework the book so it delivers what the listing promises. No tool can fix this for you.',
    tools: [],
  },
  {
    title: 'Content guideline problems',
    severity: 'Rejected, removed or blocked',
    cause: 'AI-generated text, images or translations that weren’t disclosed to KDP. A public-domain book with no differences from a free version already on Amazon. Content you don’t hold the rights to.',
    fix: 'Declare AI-generated content in the KDP publishing form (AI-assisted editing doesn’t need declaring). For public-domain books, add a translation, original annotations or 10+ original illustrations, and put “(Translated)”, “(Annotated)” or “(Illustrated)” in the title.',
    tools: [],
  },
];

const FAQS = [
  {
    q: 'How long does KDP take to review a book?',
    a: 'KDP says review takes up to 3 business days for most books and up to 10 business days for low-content books such as journals. Revised files sent through the Quality Notifications Dashboard are reviewed within 3 days.',
  },
  {
    q: 'Why was my quality notice marked “Reopened”?',
    a: 'KDP reopens an item when the problem is still in your latest file, or when your response doesn’t meet its quality guidelines. Fix every instance of the issue, not only the example in the email, then upload again.',
  },
  {
    q: 'Can I appeal a KDP quality notice?',
    a: 'Yes. The Quality Notifications Dashboard has an Appeal button next to “I will fix”, “Not an issue”, “Cannot fix” and “Decline”. If your book is Blocked instead, contact KDP support.',
  },
  {
    q: 'Can a quality notice affect my KDP account?',
    a: 'Most quality notices affect only that title until you fix it. For some issues, such as excessive disruptive hyperlinks, KDP’s quality guide says titles can be removed and account status affected, up to and including termination.',
  },
];

function Ext({ href, children }) {
  return <a href={href} target="_blank" rel="noopener nofollow" className="link-gold">{children}</a>;
}

export default function KdpQualityIssuesPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://bookkraftai.com/' },
    { name: 'KDP Quality Issues', url: 'https://bookkraftai.com/kdp-quality-issues' },
  ]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const h2 = { fontSize: '1.2rem', fontWeight: 700, marginBottom: 16, color: 'var(--ink)' };
  const body = { fontSize: 15, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16 };
  const muted = { fontSize: 14, lineHeight: 1.7, color: 'var(--mid)', margin: '0 0 6px' };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="content-page">

        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 32 }}>
          <Link href="/" className="link-mid">Home</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>KDP Quality Issues</span>
        </nav>

        <h1 className="content-h1">
          KDP Rejected or Flagged Your Book? Every Quality Issue and How to Fix It
        </h1>

        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16 }}>
          Most KDP rejections have nothing to do with how well you write. They come from KDP’s quality and content rules: a typo readers reported, a cover that doesn’t match your title, a table cut off on a phone. Every issue below comes from KDP’s own help pages, with a plain-English cause and the fix.
        </p>
        <p style={{ ...muted, marginBottom: 40 }}>
          If KDP wouldn’t accept your file at upload, that’s a file error instead. See{' '}
          <Link href="/platform-rejection/amazon-kdp" className="link-gold">why Amazon KDP rejects EPUB files</Link>.
        </p>

        <h2 style={h2}>First: which one did you get?</h2>
        <div className="content-list">
          {STATUSES.map(s => (
            <div key={s.name} className="section-divider">
              <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: 'var(--ink)' }}>{s.name}</p>
              <p style={muted}>{s.meaning}</p>
              <p style={{ ...muted, color: 'var(--ink)' }}><strong>What to do:</strong> {s.action}</p>
            </div>
          ))}
        </div>

        <div className="info-card">
          <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: 'var(--ink)' }}>
            Check your file before you resubmit
          </p>
          <p style={{ fontSize: 14, color: 'var(--mid)', marginBottom: 16, lineHeight: 1.6 }}>
            The free EPUB Validator runs in your browser and flags broken navigation, missing metadata, cover problems and unsupported images. No signup.
          </p>
          <Link href="/tools/epub-validator" className="btn btn-gold btn-cta">
            Run the Free EPUB Validator →
          </Link>
        </div>

        <h2 style={h2}>How KDP rates each issue</h2>
        <p style={body}>
          KDP’s <Ext href={KDP.quality}>Guide to Kindle Content Quality</Ext> sorts problems into three levels:
        </p>
        <ul style={{ ...body, paddingLeft: 20 }}>
          <li><strong>Critical:</strong> the book is removed from sale until you fix it.</li>
          <li><strong>Destructive:</strong> readers can’t understand what you meant.</li>
          <li><strong>Distracting:</strong> readers are briefly pulled out of the book.</li>
        </ul>
        <p style={{ ...muted, marginBottom: 40 }}>
          Too many Destructive or Distracting issues can also get a book removed or given a temporary quality warning on its product page.
        </p>

        <h2 style={h2}>The 13 KDP quality issues and their fixes</h2>
        <div className="content-list">
          {REASONS.map((r, i) => (
            <div key={r.title} className="section-divider">
              <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: 'var(--ink)' }}>
                {i + 1}. {r.title}
              </p>
              {r.severity && (
                <p style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--mid)', marginBottom: 10 }}>
                  {r.severity}
                </p>
              )}
              <p style={muted}><strong style={{ color: 'var(--ink)' }}>Why it happens:</strong> {r.cause}</p>
              <p style={muted}><strong style={{ color: 'var(--ink)' }}>Fix:</strong> {r.fix}</p>
              <p style={{ ...muted, margin: 0 }}>
                <strong style={{ color: 'var(--ink)' }}>BookKraft tool:</strong>{' '}
                {r.tools.length === 0 && !r.toolNote && 'None. This one is up to you.'}
                {r.tools.map((t, j) => (
                  <span key={t.href}>
                    {j > 0 && ' · '}
                    <Link href={t.href} className="link-gold">{t.label}</Link> ({t.note})
                  </span>
                ))}
                {r.toolNote && <>{r.tools.length > 0 && ' '}{r.toolNote}</>}
              </p>
            </div>
          ))}
        </div>

        <p style={{ ...muted, marginBottom: 40 }}>
          Also seeing “language differs from your file” or “fonts are not Unicode compliant” at upload? Those are conversion errors. KDP lists the fixes on its{' '}
          <Ext href={KDP.conversion}>file conversion errors page</Ext>, and the{' '}
          <Link href="/platform-rejection/amazon-kdp" className="link-gold">KDP EPUB rejection guide</Link> covers file-level problems.
        </p>

        <div className="info-card">
          <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: 'var(--ink)' }}>
            Fix formatting in one place with Starter
          </p>
          <p style={{ fontSize: 14, color: 'var(--mid)', marginBottom: 16, lineHeight: 1.6 }}>
            $19 one-time. Unlocks all 5 formatting tools, including the Kindle Format Fixer, TOC Generator and CSS Snippet Generator, plus 40 AI credits for AI tools like Manuscript Cleanup.
          </p>
          <Link href="/pricing" className="btn btn-gold btn-cta">
            See the Starter Plan →
          </Link>
        </div>

        <h2 style={h2}>After you fix it</h2>
        <ol style={{ ...body, paddingLeft: 20 }}>
          <li>Run the new file through the <Link href="/tools/epub-validator" className="link-gold">free EPUB Validator</Link>, then open it in Kindle Previewer.</li>
          <li>For a quality notice, pick “I will fix” in the <Ext href={KDP.dashboard}>Quality Notifications Dashboard</Ext> and upload the revised file from your Bookshelf.</li>
          <li>For a review rejection, submit the book again. It goes back into review.</li>
          <li>If your book is Blocked, contact KDP support. You can’t edit or delete a Blocked book yourself.</li>
        </ol>
        <p style={{ ...body, marginBottom: 40 }}>
          Want every fix in one place? Our book{' '}
          <a href="https://www.amazon.com/dp/B0HJ11BGQV" target="_blank" rel="noopener noreferrer" className="link-gold"><em>Why Your Book Got Rejected</em></a>{' '}
          walks through KDP and EPUB rejections in depth.
        </p>

        <h2 style={h2}>Common questions</h2>
        <div className="content-list">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="section-divider">
              <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: 'var(--ink)' }}>{q}</p>
              <p style={{ ...muted, margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>

        <h2 style={{ ...h2, fontSize: '1rem' }}>Sources</h2>
        <p style={muted}>Checked against KDP’s help pages in September 2026:</p>
        <ul style={{ ...muted, paddingLeft: 20, marginBottom: 32 }}>
          <li><Ext href={KDP.quality}>Guide to Kindle Content Quality</Ext></li>
          <li><Ext href={KDP.content}>Content Guidelines</Ext></li>
          <li><Ext href={KDP.metadata}>Metadata Guidelines for Books</Ext></li>
          <li><Ext href={KDP.dashboard}>Quality Notifications Dashboard</Ext></li>
          <li><Ext href={KDP.status}>Book Status</Ext></li>
          <li><Ext href={KDP.conversion}>Troubleshooting File Conversion Errors</Ext></li>
          <li><Ext href={KDP.cover}>Cover Image Guidelines</Ext></li>
          <li><Ext href={KDP.coverCriteria}>What criteria does my eBook’s cover image need to meet?</Ext></li>
          <li><Ext href={KDP.publicDomain}>Publishing Public Domain Content</Ext></li>
        </ul>

      </main>
      <Footer />
    </>
  );
}
