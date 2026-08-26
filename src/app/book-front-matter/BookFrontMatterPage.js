import Link from 'next/link';

const frontMatterElements = [
  {
    name: 'Half title page',
    required: false,
    who: 'Print only',
    what: 'The book title alone, no subtitle or author name. A vestige of hand-bound book construction. Rarely used in self-published ebooks — omit unless you want the traditional feel.',
  },
  {
    name: 'Title page',
    required: true,
    who: 'Always',
    what: 'Full title, subtitle (if any), author name, and publisher or imprint name. The first thing Amazon shows in the "Look Inside" preview. Required.',
  },
  {
    name: 'Copyright page',
    required: true,
    who: 'Always',
    what: '© year, author/rights holder name, "All rights reserved" statement, publisher name, edition, and ISBN if applicable. Directly after the title page. See the copyright page template for full content requirements.',
    link: { text: 'copyright page template', href: '/copyright-page-template' },
  },
  {
    name: 'Dedication',
    required: false,
    who: 'Optional',
    what: 'One to three lines honoring a specific person or idea. Not acknowledgements — those are longer and list contributors. The dedication is personal and brief. See dedication page examples for samples by type.',
    link: { text: 'dedication page examples', href: '/book-dedication-page' },
  },
  {
    name: 'Epigraph',
    required: false,
    who: 'Optional',
    what: 'A quoted passage — from a poem, another book, a song, a historical source — that sets the thematic tone. Attributed beneath the quote. Used more in literary fiction and essay collections than in commercial genre fiction or nonfiction.',
  },
  {
    name: 'Table of contents',
    required: true,
    who: 'Required for EPUBs with chapters',
    what: "A linked list of chapters and major sections. KDP requires a functional table of contents with working NCX/NAV links for EPUB submissions — a missing or broken TOC is flagged as a quality issue. In fiction, chapter titles or numbers are listed. In nonfiction, section and chapter headings.",
  },
  {
    name: 'List of figures / tables',
    required: false,
    who: 'Nonfiction only',
    what: 'Only relevant for heavily illustrated or data-heavy nonfiction. Rarely used in self-published ebooks. Omit unless your book is a technical manual or academic text.',
  },
  {
    name: 'Foreword',
    required: false,
    who: 'Optional',
    what: "Written by someone other than the author — typically a recognized expert, peer, or notable figure who endorses the book's value. A foreword lends credibility when the person writing it carries relevant authority. If no one of that standing offered to write one, skip it.",
  },
  {
    name: 'Preface',
    required: false,
    who: 'Optional',
    what: "Written by the author. Explains why the book was written, its scope, limitations, and the author's approach. More common in nonfiction. Not required — if the book's introduction covers this ground, a separate preface duplicates it.",
  },
  {
    name: 'Prologue',
    required: false,
    who: 'Fiction only',
    what: "A scene or passage that precedes chapter one — typically showing an event outside the main timeline, establishing atmosphere, or raising a question the narrative answers. Only include a prologue if it serves the story. Many readers skip prologues; the content should be gripping enough to earn the page.",
  },
];

const backMatterElements = [
  {
    name: 'About the author',
    required: false,
    who: 'Strongly recommended',
    what: 'A professional author bio — typically short (one paragraph) and long (two to three paragraphs) versions. Readers who finish a book and like it will read the author bio. This is where you build audience for your next title.',
  },
  {
    name: 'Also by the author',
    required: false,
    who: 'If you have other books',
    what: "A list of your other published titles, typically formatted as: [Series Name] / Title (year). Include links to the book's product page if the ebook platform allows it. Effective cross-promotion for authors with multiple titles.",
  },
  {
    name: 'Reader list / mailing list CTA',
    required: false,
    who: 'Recommended for fiction',
    what: "An invitation for readers to join your mailing list, usually with a free offer (a bonus story, a prequel, exclusive content). The back of a finished book is the highest-converting place to grow a reader list — the reader just spent several hours with you and enjoyed it.",
  },
  {
    name: 'Acknowledgements',
    required: false,
    who: 'Optional',
    what: 'Thanks to editors, beta readers, critique partners, research sources, writing communities, and anyone who contributed to making the book. Can appear in front matter (before chapter one) or back matter (after the final chapter). Back matter placement is more common in commercial fiction. For examples by tone and what to include, see the acknowledgments page guide.',
    link: { text: 'acknowledgments page guide', href: '/book-acknowledgments-page' },
  },
  {
    name: 'A note from the author',
    required: false,
    who: 'Optional',
    what: 'A brief personal message to the reader — about the research behind a historical novel, the inspiration for a memoir, a disclosure about creative liberties taken with real events. Conversational tone. One to three paragraphs.',
  },
  {
    name: 'Glossary',
    required: false,
    who: 'Nonfiction / SFF',
    what: 'Definitions of specialized terms used in the book. Essential for technical nonfiction, useful for SFF with invented terminology.',
  },
  {
    name: 'Bibliography / notes',
    required: false,
    who: 'Nonfiction',
    what: 'Source citations for research-based nonfiction. Endnotes (numbered in text, listed here) or a bibliography. Academic and serious nonfiction readers expect it; popular nonfiction often uses a selected reading list instead.',
  },
  {
    name: 'Index',
    required: false,
    who: 'Print nonfiction only',
    what: "A searchable index of key terms, names, and concepts. Valuable for print reference books. In ebooks, readers use the device's built-in search function — a formal index is rarely worth the effort for ebook-first publishing.",
  },
];

