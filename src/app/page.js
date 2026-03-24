import LandingPage from './LandingPage';

export const metadata = {
  title: 'BookKraft AI — EPUB Validator & Kindle Formatter for Indie Authors',
  description: '12 tools for indie authors. Fix Kindle errors, build valid EPUBs, generate TOCs. Start free — no credit card needed.',
  alternates: {
    canonical: 'https://bookkraftai.com/',
  },
};

export default function Page() {
  return <LandingPage />;
}