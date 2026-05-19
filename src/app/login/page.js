import PageClient from './PageClient';

export const metadata = {
  title: 'Login -- BookKraft AI',
  description: 'Log in to your BookKraft AI account and access your eBook formatting tools.',
  robots: 'index, follow',
  alternates: { canonical: 'https://bookkraftai.com/login' },
};

export default function Page() {
  return <PageClient />;
}
