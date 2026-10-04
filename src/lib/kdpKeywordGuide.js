export const KDP_GUIDE_ARTICLES = [
  {
    slug: 'why-kdp-keywords-arent-ranking',
    metaTitle: "Why Your KDP Keywords Aren't Ranking — 5 Mistakes to Fix | BookKraft AI",
    metaDescription:
      "If your KDP keywords aren't driving discovery, one of five specific mistakes is usually the cause. Here's how to diagnose which one is hurting your listing.",
    title: "Why Your KDP Keywords Aren't Ranking — 5 Mistakes to Fix",
    body: `<h2>Your 7 Keyword Slots Are the Algorithm's Only Direct Input From You</h2>
<p>Amazon's search algorithm can't read your synopsis or interpret your cover design. It reads your title, subtitle, and the 7 keyword fields you enter when publishing — and that's the primary signal it uses to decide which search queries your book appears in.</p>
<p>Your title and subtitle get indexed automatically. Everything else you're hoping the algorithm picks up — the mood, the tropes, the target audience — it will only find if you put it in the keyword slots. Those 7 keyword boxes are your only direct line to the algorithm. Most authors fill them in fifteen minutes during upload and never revisit them. That's the root of most keyword underperformance.</p>

<h2>Mistake 1: Using Single Words Instead of Complete Phrases</h2>
<p>The most common keyword mistake is entering single words — "mystery," "thriller," "fantasy" — instead of complete phrases.</p>
<p>Single words put you against every book in the genre. "Mystery" returns tens of thousands of results. "Cozy mystery with a female detective small town" returns a far smaller pool — and it matches the actual query a reader types when they know what they're looking for.</p>
<p>Real readers type phrases. Amazon's autocomplete exists because people type conversational queries, not index keywords. The suggestions themselves — "cozy mystery bakery," "psychological thriller unreliable narrator" — are real phrases buyers searched frequently enough for Amazon to surface. Use each slot for one complete phrase, up to the character limit KDP shows in the field, not a list of three words separated by commas.</p>

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
<p>If you want that research done automatically — tailored to your specific book's genre, comparable titles, target reader, and themes, with banned terms filtered out and category suggestions included — the <a href="/tools/kdp-keyword-finder" style="color:var(--gold,#c9a84c);text-decoration:none">KDP Keyword &amp; Category Finder</a> generates 7 complete phrases in one run.</p>`,
    faq: [
      {
        q: 'How long does it take for new KDP keywords to take effect?',
        a: "KDP's Timelines help page says keyword updates can take 72 hours to appear. If you still aren't seeing the expected discovery after that, check that no phrase uses terms KDP asks you to avoid in keywords.",
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
  {
    slug: 'kdp-keyword-banned-terms',
    metaTitle: "KDP Keyword Banned Terms — What Amazon's Policy Prohibits | BookKraft AI",
    metaDescription:
      "Amazon silently strips prohibited KDP keywords without warning. Here's what Amazon's policy actually covers, what sits in a grey area, and what to use instead.",
    title: "KDP Keyword Banned Terms — What Amazon's Policy Prohibits",
    body: `<h2>Why Amazon Bans Certain Keywords — and What Happens When You Use Them</h2>
<p>Amazon's keyword policy exists to keep search results useful for buyers. When authors enter prohibited terms, Amazon doesn't reject the submission or flag your account immediately — it silently strips the offending terms and treats that slot as if it were empty. No error message. No warning. Your KDP dashboard still shows the keywords you entered, but Amazon's index doesn't use them.</p>
<p>The practical consequence: you can publish a book, believe you have 7 keyword slots working, and actually have 3 or 4 — because the others contained terms Amazon quietly discarded. This is one of the most common reasons authors get no organic discovery from what looks like a complete keyword setup.</p>

<h2>Prohibited Terms — What Amazon's Policy Covers</h2>
<p style="font-size:14px;color:var(--mid);border-left:3px solid var(--border);padding-left:12px;margin-bottom:20px">Amazon updates its keyword policies periodically. The categories below reflect Amazon's published KDP content guidelines as of this writing — check Amazon's current KDP Content Guidelines before making major keyword changes.</p>
<p><strong>Superlatives and unverifiable ranking claims.</strong> "Best," "top," "greatest," "#1," "most popular." Amazon's guidelines prohibit claims you cannot verify. Avoid these regardless of intent.</p>
<p><strong>Price and promotional references.</strong> Amazon's guidelines explicitly cite "temporary descriptions" (such as "sale") as prohibited in keyword fields. Terms like "discount," "limited time," "on sale," and "bargain" fall under the same principle.</p>
<p><strong>Competitor author or brand names.</strong> Explicitly prohibited in Amazon's content guidelines. You cannot use another author's name or another book's title as a keyword to intercept that audience.</p>
<p><strong>Misleading or inaccurate content claims.</strong> Keywords that falsely describe your book's content — wrong genre, content the book doesn't contain — can result in keyword removal and listing suppression.</p>

<h2>Terms That Are Advised Against or Sit in a Grey Area</h2>
<p><strong>"Award-winning," "bestselling," "critically acclaimed."</strong> Amazon's guidelines prohibit unverifiable claims — which puts these in a grey area rather than an outright ban. If a book genuinely won a named award or was a verified bestseller, Amazon's stance is less clear-cut than for pure superlatives like "best." In practice the risk is real: Amazon may strip these as prohibited claims. They also add little search value — readers don't search "award-winning mystery." The safer approach is to note verifiable awards in your book description, not the keyword fields.</p>
<p><strong>Category names as keywords.</strong> Amazon's guidelines advise against using standalone category names as keywords — not because they appear on a prohibited list, but because they're redundant. Your genre is already signaled through formal category selection. A standalone "mystery" or "thriller" adds no new search signal and wastes a slot that could hold a specific reader-facing phrase. Not an explicit prohibition; a wasted opportunity.</p>
<p><strong>Your own title words.</strong> Not prohibited by policy, but Amazon's guidelines explicitly advise against repeating title words in keyword slots because those words are already indexed. Entering "lighthouse" in a keyword slot when your title is <em>The Lighthouse Keeper's Secret</em> wastes a slot on coverage Amazon already has.</p>
<p><strong>Subjective quality descriptors.</strong> "Gripping," "unputdownable," "emotional," "page-turning" aren't always stripped, but they add no algorithmic value. Amazon's search isn't matching readers who type "gripping books" — readers search for tropes, genres, and outcomes, not adjectives.</p>

<h2>How to Check Keywords Before Submitting</h2>
<p>Before entering any phrase in KDP, run three quick checks:</p>
<p><strong>Superlative scan.</strong> Does any word claim a ranking or quality position? Remove it.</p>
<p><strong>Price and promo scan.</strong> Does any word reference cost, availability, or a sale? Remove it.</p>
<p><strong>Competitor scan.</strong> Does any phrase include another author's name or book title? Remove it.</p>
<p>Then test each phrase in Amazon's book search autocomplete. If your phrase appears as an autocomplete suggestion, it's a real search query real readers use — that's strong validation that the phrase both matches reader behavior and isn't triggering Amazon's filters (autocomplete suggestions are drawn from actual search history, not prohibited terms).</p>

<h2>What to Use Instead of Banned Terms</h2>
<p>Every banned term represents a slot that could hold a working phrase. The replacement pattern is always the same: turn the prohibited shortcut into a specific, complete phrase that describes what a reader who wants your book would actually search.</p>
<ul>
<li>"Best thriller" → "psychological thriller with an unexpected plot twist"</li>
<li>"Cheap romance novel" → "small town romance with second chance love"</li>
<li>"James Patterson style" → "fast-paced legal thriller government conspiracy"</li>
<li>"Mystery" alone → "cozy mystery female amateur sleuth English village"</li>
</ul>
<p>If you want 7 phrases already filtered against Amazon's prohibited terms list, the <a href="/tools/kdp-keyword-finder" style="color:var(--gold,#c9a84c);text-decoration:none">KDP Keyword &amp; Category Finder</a> filters out prohibited terms before returning results — you get 7 clean, specific phrases ready to paste into KDP's keyword fields.</p>`,
    faq: [
      {
        q: 'Will Amazon tell me if a keyword was removed for violating policy?',
        a: "No. Amazon silently strips prohibited terms without any notification. Your KDP dashboard continues showing the keywords you entered regardless of whether Amazon is indexing them. The only way to detect silent removal is to search Amazon for your exact phrase and check whether your book appears — or monitor your organic page views in KDP's Traffic Diagnostics report for unexpectedly low discovery.",
      },
      {
        q: 'Can I use genre category names like "mystery" or "fantasy" as keywords?',
        a: "Amazon's guidelines advise against using category names as standalone keywords because those categories are already handled through formal category selection. More practically, single category names are weak keywords — they compete against every book in the genre. A complete phrase that includes the genre as part of a longer, specific query (\"dark fantasy magic academy\" instead of just \"fantasy\") is both policy-compliant and more effective.",
      },
      {
        q: 'What happens if my book is flagged for keyword policy violations?',
        a: 'Minor violations — prohibited terms in keyword slots — typically result in those keywords being silently removed. Repeated or more serious violations, such as systematically targeting competitor author names or making false content claims, can result in listing suppression or account warnings. KDP reserves the right to remove listings that violate content policies.',
      },
      {
        q: 'Are there keyword terms banned on KDP but allowed in Amazon Ads?',
        a: "Yes. Amazon Ads (Sponsored Products) keyword targeting has different rules from backend keyword fields. In ads you can target categories, genres, and competitor ASINs through product targeting — these aren't available in backend keyword fields. The rules are separate systems with separate policies.",
      },
      {
        q: "Does Amazon update its banned terms list?",
        a: "Amazon updates its content policies periodically, and what's prohibited can change. The most reliable current source is the KDP Content Guidelines page in Amazon's help system. Checking it before a major keyword update — rather than relying on what was permitted a year ago — is good practice.",
      },
    ],
  },
  {
    slug: 'how-to-find-amazon-ghost-categories',
    metaTitle: 'Amazon Ghost Categories — What KDP\'s 3-Category Rule Means | BookKraft AI',
    metaDescription:
      "Ghost categories are Amazon browse categories you can't pick in KDP. KDP's current help pages describe no way to request them. Here's what KDP says to do instead.",
    title: 'Amazon Ghost Categories — What KDP\'s 3-Category Rule Means',
    body: `<h2>What Authors Mean by Ghost Categories</h2>
<p>"Ghost categories" is an author-community term, not a KDP one. It describes category paths you can see on Amazon — in a comparable book's Best Sellers Rank list, for example — that don't appear in the list you choose from when you set up a book in KDP.</p>
<p>Older guides, including an earlier version of this page, told authors to email KDP support with their ASIN and the exact category path to be placed in these categories. KDP's current <a href="https://kdp.amazon.com/en_US/help/topic/G200652170" target="_blank" rel="noopener nofollow" style="color:var(--gold,#c9a84c);text-decoration:none">Categories help page</a> doesn't describe that route. It says: "As an author, you can select 3 categories when creating a book in KDP." Those 3 are chosen in KDP itself.</p>

<h2>What KDP's Categories Page Says Now</h2>
<p>Everything in this list comes from KDP's <a href="https://kdp.amazon.com/en_US/help/topic/G200652170" target="_blank" rel="noopener nofollow" style="color:var(--gold,#c9a84c);text-decoration:none">Categories help page</a>:</p>
<ul>
<li>You can select 3 categories when you create a book in KDP. Together with your keywords, they tell Amazon where to "shelve" your book.</li>
<li>If a new category is added to Amazon's store and you can't find it in KDP, you may need to wait until KDP's options are updated. In the meantime, KDP suggests picking the closest matching category available.</li>
<li>If you're not finding a specific category for your book, you can use keywords to help Amazon decide how to shelve it.</li>
<li>Some categories aren't available for every format (ebook, paperback, comic), and categories differ between marketplaces such as Amazon.com and Amazon.co.jp.</li>
<li>The KDP Support Team can't give you specific recommendations or strategies for picking categories.</li>
</ul>

<h2>What to Do Instead of Requesting a Ghost Category</h2>
<p><strong>1. Pick the closest match in KDP's list.</strong> This is KDP's own advice when the category you want isn't offered. Look for the most specific path in the KDP list that still describes your book accurately.</p>
<p><strong>2. Put the specific angle in your keywords.</strong> If the niche you wanted — a sub-genre, trope, or setting — has no category in KDP, move it into your seven keyword phrases. KDP says keywords "are often more specific and help readers find your book when they search for something unique."</p>
<p><strong>3. Choose for your primary marketplace and format.</strong> Categories differ by marketplace and format, so check the list for the marketplace you selected as primary, and for each format you publish.</p>

<h2>How to Research Categories Through Comparable Books</h2>
<p>KDP's first tip for choosing categories is to research your genre: "See where similar books are categorized and determine if your book fits there." A practical way to do that:</p>
<p><strong>Step 1: Find a comparable book.</strong> Search for a book closely similar to yours — same genre, similar themes, similar target reader. Open its product page and scroll to the "Best Sellers Rank" section.</p>
<p><strong>Step 2: Read its category list.</strong> Amazon lists the categories the book currently ranks in, and each one is a link.</p>
<p><strong>Step 3: Click through.</strong> Browse the books inside each category. Note which paths fit your book and how crowded they look.</p>
<p><strong>Step 4: Compare against KDP's list.</strong> When you set up or edit your book, look for those paths — or the closest match — in KDP's category list, and choose your 3 from there.</p>

<h2>Changing Your Categories Later</h2>
<p>You can change categories any time from your Bookshelf: open <strong>Edit details</strong>, go to the Categories section, remove a category if you already have three, pick the new one, and submit. KDP says it can take up to 72 hours for your book to display in its new categories, and that it reviews category changes and does not tolerate categorization that misleads readers.</p>
<p>The <a href="/tools/kdp-keyword-finder" style="color:var(--gold,#c9a84c);text-decoration:none">KDP Keyword &amp; Category Finder</a> suggests category paths and keyword phrases for your book. Check each suggested path against the list KDP offers you before choosing. For how categories and keywords work together, see the <a href="/kdp-category-keywords" style="color:var(--gold,#c9a84c);text-decoration:none">KDP category keywords guide</a>.</p>`,
    faq: [
      {
        q: 'Can I still email KDP support to add ghost categories?',
        a: "KDP's current Categories help page doesn't describe any way to request categories by contacting support. It says you select 3 categories in KDP, and that the KDP Support Team can't give specific recommendations or strategies for picking categories.",
      },
      {
        q: "What if the category I want isn't in KDP's list?",
        a: "KDP's Categories page says that if a new category is added to Amazon's store and you can't find it in KDP, you may need to wait until KDP's options are updated, and suggests picking the closest matching category in the meantime. It also suggests using keywords when you can't find a specific category.",
      },
      {
        q: 'How long until my book shows in a new category?',
        a: "KDP's Categories page says it can take up to 72 hours for your book to display in new categories.",
      },
      {
        q: 'Why did one of my categories change or disappear?',
        a: "KDP's Categories page lists several reasons: Amazon updates its categories from time to time, books flagged for sexually explicit content are removed from categories such as Children's and Young Adult, and KDP may remove or change a category that isn't related to the book's content.",
      },
    ],
  },
  {
    slug: 'kdp-category-limit',
    metaTitle: 'KDP Category Limit — How Many Categories Can You Choose? | BookKraft AI',
    metaDescription:
      "KDP lets you select 3 categories per book. Here's what KDP's help pages say about choosing, changing, and losing categories, and how to pick your 3.",
    title: 'KDP Category Limit — How Many Categories Can You Choose?',
    body: `<h2>The Limit: 3 Categories per Book</h2>
<p>KDP's <a href="https://kdp.amazon.com/en_US/help/topic/G200652170" target="_blank" rel="noopener nofollow" style="color:var(--gold,#c9a84c);text-decoration:none">Categories help page</a> says: "As an author, you can select 3 categories when creating a book in KDP." KDP's <a href="https://kdp.amazon.com/en_US/help/topic/G201097560" target="_blank" rel="noopener nofollow" style="color:var(--gold,#c9a84c);text-decoration:none">Metadata Guidelines</a> say the same thing: during title setup, you choose up to three categories from a list based on your primary audience and marketplace.</p>
<p>You may still see older advice that KDP lets you pick 2 categories at upload and request up to 8 more from KDP support, for 10 in total. KDP's current help pages don't describe that process. An earlier version of this page repeated it; it has been corrected.</p>

<h2>How to Add or Change Your Categories</h2>
<p>KDP's Categories page gives these steps:</p>
<ol>
<li>Go to your Bookshelf and click the ellipsis (...) next to the book.</li>
<li>Select <strong>Edit details</strong>.</li>
<li>On the Details tab, review your Primary Audience and Primary Marketplace before choosing categories.</li>
<li>In the Categories section, select <strong>Edit categories</strong> or <strong>Choose categories</strong>.</li>
<li>If you already have three categories, click <strong>Remove</strong> next to the one you want to replace.</li>
<li>Pick your new categories, then save and submit your book.</li>
</ol>
<p>It can take up to 72 hours for your book to display in its new categories. KDP reviews category changes and says it does not tolerate categorization that misleads readers.</p>

<h2>Why a Category Can Change or Stop Showing</h2>
<p>KDP's Categories page lists the common causes:</p>
<ul>
<li>Fewer than 72 hours have passed since the update was published.</li>
<li>Amazon has updated its categories, which can change your book's categories.</li>
<li>The book is flagged as containing sexually explicit images or titles, which removes it from categories such as Children's and Young Adult.</li>
<li>The category isn't related to the book's content, in which case KDP may remove or change it.</li>
</ul>

<h2>Formats and Marketplaces</h2>
<p>Some categories aren't available for every format — ebook, paperback, or comic — and categories differ between marketplaces such as Amazon.com and Amazon.co.jp. KDP suggests focusing on your primary marketplace and picking the best-matching category between formats when you need to.</p>

<h2>How to Choose Your 3 Categories</h2>
<p>KDP's own tips are to research your genre and see where similar books are categorized, pick categories that accurately describe your book, and "aim for categories that are popular enough to have reader interest, but not so broad (or specific) that your book gets lost."</p>
<p>In practice — this part is our advice, not KDP policy — that balance comes down to two questions for each candidate category:</p>
<p><strong>Reach:</strong> do your target readers actually browse here? A large category gives visibility in a crowded space — hard to rank, but the audience is real.</p>
<p><strong>Winnability:</strong> can your book realistically reach a visible rank here? A smaller, well-fitting category can show your book to more of the right readers than a huge one where it sits far down the list.</p>
<p>To find candidates, open comparable books' product pages and read the categories listed in their "Best Sellers Rank" section, then look for those paths — or the closest match — in KDP's list. See <a href="/kdp-keyword-guide/how-to-find-amazon-ghost-categories" style="color:var(--gold,#c9a84c);text-decoration:none">what to do when a category isn't in KDP's list</a>.</p>

<h2>Categories and Keywords Work Together</h2>
<p>KDP says categories, "along with keywords you select, tell Amazon where to 'shelve' your book," and that if you can't find a specific category, keywords can help Amazon decide how to shelve it. So choose your 3 categories and your seven keyword phrases together, and make them describe the same book: the same genre, tropes, and reader.</p>
<p>The <a href="/tools/kdp-keyword-finder" style="color:var(--gold,#c9a84c);text-decoration:none">KDP Keyword &amp; Category Finder</a> suggests both keyword phrases and category paths for your book; check each path against the list KDP offers you. For more on how the two fit together, see the <a href="/kdp-category-keywords" style="color:var(--gold,#c9a84c);text-decoration:none">KDP category keywords guide</a>.</p>`,
    faq: [
      {
        q: 'Can I have more than 3 categories?',
        a: "KDP's Categories page and Metadata Guidelines both describe choosing 3 categories in KDP. Neither describes a way to add more, by contacting support or otherwise.",
      },
      {
        q: 'Can I change my categories after publishing?',
        a: "Yes. Open Edit details for the book on your Bookshelf, change the categories in the Categories section, and submit. KDP says it can take up to 72 hours for the book to display in its new categories.",
      },
      {
        q: 'Are categories the same for my ebook and paperback?',
        a: "Not always. KDP says some categories aren't available for every format, and categories also differ between marketplaces. It suggests focusing on your primary marketplace and picking the best-matching category between formats when needed.",
      },
      {
        q: 'Can KDP support choose my categories for me?',
        a: "No. KDP's Categories page says: \"The KDP Support Team cannot give you specific recommendations or strategies for picking book categories.\"",
      },
      {
        q: 'What happens if I pick a category that doesn\'t fit my book?',
        a: "KDP says that if an unrelated category is selected, it may remove or change the category. Its Metadata Guidelines also say it does not tolerate selecting categories to mislead or manipulate customers.",
      },
    ],
  },
  {
    slug: 'backend-keywords-vs-search-terms',
    metaTitle: "KDP Backend Keywords vs Amazon Search Terms — What's the Difference | BookKraft AI",
    metaDescription:
      "KDP backend keywords are one input into Amazon's search term profile — not the whole thing. Here's how both work, what you control, and how to optimize each.",
    title: 'KDP Backend Keywords vs Amazon Search Terms — What\'s the Difference',
    body: `<h2>Backend Keywords: What They Are and Where You Enter Them</h2>
<p>When you publish a book on KDP, the publishing workflow includes a "Keywords" step with 7 fields. These are backend keywords — called "backend" because they're not visible to readers on your product page. Readers never see them. They exist purely as metadata that Amazon's search index uses to determine when to surface your book in search results.</p>
<p>KDP's <a href="https://kdp.amazon.com/en_US/help/topic/G201298500" target="_blank" rel="noopener nofollow" style="color:var(--gold,#c9a84c);text-decoration:none">keywords help page</a> asks you to "keep an eye on the character limit in the text field" rather than giving a number, so check the counter in the field as you type. Amazon treats each field as a phrase unit — what you enter functions as a search phrase that readers might type, not as a bag of individual words. A reader doesn't need to type your exact phrase to trigger a match; Amazon has natural language flexibility. But phrases that closely mirror actual reader search behavior will match more reliably than abstract keyword strings.</p>

<h2>Amazon Search Terms: Where They Come From</h2>
<p>"Search terms" is Amazon's broader concept — the full set of signals Amazon uses to determine what searches your book is relevant for. Your backend keyword fields are one direct input into that set, but not the only one.</p>
<p>Amazon also derives search relevance from:</p>
<ul>
<li><strong>Your title and subtitle.</strong> Every word in your book's title is automatically indexed. This is why repeating title words in backend keyword slots wastes those slots — the signal is already there.</li>
<li><strong>Your series name.</strong> If your book is part of a series, the series name contributes its own search signal.</li>
<li><strong>Your author name.</strong> Readers searching for your name find your books through this signal, not through backend keywords.</li>
<li><strong>Your book description.</strong> Amazon indexes the text of your description, though it's weighted lower than backend keyword fields and title.</li>
<li><strong>Reader behavior signals.</strong> Which searches lead to clicks on your book, how long readers stay on your product page, conversion rate from page view to purchase — these behavioral signals influence which queries Amazon continues associating with your book over time.</li>
</ul>
<p>Backend keyword fields are where you have <em>direct control</em> over search signals. Everything else is derived from your listing content or inferred from reader behavior.</p>

<h2>How Amazon Combines These Signals for Search Ranking</h2>
<p>Amazon doesn't just check whether a keyword matches your listing — it ranks results within a matching set. Two books both indexed for "psychological thriller unreliable narrator" will appear in different positions based on relevance score plus performance signals.</p>
<p>Relevance score is higher when the query closely matches your backend keywords, when your title reinforces the same theme, and when your book is formally categorized in the relevant genre. Performance signals — click-through rate, conversion rate, review velocity — determine where you land within the result set your keywords qualify you for.</p>
<p>This is why keyword optimization alone isn't a complete strategy. A book with precise keywords but a low-converting cover or blurb will rank lower than a book with slightly less precise keywords and higher reader engagement. Keywords get you into the result set; the rest of the listing determines your position within it.</p>

<h2>What You Control vs. What Amazon Infers</h2>
<p>You have direct control over backend keyword fields, title, subtitle, series name, and book description — all editable after publishing through your KDP dashboard.</p>
<p>Amazon infers search relevance from reader behavior over time. A book that consistently converts well when it appears for a particular query will gradually rank higher for that query, even without keyword changes — behavioral signals continuously update Amazon's relevance model for your listing.</p>
<p>The practical implication: set your backend keywords precisely at launch, because behavioral data takes time to accumulate and you want Amazon indexing the right queries from day one. Then monitor which search queries actually drive traffic using KDP's Traffic Diagnostics report. Over time, you may find Amazon has naturally associated your book with queries you didn't explicitly target — or that you're not ranking for queries where your keyword slot was too vague to generate useful signal.</p>

<h2>How to Use This Distinction to Optimize Your Listing</h2>
<p>Since backend keywords are your primary direct control, optimize them for phrases your title and description don't already cover:</p>
<p><strong>Don't repeat title words.</strong> Amazon already indexes these — backend slots spent on them add no new coverage.</p>
<p><strong>Match reader search phrase patterns for your genre.</strong> Fiction readers search by trope, setting, and sub-genre ("enemies to lovers slow burn contemporary"). Nonfiction readers search by problem and outcome ("how to start a business with no money beginners"). Match the query structure your genre's readers actually use, not how you'd describe the book to another author.</p>
<p><strong>Use the space the field gives you.</strong> "Enemies to lovers billionaire fake engagement romance" is more valuable than "romance fiction contemporary" — it's specific, it's a complete phrase, and it matches how readers who want that exact book search.</p>
<p><strong>Revisit every 60–90 days.</strong> As behavioral data accumulates, you'll have better information about which signals are working. KDP's Traffic Diagnostics report shows organic page views — the clearest proxy for keyword-driven discovery.</p>
<p>If you want 7 phrases already structured for reader search behavior in your specific genre — filtered for Amazon's prohibited terms — the <a href="/tools/kdp-keyword-finder" style="color:var(--gold,#c9a84c);text-decoration:none">KDP Keyword &amp; Category Finder</a> generates them from your book's genre, comparable titles, target reader, and themes.</p>`,
    faq: [
      {
        q: 'Are "backend keywords" and "search terms" the same thing on KDP?',
        a: '"Backend keywords" refers specifically to the 7 fields you fill in during the KDP publishing workflow — metadata you enter directly. "Search terms" is a broader concept: the full set of queries Amazon considers your book relevant for, derived from your backend keywords plus your title, description, reader behavior, and other signals. Your backend keywords are an input into your book\'s search term profile, not the whole thing.',
      },
      {
        q: "Can I see which search terms Amazon is indexing my book for?",
        a: "Not directly. KDP's Traffic Diagnostics report shows organic page view sources but doesn't list specific queries. Some authors use Amazon Sponsored Products campaigns in broad match mode as a proxy — the Search Term report from an active ad campaign shows which queries triggered impressions for your book, which correlates with organic search relevance.",
      },
      {
        q: "Do backend keywords have more weight than title keywords in Amazon's algorithm?",
        a: "Title keywords generally carry more weight — Amazon treats a strong title-to-query match as a higher relevance signal than a backend keyword match alone. Backend keyword slots matter despite this because they're your only mechanism for extending relevance to phrases your title doesn't cover. Together, title and backend keywords give you the broadest possible query coverage.",
      },
      {
        q: 'Should I use long-tail phrases or broad terms in backend keyword fields?',
        a: 'Long-tail phrases — specific, multi-word queries that match what a reader who wants your exact book would type. Broad terms like "mystery" or "romance" put you in massive result sets where your book, without established sales velocity, ranks near the bottom. A long-tail phrase like "cozy mystery British village amateur sleuth" has a smaller result set but one where you can rank visibly.',
      },
      {
        q: 'How many words can I put in each KDP keyword field?',
        a: 'KDP\'s keywords help page doesn\'t set a word count. It asks for up to seven keywords or short phrases and tells you to "keep an eye on the character limit in the text field," so check the counter in the field as you type. A phrase like "slow burn enemies to lovers college setting" is 43 characters and 7 words; "psychological thriller unreliable narrator memory" is 49 characters and 5 words. Use the space for a phrase that closely mirrors how readers in your genre search.',
      },
    ],
  },
];

export function getArticleBySlug(slug) {
  return KDP_GUIDE_ARTICLES.find((a) => a.slug === slug) || null;
}
