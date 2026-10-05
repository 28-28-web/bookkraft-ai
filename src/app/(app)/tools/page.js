import ToolsPage from './ToolsPage';

export const metadata = {
  title: 'EPUB & KDP Formatting Tools — AI-Powered | BookKraft AI',
  description:
    'Manuscript cleanup, EPUB formatting, TOC generator, and KDP keyword research — AI tools for indie authors publishing on Kindle and Apple Books.',
  alternates: { canonical: 'https://bookkraftai.com/tools' },
  openGraph: {
    title: 'EPUB & KDP Formatting Tools — AI-Powered | BookKraft AI',
    description:
      'Manuscript cleanup, EPUB formatting, TOC generator, and KDP keyword research — AI tools for indie authors publishing on Kindle and Apple Books.',
    url: 'https://bookkraftai.com/tools',
    siteName: 'BookKraft AI',
    type: 'website',
    images: [{ url: 'https://bookkraftai.com/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EPUB & KDP Formatting Tools — AI-Powered | BookKraft AI',
    description:
      'Manuscript cleanup, EPUB formatting, TOC generator, and more — for indie authors publishing on Kindle.',
  },
  robots: 'index, follow',
};

export default function Page() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI-Powered EPUB & KDP Formatting Tools',
    description:
      'AI-powered and logic-based tools for indie authors: EPUB formatting, manuscript cleanup, KDP keyword research, and more.',
    url: 'https://bookkraftai.com/tools',
    numberOfItems: 12,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Publishing Readiness Score', url: 'https://bookkraftai.com/tools/publishing-score' },
      { '@type': 'ListItem', position: 2, name: 'EPUB Formatter', url: 'https://bookkraftai.com/tools/epub-formatter' },
      { '@type': 'ListItem', position: 3, name: 'Kindle Format Fixer', url: 'https://bookkraftai.com/tools/kindle-format-fixer' },
      { '@type': 'ListItem', position: 4, name: 'TOC Generator', url: 'https://bookkraftai.com/tools/toc-generator' },
      { '@type': 'ListItem', position: 5, name: 'Front Matter Generator', url: 'https://bookkraftai.com/tools/front-matter-generator' },
      { '@type': 'ListItem', position: 6, name: 'CSS Snippet Generator', url: 'https://bookkraftai.com/tools/css-snippet-generator' },
      { '@type': 'ListItem', position: 7, name: 'Manuscript Cleanup', url: 'https://bookkraftai.com/tools/manuscript-cleanup' },
      { '@type': 'ListItem', position: 8, name: 'Print-to-Digital Adapter', url: 'https://bookkraftai.com/tools/print-to-digital' },
      { '@type': 'ListItem', position: 9, name: 'Style Sheet Auditor', url: 'https://bookkraftai.com/tools/style-sheet-auditor' },
      { '@type': 'ListItem', position: 10, name: 'EPUB Validator Pro', url: 'https://bookkraftai.com/tools/epub-validator-premium' },
      { '@type': 'ListItem', position: 11, name: 'Back Matter Generator', url: 'https://bookkraftai.com/tools/back-matter-generator' },
      { '@type': 'ListItem', position: 12, name: 'KDP Keyword & Category Finder', url: 'https://bookkraftai.com/tools/kdp-keyword-finder' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <ToolsPage />
    </>
  );
}
