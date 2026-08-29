import BookFormattingSoftwarePage from './BookFormattingSoftwarePage';

const faqs = [
  {
    q: 'What is the best book formatting software?',
    a: "Depends on your platform and what you're formatting. Vellum produces the best-looking ebooks and print files but is Mac-only and costs $249.99. Atticus works on any browser, handles both ebook and print, and costs $147. Reedsy Book Editor is free but browser-only with limited export options. BookKraft AI is free for pre-flight work — manuscript cleanup, EPUB validation, metadata, and conversion — and runs on any platform. Most authors use two tools: one for formatting design (Vellum or Atticus) and one for validation and pre-flight (BookKraft AI).",
  },
  {
    q: 'Is Vellum worth it for Windows users?',
    a: "Only if you're willing to use a Mac, MacinCloud, or run macOS in a virtual machine — Vellum is Mac-only and always has been. Windows authors typically use Atticus (cross-platform, similar feature set) or format in Word and validate with BookKraft AI. Vellum's output quality is excellent; the platform restriction is real.",
  },
  {
    q: "What's the difference between a book builder and book formatting software?",
    a: 'The terms are used interchangeably. A book builder is a tool that assembles a manuscript into a finished ebook or print file — structuring chapters, generating a table of contents, and outputting the correct file format. Book formatting software does the same thing, often with more emphasis on visual design options like fonts and chapter headers.',
  },
  {
    q: 'Can I format an ebook for free?',
    a: "Yes. Reedsy Book Editor is free and exports EPUB. BookKraft AI's pre-flight tools — EPUB Validator, Word Manuscript Cleanup Checker, and Publishing Readiness Score — are free with no account required. Full formatting tools (EPUB Formatter, TOC Generator, and AI tools) are included in the Starter plan at $19/mo. Neither free tier offers the visual design themes that Vellum and Atticus provide.",
  },
  {
    q: 'Does Calibre produce good EPUB files?',
    a: "Calibre's conversion engine is capable but produces inconsistent output depending on the source format. Converting .docx to EPUB through Calibre often preserves Word's inline formatting artifacts rather than cleaning them. Calibre is better used as a format-conversion utility and library manager than as a primary formatting tool for submission to retailers.",
  },
  {
    q: 'Which formatting software works on Linux or Chromebook?',
    a: "Browser-based tools work everywhere: Reedsy Book Editor, BookKraft AI, and the Atticus web app all run in any browser. Vellum is Mac-only. Desktop Atticus requires a download but has browser access. Calibre has a Linux build. BookKraft AI's full toolset — formatter, validator, cleanup, metadata — runs entirely in-browser.",
  },
];

export const metadata = {
  title: 'Book Formatting Software Comparison — Vellum, Atticus, Reedsy & More | BookKraft AI',
  description: 'Compare free and paid book formatting software: Vellum, Atticus, Reedsy Book Editor, Calibre, and BookKraft AI. Platform support, pricing, output formats, and what each tool actually does.',
  alternates: {
    canonical: 'https://bookkraftai.com/book-formatting-software',
  },
};

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BookFormattingSoftwarePage faqs={faqs} />
    </>
  );
}
