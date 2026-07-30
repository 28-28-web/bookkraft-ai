import FreeToolsPage from './FreeToolsPage';
import { FREE_TOOLS } from '@/lib/constants';

export const metadata = {
  title: 'Free Book Formatting Tools for Indie Authors | BookKraft AI',
  description: `${FREE_TOOLS.length} free book formatting tools for self-publishers — EPUB Validator, Metadata Builder, Cover Checker, Word Cleanup, and EPUB Converter. No signup, no subscription.`,
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is book formatting for self-publishing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Book formatting is the process of preparing your manuscript for digital or print distribution — fixing formatting errors, converting the file to the correct format (EPUB for ebooks, PDF for print), validating the structure, and preparing your metadata for each publishing platform. For ebooks, this means producing a valid EPUB 3.0 file that Amazon KDP, Apple Books, and Kobo will accept.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do these tools compare to a paid book formatting service?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A book formatting service charges $100–$400+ for a human to format your manuscript for you. BookKraft AI is self-serve — you do the formatting yourself, but the tools handle the technical work automatically. Use it if you want control over your files and want to skip the cost and turnaround time of hiring a service.',
        },
      },
      {
        '@type': 'Question',
        name: 'What ebook format does Amazon KDP require?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Amazon KDP accepts EPUB and DOCX files for ebooks. The recommended format is EPUB 3.0 — a valid, well-structured EPUB gives you the most control over how your book appears across Kindle devices and apps. Use the DOCX to EPUB converter to generate the file and the EPUB Validator to check it before uploading.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I format a book for self-publishing for free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. These five tools are free with no signup required: EPUB Validator, Metadata Builder, Cover Checker, Word Cleanup Checker, and the DOCX to EPUB Converter. They cover the core technical steps of ebook formatting — no subscription, no credit card.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need special software to format an ebook?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. These tools run in your browser. No Calibre, no Sigil, no desktop software to install. Upload your .docx or .epub file and get results immediately.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FreeToolsPage />
    </>
  );
}
