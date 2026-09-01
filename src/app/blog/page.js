import Link from 'next/link';
import { getAllPosts, formatDate } from '@/lib/ghost';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'BookKraft AI Blog — EPUB & KDP Publishing Tips',
  description: 'Guides on EPUB formatting, KDP errors, and self-publishing tools for indie authors — from fixing rejected uploads to building clean metadata and passing Apple Books validation.',
  alternates: { canonical: 'https://bookkraftai.com/blog' },
  openGraph: {
    title: 'BookKraft AI Blog — EPUB & KDP Publishing Tips',
    description: 'Guides on EPUB formatting, KDP errors, and self-publishing tools for indie authors — from fixing rejected uploads to building clean metadata and passing Apple Books validation.',
    url: 'https://bookkraftai.com/blog',
    siteName: 'BookKraft AI',
    type: 'website',
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <>
      <style>{`
        .bk-blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }
        .bk-blog-card {
          background: var(--paper-dim, #f4f4f2);
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(21,23,29,0.08);
          cursor: pointer;
          transition: box-shadow 0.2s, transform 0.15s;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .bk-blog-card:hover {
          box-shadow: 0 6px 24px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }
      `}</style>
      <main>
        {/* Hero */}
        <section style={{
          background: 'var(--ink)', padding: '80px 0 64px', textAlign: 'center',
        }}>
          <div className="container">
            <p style={{
              color: 'var(--gold)', fontSize: 'var(--text-sm)', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16,
            }}>
              BookKraft AI Blog
            </p>
            <h1 style={{ color: 'var(--cream)', fontSize: 'var(--text-5xl)', marginBottom: 16 }}>
              Publishing Tips for Indie Authors
            </h1>
            <p style={{
              color: 'rgba(247,243,236,0.6)', fontSize: 18,
              maxWidth: 500, margin: '0 auto',
            }}>
              EPUB errors, KDP formatting, metadata, and tools — everything you need to publish with confidence.
            </p>
          </div>
        </section>

        {/* Post grid */}
        <section style={{ padding: '64px 0', background: 'var(--cream)' }}>
          <div className="container" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
            {posts.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--mid)' }}>No posts yet.</p>
            ) : (
              <div className="bk-blog-grid">
                {posts.map((post) => <PostCard key={post.slug} post={post} />)}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function PostCard({ post }) {
  const primaryTag = post.tags?.[0];
  const excerpt = post.custom_excerpt || post.excerpt || '';

  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <article className="bk-blog-card">
        {/* Image area — fixed 140px, matches ToolCard thumb height */}
        <div style={{
          height: 140, flexShrink: 0, overflow: 'hidden',
          background: 'var(--paper-dim,#f4f4f2)',
          borderBottom: '1px solid rgba(21,23,29,0.06)',
        }}>
          {post.feature_image && (
            <img
              src={post.feature_image}
              alt={post.feature_image_alt || post.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          )}
        </div>

        {/* Body */}
        <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {primaryTag && (
            <span style={{
              alignSelf: 'flex-start',
              fontSize: '0.6rem', fontFamily: 'monospace', fontWeight: 700,
              letterSpacing: '0.05em', textTransform: 'uppercase',
              color: '#c07a2b', background: 'rgba(192,122,43,0.12)',
              border: '1px solid #c07a2b',
              borderRadius: 3, padding: '2px 6px', whiteSpace: 'nowrap',
            }}>
              {primaryTag.name}
            </span>
          )}
          <h2 style={{
            fontSize: 'var(--text-lg)', fontWeight: 700, lineHeight: 1.3,
            margin: 0, color: 'var(--ink)',
          }}>
            {post.title}
          </h2>
          {excerpt && (
            <p style={{
              margin: 0, fontSize: '0.8rem', color: 'rgba(21,23,29,0.6)',
              lineHeight: 1.55, flex: 1,
              display: '-webkit-box', WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
              {excerpt}
            </p>
          )}
        </div>

        {/* Footer — mirrors ToolCard's borderTop footer */}
        <div style={{
          padding: '10px 16px', borderTop: '1px solid rgba(21,23,29,0.06)',
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: '0.75rem', fontFamily: 'monospace', color: 'rgba(21,23,29,0.45)',
        }}>
          <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
          {post.reading_time && (
            <>
              <span aria-hidden="true">·</span>
              <span>{post.reading_time} min read</span>
            </>
          )}
        </div>
      </article>
    </Link>
  );
}
