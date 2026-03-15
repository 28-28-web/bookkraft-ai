import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'content/blog');

export function getAllPosts() {
  const files = fs.readdirSync(postsDir);
  return files.map((filename) => {
    const slug = filename.replace('.md', '');
    const raw = fs.readFileSync(path.join(postsDir, filename), 'utf-8');
    const { data } = matter(raw);
    return { slug, ...data };
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  const raw = fs.readFileSync(
    path.join(postsDir, `${slug}.md`), 'utf-8'
  );
  const { data, content } = matter(raw);
  return { slug, ...data, content };
}