const faqs = [
  {
    q: 'What is front matter in a book?',
    a: "Front matter is everything that appears before the first chapter of a book: the title page, copyright page, dedication, epigraph, table of contents, foreword, preface, and prologue. Not every book has all of these — most self-published ebooks include title page, copyright page, and table of contents at minimum.",
  },
  {
    q: 'What is the correct order for book front matter?',
    a: "Standard front matter order: (1) half title page, (2) title page, (3) copyright page, (4) dedication, (5) epigraph, (6) table of contents, (7) list of figures/tables if applicable, (8) foreword, (9) preface, (10) acknowledgements (can also go in back matter), (11) prologue. The copyright page must immediately follow the title page. Everything else is optional.",
  },
  {
    q: 'What is the difference between a foreword and a preface?',
    a: "A foreword is written by someone other than the author — typically an expert or notable figure who endorses the book. A preface is written by the author, explaining why the book was written and how to use it. Both are optional. A foreword appears before a preface in standard front matter order.",
  },
  {
    q: 'What is back matter in a book?',
    a: "Back matter is everything after the final chapter: about the author, also by the author, reader list CTA, acknowledgements, bibliography, glossary, and index. For self-published ebooks, the about the author section and a mailing list CTA are the most valuable back matter elements to include.",
  },
  {
    q: 'What does KDP require for front matter?',
    a: "KDP does not mandate specific front matter elements beyond the book content itself. However, Amazon's content quality guidelines require a copyright page with a valid copyright notice. A title page is expected. Including a table of contents with functioning NCX/NAV links is required for EPUBs with chapters — KDP flags EPUBs without navigable TOCs as quality issues.",
  },
];

