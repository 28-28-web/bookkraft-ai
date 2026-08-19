import CoverCheckerPage from './CoverCheckerPage';

export const metadata = {
  title: 'Book Cover Dimensions Checker — KDP & Apple Books | BookKraft AI',
  description: 'Check book cover dimensions against KDP and Apple Books — pixel size, aspect ratio, format, and file size. Free, no signup, runs in your browser.',
  alternates: {
    canonical: 'https://bookkraftai.com/tools/cover-checker',
  },
};

export default function Page() {
  return (
    <>
      <CoverCheckerPage />
    </>
  );
}
