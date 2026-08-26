import BookAcknowledgmentsPage from './BookAcknowledgmentsPage';

export const metadata = {
  title: 'Acknowledgments Page in a Book — Examples and What to Write | BookKraft AI',
  description: 'What goes in a book acknowledgments page, how long it should be, and examples by tone — professional, warm, and brief. Includes what to include and what to leave out.',
  alternates: {
    canonical: 'https://bookkraftai.com/book-acknowledgments-page',
  },
};

export default function Page() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the acknowledgments page in a book?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The acknowledgments page (also called the thank you page) is where authors thank the people who helped make the book — editors, beta readers, critique partners, agents, writing groups, research sources, and anyone else who contributed. Unlike the dedication (which is short and personal), acknowledgments can run several paragraphs and name specific people with specific contributions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where does the acknowledgments page go in a book?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Acknowledgments can appear in either front matter or back matter. In commercial fiction and most self-published ebooks, acknowledgments appear at the back — after the final chapter, before the about the author section. In nonfiction and literary fiction, acknowledgments more commonly appear in the front matter, after the table of contents. Both placements are accepted; back matter is more common for genre fiction.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long should a book acknowledgments page be?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most acknowledgments run one to three paragraphs — enough to thank the specific people who made a real difference without becoming a list of everyone the author has ever met. A single tight paragraph is fine. More than a full page starts to feel like an acceptance speech. The test: if removing a name would not be noticed by most readers, it probably belongs on a shorter list.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you have to write an acknowledgments page?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Acknowledgments are optional. Many books, particularly short nonfiction and first novels, omit them entirely. If you worked with an editor, agent, or writing community whose help was substantial, acknowledgments are a professional courtesy. If you wrote the book largely alone and have nothing specific to thank, skip the page — a perfunctory acknowledgment reads worse than none.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should you thank your readers in the acknowledgments?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Acknowledging readers generically ("to my readers — thank you for your support") is common but adds little. If your readers had a specific, concrete role — an ARC team that caught errors, a newsletter community that helped you name a character — thanking them specifically is meaningful. A vague reader thank-you at the end of acknowledgments is a convention, not a requirement.',
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
      <BookAcknowledgmentsPage />
    </>
  );
}
