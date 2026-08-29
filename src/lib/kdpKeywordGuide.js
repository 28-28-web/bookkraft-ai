export const KDP_GUIDE_ARTICLES = [
  {
    slug: 'why-kdp-keywords-arent-ranking',
    metaTitle: "Why Your KDP Keywords Aren't Getting Your Book Found | BookKraft AI",
    metaDescription:
      "If your KDP keywords aren't driving discovery, one of five specific mistakes is usually the cause. Here's how to diagnose which one is hurting your listing.",
    title: "Why Your KDP Keywords Aren't Getting Your Book Found",
    body: `<h2>Your 7 Keyword Slots Are the Algorithm's Only Direct Input From You</h2>
<p>Amazon's search algorithm can't read your synopsis or interpret your cover design. It reads your title, subtitle, and the 7 keyword fields you enter when publishing — and that's the primary signal it uses to decide which search queries your book appears in.</p>
<p>Your title and subtitle get indexed automatically. Everything else you're hoping the algorithm picks up — the mood, the tropes, the target audience — it will only find if you put it in the keyword slots. Those 7 fields, each up to 50 characters, are your only direct line to the algorithm. Most authors fill them in fifteen minutes during upload and never revisit them. That's the root of most keyword underperformance.</p>

<h2>Mistake 1: Using Single Words Instead of Complete Phrases</h2>
<p>The most common keyword mistake is entering single words — "mystery," "thriller," "fantasy" — instead of complete phrases.</p>
<p>Single words put you against every book in the genre. "Mystery" returns tens of thousands of results. "Cozy mystery with a female detective small town" returns a far smaller pool — and it matches the actual query a reader types when they know what they're looking for.</p>
<p>Real readers type phrases. Amazon's autocomplete exists because people type conversational queries, not index keywords. The suggestions themselves — "cozy mystery bakery," "psychological thriller unreliable narrator" — are real phrases buyers searched frequently enough for Amazon to surface. Each slot is 50 characters: use all of it as one complete phrase, not a list of three words separated by commas.</p>

<h2>Mistake 2: Repeating Words Already in Your Title</h2>
<p>Amazon already indexes your title and subtitle and uses them for search matching. If your book is called <em>The Bakery Detective</em>, entering "bakery" or "detective" in a keyword slot duplicates a signal Amazon already has — and wastes one of your seven slots on coverage you didn't need to add.</p>
<p>Use your keyword slots for angles your title doesn't cover: the sub-genre, the setting, the tropes, the target reader's emotional need. The goal is to extend reach into new search queries, not repeat what's already indexed.</p>

<h2>Mistake 3: Using Terms Amazon Bans</h2>
<p>Amazon's keyword policy prohibits superlatives ("best," "top," "greatest"), price or promotional language ("sale," "cheap," "discount"), category names used as keywords, and competitor author or brand names. Using any of these doesn't generate an error message — Amazon silently strips the banned term and treats the slot as empty.</p>
<p>This means you can publish, see your 7 slots filled in your KDP dashboard, and still effectively have 4 working keywords because 3 contained banned language that was quietly removed. Check every phrase against Amazon's prohibited terms list before submitting.</p>

<h2>Mistake 4: Using the Wrong Phrase Structure for Your Genre</h2>
<p>Fiction readers and nonfiction readers search in fundamentally different ways, and mixing the patterns kills discovery.</p>
<p>Fiction readers search by reading experience: "enemies to lovers slow burn," "dark academia found family," "cozy mystery cat sidekick." They search for what the book will feel like — tropes, settings, emotional payoff, sub-genre texture.</p>
<p>Nonfiction readers search by problem and outcome: "how to build passive income online," "low-carb meal prep for beginners," "stoic philosophy daily practice." They search for what they want to accomplish after reading.</p>
<p>A fantasy author who enters topic-style keywords ("world-building techniques," "magic system theory") is writing for other writers — not for fantasy readers searching for their next read. A self-help author who enters trope-style phrases won't match how their audience searches. Identify your genre's phrase pattern first, then build every slot around it.</p>

<h2>Mistake 5: Setting Keywords Once and Never Updating</h2>
<p>Keyword performance degrades over time. New competing titles enter your categories, seasonal search trends shift, and Amazon's algorithm weighting changes. Keywords that drove discovery at launch may be significantly underperforming six months later.</p>
<p>Review and refresh every 60–90 days, or immediately when you see a drop in organic page views. Before updating, run fresh research — replacing a working keyword with an untested one is a common self-inflicted wound. Update only the slots that are clearly underperforming, not the whole set at once, so you can track what's working.</p>

<h2>What to Do Instead</h2>
<p>The most reliable starting point is Amazon's own autocomplete. Type your genre plus a space and a letter into Amazon's book search — every autocomplete suggestion is a real phrase real buyers typed in high enough volume for Amazon to surface it. Work through the alphabet for your genre. This takes 20–30 minutes and gives you validated phrases directly from the source.</p>
<p>If you want that research done automatically — tailored to your specific book's genre, comparable titles, target reader, and themes, with banned terms filtered out and ghost category paths included — the <a href="/tools/kdp-keyword-finder" style="color:var(--gold,#c9a84c);text-decoration:none">KDP Keyword &amp; Category Finder</a> generates 7 complete phrases within the 50-character limit in one run.</p>`,
    faq: [
      {
        q: 'How long does it take for new KDP keywords to take effect?',
        a: "KDP typically processes keyword changes within 24–72 hours of saving. Full indexing — where your book appears in search results for new queries — can take up to a week. If you're not seeing the expected discovery after 7 days, check that no phrases contain banned terms, which Amazon silently strips.",
      },
      {
        q: 'Can I test different keywords to see which perform better?',
        a: "Not directly — KDP doesn't provide keyword-level traffic data. You can track indirect signals: organic page views in KDP reports and BSR movements correlated with keyword update dates. Change one or two slots at a time so changes are traceable.",
      },
      {
        q: 'Does KDP penalize me for changing keywords too often?',
        a: "No. You can update keywords as often as you want without penalty. The only downside is that changing too many slots at once makes it harder to know which change drove any improvement.",
      },
      {
        q: "Why does my book appear for some keyword searches but not others?",
        a: "Amazon search combines your keyword slots, title, subtitle, reviews, and sales velocity to determine ranking position. Even with an exact-match keyword phrase, low sales velocity relative to competing titles pushes you lower in results. Keyword relevance determines eligibility; sales velocity determines rank within that result set.",
      },
      {
        q: 'How do I know if my current keywords are working?',
        a: "Check your KDP dashboard's Traffic Diagnostics report — it shows page views by source (organic search vs. ads vs. browse). A rise in organic page views after a keyword update is a positive signal. You can also search Amazon directly for your keyword phrases and check whether your book appears within the first 50–100 results.",
      },
    ],
  },
];

export function getArticleBySlug(slug) {
  return KDP_GUIDE_ARTICLES.find((a) => a.slug === slug) || null;
}
