import Link from 'next/link';

const dedicationTypes = [
  {
    type: 'Personal — family or partner',
    samples: [
      'For Mom, who never once told me to get a real job.',
      'For D. — you know why.',
      'To my father, who taught me that a sentence should earn every word.',
    ],
  },
  {
    type: 'Personal — friends',
    samples: [
      'For the Thursday night group — you kept the lights on.',
      'To Priya, who read this when it was still 40,000 words of wrong turns.',
    ],
  },
  {
    type: 'Professional — editor, agent, or mentor',
    samples: [
      'For L.H. — the first reader who told me what this book was actually about.',
      'To the editors who pushed back hard enough to make it better.',
    ],
  },
  {
    type: 'Humorous',
    samples: [
      'For anyone who has ever started a sentence with "I\'ve always meant to write a book."',
      'To coffee. Obviously.',
      'For my cat, who sat on the manuscript at every critical moment. You know what you did.',
    ],
  },
  {
    type: 'Minimalist',
    samples: [
      'For J.',
      'To the ones who stayed.',
      'For everyone who needed this.',
    ],
  },
  {
    type: 'Abstract or thematic',
    samples: [
      'For every reader who has felt like the wrong person in the right story.',
      'To the version of yourself that keeps going anyway.',
      'For the ones who disappeared — and the ones who stayed to ask why.',
    ],
  },
];

const doNots = [
  { item: 'Long acknowledgements on the dedication page', reason: 'Thanking your editor, beta readers, critique partners, and writing group by name belongs in the acknowledgements section — usually back matter. The dedication is not a list.' },
  { item: 'Explaining the dedication', reason: '"For my sister Amara, who supported me during the hardest year of my life and never stopped believing this book would get published" — this over-explains. "For Amara" or "For Amara — you know" is stronger.' },
  { item: 'Marketing language', reason: '"For every reader who picks up this book" is not a dedication — it\'s a blurb. A dedication is personal, not promotional.' },
  { item: 'Inside jokes without context', reason: 'A reference only two people will understand reads as cliquish to everyone else. Keep it opaque enough to feel intimate, clear enough not to feel excluding.' },
];

const faqs = [
  {
    q: 'What is a dedication page in a book?',
    a: "A dedication page is a brief statement at the front of a book honoring a person or group the author chose to acknowledge in a special way. It sits early in the front matter — typically after the title page and copyright page — and appears before the main content. Unlike acknowledgements (which thank specific contributions at length), a dedication is short, often just one to three lines, and personal in tone.",
  },
  {
    q: 'Does a book have to have a dedication page?',
    a: "No. A dedication page is optional — many books, particularly nonfiction titles, omit it entirely without any problem. If you don't have a person or idea you want to dedicate the book to, skip it. A missing dedication page is invisible to readers. A forced or generic dedication page is noticeable.",
  },
  {
    q: 'How long should a book dedication be?',
    a: "One to three lines is standard. The dedication page should not be longer than a paragraph — anything more belongs in the acknowledgements. Some of the most memorable dedications are a single line or even a single name. The goal is specificity and sincerity, not length.",
  },
  {
    q: 'Where does the dedication page go in the front matter?',
    a: "The dedication page follows the copyright page and precedes the epigraph (if any) and the table of contents. Standard front matter order: title page → copyright page → dedication → epigraph → table of contents → foreword → preface → prologue → chapter one. In an EPUB, the dedication should be its own XHTML file in the spine, right after the copyright page file.",
  },
  {
    q: 'Can you dedicate a book to a fictional character or a pet?',
    a: "Yes, and both appear regularly in published books. Dedications to pets are common across all genres. Dedications to fictional characters appear in genre fiction. There are no rules on who or what you can dedicate a book to — it's one of the few parts of a book where the author has complete freedom.",
  },
];

