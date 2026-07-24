// BookKraft AI v8.0 — Constants

import { TOOLS } from './tools';

// Derived from TOOLS (single source of truth) instead of separately
// maintained slug lists — the tool count has drifted out of sync with copy
// three times because it used to be typed in multiple places.
export const FREE_TOOLS = TOOLS.filter((t) => t.free).map((t) => t.slug);
export const LOGIC_TOOLS = TOOLS.filter((t) => t.accessType === 'logic').map((t) => t.slug);
export const AI_TOOLS = TOOLS.filter((t) => t.accessType === 'ai').map((t) => t.slug);

export const TOOL_CATEGORIES = [
    { id: 'all', label: 'All Tools' },
    { id: 'formatting', label: 'Formatting' },
    { id: 'structure', label: 'Structure' },
    { id: 'quality', label: 'Quality' },
    { id: 'publishing', label: 'Publishing' },
];

// Base credit cost per AI tool, derived from TOOLS. For the three chunked
// tools (manuscript-cleanup, print-to-digital, style-sheet-auditor) this is
// the PER-10K-WORDS rate, not a flat run cost — see calculateCreditCost.
export const TOOL_CREDIT_COSTS = Object.fromEntries(
    TOOLS.filter((t) => t.accessType === 'ai').map((t) => [t.slug, t.creditCost])
);

// Word limits per tool — manuscript-cleanup, style-sheet-auditor, and
// print-to-digital are chunked jobs with no hard cap (see lib/ai/chunker.ts).
export const TOOL_WORD_LIMITS = {
    'kdp-keyword-finder': 500,
    'back-matter-generator': 500,
};

// Free sample config
export const FREE_SAMPLE_TOOLS = ['manuscript-cleanup', 'style-sheet-auditor'];
export const FREE_SAMPLE_WORD_LIMIT = 500;
export const FREE_SAMPLE_RATE_LIMIT = 5; // per hour

// Paddle price IDs. Starter and Pro are new — real IDs not created yet.
// checked at boot (src/instrumentation.js) and logs a loud warning if either
// is still a placeholder, so this can't accidentally ship wired to nothing.
export const PADDLE_PRICE_IDS = {
    starter: 'TODO_PADDLE_PRICE_ID_STARTER',
    pro: 'TODO_PADDLE_PRICE_ID_PRO',
    lifetime: 'pri_01km8ymm2eyk4tyjgm3p5x6bar', // unchanged — do not touch
};

// Phase 3 pricing — Free tier expanded, paid tiers collapsed to Starter/Pro/Lifetime.
export const PRICING = {
    starter: {
        id: 'starter',
        name: 'Starter',
        price: 19,
        label: '$19',
        desc: '5 formatting tools, unlocked forever + 40 AI credits to use on the 6 AI tools',
        bestFor: 'First-time formatters',
        credits: 40,
        features: [
            '5 formatting tools — unlocked forever',
            '40 AI credits to use on the 6 AI tools',
            '~5 full-length novel passes per AI tool (80k words)',
            'Credits never expire',
            'One-time payment',
        ],
    },
    pro: {
        id: 'pro',
        name: 'Pro',
        price: 49,
        label: '$49',
        desc: '5 formatting tools, unlocked forever + 200 AI credits to use on the 6 AI tools',
        bestFor: 'Regular publishers, editors',
        credits: 200,
        featured: true,
        features: [
            '5 formatting tools — unlocked forever',
            '200 AI credits to use on the 6 AI tools',
            '~25 full-length novel passes per AI tool (80k words)',
            'Credits never expire',
            'Best per-credit value',
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
            `All ${TOOLS.length} tools unlocked`,
            'Unlimited AI runs (rate limited)',
            'All future tools included',
            'Priority support',
        ],
    },
};

export const FAQS = [
    {
        q: 'Do I need to pay monthly?',
        a: 'No. Every purchase is one-time. Buy Starter or Pro once, own the logic tools forever, and your AI credits never expire. No subscriptions, no recurring charges.',
    },
    {
        q: "What's the difference between EPUB and Kindle format?",
        a: 'Kindle (MOBI/KFX) works on Amazon devices only. EPUB works everywhere else (Apple Books, Kobo, Barnes & Noble). Our tools support both.',
    },
    {
        q: 'Do the free tools actually work without signing up?',
        a: 'Yes. EPUB Validator, Metadata Builder, Cover Checker, Word Manuscript Cleanup Checker, and Full Manuscript Mode all work immediately — no account, no email, no credit card. Just open and use.',
    },
    {
        q: 'How do credits work?',
        a: 'Credits are used for AI-powered tools only. Short-form AI tools cost 1–2 credits per run; Manuscript Cleanup, Style Sheet Auditor, and Print-to-Digital scale with your manuscript\'s length (about 1 credit per 10,000 words) — the exact cost is shown before you confirm. Buy a credit pack, use them whenever you want — they never expire. Logic tools (formatting, TOC, etc.) don\'t use credits at all.',
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
        q: 'What happens after I buy Starter or Pro?',
        a: 'You own all 5 logic tools forever — no limits, no expiry, future updates included — plus a pack of AI credits (40 with Starter, 200 with Pro) that never expire.',
    },
    {
        q: 'What\'s the difference between Starter and Pro?',
        a: 'Both unlock all 5 logic tools forever. Starter ($19) includes 40 AI credits; Pro ($49) includes 200 AI credits — better value per credit for authors and editors running AI tools regularly.',
    },
    {
        q: 'Do I need an account for the paid tools?',
        a: `You need an account to use paid tools so we can track your credits and tool access. But the ${FREE_TOOLS.length} free tools (EPUB Validator, Metadata Builder, Cover Checker, Word Cleanup Checker, Full Manuscript Mode) never require an account.`,
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
