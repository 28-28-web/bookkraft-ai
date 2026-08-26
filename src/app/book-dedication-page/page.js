import BookDedicationPage from './BookDedicationPage';

export const metadata = {
  title: 'Dedication Page of a Book — Examples and Samples | BookKraft AI',
  description: 'What goes on a dedication page, where it appears in front matter, and 12 real examples by type — personal, professional, humorous, and minimalist.',
  alternates: {
    canonical: 'https://bookkraftai.com/book-dedication-page',
  },
};

export default function Page() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a dedication page in a book?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A dedication page is a brief statement at the front of a book honoring a person or group the author chose to acknowledge in a special way. It sits early in the front matter — typically after the title page and copyright page — and appears before the main content. Unlike acknowledgements (which thank specific contributions at length), a dedication is short, often just one to three lines, and personal in tone.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does a book have to have a dedication page?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. A dedication page is optional — many books, particularly nonfiction titles, omit it entirely without any problem. If you don\'t have a person or idea you want to dedicate the book to, skip it. A missing dedication page is invisible to readers. A forced or generic dedication page ("To all my readers") is noticeable.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long should a book dedication be?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'One to three lines is standard. The dedication page should not be longer than a paragraph — anything more belongs in the acknowledgements. Some of the most memorable dedications are a single line or even a single name. The goal is specificity and sincerity, not length.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where does the dedication page go in the front matter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The dedication page follows the copyright page and precedes the epigraph (if any) and the table of contents. In standard publishing order: title page → copyright page → dedication → epigraph → table of contents → foreword → preface → prologue → chapter one. In an EPUB, the dedication should be its own XHTML file in the spine, right after the copyright page file.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you dedicate a book to a fictional character or a pet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, and both appear regularly in published books. Dedications to pets are common across all genres. Dedications to fictional characters (including characters from other authors\' work, done with appropriate framing) appear in genre fiction. There are no rules on who or what you can dedicate a book to — it\'s one of the few parts of a book where the author has complete freedom.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BookDedicationPage />
    </>
  );
}
