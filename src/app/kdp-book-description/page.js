import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'KDP Book Description Guide — HTML Formatting, Length, and Copywriting | BookKraft AI',
  description: 'Your KDP book description is your Amazon sales page copy. This guide covers the character limit, supported HTML formatting tags, copywriting structure, and how the description relates to search visibility.',
  alternates: { canonical: 'https://bookkraftai.com/kdp-book-description' },
  robots: 'index, follow',
};

const htmlTags = [
  { tag: '<b>, <strong>', effect: 'Bold text', use: 'Emphasize key selling points, genre, series name' },
  { tag: '<i>, <em>', effect: 'Italic text', use: 'Book titles, foreign phrases, emphasis' },
  { tag: '<br>', effect: 'Line break', use: 'Force a line break within a paragraph' },
  { tag: '<p>', effect: 'Paragraph', use: 'Separate sections of the description' },
  { tag: '<ul>, <li>', effect: 'Bulleted list', use: 'Key themes, series info, comp titles' },
  { tag: '<ol>, <li>', effect: 'Numbered list', use: 'Series reading order, steps' },
  { tag: '<h2>–<h6>', effect: 'Section headings', use: 'Header above blurb, genre label, awards' },
];

const faqs = [
  {
    q: 'Does the KDP book description affect Amazon search ranking?',
    a: "Amazon's search algorithm is proprietary — the exact weight it assigns to description keywords versus title, subtitle, and backend keywords is not publicly documented. The description is one signal among several; backend keywords and title keywords are generally considered higher-priority for search placement. Treat the description primarily as conversion copy — it is what readers read to decide whether to buy — and place your most important keywords naturally within it, not stuffed for ranking.",
  },
  {
    q: 'What HTML tags does KDP support in book descriptions?',
    a: 'KDP supports a subset of HTML for description formatting. Commonly supported tags include <b>, <strong>, <i>, <em>, <br>, <p>, <ul>, <ol>, <li>, and heading tags from <h2> through <h6>. Tags that are not supported and will appear as raw text or be stripped include <a> (links), <div>, <span>, <img>, and <table>. KDP\'s supported tag set may change — test any tag you depend on by checking the preview in the KDP dashboard before publishing.',
  },
  {
    q: 'Do HTML tags count toward the character limit?',
    a: "HTML tags count toward KDP's character limit. A description written entirely in plain text will fit more words than the same description with HTML formatting tags, because the tag characters (<b>, </b>, etc.) are counted. If you are close to the limit, check the character count in the KDP dashboard directly — it shows the current count of your entered text including tags.",
  },
  {
    q: 'What is the character limit for a KDP book description?',
    a: "KDP's book description field has a character limit. The commonly cited limit is approximately 4,000 characters including HTML tags. This limit may change — check the current character counter in the KDP dashboard when writing your description, as the dashboard indicates when you are approaching or at the limit.",
  },
  {
    q: "What's the difference between the KDP description and A+ Content?",
    a: "A+ Content is an additional content block that can appear below the standard description on your Amazon product page. It supports images, comparison charts, and richer formatting. A+ Content availability depends on your KDP enrollment status. The standard KDP description is always available. If you have access to A+ Content, use the description for your primary sales blurb and A+ Content for supplementary content like author biography, series overview, or visual elements.",
  },
  {
    q: 'Can I update my KDP description after the book is published?',
    a: "Yes. You can edit your book description at any time from the KDP dashboard. Changes typically take 24–72 hours to appear on the Amazon product page. Updating your description does not affect your book's publication status or require re-review of the book file.",
  },
];

