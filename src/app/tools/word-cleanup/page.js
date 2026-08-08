import WordCleanupPage from './WordCleanupPage';

export const metadata = {
  title: 'Word Manuscript Cleanup Checker — Free | BookKraft AI',
  description: 'Upload your .docx manuscript and instantly scan for double spaces, straight quotes, stray formatting, and blank-paragraph issues before you publish. Free, no signup, runs entirely in your browser.',
  alternates: {
    canonical: 'https://bookkraftai.com/tools/word-cleanup',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does this tool edit or fix my manuscript?',
      acceptedAnswer: { '@type': 'Answer', text: 'No — this is a read-only scanner. It reports formatting issues (double spaces, straight quotes, blank paragraphs, stray bold/italic) so you can decide what to fix. Automatic cleanup is coming in a future update.' },
    },
    {
      '@type': 'Question',
      name: 'What file types are supported?',
      acceptedAnswer: { '@type': 'Answer', text: 'Only .docx (Microsoft Word format) is supported right now. Older .doc files and Google Docs exports must be re-saved as .docx first.' },
    },
    {
      '@type': 'Question',
      name: 'Does this tool upload my manuscript anywhere?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. The file is read and scanned entirely in your browser using JSZip. Nothing is uploaded to a server.' },
    },
    {
      '@type': 'Question',
      name: 'Why do straight quotes matter?',
      acceptedAnswer: { '@type': 'Answer', text: 'Most ebook and print formatters expect curly (typographic) quotes. Straight quotes left over from plain-text drafting or copy-pasting can look unprofessional and trip up some conversion tools.' },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <WordCleanupPage />
    </>
  );
}
