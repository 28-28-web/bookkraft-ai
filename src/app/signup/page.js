import PageClient from './PageClient';

export const metadata = {
  title: 'Sign Up -- BookKraft AI',
  description: 'Create your BookKraft AI account. Get 2 free tools instantly - no credit card needed.',
  robots: 'index, follow',
  alternates: { canonical: 'https://bookkraftai.com/signup' },
};

export default function Page() {
  return <PageClient />;
}
