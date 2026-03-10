// BookKraft AI v8.0 — Constants

export const FREE_TOOLS = ['epub-validator', 'metadata-builder'];

export const LOGIC_TOOLS = [
    'kindle-format-fixer', 'epub-formatter', 'toc-generator',
    'front-matter-generator', 'css-snippet-generator',
];

export const AI_TOOLS = [
    'manuscript-cleanup', 'back-matter-generator',
    'style-sheet-auditor', 'print-to-digital', 'kdp-keyword-finder',
];

export const TOOL_CATEGORIES = [
    { id: 'all', label: 'All Tools' },
    { id: 'formatting', label: 'Formatting' },
    { id: 'structure', label: 'Structure' },
    { id: 'quality', label: 'Quality' },
    { id: 'publishing', label: 'Publishing' },
];

// Credit costs per AI tool run
export const TOOL_CREDIT_COSTS = {
    'kdp-keyword-finder': 1,
    'back-matter-generator': 2,
    'manuscript-cleanup': 3,
    'print-to-digital': 3,
    'style-sheet-auditor': 3,
};

// Word limits per tool
export const TOOL_WORD_LIMITS = {
    'manuscript-cleanup': 3000,
    'style-sheet-auditor': 5000,
    'print-to-digital': 4000,
    'kdp-keyword-finder': 500,
    'back-matter-generator': 500,
};

// Free sample config
export const FREE_SAMPLE_TOOLS = ['manuscript-cleanup', 'style-sheet-auditor'];
export const FREE_SAMPLE_WORD_LIMIT = 500;
export const FREE_SAMPLE_RATE_LIMIT = 5; // per hour

// v8.0 Pricing — credit-based
export const PRICING = {
    essentials: {
        id: 'essentials',
        name: 'Essentials Bundle',
        price: 4.99,
        label: '$4.99',
        desc: 'All 5 logic tools — own forever',
        bestFor: 'First-time formatters',
        features: [
            'Kindle Format Fixer',
            'EPUB Formatter',
            'TOC Generator',
            'Front Matter Generator',
            'CSS Snippet Generator',
            'One-time payment',
            'Unlimited use forever',
        ],
    },
    starterCredits: {
        id: 'credits_starter',
        name: 'Starter Credits',
        price: 7.00,
        label: '$7.00',
        desc: '15 AI credits (never expire)',
        bestFor: 'Authors testing AI tools',
        credits: 15,
        features: [
            '15 AI credits',
            'Credits never expire',
            'Use on any AI tool',
            '$0.47 per credit',
        ],
    },
    authorPro: {
        id: 'credits_pro',
        name: 'Author Pro Credits',
        price: 15.00,
        label: '$15.00',
        desc: '40 AI credits — $0.38/credit',
        bestFor: 'Regular publishers',
        credits: 40,
        features: [
            '40 AI credits',
            'Credits never expire',
            'Best per-credit value',
            '$0.38 per credit',
        ],
    },
    full: {
        id: 'full',
        name: 'Full Access',
        price: 9.99,
        label: '$9.99',
        desc: 'All 5 logic tools + 30 AI credits',
        bestFor: 'Primary conversion goal',
        credits: 30,
        featured: true,
        features: [
            'All 5 logic tools — forever',
            '30 AI starter credits',
            'Credits never expire',
            'Best overall value',
            'One-time payment',
        ],
    },
    lifetime: {
        id: 'lifetime',
        name: 'Lifetime Access',
        price: 149,
        label: '$149',
        desc: 'Unlimited AI + all future tools',
        bestFor: 'Power users, coaches',
        features: [
            'All 12 tools unlocked',
            'Unlimited AI runs (rate limited)',
            'All future tools included',
            'Priority support',
        ],
    },
};

