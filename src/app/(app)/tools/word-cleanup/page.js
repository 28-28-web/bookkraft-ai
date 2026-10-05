import WordCleanupPage from './WordCleanupPage';

const faqs = [
  {
    q: 'Does this tool edit or fix my manuscript?',
    a: 'No — this is a read-only scanner. It reports formatting issues (double spaces, straight quotes, blank paragraphs, stray bold/italic) so you can decide what to fix. Automatic cleanup is coming in a future update.',
  },
  {
    q: 'What file types are supported?',
    a: 'Only .docx (Microsoft Word format) is supported right now. Older .doc files and Google Docs exports must be re-saved as .docx first.',
  },
  {
    q: 'Does this tool upload my manuscript anywhere?',
    a: 'No. The file is read and scanned entirely in your browser using JSZip. Nothing is uploaded to a server.',
  },
  {
    q: 'Why do straight quotes matter?',
    a: 'Most ebook and print formatters expect curly (typographic) quotes. Straight quotes left over from plain-text drafting or copy-pasting can look unprofessional and trip up some conversion tools.',
  },
];

export const metadata = {
  title: 'Reformat a Word Document for Publishing — Free Checker | BookKraft AI',
  description: 'Before reformatting your Word document for KDP, scan for double spaces, straight quotes, and stray formatting. Free, runs in your browser, no signup.',
  alternates: {
    canonical: 'https://bookkraftai.com/tools/word-cleanup',
  },
};

export default function Page() {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Word Manuscript Cleanup Checker',
    url: 'https://bookkraftai.com/tools/word-cleanup',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web Browser',
    description: 'Free Word document checker that scans manuscripts for tracked changes, field codes, and formatting habits from Word or Google Docs that cause EPUB conversion problems. No signup required.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <WordCleanupPage faqItems={faqs.map((f) => ({ name: f.q, acceptedAnswer: { text: f.a } }))}>
        <div className="seo-content" style={{ maxWidth: 800, margin: '3rem auto', padding: '0 1rem' }}>
          <h2>Free Word Manuscript Cleanup Checker</h2>
          <p>Before you send a manuscript to a formatter, editor, or KDP, run it through a quick technical scan. This tool reads your .docx file directly in your browser and reports formatting issues that are easy to miss after months of writing and revising — double spaces, straight quotes, stacked blank paragraphs, and manually-applied bold or italic formatting.</p>
          <h2>What This Tool Checks</h2>
          <p>Six checks run automatically: double spaces, blank paragraph stacking, trailing spaces at the end of paragraphs, double hyphens that should likely be em dashes, straight quote marks instead of curly quotes, and text runs with bold or italic applied directly rather than through a heading style.</p>
          <h2>Read-Only, Runs Entirely in Your Browser</h2>
          <p>Your file never leaves your device. It&apos;s parsed with JavaScript in your browser tab and discarded when you close or refresh the page. This is a report-only tool for now — it flags issues but doesn&apos;t rewrite your file.</p>
          <h2>Who This Is For</h2>
          <p>Authors doing a final technical check before formatting or upload. Freelance editors validating a manuscript before handing it back to a client. Anyone who wants a fast, free second opinion on a .docx file before it goes further down the pipeline.</p>
        </div>
      </WordCleanupPage>
    </>
  );
}
