import Link from 'next/link';

const faqs = [
  {
    q: 'How many keyword slots does Amazon KDP give you?',
    a: "KDP gives you 7 keyword fields, each up to 50 characters including spaces. Every slot should contain a complete keyword phrase — not a list of comma-separated single words. Amazon indexes phrases as phrases, so \"cozy mystery recipes small town\" is one targeted phrase that matches a specific reader query. Seven separate single words like \"cozy,mystery,recipes,small,town\" give you seven generic signals that compete against everything in those categories.",
  },
  {
    q: 'Should I repeat keywords that are already in my title?',
    a: "No. Amazon automatically indexes your title, subtitle, series name, and author name. Adding words from your title to the backend keyword slots wastes space. Use keyword slots for angles your title doesn't already cover — different subgenres, tropes, settings, or audience descriptors that connect your book to reader queries Amazon wouldn't otherwise know to match.",
  },
  {
    q: 'What keywords are banned on Amazon KDP?',
    a: "Amazon prohibits: superlatives (best, top, greatest, #1), promotional language (sale, cheap, discount, free), words already in your title, category names used as keywords (\"thriller,\" \"romance\"), and competitor author or brand names. Violations result in keywords being stripped silently or the listing being flagged. Use complete descriptive phrases rather than category labels.",
  },
  {
    q: 'What are the most searched keywords on Amazon for books?',
    a: "Amazon doesn't publish search volume data publicly, but its autocomplete function reveals the phrases real readers type most often. For fiction, high-volume patterns include romance subgenre + trope phrases (\"small town romance second chance\"), fantasy setting + magic system phrases (\"dark academy magic enemies to lovers\"), and thriller type + mood phrases (\"psychological thriller unreliable narrator\"). For nonfiction, problem + audience phrases dominate (\"anxiety relief workbook adults,\" \"budget meal prep beginners\"). The common thread: readers search for the reading experience or the outcome, not the book's subject matter.",
  },
  {
    q: 'How often should I update my KDP keywords?',
    a: "Review every 60–90 days, or sooner if organic traffic drops noticeably. Amazon's algorithm evolves, reader search language shifts with trends, and new competing titles change the competitive landscape for specific phrases. Run fresh research before updating — don't replace working keywords with untested ones. Changing keywords resets some algorithmic signals, so make targeted changes rather than replacing all 7 at once.",
  },
  {
    q: "What's the difference between KDP backend keywords and category keywords?",
    a: "Backend keyword slots and category selection are separate inputs that work together. Your 7 keyword slots influence which Amazon searches surface your book. Your categories determine which browse menus it appears in and which bestseller lists it's eligible for. Some categories are only accessible by requesting them through KDP support after publishing — these \"ghost categories\" don't appear in the standard picker. Using category-relevant phrases in your keyword slots can reinforce browse placement beyond the 2 categories you select at upload.",
  },
  {
    q: 'Does Amazon use keyword slots for advertising?',
    a: "Backend keywords influence organic discovery, not ad targeting directly. Amazon Ads uses separate keyword targeting that you set within the ad campaign. That said, the research process overlaps — the same phrases that match organic reader searches are often the right starting point for Sponsored Products keyword targeting. Authors who've done thorough backend keyword research typically start ad campaigns with a stronger keyword list.",
  },
  {
    q: 'Is there a difference between fiction and nonfiction keyword strategy?',
    a: "Yes — significantly. Fiction readers search for the reading experience: trope, setting, sub-genre, and emotional tone. Nonfiction readers search for the problem they want solved and the outcome they want to achieve. A thriller author using nonfiction-style problem phrases (\"how to survive a thriller\") or a nonfiction author using fiction-style trope phrases will miss their actual reader. The keyword research approach and the phrase structures that work are different for each.",
  },
  {
    q: 'How do I check if Amazon has indexed my KDP keywords?',
    a: "Search Amazon for the exact keyword phrase you submitted — type it into Amazon's book search bar. If your book appears in results, the keyword is indexed. If it doesn't appear, either the keyword hasn't propagated yet (allow 24–72 hours after publishing or updating), or Amazon didn't index that phrase. Narrow the search by adding your author name or a distinctive title word to confirm your book's rank for that phrase. There's no official Amazon tool for keyword indexation — this manual search method is the standard approach authors use.",
  },
];

