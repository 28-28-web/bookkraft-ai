import fs from 'fs';
import path from 'path';

const BASE = 'https://bookkraftai.com';

function getPosts() {
    const dir = path.join(process.cwd(), 'src', 'content', 'blog');
    try {
        return fs.readdirSync(dir)
            .filter((f) => f.endsWith('.json'))
            .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')));
    } catch {
        return [];
    }
}

export function GET() {
    const posts = getPosts();
    const urls = posts.map((p) => `
  <url>
    <loc>${BASE}/blog/${p.slug}</loc>
    <lastmod>${new Date(p.published_at).toISOString().split('T')[0]}</lastmod>
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
