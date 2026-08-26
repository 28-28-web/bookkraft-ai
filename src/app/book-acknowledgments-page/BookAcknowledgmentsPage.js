import Link from 'next/link';

const whatToInclude = [
  {
    category: 'Editorial and publishing',
    items: [
      'Your editor — developmental, line, or copy editor',
      'Proofreader',
      'Cover designer',
      'Formatter or typesetter',
      'Agent (if traditionally published or agented)',
    ],
  },
  {
    category: 'Writing community',
    items: [
      'Beta readers who gave substantive feedback',
      'Critique partners who read full drafts',
      'Writing group members who workshopped chapters',
      'Sensitivity readers',
    ],
  },
  {
    category: 'Research and expertise',
    items: [
      'Subject-matter experts who reviewed for accuracy',
      'Interview subjects (for nonfiction)',
      'Librarians, archivists, or research assistants',
      'Professionals who answered technical questions',
    ],
  },
  {
    category: 'Personal',
    items: [
      'Family members who provided support or patience',
      'Friends who read early drafts',
      'Anyone whose specific help shaped the book',
    ],
  },
];

const examples = [
  {
    tone: 'Professional and concise',
    text: `This book would not exist without the editorial eye of [Editor Name], who saw what the manuscript was trying to be before I did. Thank you to [Beta Reader 1] and [Beta Reader 2] for reading early drafts and asking the right questions.

The errors that remain are mine alone.`,
  },
  {
    tone: 'Warm and personal',
    text: `Writing this book took longer than I expected, and more people than I can properly thank here kept me going.

[Editor Name] — your notes on the first draft were both devastating and exactly right. [Agent Name] — thank you for believing the book had an audience before I did. [Partner Name] — for everything, always.

To the readers who have followed along since [previous book] — this one's for you too.`,
  },
  {
    tone: 'Brief — single paragraph',
    text: `My thanks to [Editor Name] for the sharp edits, [Beta Reader] for the honest read, and [Name] for the coffee and the patience. You know what you did.`,
  },
  {
    tone: 'Research-heavy nonfiction',
    text: `This book could not have been written without the generous assistance of [Expert Name] at [Institution], who reviewed [Chapter/section] for accuracy and corrected several significant errors. Any remaining mistakes are mine.

Thank you to the archivists at [Archive Name] for access to [collection], and to [Colleague Name] for reading the full manuscript with the critical eye I needed.

Earlier versions of portions of this work appeared in [Publication].`,
  },
];

const doNots = [
  { item: 'Acknowledging everyone indiscriminately', reason: 'A list of 40 names dilutes the thanks that matter. If someone\'s contribution was minor or tangential, a private thank-you is more appropriate than a public one in the book.' },
  { item: 'Vague, unattributed thanks', reason: '"To all the people who helped me along the way" says nothing. Name people and say specifically what they did — "for reading chapter drafts" or "for the structural edits on part two."' },
  { item: 'Processing your writing journey', reason: 'The acknowledgments page is not a memoir of the writing process. Keep the focus on who helped and how, not on how hard it was to write the book.' },
  { item: 'Social media handles as the primary identifier', reason: 'Most acknowledgments use real names. If someone prefers to be identified by handle (common in online writing communities), include both: "Sarah (@writingwithsarah) — for the read-along."' },
];

const faqs = [
  {
    q: 'What is the acknowledgments page in a book?',
    a: 'The acknowledgments page (also called the thank you page) is where authors thank the people who helped make the book — editors, beta readers, critique partners, agents, writing groups, research sources, and anyone else who contributed. Unlike the dedication (which is short and personal), acknowledgments can run several paragraphs and name specific people with specific contributions.',
  },
  {
    q: 'Where does the acknowledgments page go in a book?',
    a: 'Acknowledgments can appear in either front matter or back matter. In commercial fiction and most self-published ebooks, acknowledgments appear at the back — after the final chapter, before the about the author section. In nonfiction and literary fiction, front matter placement (after the table of contents) is more common. Both are accepted.',
  },
  {
    q: 'How long should a book acknowledgments page be?',
    a: 'One to three paragraphs is standard. A single tight paragraph is fine. More than a full page starts to feel like an acceptance speech. The test: if removing a name would not be noticed by most readers, it probably belongs on a shorter list.',
  },
  {
    q: 'Do you have to write an acknowledgments page?',
    a: "No. Acknowledgments are optional. If you worked with an editor, agent, or writing community whose help was substantial, acknowledgments are a professional courtesy. If you wrote the book largely alone and have nothing specific to thank, omit the page — a perfunctory acknowledgment reads worse than none.",
  },
  {
    q: 'Should you thank your readers in the acknowledgments?',
    a: 'A vague reader thank-you ("to my readers — thank you for your support") is common but adds little. If your readers had a specific, concrete role — an ARC team that caught errors, a community that helped you name a character — thanking them specifically is meaningful. Generic reader thanks at the end is a convention, not a requirement.',
  },
];