const genrePatterns = [
  {
    genre: 'Romance',
    pattern: '[subgenre] + [trope] + [setting]',
    examples: ['small town romance second chance', 'enemies to lovers workplace romance', 'contemporary romance with pets'],
  },
  {
    genre: 'Fantasy',
    pattern: '[tone] + [setting] + [theme/trope]',
    examples: ['dark academy fantasy enemies to lovers', 'epic fantasy dragons political intrigue', 'cozy fantasy found family magic'],
  },
  {
    genre: 'Thriller / Mystery',
    pattern: '[type] + [mood/angle] + [setting]',
    examples: ['psychological thriller unreliable narrator', 'cozy mystery bakery small town', 'legal thriller courtroom drama'],
  },
  {
    genre: 'Nonfiction (self-help)',
    pattern: '[problem] + [audience] + [outcome]',
    examples: ['anxiety relief workbook adults', 'habit building productivity beginners', 'morning routine mental health'],
  },
  {
    genre: 'Nonfiction (practical)',
    pattern: '[skill/topic] + [audience] + [format]',
    examples: ['woodworking projects beginners step by step', 'keto meal prep weekly guide', 'budget travel Europe solo'],
  },
];

const alphabetMethod = [
  { letter: 'Search', action: 'Go to Amazon\'s book search. Type your genre + a space + a letter.' },
  { letter: 'Record', action: "Note every autocomplete suggestion. Each is a phrase real readers typed enough times for Amazon to surface it." },
  { letter: 'Repeat', action: "Go through a–z for your primary genre. Add your main sub-genre and repeat. Takes 20–30 minutes but produces validated phrases." },
  { letter: 'Filter', action: "Remove phrases that don't describe your specific book. Keep the ones that match your setting, trope, tone, and audience." },
  { letter: 'Format', action: "Trim each phrase to under 50 characters. Remove words that duplicate your title. Prioritize specificity over breadth." },
];

const kdpSteps = [
  {
    n: 1,
    title: 'Log in to KDP and open your book',
    body: 'Go to kdp.amazon.com → Bookshelf. Find your title and click the three-dot menu → Edit book details. For a new book, start at the beginning of the publishing flow.',
  },
  {
    n: 2,
    title: 'Navigate to Keywords section',
    body: "In the book details page, scroll to the Keywords section. KDP shows 7 numbered fields labeled \"Keyword 1\" through \"Keyword 7.\" Each field accepts up to 50 characters.",
  },
  {
    n: 3,
    title: 'Enter one phrase per field',
    body: "Paste one complete keyword phrase into each field — not a comma-separated list. \"cozy mystery bakery small town\" is one field entry. Amazon treats each field as a complete phrase for matching purposes.",
  },
  {
    n: 4,
    title: 'Check character counts',
    body: "Each field has a 50-character limit. KDP shows a character counter as you type. Use all available characters — a 48-character specific phrase outperforms a 12-character generic term in the same slot.",
  },
  {
    n: 5,
    title: 'Save and republish',
    body: "Click Save and Continue. If the book is already published, keyword changes go live after KDP processes the update — typically within 24–72 hours. Changes don't require a new review cycle for most edits.",
  },
];

