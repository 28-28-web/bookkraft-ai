export const PLAN_LIMITS = { free: 10, starter: 100, pro: 500, lifetime: 1000 };

export const FREE_TOOLS = ['book-concept-generator', 'author-bio-writer', 'title-subtitle-testing'];

export const FAQS = [
    { q: 'Is the AI output ready to publish?', a: 'AI output is a strong starting point, not a finished product. Use it as a first draft, then review, edit, and make it your own. Most authors cut it down by 20–30% and add their personal stories and voice.' },
    { q: 'Which AI model does BookKraft use?', a: "BookKraft uses Claude by Anthropic — one of the most capable AI models available. It's especially good at long-form writing, nuance, and following complex instructions." },
    { q: 'Can I cancel my subscription anytime?', a: "Yes. Cancel from your Account page at any time. You keep access until the end of your billing period. No hidden fees or awkward cancellation flows." },
    { q: 'What happens if I hit my run limit?', a: "You'll see a message when you're close to your limit. Once you hit it, you can upgrade or wait until the next billing cycle when it resets automatically." },
    { q: 'Is my writing kept private?', a: "Yes. Your inputs and outputs are only visible to you. We don't use your writing to train AI models. See our Privacy Policy for full details." },
    { q: 'Can I use the outputs commercially?', a: 'Yes. Content you generate is yours to use in your book, marketing materials, or anywhere else. The Lifetime deal includes commercial use.' },
    { q: "What's the difference between Starter and Pro?", a: 'Both include all 12 tools. The main difference is runs per month: Starter gets 100, Pro gets 500. Pro also includes priority support and early access to new tools.' },
    { q: 'Do you offer refunds?', a: "We offer a 7-day money-back guarantee on your first payment. Just email us and we'll sort it out, no questions asked." }
];

export const ONBOARD_STEPS = [
    {
        title: "What kind of book are you writing?",
        subtitle: "We'll recommend the best tools for your project.",
        key: 'book_type',
        options: [
            { icon: '🧠', label: 'Self-Help', value: 'self-help' },
            { icon: '💼', label: 'Business', value: 'business' },
            { icon: '📝', label: 'How-To / Guide', value: 'how-to' },
            { icon: '❤️', label: 'Memoir', value: 'memoir' },
            { icon: '💰', label: 'Finance', value: 'finance' },
            { icon: '🌱', label: 'Other', value: 'other' }
        ]
    },
    {
        title: "Where are you in your journey?",
        subtitle: "So we can suggest the right starting point.",
        key: 'writing_stage',
        options: [
            { icon: '💡', label: 'Just an idea', value: 'idea' },
            { icon: '✍️', label: 'Actively writing', value: 'writing' },
            { icon: '🔧', label: 'Editing my draft', value: 'editing' },
            { icon: '🚀', label: 'Ready to publish', value: 'publishing' }
        ]
    }
];
