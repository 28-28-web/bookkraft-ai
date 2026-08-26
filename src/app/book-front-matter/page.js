import BookFrontMatterPage from './BookFrontMatterPage';

export const metadata = {
  title: 'Book Front Matter and Back Matter — Order, Elements, and KDP Requirements | BookKraft AI',
  description: 'What goes in book front matter and back matter, in what order, and what KDP and EPUB require. Definitions for every element from half title to about the author.',
  alternates: {
    canonical: 'https://bookkraftai.com/book-front-matter',
  },
};

export default function Page() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is front matter in a book?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Front matter is everything that appears before the first chapter of a book: the title page, copyright page, dedication, epigraph, table of contents, foreword, preface, and prologue. Not every book has all of these — most self-published ebooks include title page, copyright page, and table of contents at minimum. The dedication and preface are optional but common. The foreword and prologue appear only in specific contexts.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the correct order for book front matter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Standard front matter order: (1) half title page, (2) title page, (3) copyright page, (4) dedication, (5) epigraph, (6) table of contents, (7) list of figures/tables if applicable, (8) foreword, (9) preface, (10) acknowledgements (can also appear in back matter), (11) prologue. The copyright page must immediately follow the title page. Everything else is optional and can be omitted.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between a foreword and a preface?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A foreword is written by someone other than the author — typically an expert, peer, or notable figure who endorses the book. A preface is written by the author themselves, explaining why they wrote the book, its scope, or their approach. Both are optional. A foreword appears before a preface in standard front matter order.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is back matter in a book?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Back matter is everything after the final chapter. For self-published ebooks it typically includes: an about the author section, an also by the author list, a reader list call-to-action, and acknowledgements. For nonfiction it may also include a bibliography, endnotes, glossary, and index. The back matter is prime real estate for building your mailing list and cross-promoting other titles.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does KDP require for front matter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'KDP does not mandate specific front matter elements beyond the book content itself. However, Amazon\'s content quality guidelines require a copyright page with a valid copyright notice for all published works. A title page is expected. Including a table of contents with functioning NCX/NAV links is required for EPUBs with chapters — KDP will flag EPUBs without navigable TOCs as having quality issues.',
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
      <BookFrontMatterPage />
    </>
  );
}
