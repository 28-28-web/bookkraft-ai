import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export const metadata = {
  title: 'Blog | BookKraft AI',
  description: 'Tips on ebook formatting, self publishing, and content creation.',
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>Blog</h1>
      <p>Tips on ebook formatting, self publishing, and growing your audience.</p>
      <div style={{ marginTop: '2rem' }}>
        {posts.map((post) => (
          <div key={post.slug} style={{ marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1.5rem' }}>
            <Link href={`/blog/${post.slug}`}>
              <h2 style={{ marginBottom: '0.5rem' }}>{post.title}</h2>
            </Link>
            <p style={{ color: '#666' }}>{post.description}</p>
            <span style={{ fontSize: '0.85rem', color: '#999' }}>{post.date}</span>
          </div>
        ))}
      </div>
    </main>
  );
}