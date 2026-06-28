import Link from 'next/link';

const faqs = [
  {
    q: 'What file format does KDP require for ebooks?',
    a: 'KDP accepts EPUB and Word documents directly, and converts them internally. EPUB is the most reliable format because it is built for reflowable text across devices. PDFs are not recommended for ebooks since they use a fixed layout that does not adapt to different screen sizes.',
  },
  {
    q: 'Why does my manuscript look broken after pasting into KDP?',
    a: 'Pasting from Word or Google Docs often carries over smart quotes, double spaces, and hidden encoding artifacts that render incorrectly once converted. Running your text through a formatting tool before uploading catches most of these issues.',
  },
  {
    q: 'Do I need a Table of Contents for KDP?',
    a: 'Yes. KDP requires a clickable, properly structured Table of Contents for Kindle books. A missing or malformed TOC is one of the most common reasons books fail quality review.',
  },
  {
    q: 'What should I check before uploading my EPUB to KDP?',
    a: 'Validate the file structure, confirm metadata is complete, and preview how the file renders on different screen sizes. A free EPUB validator can catch structural errors before Amazon does.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const sections = [
  {
    title: '1. Clean up your manuscript first',
    body: 'Before any formatting happens, your manuscript needs a pass to remove the artifacts that come from writing in Word or Google Docs: smart quotes that convert inconsistently, double spaces, broken em dashes, and encoding errors that show up as strange characters. Skipping this step means every formatting issue downstream gets harder to spot.',
    tools: [{ name: 'Kindle Format Fixer', href: '/tools/kindle-format-fixer' }],
  },
  {
    title: '2. Build a clickable Table of Contents',
    body: 'KDP requires a properly structured, clickable TOC. The format differs slightly between Kindle, EPUB3, and older NCX-based readers. Getting this wrong is one of the most common reasons a book fails quality review.',
    tools: [{ name: 'TOC Generator', href: '/tools/toc-generator' }],
  },
  {
    title: '3. Write your front and back matter',
    body: 'A title page, copyright page, and dedication set reader expectations before chapter one. An author bio, an Also By page, and a call to join your mailing list do the same work after the last chapter. Both matter more than most authors think, especially for reviews and reader retention.',
    tools: [
      { name: 'Front Matter Generator', href: '/tools/front-matter-generator' },
      { name: 'Back Matter Generator', href: '/tools/back-matter-generator' },
    ],
  },
  {
    title: '4. Generate a valid EPUB file',
    body: 'EPUB is the format every major platform other than straight Kindle prefers, and it is what KDP converts your file into internally either way. Building a clean EPUB 3.0 file from the start, with correct chapter breaks, embedded metadata, and a properly structured cover, avoids a lot of downstream rejection issues.',
    tools: [{ name: 'EPUB Formatter', href: '/tools/epub-formatter' }],
  },
  {
    title: '5. Validate before you upload',
    body: 'An EPUB file can look fine on your screen and still fail upload or get flagged by Apple Books or Kobo, which have stricter validation than KDP. Checking structure, manifest completeness, and cover dimensions before you submit saves a rejection-and-resubmit cycle that can cost days.',
    tools: [
      { name: 'EPUB Validator', href: '/tools/epub-validator' },
      { name: 'EPUB Validator Pro', href: '/tools/epub-validator-premium' },
    ],
  },
  {
    title: '6. Build your metadata and keywords',
    body: 'Metadata is scattered across different fields depending on where you publish: KDP wants one format, IngramSpark another, EPUB OPF files yet another. Keywords and BISAC categories determine whether readers find your book at all. Getting both right before launch matters more than almost anything you do after publishing.',
    tools: [
      { name: 'Metadata Builder', href: '/tools/metadata-builder' },
      { name: 'KDP Keyword & Category Finder', href: '/tools/kdp-keyword-finder' },
    ],
  },
  {
    title: '7. Catch style inconsistencies before readers do',
    body: 'Character names spelled differently across chapters, capitalization that drifts, dialogue punctuation that changes style midway through, these are the kinds of issues human editors charge hundreds of dollars to catch. Running a style audit before publishing catches most of them in seconds.',
    tools: [
      { name: 'Manuscript Cleanup', href: '/tools/manuscript-cleanup' },
      { name: 'Style Sheet Auditor', href: '/tools/style-sheet-auditor' },
    ],
  },
];

export default function KdpFormattingGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px', color: 'var(--ink, #1a1a1a)' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          The Complete Guide to KDP eBook Formatting
        </h1>

        <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 48, opacity: 0.9 }}>
          Formatting a manuscript for Amazon KDP, Apple Books, and Kobo involves more steps than most authors expect: cleanup, structure, validation, metadata, and a handful of details that determine whether your book passes quality review on the first try. Here is the full process, step by step, with a tool for each one.
        </p>

        <div style={{ marginBottom: 48 }}>
          {sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 40, paddingBottom: 32, borderBottom: i < sections.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none' }}>
              <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12 }}>{s.title}</h2>
              <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.88, marginBottom: 16 }}>{s.body}</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {s.tools.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    style={{
                      display: 'inline-block',
                      padding: '8px 16px',
                      border: '1px solid rgba(201,168,76,0.4)',
                      borderRadius: 8,
                      color: '#9c7f35',
                      fontWeight: 600,
                      fontSize: 14,
                      textDecoration: 'none',
                    }}
                  >
                    {t.name} →
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          Considering an all-in-one app instead?
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          Some authors prefer a single app that handles writing and formatting together. If that sounds like a better fit for your workflow, see how BookKraft AI compares to the most common all-in-one options.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
          <Link href="/alternatives" style={{ display: 'inline-block', padding: '10px 20px', border: '1px solid rgba(201,168,76,0.4)', borderRadius: 8, color: '#9c7f35', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
            Compare All Alternatives →
          </Link>
        </div>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          Frequently asked questions
        </h2>
        {faqs.map((f, i) => (
          <div key={i} style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 19, fontWeight: 600, marginBottom: 8 }}>{f.q}</h3>
            <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.85 }}>{f.a}</p>
          </div>
        ))}

        <div style={{ marginTop: 48, padding: '24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 16 }}>Try the free EPUB Validator — no signup needed.</p>
          <Link href="/free-tools" style={{ display: 'inline-block', padding: '12px 28px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 600, textDecoration: 'none' }}>
            Start Free →
          </Link>
        </div>
      </main>
    </>
  );
}