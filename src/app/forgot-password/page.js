import PageClient from './PageClient';

export const metadata = {
  title: 'Reset Password -- BookKraft AI',
  description: 'Reset your BookKraft AI account password.',
  robots: 'index, follow',
  alternates: { canonical: 'https://bookkraftai.com/forgot-password' },
};

export default function Page() {
  return <PageClient />;
}
