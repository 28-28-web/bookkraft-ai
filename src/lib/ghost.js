import fs from 'fs';
import path from 'path';

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
