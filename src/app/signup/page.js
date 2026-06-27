import PageClient from './PageClient';

export const metadata = {
  title: 'Sign Up -- BookKraft AI',
  description: 'Create your BookKraft AI account. Get 2 free tools instantly - no credit card needed.',
  robots: 'index, follow',
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