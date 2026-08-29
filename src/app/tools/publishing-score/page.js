import PublishingScoreClient from './PublishingScoreClient';

export const metadata = {
  title: 'Publishing Readiness Score — BookKraft AI',
  description: 'Upload your EPUB and get a scored breakdown across formatting, metadata, structure, and cover requirements — so you know exactly what to fix before submitting to KDP or Apple Books.',
  alternates: { canonical: 'https://bookkraftai.com/tools/publishing-score' },
  openGraph: {
    title: 'Publishing Readiness Score — BookKraft AI',
    description: 'Upload your EPUB and get a scored breakdown across formatting, metadata, structure, and cover requirements — so you know exactly what to fix before submitting to KDP or Apple Books.',
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
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Publishing Readiness Score',
    url: 'https://bookkraftai.com/tools/publishing-score',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web Browser',
    description: 'Analyzes a manuscript or EPUB for publishing readiness across 6 categories: formatting, metadata, structure, cover, readability, and content. Free, runs in the browser.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PublishingScoreClient />
    </>
  );
}