import FreeToolsPage from './FreeToolsPage';

export const metadata = {
  title: 'Free EPUB & Kindle Tools — No Signup | BookKraft AI',
  description: 'Five free ebook formatting tools: EPUB Validator, Metadata Builder, Cover Checker, Word Cleanup Checker, and EPUB Converter. No signup, no credit card.',
  keywords: 'free epub validator, book formatting tools, epub converter, metadata builder, cover checker, word cleanup, kindle formatting free',
  alternates: {
    canonical: 'https://bookkraftai.com/free-tools',
  },
  openGraph: {
    title: 'Free EPUB & Kindle Tools — No Signup | BookKraft AI',
    description: 'Five free ebook formatting tools: EPUB Validator, Metadata Builder, Cover Checker, Word Cleanup Checker, and EPUB Converter. No signup, no credit card.',
    siteName: 'BookKraft AI',
    type: 'website',
    url: 'https://bookkraftai.com/free-tools',
    images: [{ url: 'https://bookkraftai.com/og-image.jpg', width: 1200, height: 630, alt: 'BookKraft AI – Free eBook Formatting Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free EPUB & Kindle Tools — No Signup | BookKraft AI',
    description: 'Five free ebook formatting tools: EPUB Validator, Metadata Builder, Cover Checker, Word Cleanup Checker, and EPUB Converter. No signup, no credit card.',
  },
};

export default function Page() {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <FreeToolsPage />
    </>
  );
}