export const FAQS = [
    {
        q: 'Do I need to pay monthly?',
        a: 'No. Every purchase is one-time. Buy credits once, they never expire. Buy the Essentials Bundle once, own it forever. No subscriptions, no recurring charges.',
    },
    {
        q: "What's the difference between EPUB and Kindle format?",
        a: 'Kindle (MOBI/KFX) works on Amazon devices only. EPUB works everywhere else (Apple Books, Kobo, Barnes & Noble). Our tools support both.',
    },
    {
        q: 'Do the free tools actually work without signing up?',
        a: 'Yes. The EPUB Validator and Metadata Builder work immediately — no account, no email, no credit card. Just open and use.',
    },
    {
        q: 'How do credits work?',
        a: 'Credits are used for AI-powered tools only. Each AI tool costs 1–3 credits per run. Buy a credit pack, use them whenever you want — they never expire. Logic tools (formatting, TOC, etc.) don\'t use credits at all.',
    },
    {
        q: 'Can I try the AI tools before buying credits?',
        a: 'Yes! Manuscript Cleanup and Style Sheet Auditor both offer a free 500-word sample. See real AI results on your own text before buying a single credit.',
    },
    {
        q: 'What AI model do the AI-powered tools use?',
        a: 'Claude Haiku by Anthropic — fast, accurate, and cost-effective for formatting and analysis tasks.',
    },
    {
        q: 'Can I get a refund?',
        a: 'Yes — 7-day money-back guarantee on any purchase. Email us and we\'ll sort it.',
    },
    {
        q: 'What happens after I buy the Essentials Bundle?',
        a: 'You own all 5 logic tools forever. Use them as many times as you want, no limits, no expiry. Future updates to those tools are included.',
    },
    {
        q: 'Is Full Access worth it?',
        a: 'Full Access ($9.99) gives you all 5 logic tools plus 30 AI credits. That\'s the Essentials Bundle ($4.99) + more than a Starter Credit Pack ($7.00) — for less than buying them separately.',
    },
    {
        q: 'Do I need an account for the paid tools?',
        a: 'You need an account to use paid tools so we can track your credits and tool access. But the two free tools (EPUB Validator and Metadata Builder) never require an account.',
    },
];

export const ONBOARD_STEPS = [
    {
        title: 'What are you formatting?',
        subtitle: "We'll recommend the best tools for your project.",
        key: 'formatting_goal',
        options: [
            { label: 'Kindle eBook', value: 'kindle' },
            { label: 'EPUB (Apple, Kobo)', value: 'epub' },
            { label: 'Both', value: 'both' },
            { label: 'Not sure yet', value: 'unsure' },
        ],
    },
    {
        title: 'Where are you in the process?',
        subtitle: 'So we can suggest the right starting point.',
        key: 'writing_stage',
        options: [
            { label: 'Just starting', value: 'starting' },
            { label: 'Manuscript written', value: 'manuscript' },
            { label: 'Have a file with problems', value: 'problems' },
            { label: 'Converting print book', value: 'print' },
        ],
    },
];

// Recommendation map: [formatting_goal][writing_stage] → tool slugs
export const TOOL_RECOMMENDATIONS = {
    kindle: {
        starting: ['kindle-format-fixer', 'toc-generator', 'front-matter-generator'],
        manuscript: ['kindle-format-fixer', 'toc-generator', 'front-matter-generator'],
        problems: ['manuscript-cleanup', 'kindle-format-fixer', 'epub-validator'],
        print: ['print-to-digital', 'kindle-format-fixer', 'toc-generator'],
    },
    epub: {
        starting: ['epub-formatter', 'epub-validator', 'toc-generator'],
        manuscript: ['epub-formatter', 'epub-validator', 'toc-generator'],
        problems: ['epub-validator', 'manuscript-cleanup', 'epub-formatter'],
        print: ['print-to-digital', 'epub-formatter', 'epub-validator'],
    },
    both: {
        starting: ['manuscript-cleanup', 'kindle-format-fixer', 'epub-formatter'],
        manuscript: ['manuscript-cleanup', 'kindle-format-fixer', 'epub-formatter'],
        problems: ['epub-validator', 'manuscript-cleanup', 'kindle-format-fixer'],
        print: ['print-to-digital', 'kindle-format-fixer', 'epub-formatter'],
    },
    unsure: {
        starting: ['epub-validator', 'metadata-builder', 'manuscript-cleanup'],
        manuscript: ['epub-validator', 'metadata-builder', 'manuscript-cleanup'],
        problems: ['epub-validator', 'manuscript-cleanup', 'kindle-format-fixer'],
        print: ['print-to-digital', 'epub-formatter', 'style-sheet-auditor'],
    },
};