const S = { fontSize: 13, fontWeight: 600, padding: '2px 8px', borderRadius: 20, display: 'inline-block' };
const RequiredBadge = () => <span style={{ ...S, background: 'rgba(201,168,76,0.15)', color: '#9c7f35', border: '1px solid rgba(201,168,76,0.3)' }}>Required</span>;
const OptionalBadge = () => <span style={{ ...S, background: 'rgba(0,0,0,0.04)', color: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,0,0,0.1)' }}>Optional</span>;

export default function BookFrontMatterPage() {
  return (
    <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px', color: 'var(--ink, #1a1a1a)' }}>
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
        Book Front Matter and Back Matter — Order, Elements, and KDP Requirements
      </h1>

      <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 40, opacity: 0.9 }}>
        Front matter is everything before chapter one. Back matter is everything after the final chapter. Between them, they frame your book — and for KDP and EPUB submissions, some elements are required while others are optional. This page covers every front and back matter element in standard order, what each one does, and what Amazon actually requires for ebook publishing.
      </p>

      {/* Front matter */}
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        Front matter — all elements in standard order
      </h2>
      <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 28, opacity: 0.8 }}>
        Listed in the order they appear. Not all books use all elements — the required ones are marked.
      </p>
      {frontMatterElements.map((el, i) => (
        <div key={i} style={{ marginBottom: 16, padding: '20px 24px', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 10 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginBottom: 10 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{el.name}</h3>
            {el.required ? <RequiredBadge /> : <OptionalBadge />}
            <span style={{ fontSize: 13, opacity: 0.6 }}>{el.who}</span>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.85, margin: 0 }}>
            {el.what}
            {el.link && (
              <>
                {' '}See the{' '}
                <Link href={el.link.href} style={{ color: '#9c7f35', textDecoration: 'none' }}>
                  {el.link.text}
                </Link>
                {' '}for full details.
              </>
            )}
          </p>
        </div>
      ))}

      {/* CTA 1 */}
      <div style={{ margin: '40px 0 56px', padding: '24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
        <p style={{ fontSize: 17, marginBottom: 6, fontWeight: 600 }}>Generate your full front matter block — title page, copyright page, dedication, and disclaimer.</p>
        <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 16 }}>Formatted for KDP. Handles pen names and optional ISBNs. Output ready to paste into your manuscript.</p>
        <Link
          href="/tools/front-matter-generator"
          style={{ display: 'inline-block', padding: '12px 28px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}
        >
          Open Front Matter Generator →
        </Link>
      </div>

      {/* Back matter */}
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        Back matter — all elements in standard order
      </h2>
      <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 28, opacity: 0.8 }}>
        Back matter comes after your final chapter. For self-published ebooks, the about the author section and a reader list call-to-action are the highest-value back matter elements — the reader just finished your book and is most open to a next step.
      </p>
      {backMatterElements.map((el, i) => (
        <div key={i} style={{ marginBottom: 16, padding: '20px 24px', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 10 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginBottom: 10 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{el.name}</h3>
            <OptionalBadge />
            <span style={{ fontSize: 13, opacity: 0.6 }}>{el.who}</span>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.85, margin: 0 }}>{el.what}</p>
        </div>
      ))}

      {/* CTA 2 */}
      <div style={{ margin: '40px 0 56px', padding: '24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
        <p style={{ fontSize: 17, marginBottom: 6, fontWeight: 600 }}>Generate your back matter — author bio, Also By section, reader list CTA, and more.</p>
        <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 16 }}>Handles tone selection (professional, warm, conversational). Generates short and long bio variants. Formatted for KDP.</p>
        <Link
          href="/tools/back-matter-generator"
          style={{ display: 'inline-block', padding: '12px 28px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}
        >
          Open Back Matter Generator →
        </Link>
      </div>

      {/* EPUB structure note */}
      <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
        EPUB file structure for front and back matter
      </h2>
      <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
        In an EPUB file, each front matter element is typically its own XHTML document, listed in order in the{' '}
        <code style={{ fontSize: 14, background: 'rgba(201,168,76,0.1)', padding: '1px 5px', borderRadius: 3 }}>spine</code>{' '}
        of the OPF manifest. A minimal KDP ebook might have:
      </p>
      <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 10, padding: '20px 24px', fontFamily: 'monospace', fontSize: 14, lineHeight: 2, marginBottom: 16, overflowX: 'auto' }}>
        <div>titlepage.xhtml</div>
        <div>copyright.xhtml</div>
        <div>dedication.xhtml <span style={{ opacity: 0.5, fontFamily: 'inherit' }}>// optional</span></div>
        <div>toc.xhtml</div>
        <div>chapter01.xhtml</div>
        <div>chapter02.xhtml</div>
        <div style={{ opacity: 0.5 }}>...</div>
        <div>about-author.xhtml</div>
        <div>also-by.xhtml <span style={{ opacity: 0.5, fontFamily: 'inherit' }}>// optional</span></div>
      </div>
      <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.85, marginBottom: 48 }}>
        The NCX and NAV documents (for table of contents navigation) reference the chapter files. Front and back matter files are listed in the spine but not in the NCX/NAV unless you want readers to be able to navigate directly to them. For full EPUB file requirements and structure, see the{' '}
        <Link href="/kindle-epub-format" style={{ color: '#9c7f35', textDecoration: 'none' }}>
          Kindle EPUB format guide
        </Link>
        .
      </p>

      {/* FAQ */}
      <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 56, marginBottom: 16 }}>
        Frequently asked questions
      </h2>
      {faqs.map((f, i) => (
        <div key={i} style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 19, fontWeight: 600, marginBottom: 8 }}>{f.q}</h3>
          <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.85 }}>{f.a}</p>
        </div>
      ))}

      {/* Cross-links */}
      <p style={{ fontSize: 17, lineHeight: 1.7, marginTop: 40, opacity: 0.9 }}>
        For the copyright page specifically — what legally must appear on it, worked templates, and pen name handling — see{' '}
        <Link href="/copyright-page-template" style={{ color: '#9c7f35', textDecoration: 'none' }}>
          copyright page template and examples
        </Link>
        . For the dedication page — samples by type and formatting conventions — see{' '}
        <Link href="/book-dedication-page" style={{ color: '#9c7f35', textDecoration: 'none' }}>
          book dedication page examples
        </Link>
        . For manuscript formatting before building your EPUB, see{' '}
        <Link href="/manuscript-format" style={{ color: '#9c7f35', textDecoration: 'none' }}>
          manuscript format standards
        </Link>
        . For a broader view of self-publishing decisions — which platforms, paths, and conventions apply to your situation — Jane Friedman&apos;s{' '}
        <a href="https://janefriedman.com/self-publish-your-book/" target="_blank" rel="noopener noreferrer" style={{ color: '#9c7f35', textDecoration: 'none' }}>Start Here: How to Self-Publish Your Book</a>
        {' '}is a well-regarded overview.
      </p>
    </main>
  );
}
