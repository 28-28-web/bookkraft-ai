import WordCleanupPage from './WordCleanupPage';

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
      <WordCleanupPage />
    </>
  );
}
