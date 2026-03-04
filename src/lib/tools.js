export const TOOLS = [
    {
        id: 'book-concept-generator', name: 'Book Concept Generator', category: 'strategy', icon: '💡',
        desc: 'Turn your expertise into a compelling book concept with a clear transformation promise.',
        fields: [
            { id: 'genre', label: 'Genre', type: 'select', options: ['Self-Help', 'Business', 'How-To', 'Memoir', 'Health & Wellness', 'Finance', 'Productivity', 'Other'] },
            { id: 'audience', label: 'Target Audience', type: 'text', placeholder: 'e.g. first-time entrepreneurs aged 25–40' },
            { id: 'expertise', label: 'Your Expertise', type: 'text', placeholder: 'e.g. 10 years in sales management' },
            { id: 'transformation', label: 'Transformation Promised', type: 'text', placeholder: 'e.g. go from broke to financially free in 12 months' }
        ],
        prompt: (f) => `You are an expert book strategist. Generate a compelling non-fiction book concept based on:
Genre: ${f.genre}
Target Audience: ${f.audience}
Author Expertise: ${f.expertise}
Transformation Promised: ${f.transformation}

Output:
1. Book Concept (2–3 sentences): A clear, marketable book concept
2. Working Title (3 options): Memorable, benefit-driven titles
3. Core Premise: The central argument or framework of the book
4. Chapter Outline: 7–10 chapter titles that deliver the transformation
5. Unique Angle: What makes this book different from others on the topic

Be specific, practical, and focus on the reader's transformation.`
    },
    {
        id: 'author-bio-writer', name: 'Author Bio Writer', category: 'marketing', icon: '✍️',
        desc: 'Write your author bio in three lengths — perfect for your book, Amazon, and social media.',
        fields: [
            { id: 'name', label: 'Your Name', type: 'text', placeholder: 'e.g. Sarah Johnson' },
            { id: 'background', label: 'Background & Story', type: 'textarea', placeholder: 'Tell us about your background, career, and life story...' },
            { id: 'credentials', label: 'Credentials / Achievements', type: 'text', placeholder: 'e.g. 15 years in marketing, Harvard MBA, Forbes 30 Under 30' },
            { id: 'style', label: 'Writing Style', type: 'select', options: ['Professional & Formal', 'Conversational & Warm', 'Bold & Direct'] }
        ],
        prompt: (f) => `Write three author bio versions for ${f.name} in a ${f.style} tone.

Background: ${f.background}
Credentials: ${f.credentials}

Provide:
1. SHORT BIO (50 words): For social media profiles and book covers
2. MEDIUM BIO (150 words): For Amazon author page and website
3. LONG BIO (300 words): For media kit, speaking engagements, and detailed about pages

Each bio should feel human, credible, and build authority. Avoid clichés like "passionate" or "journey".`
    },
    {
        id: 'story-anecdote-creator', name: 'Story & Anecdote Creator', category: 'content', icon: '📖',
        desc: 'Generate compelling stories and anecdotes that illustrate your key points memorably.',
        fields: [
            { id: 'topic', label: 'Chapter Topic or Lesson', type: 'text', placeholder: 'e.g. overcoming fear of failure' },
            { id: 'lesson', label: 'The Lesson to Illustrate', type: 'text', placeholder: 'e.g. failure is just feedback, not the end' },
            { id: 'tone', label: 'Narrative Perspective', type: 'select', options: ['First Person (personal story)', 'Third Person (client/case story)', 'Hypothetical Scenario'] }
        ],
        prompt: (f) => `Write a compelling story or anecdote for a non-fiction book chapter about: ${f.topic}
Lesson to illustrate: ${f.lesson}
Narrative perspective: ${f.tone}

Create:
1. OPENING HOOK: A gripping first sentence or two
2. THE STORY (200–300 words): A vivid, specific narrative with sensory detail
3. THE TURN: The moment of insight or change
4. THE LESSON BRIDGE: 2–3 sentences connecting the story to the reader's situation

Make it feel real, specific, and emotionally resonant. Avoid vague, generic scenarios.`
    },
    {
        id: 'book-introduction-writer', name: 'Book Introduction Writer', category: 'structure', icon: '🚪',
        desc: 'Write a powerful book introduction that hooks readers and makes them want to read more.',
        fields: [
            { id: 'title', label: 'Book Title', type: 'text', placeholder: 'e.g. The Productive Mind' },
            { id: 'promise', label: 'Core Promise to Reader', type: 'text', placeholder: 'e.g. double your output while working 4 hours less per week' },
            { id: 'reader', label: 'Ideal Reader Description', type: 'text', placeholder: 'e.g. overwhelmed professionals who feel stuck' },
            { id: 'tone', label: 'Book Tone', type: 'select', options: ['Inspirational & Motivating', 'Practical & Direct', 'Research-Based & Credible', 'Conversational & Friendly'] }
        ],
        prompt: (f) => `Write a compelling book introduction for "${f.title}" in a ${f.tone} tone.

Core promise: ${f.promise}
Ideal reader: ${f.reader}

Structure the introduction as:
1. OPENING SCENE OR STATEMENT (100 words): A powerful hook that speaks directly to the reader's pain
2. THE PROBLEM (100 words): Agitate the problem the reader is facing
3. WHY THIS BOOK IS DIFFERENT (100 words): What makes this book the solution
4. WHAT YOU'LL LEARN (bullet format): 5–7 specific things readers will gain
5. A NOTE TO THE READER (50 words): Personal, direct close that creates connection

Total: approx 500 words. Write in second person ("you") to speak directly to the reader.`
    },
    {
        id: 'research-fact-integration', name: 'Research & Fact Integration', category: 'content', icon: '🔬',
        desc: 'Frame and integrate facts, data, and research into your chapters compellingly.',
        fields: [
            { id: 'chapter', label: 'Chapter Topic', type: 'text', placeholder: 'e.g. the science of habit formation' },
            { id: 'claim', label: 'Key Claim or Argument', type: 'text', placeholder: 'e.g. habits form through repetition + reward loops' },
            { id: 'sources', label: 'Source Style Preference', type: 'select', options: ['Academic / Cite Studies', 'Popular Science / Book-style', 'Anecdotal + Data Mix'] }
        ],
        prompt: (f) => `Help me integrate research and facts into a non-fiction chapter about: ${f.chapter}
Key claim: ${f.claim}
Source style: ${f.sources}

Provide:
1. FRAMING PARAGRAPH: How to introduce the research to a general audience
2. KEY FINDINGS TO REFERENCE: 4–5 real or representative research findings that support the claim
3. EXPERT VOICES: 2–3 researchers, authors, or experts to potentially quote or reference
4. DATA POINTS: Specific statistics or numbers that make the argument concrete
5. READER APPLICATION: How to bridge the research to the reader's daily life
6. SUGGESTED SOURCES: 3–5 books or studies to look up and cite properly

Note: Always verify any specific statistics independently before publishing.`
    },
    {
        id: 'practical-exercise-designer', name: 'Practical Exercise Designer', category: 'content', icon: '🏋️',
        desc: 'Design hands-on exercises and action steps that help readers apply your ideas.',
        fields: [
            { id: 'chapter', label: 'Chapter Topic', type: 'text', placeholder: 'e.g. identifying your core values' },
            { id: 'goal', label: 'Exercise Goal', type: 'text', placeholder: 'e.g. reader clearly names their 3 core values' },
            { id: 'difficulty', label: 'Difficulty Level', type: 'select', options: ['Quick & Easy (5–10 min)', 'Moderate (15–30 min)', 'Deep Work (1+ hour)'] }
        ],
        prompt: (f) => `Design a practical reader exercise for a non-fiction book chapter on: ${f.chapter}
Exercise goal: ${f.goal}
Difficulty level: ${f.difficulty}

Create:
1. EXERCISE NAME: A compelling, action-oriented name for the exercise
2. OVERVIEW (2–3 sentences): What this exercise is and why it matters
3. WHAT YOU NEED: Simple list of materials or prep needed
4. STEP-BY-STEP INSTRUCTIONS: Numbered steps, clear and specific
5. REFLECTION QUESTIONS: 3–4 questions to deepen the learning
6. WHAT TO DO WITH YOUR RESULTS: How the reader uses this output going forward
7. EXAMPLE OUTPUT: A sample of what a completed exercise might look like

Make this genuinely useful — not just filler. It should change how readers think or act.`
    },
    {
        id: 'title-subtitle-testing', name: 'Title & Subtitle Testing', category: 'marketing', icon: '🎯',
        desc: 'Analyse your title ideas for SEO, emotional impact, and marketability.',
        fields: [
            { id: 'topic', label: 'Book Topic', type: 'text', placeholder: 'e.g. personal finance for millennials' },
            { id: 'audience', label: 'Target Audience', type: 'text', placeholder: 'e.g. millennials drowning in debt' },
            { id: 'titles', label: 'Your Title Ideas (one per line)', type: 'textarea', placeholder: 'Broke No More\nMoney Mindset\nThe Debt-Free Blueprint' }
        ],
        prompt: (f) => `Analyse these book title ideas for: ${f.topic}
Target audience: ${f.audience}
Title ideas: ${f.titles}

For EACH title, provide:
1. CLARITY SCORE (1–10): How clearly it communicates the topic
2. EMOTIONAL IMPACT (1–10): How much it resonates emotionally
3. MARKETABILITY (1–10): How well it would sell on Amazon
4. SEO POTENTIAL: Key phrases people actually search
5. WHAT WORKS: Specific strengths
6. WHAT DOESN'T: Honest weaknesses

Then provide:
- TOP PICK with explanation
- SUBTITLE suggestions (3 options) for the top pick
- ALTERNATIVE TITLE IDEAS: 3 fresh title suggestions based on the analysis
- AMAZON CATEGORY FIT: Which categories this title would perform best in`
    },
    {
        id: 'chapter-transition-specialist', name: 'Chapter Transition Specialist', category: 'structure', icon: '🔗',
        desc: 'Write smooth transitions between chapters that keep readers hooked and turning pages.',
        fields: [
            { id: 'ending', label: 'Current Chapter Ending Summary', type: 'textarea', placeholder: 'What does your current chapter cover and how does it end?' },
            { id: 'next', label: 'Next Chapter Topic', type: 'text', placeholder: 'e.g. Chapter 4 covers implementing a morning routine' }
        ],
        prompt: (f) => `Write chapter transitions for a non-fiction book.

Current chapter ends with: ${f.ending}
Next chapter is about: ${f.next}

Write 3 different transition styles:

1. CLIFFHANGER TRANSITION: Creates tension and urgency to keep reading
2. REFLECTIVE BRIDGE: Summarises the insight and frames what's next
3. QUESTION HOOK: Ends with a question that the next chapter answers

For each:
- Last 2–3 sentences of the current chapter (conclusion + transition)
- Opening 2–3 sentences of the next chapter (picks up from the transition)

Also provide:
- CHAPTER SUMMARY SENTENCE: One line summarising what this chapter delivered
- PREVIEW SENTENCE: One line teasing what comes next
- SECTION DIVIDER IDEA: A subheading or quote to use between chapters if needed`
    },
    {
        id: 'case-study-generator', name: 'Case Study Generator', category: 'content', icon: '📊',
        desc: 'Turn real-world examples into structured case studies with narrative pull and clear lessons.',
        fields: [
            { id: 'industry', label: 'Industry or Context', type: 'text', placeholder: 'e.g. e-commerce, healthcare, personal development' },
            { id: 'problem', label: 'The Problem', type: 'textarea', placeholder: 'Describe the situation or challenge faced...' },
            { id: 'solution', label: 'The Solution or Approach', type: 'text', placeholder: 'What was done differently?' },
            { id: 'outcome', label: 'The Outcome or Result', type: 'text', placeholder: 'e.g. 300% revenue increase in 6 months' }
        ],
        prompt: (f) => `Write a compelling narrative case study for a non-fiction book.

Industry/Context: ${f.industry}
The Problem: ${f.problem}
The Solution: ${f.solution}
The Outcome: ${f.outcome}

Structure the case study as:
1. OPENING HOOK (50 words): An engaging scene that pulls readers in
2. THE SITUATION (100 words): Context, background, stakes
3. THE CHALLENGE (75 words): What made this hard
4. THE APPROACH (150 words): What was done, step by step
5. THE RESULTS (100 words): Specific, measurable outcomes
6. THE LESSON (75 words): What readers can take from this
7. PULL QUOTE: A powerful 1–2 sentence quote (real or representative)
8. BEFORE/AFTER COMPARISON: Simple table format showing the transformation`
    },
    {
        id: 'book-conclusion-writer', name: 'Book Conclusion Writer', category: 'structure', icon: '🎬',
        desc: 'Write a conclusion that lands emotionally, recaps powerfully, and inspires action.',
        fields: [
            { id: 'message', label: 'Core Book Message', type: 'textarea', placeholder: 'What is the single most important takeaway from your book?' },
            { id: 'chapters', label: 'Key Chapters Covered', type: 'text', placeholder: 'e.g. mindset, habit building, daily routines, accountability' },
            { id: 'cta', label: 'Final Call to Action', type: 'text', placeholder: 'e.g. start your morning routine tomorrow, join the community, etc.' }
        ],
        prompt: (f) => `Write a powerful book conclusion for a non-fiction book.

Core message: ${f.message}
Key chapters covered: ${f.chapters}
Final call to action: ${f.cta}

Write the conclusion in this structure:
1. EMOTIONAL OPENING (100 words): Remind readers of where they started
2. THE JOURNEY RECAP (150 words): Brief, powerful summary of what they've learned across the chapters
3. THE TRANSFORMATION (100 words): Paint a picture of who they are now vs. when they started
4. THE FINAL LESSON (75 words): The one idea you want them to carry forever
5. THE CALL TO ACTION (75 words): Specific, inspiring next step
6. THE CLOSING (50 words): A memorable final line or paragraph

Total: approximately 550 words. Write with warmth, conviction, and genuine belief in the reader.`
    },
    {
        id: 'back-cover-blurb-creator', name: 'Back Cover Blurb Creator', category: 'marketing', icon: '📚',
        desc: 'Write a back cover blurb that sells your book before someone even opens it.',
        fields: [
            { id: 'title', label: 'Book Title', type: 'text', placeholder: 'e.g. The 5AM Blueprint' },
            { id: 'genre', label: 'Genre', type: 'select', options: ['Self-Help', 'Business', 'How-To', 'Memoir', 'Health', 'Finance', 'Mindset'] },
            { id: 'hook', label: 'The Hook', type: 'text', placeholder: 'e.g. Most people waste the best hours of the day sleeping through them' },
            { id: 'promise', label: 'Main Promise', type: 'text', placeholder: 'e.g. a proven system to own your mornings and transform your life' },
            { id: 'author', label: 'Author Name', type: 'text', placeholder: 'e.g. James Rivera' }
        ],
        prompt: (f) => `Write back cover blurb copy for "${f.title}" (${f.genre}) by ${f.author}.

Hook: ${f.hook}
Main promise: ${f.promise}

Write TWO versions:

SHORT BLURB (150 words):
A punchy, high-impact back cover description that hooks browsers and sells the book. Include:
- Opening hook line
- Problem agitation
- The solution this book offers
- 3–4 bullet points of what readers will learn
- Author credibility line
- Closing call to action

LONG BLURB (250 words):
A fuller description for Amazon product page. Same structure but with more depth and narrative. Also include an author bio snippet (2 sentences) at the end.

Write in second person ("you") where appropriate. No hype — just clear, compelling, honest copy.`
    },
    {
        id: 'chapter-quality-checker', name: 'Chapter Quality Checker', category: 'strategy', icon: '🔍',
        desc: 'Get detailed AI feedback on your chapter — pacing, clarity, value, and what to improve.',
        fields: [
            { id: 'chapter_text', label: 'Paste Your Chapter Text', type: 'textarea', placeholder: 'Paste your chapter text here (up to 3,000 words for best results)...' }
        ],
        prompt: (f) => `You are a professional editor with 20 years of experience in non-fiction publishing. Analyse this chapter and provide detailed, honest feedback.

CHAPTER TEXT:
${f.chapter_text}

Analyse and score (1–10) each dimension:

1. CLARITY (score + explanation): Is the writing clear and easy to follow?
2. PACING (score + explanation): Does it move well? Any sections that drag?
3. VALUE DELIVERY (score + explanation): Does this chapter genuinely help the reader?
4. STRUCTURE (score + explanation): Is it well-organised with a clear arc?
5. ENGAGEMENT (score + explanation): Does it hold attention throughout?
6. VOICE (score + explanation): Is the author's personality present?

OVERALL SCORE: X/10

TOP 3 STRENGTHS: What this chapter does well

TOP 3 AREAS TO IMPROVE: Specific, actionable feedback

PRIORITY FIX: The single most important change to make

SENTENCE-LEVEL NOTES: 3–5 specific sentences or paragraphs to review (with brief note on each)

Be direct and honest. The goal is to make this chapter significantly better.`
    }
];
