export const revalidate = 3600 // refresh every hour

async function getGhostPosts() {
  try {
    const res = await fetch(
      'https://blog.bookkraftai.com/ghost/api/content/posts/?key=3c54ffdb1c6ecf1bfb4fc19f9c&fields=slug,updated_at,published_at&limit=all&filter=visibility:public',
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    const data = await res.json()
    return data.posts || []
  } catch {
    return []
  }
}

export default async function sitemap() {
  const tools = [
    { slug: 'epub-validator',        priority: 1.0 },
    { slug: 'metadata-builder',      priority: 1.0 },
    { slug: 'kindle-format-fixer',   priority: 0.9 },
    { slug: 'epub-formatter',        priority: 0.9 },
    { slug: 'toc-generator',         priority: 0.9 },
    { slug: 'manuscript-cleanup',    priority: 0.8 },
    { slug: 'print-to-digital',      priority: 0.8 },
    { slug: 'front-matter-generator',priority: 0.8 },
    { slug: 'back-matter-generator', priority: 0.8 },
    { slug: 'css-snippet-generator', priority: 0.7 },
    { slug: 'style-sheet-auditor',   priority: 0.7 },
    { slug: 'kdp-keyword-finder',    priority: 0.8 },
  ]

  const toolPages = tools.map(({ slug, priority }) => ({
    url: `https://bookkraftai.com/tools/${slug}`,
    lastModified: new Date('2026-03-16'),
    changeFrequency: 'weekly',
    priority,
  }))

  // Fetch blog posts from Ghost
  const posts = await getGhostPosts()
  const blogPages = posts.map((post) => ({
    url: `https://blog.bookkraftai.com/${post.slug}/`,
    lastModified: new Date(post.updated_at || post.published_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: 'https://bookkraftai.com',
      lastModified: new Date('2026-05-03'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://bookkraftai.com/free-tools',
      lastModified: new Date('2026-05-03'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://bookkraftai.com/tools/publishing-score',
      lastModified: new Date('2026-05-03'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://bookkraftai.com/pricing',
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://bookkraftai.com/contact',
      lastModified: new Date('2026-02-19'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://bookkraftai.com/privacy',
      lastModified: new Date('2026-02-19'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://bookkraftai.com/terms',
      lastModified: new Date('2026-02-19'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...toolPages,
    ...blogPages,
  ]
}