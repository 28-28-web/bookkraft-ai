import fs from 'fs';
import path from 'path';
import nextConfig from '../../next.config.mjs';

const POSTS_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

function readAllPostFiles() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.json'));
  return files
    .map((f) => {
      try {
        const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf-8');
        return JSON.parse(raw);
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
}

export async function getAllPosts() {
  return readAllPostFiles();
}

// Slugs that next.config.mjs 301s to another URL. Their JSON can stay on
// disk, but they must not be listed on the blog index or in a sitemap.
// ponytail: exact /blog/<slug> sources only; wildcard or `has` rules are ignored.
async function getRedirectedPostSlugs() {
  const rules = await nextConfig.redirects();
  return new Set(
    rules
      .filter((r) => !r.has && /^\/blog\/[^/:*()]+$/.test(r.source))
      .map((r) => r.source.slice('/blog/'.length)),
  );
}

// Posts for the blog index and sitemaps: not redirected, not noindex.
export async function getListedPosts() {
  const redirected = await getRedirectedPostSlugs();
  return readAllPostFiles().filter((p) => !redirected.has(p.slug) && !p.noindex);
}

export function postLastModified(post) {
  return new Date(post.updated_at || post.published_at);
}

export async function getPostBySlug(slug) {
  const filePath = path.join(POSTS_DIR, `${slug}.json`);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Strip script tags; leave all inline styles intact to preserve formatting.
export function sanitizeGhostHtml(html) {
  if (!html) return '';
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}
