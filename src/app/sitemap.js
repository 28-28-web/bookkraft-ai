import fs from 'fs';
import path from 'path';
import { EPUB_ERRORS } from '@/lib/epubErrors';
import { PLATFORM_REJECTIONS } from '@/lib/platformRejections';
import { VS_ALTERNATIVES } from '@/lib/vsAlternatives';
import { CHECKLISTS } from '@/lib/checklists';
import { MISTAKES } from '@/lib/mistakes';
import { COVER_REQUIREMENTS } from '@/lib/coverRequirements';
import { KDP_GUIDE_ARTICLES } from '@/lib/kdpKeywordGuide';

const BASE = 'https://bookkraftai.com';

// Bump CONTENT_DATE whenever epubErrors.js, platformRejections.js,
// vsAlternatives.js, checklists.js, or mistakes.js change meaningfully — a stale date
// here undermines the freshness signal Google uses from lastModified.
const CONTENT_DATE = new Date('2026-09-01');

function getLocalPosts() {
  const dir = path.join(process.cwd(), 'src', 'content', 'blog');
  try {
    return fs.readdirSync(dir)
      .filter((f) => f.endsWith('.json'))
      .map((f) => {
        const raw = fs.readFileSync(path.join(dir, f), 'utf-8');
        return JSON.parse(raw);
      });
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const tools = [
    { slug: 'epub-validator',         priority: 1.0 },
    { slug: 'metadata-builder',       priority: 1.0 },
    { slug: 'kindle-format-fixer',    priority: 0.9 },
    { slug: 'epub-formatter',         priority: 0.9 },
    { slug: 'toc-generator',          priority: 0.9 },
    { slug: 'manuscript-cleanup',     priority: 0.8 },
    { slug: 'print-to-digital',       priority: 0.8 },
    { slug: 'front-matter-generator', priority: 0.8 },
    { slug: 'back-matter-generator',  priority: 0.8 },
    { slug: 'css-snippet-generator',  priority: 0.7 },
    { slug: 'style-sheet-auditor',    priority: 0.7 },
    { slug: 'kdp-keyword-finder',     priority: 0.8 },
  ];

  const toolPages = tools.map(({ slug, priority }) => ({
    url: `${BASE}/tools/${slug}`,
    lastModified: new Date('2026-08-05'),
    changeFrequency: 'weekly',
    priority,
  }));

  const posts = getLocalPosts();
  const blogPostPages = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.published_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const epubErrorPages = EPUB_ERRORS.map((e) => ({
    url: `${BASE}/epub-errors/${e.slug}`,
    lastModified: CONTENT_DATE,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const platformRejectionPages = PLATFORM_REJECTIONS.map((r) => ({
    url: `${BASE}/platform-rejection/${r.slug}`,
    lastModified: CONTENT_DATE,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const alternativePages = VS_ALTERNATIVES.map((a) => ({
    url: `${BASE}/alternatives/${a.slug}`,
    lastModified: CONTENT_DATE,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const checklistPages = CHECKLISTS.map((c) => ({
    url: `${BASE}/checklist/${c.slug}`,
    lastModified: CONTENT_DATE,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const mistakePages = MISTAKES.map((m) => ({
    url: `${BASE}/mistakes/${m.slug}`,
    lastModified: CONTENT_DATE,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const coverRequirementPages = COVER_REQUIREMENTS.map((c) => ({
    url: `${BASE}/cover-requirements/${c.slug}`,
    lastModified: CONTENT_DATE,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: BASE,
      lastModified: new Date('2026-07-21'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE}/free-tools`,
      lastModified: new Date('2026-07-30'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE}/tools`,
      lastModified: new Date('2026-07-30'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE}/tools/manuscript-mode`,
      lastModified: new Date('2026-07-30'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE}/tools/publishing-score`,
      lastModified: new Date('2026-05-05'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE}/faq`,
      lastModified: new Date('2026-08-22'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE}/pricing`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/contact`,
      lastModified: new Date('2026-02-19'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE}/privacy`,
      lastModified: new Date('2026-02-19'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE}/terms`,
      lastModified: new Date('2026-02-19'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...toolPages,
    {
      url: `${BASE}/tools/epub-validator-premium`,
      lastModified: new Date('2026-08-05'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE}/tools/cover-checker`,
      lastModified: new Date('2026-07-21'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE}/tools/word-cleanup`,
      lastModified: new Date('2026-07-25'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE}/epub-formatting-guide`,
      lastModified: new Date('2026-08-09'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/vellum-alternative`,
      lastModified: new Date('2026-08-18'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/atticus-alternative`,
      lastModified: new Date('2026-08-18'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/calibre-alternative`,
      lastModified: new Date('2026-08-18'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/word-to-epub`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/how-to-make-epub-file`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/ebook-template`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/book-formatting-software`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/reflowable-vs-fixed-layout-epub`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/epub-toc-guide`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/epub-metadata-guide`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/epub-css-for-ebooks`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/chapter-breaks-epub`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/kdp-book-description`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/kdp-print-vs-digital`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/epub-fonts`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/kdp-ebook-pricing`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/epub-images`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/epub-accessibility`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/manuscript-format`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/book-cover-size`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/amazon-keyword-research`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/kindle-epub-format`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/copyright-page-template`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/book-dedication-page`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/book-front-matter`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/book-acknowledgments-page`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/alternatives`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/epub-errors`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...epubErrorPages,
    ...platformRejectionPages,
    ...alternativePages,
    ...checklistPages,
    ...mistakePages,
    {
      url: `${BASE}/platform-rejection`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/checklist`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/cover-requirements`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...coverRequirementPages,
    {
      url: `${BASE}/author/fateh`,
      lastModified: new Date('2026-08-10'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE}/blog`,
      lastModified: new Date('2026-07-28'),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    ...blogPostPages,
    {
      url: `${BASE}/headshot`,
      lastModified: new Date('2026-08-05'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/kdp-category-keywords`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/kdp-keyword-guide`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...KDP_GUIDE_ARTICLES.map(({ slug }) => ({
      url: `${BASE}/kdp-keyword-guide/${slug}`,
      lastModified: CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ];
}
