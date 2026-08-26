import CopyrightPageTemplatePage from './CopyrightPageTemplatePage';

export const metadata = {
  title: 'Copyright Page for a Book — Template and Examples | BookKraft AI',
  description: 'Free copyright page template for self-published books. Includes worked examples for KDP ebooks, pen name handling, ISBN guidance, and EPUB placement rules.',
  alternates: {
    canonical: 'https://bookkraftai.com/copyright-page-template',
  },
};

export default function Page() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What must appear on a copyright page?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A self-published book copyright page requires: the copyright symbol with the year of publication and the copyright holder\'s legal name (© 2025 Jane Smith), an "All rights reserved" statement, your publisher or imprint name, and an edition statement. An ISBN is optional for KDP ebooks — Amazon assigns its own ASIN. For print-on-demand, include the country of manufacture.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use a pen name on the copyright page?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Most self-published authors writing under a pen name list the pen name in the copyright notice (© 2025 Pen Name) to maintain the fiction consistently. If you want to assert your legal rights explicitly, add "Writing as Legal Name" on a separate line below. Either approach is legally valid — a copyright registered under a pseudonym is enforceable. For formal copyright registration with the U.S. Copyright Office, you can list both your legal name and pen name on the registration form.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need an ISBN on my copyright page?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No — not for a KDP ebook. Amazon assigns an ASIN automatically, and KDP ebooks do not require an ISBN. If you have one (either purchased from Bowker or provided free by KDP for print), include it on the copyright page in the format "ISBN: 978-x-xxx-xxxxx-x." If you\'re publishing on multiple platforms and want a single ISBN across all of them, buy your own from Bowker rather than using a KDP-assigned ISBN, which is exclusive to Amazon.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where does the copyright page go in the book?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The copyright page goes immediately after the title page — it is the second page of the front matter in standard publishing convention. In an EPUB, it should be the second XHTML file in the spine, right after the title page. Amazon displays only the title page and a few pages forward in the "Look Inside" preview, so the copyright page is visible to readers before purchase.',
        },
      },
      {
        '@type': 'Question',
        name: 'What\'s the difference between a copyright page for fiction vs. nonfiction?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The core legal language is the same. Fiction books typically add a disclaimer stating that characters, events, and places are fictitious and any resemblance to real persons is coincidental. Nonfiction may add a disclaimer noting that the book is not professional advice (medical, legal, financial) if applicable. Both should have the same copyright notice, "All rights reserved" statement, and publisher information.',
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
      <CopyrightPageTemplatePage />
    </>
  );
}
