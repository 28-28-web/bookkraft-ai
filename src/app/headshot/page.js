import HeadshotClient from './HeadshotClient';

export const metadata = {
  title: 'AI Author Headshots — Professional Photos for $9 | BookKraft AI',
  description:
    'Get 10 professional AI-generated author headshots from a single selfie. No photographer, no studio. $9 one-time, instant delivery. Perfect for KDP author page and book back cover.',
  alternates: { canonical: 'https://bookkraftai.com/headshot' },
  openGraph: {
    title: 'AI Author Headshots — Professional Photos for $9',
    description:
      'Upload any selfie — get 10 Amazon author page-ready headshots in 30 seconds. One-time $9, no subscription.',
    url: 'https://bookkraftai.com/headshot',
  },
  twitter: {
    title: 'AI Author Headshots — Professional Photos for $9',
    description: 'Upload a selfie, get 10 professional author headshots instantly. $9 one-time.',
  },
};

export default function HeadshotPage() {
  return <HeadshotClient />;
}
