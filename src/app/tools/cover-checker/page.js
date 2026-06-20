import CoverCheckerPage from './CoverCheckerPage';

export const metadata = {
  title: 'KDP Cover Dimension Checker — Free | BookKraft AI',
  description: 'Upload your book cover and instantly check it against Amazon KDP and Apple Books pixel, ratio, and format requirements. Free, no signup, runs entirely in your browser.',
  alternates: {
    canonical: 'https://bookkraftai.com/tools/cover-checker',
  },
};

export default function Page() {
  return <CoverCheckerPage />;
}