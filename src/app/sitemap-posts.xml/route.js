import { getListedPosts, postLastModified } from '@/lib/ghost';

const BASE = 'https://bookkraftai.com';

export async function GET() {
    const posts = await getListedPosts();
    const urls = posts.map((p) => `
  <url>
    <loc>${BASE}/blog/${p.slug}</loc>
    <lastmod>${postLastModified(p).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    });
}
