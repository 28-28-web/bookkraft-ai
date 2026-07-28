const GHOST_URL = 'https://blog.bookkraftai.com';
const GHOST_KEY = '7e5cf8bca330584798c2c58566';

const FIELDS = [
  'title', 'slug', 'html', 'excerpt', 'custom_excerpt',
  'feature_image', 'feature_image_alt', 'published_at', 'updated_at',
  'reading_time', 'meta_title', 'meta_description',
  'og_title', 'og_description', 'og_image',
  'twitter_title', 'twitter_description', 'twitter_image',
].join(',');

export async function getAllPosts() {
  const res = await fetch(
    `${GHOST_URL}/ghost/api/content/posts/?key=${GHOST_KEY}&limit=all&fields=${FIELDS}&include=tags,authors&order=published_at%20desc`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error(`Ghost API error: ${res.status}`);
  const { posts } = await res.json();
  return posts ?? [];
}

export async function getPostBySlug(slug) {
  const res = await fetch(
    `${GHOST_URL}/ghost/api/content/posts/slug/${encodeURIComponent(slug)}/?key=${GHOST_KEY}&fields=${FIELDS}&include=tags,authors`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  const { posts } = await res.json();
  return posts?.[0] ?? null;
}

// Strip script tags; leave all inline styles intact to preserve Ghost card formatting.
export function sanitizeGhostHtml(html) {
  if (!html) return '';
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}
