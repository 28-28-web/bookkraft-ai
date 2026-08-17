import PageClient from './PageClient';

export const metadata = {
  title: 'Login -- BookKraft AI',
  description: 'Log in to BookKraft AI to access your ebook formatting tools and manuscript projects — EPUB Validator, Kindle Formatter, Metadata Builder, and more.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://bookkraftai.com/login' },
};

export default function Page() {
  return <PageClient />;
}
