import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'content', 'blog');

export function getAllPosts() {
  try {
    const files = fs.readdirSync(postsDir);
    return files
      .filter((filename) => filename.endsWith('.md'))
      .map((filename) => {
        const slug = filename.replace('.md', '');
        const raw = fs.readFileSync(path.join(postsDir, filename), 'utf-8');
        const { data } = matter(raw);
        return { slug, ...data };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Posts directory error:', error.message);
    return [];
  }
}

export function getPostBySlug(slug) {
  try {
    const raw = fs.readFileSync(
      path.join(postsDir, `${slug}.md`), 'utf-8'
    );
    const { data, content } = matter(raw);
    return { slug, ...data, content };
  } catch (error) {
    console.error('Post read error:', error.message);
    return null;
  }
}