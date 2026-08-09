import FreeToolsPage from './FreeToolsPage';
import { FREE_TOOLS } from '@/lib/constants';

export const metadata = {
  title: 'Free Ebook Formatting Tools — No Signup, No Watermark | BookKraft AI',
  description: 'Five free ebook formatting tools for indie authors — EPUB Validator, Metadata Builder, Cover Checker, Word Cleanup, and EPUB Converter. Four require no signup. None add a watermark.',
  keywords: 'book formatting tools, book formatting for self publishing, book formatting, free book formatting, epub validator, docx to epub',
  alternates: {
    canonical: 'https://bookkraftai.com/free-tools',
  },
};

export default function Page() {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'BookKraft AI — Free Book Formatting Tools',
    url: 'https://bookkraftai.com/free-tools',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    description: `${FREE_TOOLS.length} free book formatting tools for indie authors and self-publishers. EPUB validation, metadata builder, cover checker, Word cleanup, and DOCX to EPUB converter — all free, no signup.`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      name: 'Free Tier',
      description: `${FREE_TOOLS.length} free tools — no account required`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <FreeToolsPage />
    </>
  );
}
