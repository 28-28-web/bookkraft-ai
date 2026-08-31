import FreeToolsPage from './FreeToolsPage';

export const metadata = {
  title: 'Free eBook Formatting Tools — No Signup, No Credit Card | BookKraft AI',
  description: 'Five free ebook formatting tools for indie authors: EPUB Validator, Metadata Builder, Cover Checker, Word Cleanup Checker, and Manuscript-to-EPUB Converter. No signup, no credit card.',
  keywords: 'free ebook formatting tools, free epub validator, book formatting tools, epub converter free, metadata builder, cover checker, word cleanup, kindle formatting free',
  alternates: {
    canonical: 'https://bookkraftai.com/free-tools',
  },
  openGraph: {
    title: 'Free eBook Formatting Tools — No Signup | BookKraft AI',
    description: 'Five free ebook formatting tools for indie authors: EPUB Validator, Metadata Builder, Cover Checker, Word Cleanup Checker, and Manuscript-to-EPUB Converter. No signup, no credit card.',
    siteName: 'BookKraft AI',
    type: 'website',
    url: 'https://bookkraftai.com/free-tools',
    images: [{ url: 'https://bookkraftai.com/og-image.jpg', width: 1200, height: 630, alt: 'BookKraft AI – Free eBook Formatting Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free eBook Formatting Tools — No Signup | BookKraft AI',
    description: 'Five free ebook formatting tools for indie authors: EPUB Validator, Metadata Builder, Cover Checker, Word Cleanup Checker, and Manuscript-to-EPUB Converter. No signup, no credit card.',
  },
};

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are these ebook formatting tools really free?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes. All five tools are free with no usage limit. Four of them require no account at all — open the page and run them immediately. Full Manuscript Mode (DOCX to EPUB) requires a free BookKraft account. No credit card is required for any free tool.' },
      },
      {
        '@type': 'Question',
        name: 'Do I need to create an account to use these tools?',
        acceptedAnswer: { '@type': 'Answer', text: 'Four tools require no account: EPUB Validator, Metadata Builder, Cover Checker, and Word Cleanup Checker. Full Manuscript Mode requires a free BookKraft account so the converted EPUB file has somewhere to download from. No credit card is required for any free tool.' },
      },
      {
        '@type': 'Question',
        name: 'Do these tools add a watermark to my files?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. None of the five tools add watermarks, attribution text, or BookKraft branding to output files. The EPUB you get back is a clean EPUB 3.0 file with your content only.' },
      },
      {
        '@type': 'Question',
        name: 'What ebook format does Amazon KDP require?',
        acceptedAnswer: { '@type': 'Answer', text: 'KDP accepts EPUB and DOCX. The recommended format is EPUB 3.0 — use the Full Manuscript Mode to convert your DOCX to EPUB and the EPUB Validator to check it before uploading.' },
      },
      {
        '@type': 'Question',
        name: 'Do I need Calibre or Sigil to format my ebook?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. These tools run entirely in your browser. No desktop software to download or install. If your browser can open a webpage, the tools work — on Windows, Mac, Linux, and Chromebook.' },
      },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free EPUB & Kindle Formatting Tools',
    description: 'Five free ebook formatting tools for indie authors — no signup required.',
    url: 'https://bookkraftai.com/free-tools',
    numberOfItems: 5,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'EPUB Validator', url: 'https://bookkraftai.com/tools/epub-validator' },
      { '@type': 'ListItem', position: 2, name: 'Metadata Builder', url: 'https://bookkraftai.com/tools/metadata-builder' },
      { '@type': 'ListItem', position: 3, name: 'Word Manuscript Cleanup Checker', url: 'https://bookkraftai.com/tools/word-cleanup' },
      { '@type': 'ListItem', position: 4, name: 'Cover Checker', url: 'https://bookkraftai.com/tools/cover-checker' },
      { '@type': 'ListItem', position: 5, name: 'Full Manuscript Mode', url: 'https://bookkraftai.com/tools/manuscript-mode' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <FreeToolsPage />
    </>
  );
}