export default function BookAcknowledgmentsPage() {
  return (
    <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px', color: 'var(--ink, #1a1a1a)' }}>
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
        Acknowledgments Page in a Book — Examples and What to Write
      </h1>

      <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 40, opacity: 0.9 }}>
        The acknowledgments page is where authors thank the people who made the book possible — editors, beta readers, critique partners, research sources, and anyone whose help was specific and real. It&apos;s the &ldquo;thank you page&rdquo; of a book: distinct from the dedication (which is personal and brief) and from general back matter (which promotes your other work). This page covers what to include, where it goes, how long it should be, and four real examples by tone.
      </p>

      {/* What it is / distinction */}
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
        Acknowledgments vs. dedication — the difference
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 48 }}>
        <div style={{ padding: '20px 24px', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 10 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>Dedication</h3>
          <ul style={{ fontSize: 15, lineHeight: 1.9, opacity: 0.85, paddingLeft: 20, margin: 0 }}>
            <li>1–3 lines</li>
            <li>One person or a small group</li>
            <li>Personal, emotional</li>
            <li>No explanation of why</li>
            <li>Front matter, always</li>
          </ul>
        </div>
        <div style={{ padding: '20px 24px', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 10 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>Acknowledgments</h3>
          <ul style={{ fontSize: 15, lineHeight: 1.9, opacity: 0.85, paddingLeft: 20, margin: 0 }}>
            <li>1–3 paragraphs</li>
            <li>Everyone who contributed professionally</li>
            <li>Professional courtesy</li>
            <li>Names specific contributions</li>
            <li>Front or back matter</li>
          </ul>
        </div>
      </div>

      {/* Where it goes */}
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
        Where the acknowledgments page goes
      </h2>
      <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
        Acknowledgments appear in either front matter or back matter depending on genre convention:
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 48 }}>
        <div style={{ padding: '18px 22px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 10 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Back matter (more common)</h3>
          <p style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.85, margin: 0 }}>After the final chapter. Standard for genre fiction, romance, thriller, and most self-published ebooks. Readers who finish the book and want to know more encounter the acknowledgments naturally.</p>
        </div>
        <div style={{ padding: '18px 22px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 10 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Front matter</h3>
          <p style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.85, margin: 0 }}>After the table of contents. Standard for nonfiction, literary fiction, and academic work. When acknowledging research assistance or institutional support, front matter placement signals that the thanks are substantive.</p>
        </div>
      </div>

      {/* What to include */}
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
        What to include in acknowledgments
      </h2>
      <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 24, opacity: 0.9 }}>
        Include people who made a specific, concrete contribution to the book. The test is not &ldquo;do I like this person?&rdquo; but &ldquo;did they do something that changed the book?&rdquo;
      </p>
      {whatToInclude.map((group, i) => (
        <div key={i} style={{ marginBottom: 20, paddingLeft: 16, borderLeft: '3px solid rgba(201,168,76,0.4)' }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{group.category}</h3>
          <ul style={{ fontSize: 16, lineHeight: 1.9, opacity: 0.85, paddingLeft: 20, margin: 0 }}>
            {group.items.map((item, j) => <li key={j}>{item}</li>)}
          </ul>
        </div>
      ))}

      {/* Examples */}
      <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 56, marginBottom: 8 }}>
        Acknowledgments page examples — by tone
      </h2>
      <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 28, opacity: 0.9 }}>
        These are structural templates — replace the bracketed placeholders with real names and contributions. The brackets mark where specificity matters most: vague thanks are less meaningful than precise ones.
      </p>
      {examples.map((ex, i) => (
        <div key={i} style={{ marginBottom: 24, padding: '22px 26px', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 10 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: 13 }}>{ex.tone}</h3>
          {ex.text.split('\n\n').map((para, j) => (
            <p key={j} style={{ fontFamily: 'Georgia, serif', fontSize: 15, lineHeight: 1.8, opacity: 0.85, marginBottom: j < ex.text.split('\n\n').length - 1 ? 16 : 0 }}>{para}</p>
          ))}
        </div>
      ))}

      {/* What not to do */}
      <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 56, marginBottom: 16 }}>
        What not to do in acknowledgments
      </h2>
      {doNots.map((d, i) => (
        <div key={i} style={{ marginBottom: 20, paddingLeft: 16, borderLeft: '3px solid rgba(201,168,76,0.4)' }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{d.item}</h3>
          <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.85, margin: 0 }}>{d.reason}</p>
        </div>
      ))}

      {/* CTA */}
      <div style={{ margin: '48px 0', padding: '28px 24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
        <p style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Generate your full back matter — author bio, Also By, acknowledgments, and reader CTA.</p>
        <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 20 }}>The Back Matter Generator writes every back matter section. Choose which sections you need, select your tone, and copy the output into your manuscript.</p>
        <Link
          href="/tools/back-matter-generator"
          style={{ display: 'inline-block', padding: '13px 30px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}
        >
          Open Back Matter Generator →
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
        For the full front matter and back matter structure — what goes where, in what order — see the{' '}
        <Link href="/book-front-matter" style={{ color: '#9c7f35', textDecoration: 'none' }}>
          book front matter guide
        </Link>
        . The acknowledgments page is distinct from the dedication page — for dedication examples and formatting conventions, see{' '}
        <Link href="/book-dedication-page" style={{ color: '#9c7f35', textDecoration: 'none' }}>
          dedication page of a book examples
        </Link>
        . For the copyright page, which also lives in front matter, see the{' '}
        <Link href="/copyright-page-template" style={{ color: '#9c7f35', textDecoration: 'none' }}>
          copyright page template
        </Link>
        .
      </p>
    </main>
  );
}
