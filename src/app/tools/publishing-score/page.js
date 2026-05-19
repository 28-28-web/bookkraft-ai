import PublishingScoreClient from './PublishingScoreClient';

export const metadata = {
  title: 'Publishing Readiness Score — BookKraft AI',
  description: 'See how publish-ready your eBook really is. Get a scored breakdown across formatting, metadata, structure, and more.',
  alternates: { canonical: 'https://bookkraftai.com/tools/publishing-score' },
  openGraph: {
    title: 'Publishing Readiness Score — BookKraft AI',
    description: 'See how publish-ready your eBook really is. Get a scored breakdown across formatting, metadata, structure, and more.',
    url: 'https://bookkraftai.com/tools/publishing-score',
    siteName: 'BookKraft AI',
    type: 'website',
    images: [{ url: 'https://bookkraftai.com/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Publishing Readiness Score — BookKraft AI',
    description: 'See how publish-ready your eBook really is.',
  },
  robots: 'index, follow',
};

export default function PublishingScorePage() {
  return <PublishingScoreClient />;
}