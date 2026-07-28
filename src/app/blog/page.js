import Link from 'next/link';
import { getAllPosts, formatDate } from '@/lib/ghost';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'BookKraft AI Blog — EPUB & KDP Publishing Tips',
  description: 'Expert guides on EPUB formatting, KDP errors, and self-publishing tools for indie authors.',
  alternates: { canonical: 'https://bookkraftai.com/blog' },
  openGraph: {
    title: 'BookKraft AI Blog — EPUB & KDP Publishing Tips',
    description: 'Expert guides on EPUB formatting, KDP errors, and self-publishing tools for indie authors.',
    url: 'https://bookkraftai.com/blog',
    siteName: 'BookKraft AI',
    type: 'website',
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <>
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
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: 'var(--space-6)',
              }}>
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
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <article style={{
        background: 'var(--white)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius)', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', height: '100%',
      }}>
        {post.feature_image && (
          <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
            <img
              src={post.feature_image}
              alt={post.feature_image_alt || post.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}
        <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', flex: 1 }}>
          {primaryTag && (
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 'var(--space-2)',
              display: 'block',
            }}>
              {primaryTag.name}
            </span>
          )}
          <h2 style={{
            fontSize: 'var(--text-lg)', fontWeight: 700, lineHeight: 1.3,
            marginBottom: 'var(--space-3)', color: 'var(--ink)',
          }}>
            {post.title}
          </h2>
          {excerpt && (
            <p style={{
              fontSize: 'var(--text-sm)', color: 'var(--mid)', lineHeight: 1.6,
              flex: 1, marginBottom: 'var(--space-4)',
              display: '-webkit-box', WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
              {excerpt}
            </p>
          )}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
            fontSize: 'var(--text-sm)', color: 'var(--mid)', marginTop: 'auto',
          }}>
            <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
            {post.reading_time && (
              <>
                <span aria-hidden="true">·</span>
                <span>{post.reading_time} min read</span>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
