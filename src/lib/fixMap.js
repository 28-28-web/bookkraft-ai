// Which tool or guide can fix each failed check on the free checkers.
// Keyed by checker slug, then by the check's label as the checker shows it.
// Only list a fix that really fixes that check — each one was checked against
// the fixing tool's code (2026-10-08). kind: 'paid' | 'free' | 'guide'.
import { TOOLS } from '@/lib/tools';
import { PRICING } from '@/lib/constants';

// Both write a full EPUB 3 package (mimetype first, container.xml, OPF with
// title/language/identifier, nav, spine). Manuscript Mode drops images and
// tables, so it is marked text only.
const epubFormatter = { kind: 'paid', slug: 'epub-formatter', label: 'Rebuild with EPUB Formatter' };
const manuscriptRebuild = { kind: 'free', slug: 'manuscript-mode', label: 'Rebuild from Word with Manuscript Mode', note: 'text only' };
const epubGuide = (slug) => ({ kind: 'guide', href: `/epub-errors/${slug}`, label: 'Fix guide' });

// Kindle Format Fixer: double spaces, -- to em dash, straight to curly quotes,
// 3+ blank lines. Manuscript Mode: double spaces, -- to em dash, empty
// paragraphs, straight to curly quotes (lib/smartQuotes.js).
const formatFixer = { kind: 'paid', slug: 'kindle-format-fixer', label: 'Fix with Kindle Format Fixer', note: 'paste your text' };
const manuscriptFix = { kind: 'free', slug: 'manuscript-mode', label: 'Fix while converting with Manuscript Mode' };

const kdpCoverGuide = { kind: 'guide', href: '/cover-requirements/amazon-kdp-ebook', label: 'KDP cover guide' };
const appleCoverGuide = { kind: 'guide', href: '/cover-requirements/apple-books-ebook', label: 'Apple Books cover guide' };

const FIXES = {
    'epub-validator': {
        Mimetype: [epubFormatter, manuscriptRebuild, epubGuide('invalid-mimetype')],
        Container: [epubFormatter, manuscriptRebuild, epubGuide('missing-container-xml')],
        'OPF Package': [epubFormatter, manuscriptRebuild, epubGuide('invalid-opf-structure')],
        'Required Metadata': [epubFormatter, manuscriptRebuild, { kind: 'free', slug: 'metadata-builder', label: 'Write it with Metadata Builder' }],
        Spine: [epubFormatter, manuscriptRebuild, epubGuide('broken-spine-order')],
        'Manifest Files': [epubFormatter, epubGuide('missing-manifest-resource')],
        'EMF/WMF Images': [epubGuide('emf-image-fallback')],
        'Font Files': [epubGuide('font-link-validation')],
        Navigation: [{ kind: 'paid', slug: 'toc-generator', label: 'Build a TOC with TOC Generator' }, manuscriptRebuild, epubGuide('missing-nav-document')],
        'Cover Image': [epubGuide('cover-image-not-declared')],
    },
    'word-cleanup': {
        'Double spaces': [formatFixer, manuscriptFix],
        'Blank paragraphs': [formatFixer, manuscriptFix],
        'Double hyphens (--)': [formatFixer, manuscriptFix],
        'Straight quotes': [formatFixer, manuscriptFix],
    },
    'metadata-builder': {
        Keywords: [{ kind: 'paid', slug: 'kdp-keyword-finder', label: 'Find keywords with KDP Keyword Finder' }],
    },
    // Guides only: no BookKraft tool edits cover images.
    'cover-checker': {
        Format: [kdpCoverGuide],
        Orientation: [kdpCoverGuide],
        'Minimum size': [kdpCoverGuide],
        'Recommended size': [kdpCoverGuide],
        'Aspect ratio': [kdpCoverGuide],
        'File size': [kdpCoverGuide],
        'Minimum width': [appleCoverGuide],
    },
    // Keyed by category id from /api/tools/publishing-score.
    'publishing-score': {
        formatting_cleanliness: [formatFixer, manuscriptFix],
        metadata_completeness: [{ kind: 'free', slug: 'metadata-builder', label: 'Fix with Metadata Builder' }],
        structure_and_toc: [{ kind: 'paid', slug: 'toc-generator', label: 'Fix with TOC Generator' }, { kind: 'free', slug: 'manuscript-mode', label: 'Build chapters and TOC with Manuscript Mode' }],
        style_consistency: [{ kind: 'paid', slug: 'style-sheet-auditor', label: 'Fix with Style Sheet Auditor' }],
        front_back_matter: [{ kind: 'paid', slug: 'front-matter-generator', label: 'Fix with Front Matter Generator' }],
        kdp_keyword_readiness: [{ kind: 'paid', slug: 'kdp-keyword-finder', label: 'Fix with KDP Keyword Finder' }],
    },
};

export function fixesFor(tool, check) {
    return FIXES[tool]?.[check] || [];
}

export function fixHref(fix, tool) {
    return fix.href || `/tools/${fix.slug}?ref=${tool}`;
}

// These three charge per 10,000 words (see calculateCreditCost in toolAccess.js).
const PER_10K = new Set(['manuscript-cleanup', 'print-to-digital', 'style-sheet-auditor']);

// Short price note for a fix tool, from TOOLS and PRICING so it can't drift.
export function priceText(slug) {
    if (slug === 'manuscript-mode') return 'free with an account';
    const t = TOOLS.find((x) => x.slug === slug);
    if (!t) return '';
    if (t.free) return 'free';
    if (t.accessType === 'logic') return `Starter, ${PRICING.starter.label} one-time`;
    const unit = t.creditCost === 1 ? 'credit' : 'credits';
    return PER_10K.has(slug) ? `${t.creditCost} ${unit} per 10,000 words` : `${t.creditCost} ${unit}`;
}
