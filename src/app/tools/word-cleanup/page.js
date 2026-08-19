import WordCleanupPage from './WordCleanupPage';

export const metadata = {
  title: 'Reformat a Word Document for Publishing — Free Checker | BookKraft AI',
  description: 'Before reformatting your Word document for KDP, scan for double spaces, straight quotes, and stray formatting. Free, runs in your browser, no signup.',
  alternates: {
    canonical: 'https://bookkraftai.com/tools/word-cleanup',
  },
};

export default function Page() {
  return (
    <>
      <WordCleanupPage />
    </>
  );
}
