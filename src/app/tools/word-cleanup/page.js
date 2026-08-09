import WordCleanupPage from './WordCleanupPage';

export const metadata = {
  title: 'Word Manuscript Cleanup Checker — Free | BookKraft AI',
  description: 'Upload your .docx manuscript and instantly scan for double spaces, straight quotes, stray formatting, and blank-paragraph issues before you publish. Free, no signup, runs entirely in your browser.',
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
