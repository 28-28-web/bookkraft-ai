import CoverCheckerPage from './CoverCheckerPage';

export const metadata = {
  title: 'KDP Cover Dimension Checker — Free | BookKraft AI',
  description: 'Upload your book cover and instantly check it against Amazon KDP and Apple Books pixel, ratio, and format requirements. Free, no signup, runs entirely in your browser.',
  alternates: {
    canonical: 'https://bookkraftai.com/tools/cover-checker',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What size should my KDP ebook cover be?',
      acceptedAnswer: { '@type': 'Answer', text: 'Amazon recommends 2560 x 1600 pixels for Kindle covers, a 1.6:1 height-to-width ratio. The minimum is 500 pixels on the shortest side -- covers below that will not display on Amazon at all. Anything below the recommended size will also look soft on high-resolution screens.' },
    },
    {
      '@type': 'Question',
      name: 'Does KDP accept PNG covers?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. KDP requires JPEG format for ebook covers. PNG files are not accepted, even if the dimensions are correct.' },
    },
    {
      '@type': 'Question',
      name: 'What size does Apple Books require?',
      acceptedAnswer: { '@type': 'Answer', text: 'Apple Books requires a minimum of 1400 pixels on the shortest side of your cover image.' },
    },
    {
      '@type': 'Question',
      name: 'Does this tool upload my cover anywhere?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. The image is read and measured entirely in your browser. Nothing is uploaded to a server.' },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CoverCheckerPage />
    </>
  );
}
