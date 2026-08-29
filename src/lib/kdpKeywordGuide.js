export const KDP_GUIDE_ARTICLES = [
  {
    slug: 'why-kdp-keywords-arent-ranking',
    metaTitle: "Why Your KDP Keywords Aren't Ranking — 5 Mistakes to Fix | BookKraft AI",
    metaDescription:
      "If your KDP keywords aren't driving discovery, one of five specific mistakes is usually the cause. Here's how to diagnose which one is hurting your listing.",
    title: "Why Your KDP Keywords Aren't Ranking — 5 Mistakes to Fix",
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
<p>If you want 7 phrases already filtered against Amazon's prohibited terms list, the <a href="/tools/kdp-keyword-finder" style="color:var(--gold,#c9a84c);text-decoration:none">KDP Keyword &amp; Category Finder</a> filters out prohibited terms before returning results — you get 7 clean, specific phrases formatted within KDP's 50-character fields.</p>`,
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
    metaTitle: 'How to Find Amazon Ghost Categories for Your Book | BookKraft AI',
    metaDescription:
      "Ghost categories exist in Amazon's browse tree but don't appear in the KDP publisher interface. Here's how to find them and request placement through KDP support.",
    title: "How to Find Amazon Ghost Categories for Your Book",
    body: `<h2>What Ghost Categories Actually Are</h2>
<p>Amazon's book browse tree contains thousands of category paths. The categories you see in the KDP publisher interface during upload — the picker where you select your 2 categories — show only a subset of what's in that tree. The rest exist in Amazon's public browse structure, are reachable by readers clicking through the hierarchy, and have books already listed in them. But you can't select them during upload because they don't appear in the picker.</p>
<p>These are ghost categories. The name comes from the fact that they're visible from the outside — readers can find and browse them — but invisible during the publishing workflow. The only way to get your book into one is to contact KDP support after publishing with your ASIN and the exact category path.</p>
<p>Ghost categories tend to have less competition for two reasons: most authors don't know they exist, and the friction of emailing KDP support filters out everyone who doesn't know the process. A category with 200 books requires a far lower sales rank to reach #1 Bestseller than a category with 20,000.</p>

<h2>How to Find Ghost Categories</h2>
<p>The most reliable method is browsing Amazon's live category tree through comparable books:</p>
<p><strong>Step 1: Find a comparable book.</strong> Search for a book closely similar to yours — same genre, similar themes, similar target audience. Open its product page and scroll down to the "Best Sellers Rank" section near the bottom of the page.</p>
<p><strong>Step 2: Read its full category list.</strong> Under the BSR section, Amazon lists every category the book currently ranks in. Each category name is a clickable link. A book placed in ghost categories will show category paths you've never seen in the KDP publisher interface.</p>
<p><strong>Step 3: Click through unfamiliar paths.</strong> If you see a category you don't recognize from the upload picker, click it. Browse the books inside and check the competition level — how many books are listed, what their BSR numbers look like, whether any have a #1 Bestseller badge at a rank that seems achievable.</p>
<p><strong>Step 4: Capture the full breadcrumb path.</strong> Navigate to the category page. At the top of the page you'll see a breadcrumb: "Books &gt; Mystery, Thriller &amp; Suspense &gt; Mystery &gt; Amateur Sleuths." Write down the complete path exactly as it appears — that precise text is what you'll send to KDP support.</p>

<h2>Common Ghost Categories by Genre</h2>
<p>Ghost categories appear in every genre, but some are more commonly unknown than others:</p>
<p><strong>Fiction ghost categories often include:</strong> highly specific cozy mystery sub-genres (crafting, cats, bakeries, holidays), niche romance sub-categories (workplace romance, sports romance, military romance), literary fiction broken down by region or theme, and historical fiction organized by specific time period and geography.</p>
<p><strong>Nonfiction ghost categories often include:</strong> professional categories broken down by strategy or approach (real estate by investment type, parenting by child age range or specific need), hobby categories organized by discipline (specific fiber arts, instrument types), and regional or cultural nonfiction that doesn't surface in the standard picker.</p>
<p>The best source for ghost categories relevant to your specific book is always comparable titles — books with similar audiences, already ranked in multiple categories, whose full category lists you can read from their product pages.</p>

<h2>How to Request Ghost Categories From KDP Support</h2>
<p>After your book is live, contact KDP support through Amazon's help system. The request should be concise and include exactly:</p>
<ul>
<li>Your book's ASIN (found on your KDP dashboard or the Amazon product page URL)</li>
<li>The full category paths you want added, written exactly as they appear in Amazon's browse breadcrumb — not abbreviations or approximate names</li>
</ul>
<p>Example: "Please add my book [ASIN] to the following categories: Books &gt; Mystery, Thriller &amp; Suspense &gt; Mystery &gt; Amateur Sleuths; Books &gt; Mystery, Thriller &amp; Suspense &gt; Mystery &gt; Cozy &gt; Culinary. These categories are not available in the standard publisher interface."</p>
<p>KDP support typically processes these requests within 3–5 business days. Confirm placement by checking your book's product page — new categories appear in the BSR section when added successfully.</p>

<h2>How Many Ghost Categories to Request</h2>
<p>KDP allows up to 10 categories total per book (the 2 selected during upload plus up to 8 more through support). Whether to request all 8 additional slots depends on genuine fit — Amazon expects the categories you request to match your book's actual content.</p>
<p>Request categories where your book genuinely belongs and where you can realistically rank. A book placed in a mismatched category generates poor engagement from readers who browse to it, which sends negative signals back to Amazon's algorithm. Better to hold 6–7 well-fitted categories than 10 where 3 are stretches.</p>
<p>The <a href="/tools/kdp-keyword-finder" style="color:var(--gold,#c9a84c);text-decoration:none">KDP Keyword &amp; Category Finder</a> outputs full category paths — including ghost categories matched to your book's genre and themes — formatted as the exact path text you paste into a KDP support request, with a rationale for each recommendation so you can evaluate fit before requesting.</p>`,
    faq: [
      {
        q: 'How long does KDP support take to add ghost categories?',
        a: "KDP support typically processes category requests within 3–5 business days, though it can take longer during peak publishing periods. Once processed, new categories appear in the Best Sellers Rank section of your book's product page — that's how to confirm they were added successfully.",
      },
      {
        q: 'Can any book be placed in any ghost category?',
        a: "No. KDP reserves the right to decline category placements that don't match the book's content. Authors who place books in unrelated categories to gain an easy bestseller rank risk having those categories removed and their account flagged for category manipulation.",
      },
      {
        q: 'What if KDP support declines my category request?',
        a: "If support declines a category, they'll usually explain why — content mismatch is the most common reason. Try requesting alternative categories that still fit your book. If you believe the rejection was an error, you can follow up with more context about why the category is relevant to your content.",
      },
      {
        q: 'Do ghost categories affect BSR the same way standard categories do?',
        a: "Yes. BSR is calculated per category, and placement in a ghost category generates a BSR in that category exactly the same way standard categories do. A ghost category with fewer competing books means a lower sales volume is needed to reach a high rank — that's the core strategic advantage.",
      },
      {
        q: 'Do I need to re-request categories after updating my book?',
        a: "No. Categories stay attached to the ASIN unless you or KDP removes them. Updating your manuscript, cover, or metadata doesn't reset your category placements. If your book changes genre significantly, you may want to contact support to swap out categories that no longer reflect the updated positioning.",
      },
    ],
  },
  {
    slug: 'kdp-category-limit',
    metaTitle: 'KDP Category Limit — How Many Categories Can You Actually Choose | BookKraft AI',
    metaDescription:
      "KDP lets you pick 2 categories during upload, but the real limit is 10. Here's how to request additional categories through KDP support and how to choose which ones to target.",
    title: 'KDP Category Limit — How Many Categories Can You Actually Choose',
    body: `<h2>The 2-Category Limit During Upload — and Why It's Not the Real Limit</h2>
<p>When you upload a book on KDP, the publishing interface lets you browse and select 2 categories before submitting. Most authors accept this as the full limit. It isn't.</p>
<p>Amazon's actual policy allows up to 10 categories per book. The 2-category restriction is the limit of the upload interface — not the limit of the system. The remaining 8 slots are accessible by emailing KDP support after your book is live, with your ASIN and the category paths you want added. This is a published, supported process. It's not a workaround or a policy grey area.</p>
<p>The reason most authors never reach 10 categories: the additional slots require a manual request, and knowing the process exists is the prerequisite. Authors who discover and use it have access to browse paths, bestseller rankings, and "Customers also bought" chains that authors capped at 2 categories don't.</p>

<h2>The 10-Category Maximum — How to Reach It</h2>
<p>The process has two stages:</p>
<p><strong>Stage 1: Select 2 categories during upload.</strong> Use the KDP category picker to select your 2 most important categories before publishing. Choose the ones where your target readers are most likely to browse and where immediate placement matters most — these are the only categories active when your book first goes live.</p>
<p><strong>Stage 2: Request up to 8 more through KDP support.</strong> After your book is live (typically within 24–72 hours of publishing), contact KDP support through Amazon's help system. Provide your ASIN and the full category path text for each additional category you want. KDP support can add both categories that appear in the standard picker and ghost categories that don't. Processing takes 3–5 business days.</p>
<p>You don't have to request all 8 additional slots at once. You can add categories over time as you identify new relevant paths by browsing comparable books' product pages.</p>

<h2>What Counts as a Category vs. a Sub-Category Path</h2>
<p>Amazon's browse tree is hierarchical. A "category" in the context of the 10-category limit means a full path to a leaf node — the most specific level available in the browse tree.</p>
<p>For example, "Books &gt; Mystery, Thriller &amp; Suspense &gt; Mystery &gt; Cozy &gt; Culinary Cozy Mysteries" counts as one category placement. The intermediate levels — "Mystery, Thriller &amp; Suspense," "Mystery," "Cozy" — aren't separate category slots. Your placement at the leaf node implies presence in all parent nodes above it; Amazon handles that automatically.</p>
<p>This means all 10 of your categories should be specific leaf-level paths. Requesting "Books &gt; Mystery" as one of your 10 wastes a slot on a parent node your leaf-level placements already cover.</p>

<h2>How to Choose Which Categories to Request</h2>
<p>Category selection balances two competing factors: reach and winnability.</p>
<p><strong>Reach</strong> means choosing categories where your target readers actually browse. A high-traffic category with 50,000 competing books gives you visibility in a crowded space — hard to rank, but the audience is real.</p>
<p><strong>Winnability</strong> means choosing categories where your book can realistically achieve a visible rank. A category with 800 books where a BSR of 20,000 puts you in the top 50 is more valuable than a massive category where the same BSR puts you at position 15,000.</p>
<p>The ideal mix is categories that are highly relevant to your book (ensuring the readers who find you are actually your audience) and where your competition level is low enough to rank visibly. Ghost categories — those not accessible through the standard picker — often offer this combination because most competing authors never request them.</p>
<p>To find candidates, browse comparable books' product pages and read their full category list in the "Best Sellers Rank" section. Any path you've never seen in the KDP picker is a potential ghost category worth evaluating.</p>

<h2>Categories and Keywords — How They Work Together</h2>
<p>Categories control browse placement — which browse paths lead to your book. Backend keyword slots control search placement — which queries surface your book. Amazon uses both signals together, and some categories are keyword-gated: specific phrases in your backend keyword fields signal to Amazon that your book belongs in a particular category, supplementing the formal placement request.</p>
<p>This means keyword optimization and category optimization should be done together. Once your categories are set, make sure your backend keyword phrases reinforce the same genre, trope, and audience signals your category placements establish. A mismatch between your categories and keywords can reduce how much browse traffic you actually capture from category placement.</p>
<p>The <a href="/tools/kdp-keyword-finder" style="color:var(--gold,#c9a84c);text-decoration:none">KDP Keyword &amp; Category Finder</a> generates both: 7 keyword phrases for your backend fields and full category paths — including ghost categories — with the exact text for a KDP support request, so keyword and category signals align from the start.</p>`,
    faq: [
      {
        q: 'Can I request more than 10 categories?',
        a: "No. Amazon's policy caps books at 10 categories total. KDP support will not add categories beyond that limit. If you want to change which 10 categories you're in, you can request removals and substitutions — categories aren't permanently locked to a book.",
      },
      {
        q: "Can I remove a category I'm already in?",
        a: "Yes. Contact KDP support with your ASIN and the category path you want removed. This is useful if you've been placed in a category that's no longer relevant, or if you want to swap one placement for a better-fit option within your 10-category limit.",
      },
      {
        q: 'Does having more categories improve my BSR?',
        a: "Each category generates its own separate BSR. Being in 10 categories gives you 10 BSR rankings — each of which can display a #1 Bestseller badge at different rank thresholds. The underlying sales data is the same; only the category context changes how that rank is expressed. More relevant categories also means more browse paths that can lead readers to your product page.",
      },
      {
        q: 'Does it matter which 2 categories I pick during upload?',
        a: "Yes. The 2 categories selected during upload are active immediately when your book goes live. Additional categories added through KDP support take 3–5 days to process. Choose your 2 upload categories to be the highest-priority ones — where your target readers are most likely to browse and where immediate placement from launch day matters most.",
      },
      {
        q: 'How often can I change my categories?',
        a: "There's no stated limit on how often you can contact KDP support to modify categories. In practice, frequent changes reduce the time your book spends accumulating rank signals in any single category. Establish your core category set at launch, then adjust only when there's a clear strategic reason — a better-fit ghost category you've identified, or a category that's generating no traffic.",
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
<p>Each field accepts up to 50 characters. Amazon treats each field as a phrase unit — what you enter functions as a search phrase that readers might type, not as a bag of individual words. A reader doesn't need to type your exact phrase to trigger a match; Amazon has natural language flexibility. But phrases that closely mirror actual reader search behavior will match more reliably than abstract keyword strings.</p>

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
<p><strong>Use the full 50 characters.</strong> "Enemies to lovers billionaire fake engagement romance" is more valuable than "romance fiction contemporary" — it's specific, it's a complete phrase, and it matches how readers who want that exact book search.</p>
<p><strong>Revisit every 60–90 days.</strong> As behavioral data accumulates, you'll have better information about which signals are working. KDP's Traffic Diagnostics report shows organic page views — the clearest proxy for keyword-driven discovery.</p>
<p>If you want 7 phrases already structured for reader search behavior in your specific genre — formatted within the 50-character limit and filtered for Amazon's prohibited terms — the <a href="/tools/kdp-keyword-finder" style="color:var(--gold,#c9a84c);text-decoration:none">KDP Keyword &amp; Category Finder</a> generates them from your book's genre, comparable titles, target reader, and themes.</p>`,
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
        a: 'Each field allows up to 50 characters including spaces — there\'s no word limit, only the character limit. A phrase like "slow burn enemies to lovers college setting" is 42 characters and 8 words; "psychological thriller unreliable narrator memory" is 49 characters and 5 words. Maximize characters with a phrase that closely mirrors real reader search behavior for your genre.',
      },
    ],
  },
];

export function getArticleBySlug(slug) {
  return KDP_GUIDE_ARTICLES.find((a) => a.slug === slug) || null;
}
