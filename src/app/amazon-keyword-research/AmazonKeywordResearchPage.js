import Link from 'next/link';

const faqs = [
  {
    q: 'How many keyword slots does Amazon KDP give you?',
    a: "KDP lets you add up to 7 keywords or short phrases. The keyword field has a character limit, and KDP shows a counter as you type. KDP's guidance: specific words work better than general ones, and you should combine words in the most logical order — customers search \"military science fiction,\" not \"fiction science military.\"",
  },
  {
    q: 'Should I repeat keywords that are already in my title?',
    a: "No. KDP's keyword guidelines say to avoid information already in your book's metadata, such as the title and contributors. Use keyword slots for angles your title doesn't already cover — different subgenres, tropes, settings, or audience descriptors.",
  },
  {
    q: 'What should I avoid in KDP keywords?',
    a: "KDP's keyword guidelines list: information already in your book's metadata (title, contributors), words already in your book categories, subjective claims about quality (\"best novel ever\"), time-sensitive statements (\"new,\" \"on sale,\" \"available now\"), information common to most items in the category (\"book\"), spelling errors, the name of an author not associated with your book, brands you don't own, quotation marks, Amazon program names like Kindle Unlimited or KDP Select, and HTML tags. KDP notes the list is not exhaustive.",
  },
  {
    q: 'What are the most searched keywords on Amazon for books?',
    a: "Amazon doesn't publish search volume for book keywords. Autocomplete suggestions in Amazon's search bar can show phrases shoppers type. For fiction, common patterns combine romance subgenre + trope (\"small town romance second chance\"), fantasy setting + magic system phrases (\"dark academy magic enemies to lovers\"), and thriller type + mood phrases (\"psychological thriller unreliable narrator\"). For nonfiction, problem + audience phrases are common (\"anxiety relief workbook adults,\" \"budget meal prep beginners\"). The common thread: readers search for the reading experience or the outcome, not the book's subject matter.",
  },
  {
    q: 'How often should I update my KDP keywords?',
    a: "There's no fixed schedule. Review your keywords from time to time, or when sales drop. Run fresh research before updating, and change a few at a time so you can tell what made a difference. KDP says keyword updates can take up to 72 hours to appear.",
  },
  {
    q: "What's the difference between KDP backend keywords and category keywords?",
    a: "They're separate fields. Keywords can help your book show up in Amazon search results; categories place it in Amazon's browse categories. KDP lets you select 3 categories. KDP's keyword guidelines say not to repeat words already in your categories in your keywords.",
  },
  {
    q: 'Does Amazon use keyword slots for advertising?',
    a: "KDP's keyword help covers placement in Amazon Store search results, not ads. Amazon Ads campaigns have their own keyword targeting, set up separately in each campaign. The same keyword research can be a starting point for both.",
  },
  {
    q: 'Is there a difference between fiction and nonfiction keyword strategy?',
    a: "Yes — significantly. Fiction readers search for the reading experience: trope, setting, sub-genre, and emotional tone. Nonfiction readers search for the problem they want solved and the outcome they want to achieve. A thriller author using nonfiction-style problem phrases (\"how to survive a thriller\") or a nonfiction author using fiction-style trope phrases can miss their actual reader. The keyword research approach and the phrase structures that work are different for each.",
  },
  {
    q: 'How do I check if Amazon has indexed my KDP keywords?',
    a: "Search Amazon for the keyword you submitted — type it into Amazon's book search bar. If your book appears in results, the keyword is likely working. If it doesn't appear, the change may not be live yet: KDP says a new book can take up to 3 business days to go live, and keyword updates up to 72 hours. Narrow the search by adding your author name or a distinctive title word to find your book in the results.",
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
  { letter: 'Record', action: "Note every autocomplete suggestion. Suggestions can show phrases other shoppers search for." },
  { letter: 'Repeat', action: "Go through a–z for your primary genre. Add your main sub-genre and repeat. Takes 20–30 minutes." },
  { letter: 'Filter', action: "Remove phrases that don't describe your specific book. Keep the ones that match your setting, trope, tone, and audience." },
  { letter: 'Format', action: "Keep each keyword within the character limit KDP's field shows. Remove words already in your title. Prefer specific words over general ones." },
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
    body: "In the book details page, scroll to the Keywords section. KDP lets you add up to 7 keywords or short phrases, and each field has a character limit.",
  },
  {
    n: 3,
    title: 'Combine words in a logical order',
    body: "KDP says specific words work better than general ones, and to combine keywords in the most logical order — customers search \"military science fiction,\" not \"fiction science military.\" Don't add quotation marks: KDP's guidelines list them among things to avoid.",
  },
  {
    n: 4,
    title: 'Check character counts',
    body: "KDP's keyword field has a character limit and shows a counter as you type. Keep each keyword within it.",
  },
  {
    n: 5,
    title: 'Save and republish',
    body: "Click Save and Continue. If the book is already published, keyword changes go live after KDP processes the update, which can take up to 72 hours.",
  },
];

