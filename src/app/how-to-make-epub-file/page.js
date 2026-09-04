import HowToMakeEpubPage from './HowToMakeEpubPage';

export const metadata = {
  title: 'How to Make an EPUB File Free — No Calibre or Sigil',
  description: 'Turn a Word doc into a valid EPUB 3 in 4 steps — free, in your browser, no software. Output passes KDP, Apple Books, and Kobo validation on first upload.',
  alternates: {
    canonical: 'https://bookkraftai.com/how-to-make-epub-file',
  },
};

export default function Page() {
  return <HowToMakeEpubPage />;
}