export default function BookDedicationPage() {
  return (
    <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px', color: 'var(--ink, #1a1a1a)' }}>
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
        Dedication Page of a Book — Examples and Samples
      </h1>

      <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 40, opacity: 0.9 }}>
        The dedication page is one of the few parts of a book that belongs entirely to the author — no genre conventions, no reader expectations, no plot to serve. It&apos;s also the part most authors agonize over or rush past. This page covers what goes on a dedication page, where it goes in front matter order, and twelve real examples across six different tones and approaches.
      </p>

      {/* What is it */}
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
        What is a dedication page
      </h2>
      <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
        A dedication is a short statement — usually one to three lines — honoring a specific person, group, or idea. It appears at the beginning of the book, before the main content, and is addressed to the recipient rather than to the reader.
      </p>
      <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
        It is not the same as acknowledgements. Acknowledgements are where you thank everyone who contributed to making the book — editors, beta readers, research sources, cover designers, writing groups. The dedication is personal, brief, and directed at whoever the book is &ldquo;for.&rdquo; Many books have both; the two sections serve different functions.
      </p>
      <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 40, opacity: 0.9 }}>
        A dedication page is optional. Nonfiction titles commonly omit them. Fiction titles commonly include them. If you don&apos;t have someone specific you want to honor, don&apos;t manufacture a dedication — a missing page is invisible to readers; a forced one is noticeable.
      </p>

      {/* Front matter placement */}
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
        Where the dedication goes in front matter order
      </h2>
      <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 20, opacity: 0.9 }}>
        The dedication page follows the copyright page and precedes the epigraph and table of contents. Standard order:
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 48 }}>
        {[
          'Title page',
          'Copyright page',
          'Dedication ← this page',
          'Epigraph (optional)',
          'Table of contents',
          'Foreword (optional)',
          'Preface (optional)',
          'Chapter one',
        ].map((item, i) => (
          <div key={i} style={{ padding: '10px 16px', borderLeft: '3px solid rgba(201,168,76,0.4)', fontSize: 16, opacity: item.includes('←') ? 1 : 0.7, fontWeight: item.includes('←') ? 600 : 400 }}>
            {item}
          </div>
        ))}
      </div>
      <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.85, marginBottom: 48 }}>
        In an EPUB file, the dedication is its own XHTML document in the spine, listed third after the title page and copyright page files. The{' '}
        <Link href="/tools/front-matter-generator" style={{ color: '#9c7f35', textDecoration: 'none' }}>Front Matter Generator</Link>
        {' '}handles this file structure automatically — you write the dedication text, the tool places it correctly in the front matter block.
      </p>

      {/* Samples by type */}
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        Dedication page samples — by type
      </h2>
      <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 28, opacity: 0.9 }}>
        These are real-world patterns, not templates. Use them as starting points, not fill-in-the-blank forms — a dedication that sounds like you will always land better than one that sounds like a dedication.
      </p>
      {dedicationTypes.map((group, i) => (
        <div key={i} style={{ marginBottom: 28, padding: '20px 24px', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 10 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>{group.type}</h3>
          {group.samples.map((s, j) => (
            <div key={j} style={{ marginBottom: j < group.samples.length - 1 ? 12 : 0, paddingLeft: 16, borderLeft: '3px solid rgba(201,168,76,0.3)' }}>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: 15, lineHeight: 1.7, opacity: 0.85, fontStyle: 'italic', margin: 0 }}>{s}</p>
            </div>
          ))}
        </div>
      ))}

      {/* What not to do */}
      <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 56, marginBottom: 16 }}>
        What not to put on the dedication page
      </h2>
      {doNots.map((d, i) => (
        <div key={i} style={{ marginBottom: 20, paddingLeft: 16, borderLeft: '3px solid rgba(201,168,76,0.4)' }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{d.item}</h3>
          <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.85, margin: 0 }}>{d.reason}</p>
        </div>
      ))}

      {/* Formatting */}
      <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 56, marginBottom: 16 }}>
        Formatting conventions
      </h2>
      <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 12, opacity: 0.9 }}>
        The dedication page typically appears on a right-hand (recto) page in print, centered both vertically and horizontally on the page, in a slightly smaller type size than body text. In ebooks, centering is standard and vertical centering is handled by the reading app. A few notes:
      </p>
      <ul style={{ fontSize: 17, lineHeight: 1.9, opacity: 0.9, paddingLeft: 24, marginBottom: 48 }}>
        <li>No heading is needed — &ldquo;Dedication&rdquo; as a section title above the text is unusual in trade publishing. The text stands alone.</li>
        <li>No quotation marks around the dedication text itself, unless the dedication is itself a quotation from someone else.</li>
        <li>The word &ldquo;For&rdquo; or &ldquo;To&rdquo; is optional — both are conventional. Some dedications omit the preposition entirely and simply name the recipient.</li>
        <li>Italics are common for dedication text in print. In ebooks, plain text centered on the page reads just as well.</li>
      </ul>

      {/* CTA */}
      <div style={{ margin: '48px 0', padding: '28px 24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
        <p style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Generate your dedication page with the rest of your front matter.</p>
        <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 20 }}>Title page, copyright page, dedication, and disclaimer — formatted for KDP in one step. Your dedication text goes in, properly placed XHTML comes out.</p>
        <Link
          href="/tools/front-matter-generator"
          style={{ display: 'inline-block', padding: '13px 30px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}
        >
          Open Front Matter Generator →
        </Link>
      </div>

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
        For the full picture of what goes in front matter and in what order, see the{' '}
        <Link href="/book-front-matter" style={{ color: '#9c7f35', textDecoration: 'none' }}>
          book front matter guide
        </Link>
        . For the copyright page — what legally must appear on it and a complete template — see{' '}
        <Link href="/copyright-page-template" style={{ color: '#9c7f35', textDecoration: 'none' }}>
          copyright page template and examples
        </Link>
        . For EPUB structure when building front matter files manually, see the{' '}
        <Link href="/kindle-epub-format" style={{ color: '#9c7f35', textDecoration: 'none' }}>
          Kindle EPUB format guide
        </Link>
        .
      </p>
    </main>
  );
}