export default function KdpBookDescriptionPage() {
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
      { '@type': 'ListItem', position: 2, name: 'KDP Formatting Guide', item: 'https://bookkraftai.com/kdp-formatting-guide' },
      { '@type': 'ListItem', position: 3, name: 'KDP Book Description', item: 'https://bookkraftai.com/kdp-book-description' },
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
          <Link href="/kdp-formatting-guide" style={{ color: 'var(--mid)', textDecoration: 'none' }}>KDP Formatting Guide</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>KDP Book Description</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 16 }}>
          KDP Book Description Guide
        </h1>
        <p style={{ fontSize: 17, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 48 }}>
          Your KDP book description is the primary sales copy on your Amazon product page. It is not a summary — it is the argument for why a reader should buy this book over the hundreds of similar ones they will scroll past. This guide covers the character limit, how to use HTML formatting in the KDP dashboard, a copywriting structure that works for fiction and nonfiction, and how the description relates to search visibility.
        </p>

        {/* What it is */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          What the KDP description field is — and what it's not
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          The description you enter in the KDP dashboard appears as the main text block on your Amazon product page, below the title and author name. It is separate from:
        </p>
        <ul style={{ fontSize: 16, lineHeight: 1.9, color: 'var(--ink)', paddingLeft: '1.4em', marginBottom: 16, opacity: 0.9 }}>
          <li><strong>Backend keywords</strong> — the seven keyword fields in KDP that affect search placement but are not visible to readers. Those are separate from the description and entered in a different step.</li>
          <li><strong>EPUB metadata (dc:description)</strong> — the description field in your EPUB's OPF file. KDP does not pull this onto your Amazon product page; the product page description comes from the KDP dashboard only.</li>
          <li><strong>A+ Content</strong> — an additional image-and-text content block available to some KDP authors, displayed below the main description.</li>
        </ul>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          The description is what readers read to decide whether to buy. Write it as conversion copy — hook, premise, stakes — not as a plot synopsis.
        </p>

        {/* Length */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Length and character limit
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          KDP's book description field accepts up to approximately 4,000 characters, including any HTML formatting tags you add. HTML tags (<code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>{'<b>'}</code>, <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>{'<p>'}</code>, <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>{'<ul>'}</code>, etc.) count toward the total — a heavily formatted description will fit fewer words than a plain-text one of the same character count.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          The KDP dashboard displays a live character counter as you type. Check the counter directly when writing — it will show your current count and the limit. The exact limit may change; rely on the dashboard counter rather than a memorized number. In practice, most effective descriptions run 200–400 words before formatting. Shorter descriptions (under 150 words) often underuse the available space; longer ones risk losing readers before the call to action.
        </p>

        {/* HTML formatting */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Supported HTML formatting
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          KDP's description field accepts a subset of HTML. You enter the tags directly in the description text box — the dashboard renders them in the preview and on the product page. The commonly supported tags:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 16 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--cream)', borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--ink)', fontFamily: 'monospace' }}>Tag</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--ink)' }}>Effect</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--ink)' }}>Use case</th>
              </tr>
            </thead>
            <tbody>
              {htmlTags.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: 13, color: 'var(--ink)', fontWeight: 500, whiteSpace: 'nowrap' }}>{r.tag}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink)' }}>{r.effect}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--mid)', lineHeight: 1.5 }}>{r.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.65, marginBottom: 48 }}>
          Tags not supported — they will appear as raw text or be stripped: <code style={{ fontFamily: 'monospace', fontSize: 13, background: 'var(--cream)', padding: '1px 4px', borderRadius: 3 }}>{'<a>'}</code> (links), <code style={{ fontFamily: 'monospace', fontSize: 13, background: 'var(--cream)', padding: '1px 4px', borderRadius: 3 }}>{'<div>'}</code>, <code style={{ fontFamily: 'monospace', fontSize: 13, background: 'var(--cream)', padding: '1px 4px', borderRadius: 3 }}>{'<span>'}</code>, <code style={{ fontFamily: 'monospace', fontSize: 13, background: 'var(--cream)', padding: '1px 4px', borderRadius: 3 }}>{'<img>'}</code>, <code style={{ fontFamily: 'monospace', fontSize: 13, background: 'var(--cream)', padding: '1px 4px', borderRadius: 3 }}>{'<table>'}</code>. KDP's supported tag set may change — preview any tag you depend on in the KDP dashboard before publishing.
        </p>

        {/* Example */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Description HTML — example structure
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          A formatted description that uses HTML to create visual hierarchy:
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 16, fontFamily: 'monospace' }}>
          <code>{`<h2>Perfect for fans of [Comp Title A] and [Comp Title B].</h2>

<p>Opening hook — one or two sentences that pull the reader in without
revealing too much. Lead with conflict, stakes, or a striking premise.</p>

<p>Three to five sentences expanding the premise: who the protagonist is,
what they want, what stands in their way, and what they risk losing.
Avoid plot synopsis — write toward the feeling of reading the book.</p>

<ul>
  <li>Genre and subgenre signals (e.g., "A slow-burn romance with...")</li>
  <li>Series information if applicable ("Book 2 in the Thornfield series")</li>
  <li>Content signals for readers who need them</li>
</ul>

<p><b>Author Name</b> is the author of [other titles].
[One sentence about author credibility or background, if relevant.]</p>`}</code>
        </pre>
        <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.65, marginBottom: 48 }}>
          The <code style={{ fontFamily: 'monospace', fontSize: 13, background: 'var(--cream)', padding: '1px 4px', borderRadius: 3 }}>{'<h2>'}</code> at the top creates a bold visual header above the blurb — commonly used for comp titles, a series label, or an award notation. The <code style={{ fontFamily: 'monospace', fontSize: 13, background: 'var(--cream)', padding: '1px 4px', borderRadius: 3 }}>{'<ul>'}</code> block breaks up a wall of text and gives readers scannable signals about the book.
        </p>

        {/* Copywriting structure */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Copywriting structure
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          A description that converts has three components:
        </p>
        <ol style={{ fontSize: 16, lineHeight: 1.9, color: 'var(--ink)', paddingLeft: '1.4em', marginBottom: 16, opacity: 0.9 }}>
          <li><strong>Hook</strong> — one or two sentences that establish premise, conflict, or a compelling question. Readers decide in the first line whether to keep reading. Write the hook last, after you have written the full blurb.</li>
          <li><strong>Blurb</strong> — three to five sentences covering protagonist, goal, obstacle, and stakes. For nonfiction: the problem the reader has, what the book gives them, and what changes for them after reading. Do not spoil resolution; end on unresolved tension.</li>
          <li><strong>Signals</strong> — series info, comp titles, content notes, author credibility. These help readers self-select — they confirm the book is right for them before they click Buy.</li>
        </ol>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          The most common mistake is writing a plot summary. A description is not a synopsis. It is a promise of an experience. Write toward the feeling of reading the book, not the sequence of events.
        </p>

        {/* Keywords */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Keywords in the description
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Amazon's search algorithm uses the description as one signal for keyword relevance. The exact weight it assigns to description keywords versus title, subtitle, series name, and backend keywords is not publicly documented. In practice:
        </p>
        <ul style={{ fontSize: 16, lineHeight: 1.9, color: 'var(--ink)', paddingLeft: '1.4em', marginBottom: 16, opacity: 0.9 }}>
          <li>Write the description for readers first. Forced keyword placement hurts conversion.</li>
          <li>Genre and subgenre terms that readers search for naturally appear in a well-written blurb — "cozy mystery", "enemies-to-lovers romance", "keto diet for beginners" — without stuffing.</li>
          <li>Use your seven KDP backend keyword fields for search terms that cannot be placed naturally in readable prose. The description is not a substitute for backend keywords.</li>
        </ul>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          For keyword strategy — how to find the right terms for backend keywords and category placement — see the{' '}
          <Link href="/amazon-keyword-research" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            Amazon keyword research guide
          </Link>
          {' '}and the{' '}
          <Link href="/kdp-category-keywords" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            KDP category keywords guide
          </Link>
          .
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
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginTop: 48, marginBottom: 32, opacity: 0.9 }}>
          For the full KDP publishing reference — formatting, metadata, and store submission — see the{' '}
          <Link href="/kdp-formatting-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            KDP formatting guide
          </Link>
          . For the OPF metadata that lives inside your EPUB file — separate from the KDP dashboard description — see the{' '}
          <Link href="/epub-metadata-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB metadata guide
          </Link>
          . For ebook pricing strategy — how royalty tiers interact with price selection, permafree, and Kindle Unlimited — see the{' '}
          <Link href="/kdp-ebook-pricing" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            KDP ebook pricing guide
          </Link>
          .
        </p>

        {/* CTA */}
        <div style={{ padding: '28px 24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Build your KDP description and metadata in one form — free.</p>
          <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 20 }}>Title, author, BISAC categories, keywords, short and long description — formatted for KDP, IngramSpark, and EPUB OPF at once.</p>
          <Link
            href="/tools/metadata-builder"
            style={{ display: 'inline-block', padding: '13px 30px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}
          >
            Open Metadata Builder →
          </Link>
        </div>

      </main>
      <Footer />
    </>
  );
}