export default function AmazonKeywordResearchPage() {
  return (
    <>
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px', color: 'var(--ink, #1a1a1a)' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          Amazon Keyword Research for Books
        </h1>

        <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 32, opacity: 0.9 }}>
          Amazon surfaces books to readers through its search algorithm — and the backend keywords you enter when publishing are a direct input to that algorithm. The 7 keyword slots KDP gives you are your main lever for organic discovery. Getting them right before launch is the difference between a book Amazon knows how to surface and one it doesn&apos;t.
        </p>

        {/* How KDP keyword slots work */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
          How Amazon uses your 7 keyword slots
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          KDP gives you 7 backend keyword fields, each up to 50 characters. Amazon uses these to match your book against reader search queries — not as a tag cloud, but as a list of complete phrases. Three things determine how well your keyword slots work:
        </p>
        <ul style={{ fontSize: 17, lineHeight: 1.9, opacity: 0.9, paddingLeft: 24, marginBottom: 24 }}>
          <li><strong>Phrases beat single words.</strong> &quot;Cozy mystery with recipes&quot; matches a specific reader query. &quot;Mystery&quot; alone competes against every mystery on Amazon. Treat each 50-character slot as a complete phrase, not a comma-separated word list.</li>
          <li><strong>Don&apos;t repeat your title.</strong> Amazon already indexes your title, subtitle, and series name. Using those words in keyword slots wastes space — use keywords for angles your title doesn&apos;t cover.</li>
          <li><strong>Specificity beats reach.</strong> A narrow phrase that matches exactly what a reader typed will surface your book to the right buyer. A broad phrase that matches a wider pool of searches puts you against more competition and serves readers who wanted something else.</li>
        </ul>
        <div style={{ padding: '20px 24px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 10, marginBottom: 40 }}>
          <p style={{ fontSize: 16, lineHeight: 1.7, margin: 0, opacity: 0.9 }}>
            <strong>Banned keyword terms:</strong> Amazon prohibits superlatives (best, top, #1), promotional language (sale, cheap, discount), your title&apos;s own words, bare category names (romance, thriller), and competitor author or brand names. Violations get keyword slots stripped silently — the listing stays up but loses those discovery signals.
          </p>
        </div>

        {/* Research methods */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          How to find Amazon keywords for your book
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 24, opacity: 0.9 }}>
          Two methods. Use both.
        </p>

        <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Method 1: Amazon autocomplete (the alphabet method)</h3>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 20, opacity: 0.9 }}>
          Amazon&apos;s autocomplete is the most direct signal available — every suggestion is a phrase real readers typed in high enough volume for Amazon to surface it. No tools required, no API access needed.
        </p>
        {alphabetMethod.map((step, i) => (
          <div key={i} style={{ marginBottom: 16, paddingLeft: 16, borderLeft: '3px solid rgba(201,168,76,0.4)' }}>
            <h4 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{step.letter}</h4>
            <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.85, margin: 0 }}>{step.action}</p>
          </div>
        ))}

        <p style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.75, marginBottom: 36, marginTop: 8 }}>
          For regularly updated data on which phrases are trending across Amazon&apos;s book categories, Kindlepreneur publishes a detailed breakdown of{' '}
          <a href="https://kindlepreneur.com/most-searched-amazon-keywords-trends/" target="_blank" rel="noopener noreferrer" style={{ color: '#9c7f35', textDecoration: 'none' }}>most-searched Amazon keywords and trends</a>
          {' '}that complements the manual autocomplete approach.
        </p>

        <h3 style={{ fontSize: 22, fontWeight: 700, marginTop: 36, marginBottom: 12 }}>Method 2: KDP Keyword & Category Finder</h3>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 20, opacity: 0.9 }}>
          The alphabet method takes 20–30 minutes and requires you to know your sub-genre well enough to explore the right branches. The{' '}
          <Link href="/tools/kdp-keyword-finder" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            KDP Keyword & Category Finder
          </Link>
          {' '}automates the research step: enter your book&apos;s title, genre, target reader, comparable titles, and key themes — and it generates 7 keyword phrases formatted for KDP&apos;s 50-character slots, with a character count for each. It also produces full Amazon category paths including ghost categories (categories that exist in Amazon&apos;s browse tree but don&apos;t appear in the standard KDP picker), with the exact path text needed for a KDP support request to get added to those categories.
        </p>
        <div style={{ marginBottom: 48, textAlign: 'center' }}>
          <Link
            href="/tools/kdp-keyword-finder"
            style={{ display: 'inline-block', padding: '14px 32px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 17 }}
          >
            Find KDP Keywords for Your Book →
          </Link>
        </div>

        {/* Most-searched patterns by genre */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          What readers search for on Amazon — by genre
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 20, opacity: 0.9 }}>
          Amazon doesn&apos;t publish search volume data, but the autocomplete patterns reveal the underlying structure of how readers search. Fiction and nonfiction follow fundamentally different patterns.
        </p>
        <div style={{ marginBottom: 48 }}>
          {genrePatterns.map((g, i) => (
            <div
              key={i}
              style={{
                marginBottom: 20,
                padding: '20px 24px',
                border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: 10,
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'baseline', marginBottom: 10 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{g.genre}</h3>
                <code style={{ fontSize: 13, background: 'rgba(201,168,76,0.12)', padding: '2px 8px', borderRadius: 4, opacity: 0.85 }}>{g.pattern}</code>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {g.examples.map((ex, j) => (
                  <span
                    key={j}
                    style={{
                      fontSize: 13,
                      padding: '4px 10px',
                      border: '1px solid rgba(201,168,76,0.3)',
                      borderRadius: 20,
                      opacity: 0.8,
                      fontFamily: 'monospace',
                    }}
                  >
                    &quot;{ex}&quot;
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 32, opacity: 0.9 }}>
          The key difference: fiction readers search for the <em>reading experience</em> (how will this make me feel, what tropes does it have, what world am I entering). Nonfiction readers search for the <em>outcome</em> (what problem does this solve, who is it for, what will I be able to do). Using the wrong pattern for your genre — nonfiction-style problem phrases for a fantasy novel — will surface your book to readers who weren&apos;t looking for it.
        </p>

        {/* Step-by-step adding to KDP listing */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 8 }}>
          How to add keywords to your Amazon KDP listing
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 24, opacity: 0.9 }}>
          Once you have your 7 keyword phrases, adding them to KDP takes five minutes.
        </p>
        {kdpSteps.map((step) => (
          <div key={step.n} style={{ marginBottom: 24, paddingLeft: 16, borderLeft: '3px solid rgba(201,168,76,0.4)' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
              {step.n}. {step.title}
            </h3>
            <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.85, margin: 0 }}>{step.body}</p>
          </div>
        ))}

        <div style={{ margin: '32px 0 48px', padding: '20px 24px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 10 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Ghost categories — how to get into them</h3>
          <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.9, marginBottom: 8 }}>
            KDP&apos;s standard category picker shows a subset of Amazon&apos;s actual browse tree. Ghost categories exist in the public tree — you can find books listed in them — but don&apos;t appear in the publisher interface. To get added:
          </p>
          <ol style={{ fontSize: 16, lineHeight: 1.9, opacity: 0.9, paddingLeft: 24, margin: 0 }}>
            <li>Publish your book first — you need an ASIN.</li>
            <li>Email KDP support with your book&apos;s ASIN and the exact category path (e.g. &quot;Kindle Store &gt; Kindle eBooks &gt; Literature &amp; Fiction &gt; Genre Fiction &gt; Horror &gt; Occult&quot;).</li>
            <li>KDP support adds the category manually — typically within 1–3 business days.</li>
            <li>You can request up to 10 total categories (2 selected at upload + up to 8 added via support).</li>
          </ol>
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
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9, marginTop: 32 }}>
          Keywords are one part of a complete KDP listing. For EPUB file requirements before upload, see the{' '}
          <Link href="/epub-formatting-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB formatting guide
          </Link>
          . For manuscript cleanup before converting to EPUB, see{' '}
          <Link href="/manuscript-format" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            manuscript format standards
          </Link>
          . Cover size requirements for KDP are at{' '}
          <Link href="/cover-requirements/amazon-kdp-ebook" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            Amazon KDP cover requirements
          </Link>
          . For KDP browse categories — including ghost categories only accessible via KDP support — see{' '}
          <Link href="/kdp-category-keywords" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            KDP category keywords
          </Link>
          . For the book description field — HTML formatting, character limit, and copywriting structure — see the{' '}
          <Link href="/kdp-book-description" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            KDP book description guide
          </Link>
          .
        </p>

        {/* CTA */}
        <div style={{ marginTop: 48, padding: '28px 24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Generate your 7 KDP keywords — tailored to your book.</p>
          <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 20 }}>Includes ghost category paths. Formatted to KDP&apos;s 50-character limit. Filtered against Amazon&apos;s banned terms list.</p>
          <Link
            href="/tools/kdp-keyword-finder"
            style={{ display: 'inline-block', padding: '13px 30px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}
          >
            Open KDP Keyword & Category Finder →
          </Link>
        </div>
      </main>
    </>
  );
}
