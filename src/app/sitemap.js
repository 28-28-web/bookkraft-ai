import fs from 'fs';
import path from 'path';

const BASE = 'https://bookkraftai.com';

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
      url: `${BASE}/calibre-alternative`,
      lastModified: new Date('2026-08-18'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/alternatives`,
      lastModified: new Date('2026-08-18'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/epub-errors`,
      lastModified: new Date('2026-08-05'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE}/epub-errors/emf-image-fallback`,
      lastModified: new Date('2026-08-05'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/epub-errors/font-link-validation`,
      lastModified: new Date('2026-08-05'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/epub-errors/missing-manifest-resource`,
      lastModified: new Date('2026-08-05'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/epub-errors/opf-role-attribute-not-allowed`,
      lastModified: new Date('2026-08-05'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/epub-errors/invalid-font-file-corrupted`,
      lastModified: new Date('2026-08-05'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/epub-errors/title-tag-empty-kobo`,
      lastModified: new Date('2026-08-05'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
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
  ];
}
