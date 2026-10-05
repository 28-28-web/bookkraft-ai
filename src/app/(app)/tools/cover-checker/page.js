import CoverCheckerPage from './CoverCheckerPage';

export const metadata = {
  title: 'Book Cover Dimensions Checker — KDP & Apple Books | BookKraft AI',
  description: 'Check book cover dimensions against KDP and Apple Books — pixel size, aspect ratio, format, and file size. Free, no signup, runs in your browser.',
  alternates: {
    canonical: 'https://bookkraftai.com/tools/cover-checker',
  },
};

export default function Page() {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Cover Checker',
    url: 'https://bookkraftai.com/tools/cover-checker',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web Browser',
    description: 'Free ebook cover checker: tests format, orientation, size, aspect ratio and file size against KDP\'s ebook cover rules, and the shortest side against Apple Books\' 1400px minimum. No signup required.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <CoverCheckerPage />
    </>
  );
}
