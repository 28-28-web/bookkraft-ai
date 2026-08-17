import PageClient from './PageClient';
import { FREE_TOOLS } from '@/lib/constants';

export const metadata = {
  title: 'Sign Up -- BookKraft AI',
  description: `Create your free BookKraft AI account — get ${FREE_TOOLS.length} free ebook formatting tools instantly, including EPUB Validator and Metadata Builder. No credit card needed.`,
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://bookkraftai.com/signup' },
};

export default function Page() {
  return (
    <>
      <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
        Create Your BookKraft AI Account
      </h1>
      <PageClient />
    </>
  );
}