export default function AmazonKeywordResearchPage() {
  return (
    <>
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px', color: 'var(--ink, #1a1a1a)' }}>
        <h1 style={{ fontFamily: "var(--font-playfair),serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          Amazon Keyword Research for Books
        </h1>

        <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 32, opacity: 0.9 }}>
          KDP says that, along with factors like sales history and Amazon Best Sellers Rank, relevant keywords can boost your placement in search results on the Amazon Store. KDP lets you add up to 7 keywords or short phrases when you publish.
        </p>

        {/* How KDP keyword slots work */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
          How KDP keywords work
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          KDP lets you add up to 7 keywords or short phrases, and each field has a character limit. KDP&apos;s{' '}<a href="https://kdp.amazon.com/en_US/help/topic/G201298500" target="_blank" rel="noopener nofollow" style={{ color: '#9c7f35', textDecoration: 'underline' }}>keywords help page</a>{' '}gives this guidance:
        </p>
        <ul style={{ fontSize: 17, lineHeight: 1.9, opacity: 0.9, paddingLeft: 24, marginBottom: 24 }}>
          <li><strong>Specific beats general.</strong> KDP says specific words work better than general ones. &quot;Mystery&quot; alone can match far more books than &quot;cozy mystery recipes.&quot;</li>
          <li><strong>Don&apos;t repeat your title.</strong> KDP says to avoid information already in your book&apos;s metadata, such as the title. Use keywords for angles your title doesn&apos;t cover.</li>
          <li><strong>Use a logical order.</strong> KDP says to combine keywords in the order customers would search: &quot;military science fiction,&quot; not &quot;fiction science military.&quot;</li>
        </ul>
        <div style={{ padding: '20px 24px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 10, marginBottom: 40 }}>
          <p style={{ fontSize: 16, lineHeight: 1.7, margin: 0, opacity: 0.9 }}>
            <strong>What to avoid:</strong> KDP&apos;s keyword guidelines say to avoid subjective claims (&quot;best novel ever&quot;), time-sensitive words (&quot;new,&quot; &quot;on sale&quot;), words already in your title or categories, names of authors not associated with your book, brands you don&apos;t own, and Amazon program names like Kindle Unlimited. See the full list on KDP&apos;s{' '}
            <a href="https://kdp.amazon.com/en_US/help/topic/G201298500" target="_blank" rel="noopener nofollow" style={{ color: '#9c7f35', textDecoration: 'underline' }}>keywords help page</a>.
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
          Amazon&apos;s search suggestions can show what shoppers search for — a starting point for your research. No tools required.
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
          {' '}automates the research step: enter your book&apos;s title, genre, target reader, comparable titles, and key themes — and it generates 7 keyword suggestions, each with a character count you can check against the counter in KDP&apos;s keyword field. It also suggests 2 primary and 3 alternative Amazon category paths.
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
          Amazon doesn&apos;t publish search volume data, but autocomplete suggestions can show common patterns in how readers search. Fiction and nonfiction follow fundamentally different patterns.
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
          The key difference: fiction readers search for the <em>reading experience</em> (how will this make me feel, what tropes does it have, what world am I entering). Nonfiction readers search for the <em>outcome</em> (what problem does this solve, who is it for, what will I be able to do). Using the wrong pattern for your genre — nonfiction-style problem phrases for a fantasy novel — can surface your book to readers who weren&apos;t looking for it.
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
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Categories</h3>
          <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.9, margin: 0 }}>
            KDP lets you select 3 categories when you set up your book. KDP Support can&apos;t recommend categories, so pick the ones that match your book most closely. See KDP&apos;s{' '}
            <a href="https://kdp.amazon.com/en_US/help/topic/G200652170" target="_blank" rel="noopener nofollow" style={{ color: '#9c7f35', textDecoration: 'underline' }}>categories help page</a>.
          </p>
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
          . For KDP categories, see{' '}
          <Link href="/kdp-category-keywords" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            KDP category keywords
          </Link>
          . For the book description field — HTML formatting, character limit, and copywriting structure — see the{' '}
          <Link href="/kdp-book-description" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            KDP book description guide
          </Link>
          . For ebook pricing strategy — royalty tiers, permafree mechanics, and series pricing — see the{' '}
          <Link href="/kdp-ebook-pricing" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            KDP ebook pricing guide
          </Link>
          .
        </p>

        {/* CTA */}
        <div style={{ marginTop: 48, padding: '28px 24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Generate your 7 KDP keywords — tailored to your book.</p>
          <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 20 }}>Includes suggested category paths and a character count for each keyword.</p>
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
