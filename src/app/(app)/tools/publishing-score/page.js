import PublishingScoreClient from './PublishingScoreClient';

const faqs = [
  {
    q: 'Is the Publishing Readiness Score free?',
    a: 'Yes. The 6-category score is completely free — no account, no signup, no credit card required. Paste your manuscript or upload a file and get your score instantly.',
  },
  {
    q: 'How does the scoring work?',
    a: 'Claude analyzes your manuscript text and scores it across six categories: Formatting Cleanliness (20 pts), Style Consistency (20 pts), Metadata Completeness (15 pts), Structure and TOC (15 pts), Front and Back Matter (15 pts), and KDP Keyword Readiness (15 pts). The total is out of 100. Each category also gets a good / warning / critical status and a one-sentence insight.',
  },
  {
    q: 'How long does the analysis take?',
    a: 'Usually under 10 seconds. The tool sends up to 4,000 characters of your manuscript to the analysis engine and returns scored results in one pass.',
  },
  {
    q: 'Does my manuscript get stored or uploaded to a server?',
    a: 'Your text is sent to the scoring API for analysis and is not stored. File uploads (.epub, .txt, .docx) are parsed in your browser — only the extracted text is sent, not the original file.',
  },
  {
    q: 'What file formats can I upload?',
    a: 'EPUB, TXT, and DOCX files are all accepted. For EPUB files, the tool extracts readable text from the content HTML files inside the archive. You can also paste text directly without uploading anything.',
  },
  {
    q: 'What should I do after getting my score?',
    a: 'Each category row shows which BookKraft tool fixes the issues found there — click through to use it. Formatting Cleanliness issues go to the Kindle Format Fixer; Structure and TOC issues to the TOC Generator; Front and Back Matter gaps to the Front Matter or Back Matter Generator. Fix the lowest-scoring categories first.',
  },
];

export const metadata = {
  title: 'Publishing Readiness Score — BookKraft AI',
  description: 'Upload your EPUB and get a scored breakdown across formatting, metadata, structure, and cover requirements — so you know exactly what to fix before submitting to KDP or Apple Books.',
  alternates: { canonical: 'https://bookkraftai.com/tools/publishing-score' },
  openGraph: {
    title: 'Publishing Readiness Score — BookKraft AI',
    description: 'Upload your EPUB and get a scored breakdown across formatting, metadata, structure, and cover requirements — so you know exactly what to fix before submitting to KDP or Apple Books.',
    url: 'https://bookkraftai.com/tools/publishing-score',
    siteName: 'BookKraft AI',
    type: 'website',
    images: [{ url: 'https://bookkraftai.com/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Publishing Readiness Score — BookKraft AI',
    description: 'See how publish-ready your eBook really is.',
  },
  robots: 'index, follow',
};

export default function PublishingScorePage() {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Publishing Readiness Score',
    url: 'https://bookkraftai.com/tools/publishing-score',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web Browser',
    description: 'Free tool that scores a manuscript or EPUB across 6 publishing readiness categories — formatting, metadata, structure, TOC, front/back matter, and KDP keyword readiness. No signup required.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PublishingScoreClient>
        <div className="seo-content" style={{ maxWidth: 800, margin: '3rem auto', padding: '0 1rem' }}>
          <h2>What Is a Publishing Readiness Score?</h2>
          <p>A Publishing Readiness Score is a 100-point assessment of your manuscript across six categories that directly affect whether your book will pass KDP review, sell well on Amazon, and read well on an eReader. Paste any portion of your manuscript — or upload your EPUB, TXT, or DOCX file — and get an instant breakdown with a score, status (good / warning / critical), and a one-sentence insight for each category. The analysis runs in seconds and is completely free with no account required.</p>

          <h2>What Each Category Checks</h2>
          <p><strong>Formatting Cleanliness (20 points)</strong> — Spots straight quotes instead of curly typographic quotes, double hyphens instead of em dashes, double spaces, encoding artifacts from Word or Google Docs exports, and inconsistent line break patterns. These are the exact issues KDP flags and readers notice in the reading experience.</p>
          <p><strong>Style Consistency (20 points)</strong> — Checks for character names spelled differently across the text, capitalization applied inconsistently to the same terms, hyphenation used in some places but not others, and dialogue punctuation style that shifts mid-manuscript. Style drift is one of the hardest problems to catch by re-reading your own work.</p>
          <p><strong>Metadata Completeness (15 points)</strong> — Evaluates how well your title, subtitle, and content signal the book's genre, audience, and subject to search algorithms. A metadata-complete manuscript makes it easier for Amazon, Apple Books, and Kobo to place it correctly — and for readers to find it.</p>
          <p><strong>Structure and TOC (15 points)</strong> — Examines your chapter organization and table of contents quality. A clear chapter structure improves navigation on eReaders and signals a professionally formatted book to store reviewers.</p>
          <p><strong>Front and Back Matter (15 points)</strong> — Assesses the completeness of your book's opening sections (title page, copyright page, dedication) and closing sections (author bio, Also By list, reader list call-to-action). Missing or thin front and back matter is a signal reviewers use to assess publication quality.</p>
          <p><strong>KDP Keyword Readiness (15 points)</strong> — Evaluates how well your text positions the book for keyword discoverability on Amazon. This category scores the organic keyword signals in your writing, not just the backend keyword fields — genre clarity, audience specificity, and thematic consistency all contribute.</p>

          <h2>Why Check Publishing Readiness Before You Submit</h2>
          <p>KDP and Apple Books both run automated checks when you upload. KDP is relatively lenient — it auto-corrects some formatting issues — but Apple Books rejects files for problems KDP would quietly accept. IngramSpark is stricter still and charges a revision fee if you need to resubmit. Knowing your score before submitting means you fix issues on your timeline rather than troubleshooting after a rejection.</p>
          <p>Beyond rejection risk, a low formatting or style consistency score is a signal that readers will notice something is off — even if they can't articulate what. Reviews that mention "amateurish formatting" or "inconsistent character names" come from exactly the problems these six categories catch. Running a readiness check before publishing is the same logic as proofreading before submitting: it costs nothing to catch a problem early, and real money to fix it after distribution.</p>

          <h2>Who This Tool Is For</h2>
          <p>Indie authors preparing for a first KDP or Apple Books submission who want to know what a store reviewer or algorithm sees. Self-publishers who have had a manuscript rejected without a clear reason and want a structured diagnostic. Experienced authors who publish frequently and want a fast pre-launch checklist that covers formatting, metadata, and keyword readiness in a single pass. The tool works for fiction and non-fiction at any manuscript length — paste a chapter or upload your full EPUB.</p>

          <h2>Frequently Asked Questions</h2>
          {faqs.map((f) => (
            <div key={f.q} style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, marginBottom: 4 }}>{f.q}</h3>
              <p style={{ margin: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </PublishingScoreClient>
    </>
  );
}