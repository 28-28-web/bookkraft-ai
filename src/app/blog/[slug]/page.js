import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, sanitizeGhostHtml, formatDate } from '@/lib/ghost';
import Footer from '@/components/Footer';
import { buildBreadcrumbSchema } from '@/lib/seo';

const AUTHOR_PAGES = { Fateh: '/author/fateh' };

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.custom_excerpt || post.excerpt || '';
  const canonical = `https://bookkraftai.com/blog/${post.slug}`;
  const ogImage = post.og_image || post.feature_image;

  return {
    title: `${title} — BookKraft AI`,
    description,
    alternates: { canonical },
    openGraph: {
      title: post.og_title || title,
      description: post.og_description || description,
      url: canonical,
      siteName: 'BookKraft AI',
      type: 'article',
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.twitter_title || title,
      description: post.twitter_description || description,
      ...((post.twitter_image || ogImage) && { images: [post.twitter_image || ogImage] }),
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const safeHtml = sanitizeGhostHtml(post.html);
  const primaryTag = post.tags?.[0];
  const author = post.authors?.[0];
  const canonical = `https://bookkraftai.com/blog/${post.slug}`;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://bookkraftai.com/' },
    { name: 'Blog', url: 'https://bookkraftai.com/blog' },
    { name: post.title, url: canonical },
  ]);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta_description || post.excerpt || '',
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    url: canonical,
    mainEntityOfPage: canonical,
    author: {
      '@type': 'Person',
      name: 'Fateh',
      url: 'https://bookkraftai.com/author/fateh',
    },
    publisher: {
      '@type': 'Organization',
      name: 'BookKraft AI',
      url: 'https://bookkraftai.com',
    },
    ...(post.feature_image && { image: post.feature_image }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <style>{`
        .gh-content figure { margin: 2em 0; }
        .gh-content img { max-width: 100%; height: auto; border-radius: 6px; }
        .gh-content .kg-image-card { text-align: center; }
        .gh-content .kg-image-card figcaption {
          font-size: 13px; color: var(--mid); margin-top: 8px; font-style: italic;
        }
        .gh-content .kg-width-wide { margin-left: -5%; margin-right: -5%; }
        .gh-content .kg-width-full { margin-left: -10%; margin-right: -10%; }
        .gh-content .kg-callout-card {
          display: flex; gap: 16px; padding: 20px 24px;
          background: var(--cream); border-left: 4px solid var(--gold);
          border-radius: 6px; margin: 2em 0;
        }
        .gh-content .kg-callout-emoji { font-size: 22px; flex-shrink: 0; }
        .gh-content .kg-callout-text { font-size: 15px; line-height: 1.6; }
        .gh-content .kg-bookmark-card {
          border: 1px solid var(--border); border-radius: 6px;
          overflow: hidden; margin: 2em 0;
        }
        .gh-content .kg-bookmark-container {
          display: flex; text-decoration: none; color: inherit;
        }
        .gh-content .kg-bookmark-content { padding: 16px; flex: 1; }
        .gh-content .kg-bookmark-title { font-weight: 700; font-size: 15px; }
        .gh-content .kg-bookmark-description { font-size: 13px; color: var(--mid); margin-top: 4px; }
        .gh-content .kg-bookmark-thumbnail img { width: 160px; object-fit: cover; }
        .gh-content blockquote {
          border-left: 4px solid var(--gold); margin: 2em 0;
          padding: 8px 0 8px 24px; font-style: italic; color: var(--mid);
        }
        .gh-content h2 { font-size: 1.6rem; margin: 2em 0 0.75em; color: var(--ink); }
        .gh-content h3 { font-size: 1.25rem; margin: 1.75em 0 0.5em; color: var(--ink); }
        .gh-content p { margin: 0 0 1.25em; line-height: 1.8; font-size: 17px; color: var(--ink); }
        .gh-content ul, .gh-content ol { margin: 0 0 1.25em 1.5em; line-height: 1.8; font-size: 17px; }
        .gh-content li { margin-bottom: 0.4em; }
        .gh-content a { color: var(--gold); text-decoration: underline; }
        .gh-content a:hover { color: var(--ink); }
        .gh-content strong { font-weight: 700; color: var(--ink); }
        .gh-content code {
          font-family: var(--font-jetbrains), monospace;
          background: var(--cream); padding: 2px 6px;
          border-radius: 4px; font-size: 0.875em;
        }
        .gh-content pre {
          background: var(--ink); color: var(--cream); padding: 20px 24px;
          border-radius: 8px; overflow-x: auto; margin: 2em 0;
        }
        .gh-content pre code { background: none; padding: 0; font-size: 14px; color: inherit; }
        .gh-content hr { border: none; border-top: 1px solid var(--border); margin: 3em 0; }
        .gh-content table { width: 100%; border-collapse: collapse; margin: 2em 0; overflow-x: auto; display: block; }
        .gh-content th, .gh-content td {
          padding: 10px 14px; border: 1px solid var(--border);
          font-size: 14px; text-align: left; white-space: nowrap;
        }
        .gh-content th { background: var(--cream); font-weight: 700; }
      `}</style>

      <main>
        {post.feature_image && (() => {
          const fitMode = post.feature_image_style || 'cover';
          return (
            <div style={{ width: '100%', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', ...(fitMode === 'contain' ? { padding: '16px 0' } : { maxHeight: 480, overflow: 'hidden' }) }}>
              <img
                src={post.feature_image}
                alt={post.feature_image_alt || post.title}
                style={{ display: 'block', ...(fitMode === 'contain' ? { maxWidth: '100%', maxHeight: 520, objectFit: 'contain' } : { width: '100%', maxHeight: 480, objectFit: 'cover' }) }}
              />
            </div>
          );
        })()}

        <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 24px 80px' }}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{
            fontSize: 'var(--text-sm)', color: 'var(--mid)', marginBottom: 32,
          }}>
            <Link href="/" style={{ color: 'var(--mid)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
            <Link href="/blog" style={{ color: 'var(--mid)', textDecoration: 'none' }}>Blog</Link>
            <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
            <span style={{ color: 'var(--ink)' }}>{post.title}</span>
          </nav>

          {primaryTag && (
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'var(--gold)',
              marginBottom: 12, display: 'block',
            }}>
              {primaryTag.name}
            </span>
          )}

          <h1 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 800,
            lineHeight: 1.2, color: 'var(--ink)', marginBottom: 24,
          }}>
            {post.title}
          </h1>

          {/* Meta row */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
            fontSize: 'var(--text-sm)', color: 'var(--mid)',
            paddingBottom: 32, borderBottom: '1px solid var(--border)',
            marginBottom: 40, flexWrap: 'wrap',
          }}>
            {author?.name && (
              AUTHOR_PAGES[author.name]
                ? <Link href={AUTHOR_PAGES[author.name]} style={{ color: 'var(--mid)', textDecoration: 'none', fontWeight: 600 }}>{author.name}</Link>
                : <span>{author.name}</span>
            )}
            <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
            {post.reading_time && <span>{post.reading_time} min read</span>}
          </div>

          {/* Post body — Ghost HTML with inline styles preserved */}
          <div
            className="gh-content"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div style={{
              marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border)',
              display: 'flex', gap: 8, flexWrap: 'wrap',
            }}>
              {post.tags.map((tag) => (
                <span key={tag.id} style={{
                  fontSize: 12, fontWeight: 600, padding: '4px 12px',
                  background: 'var(--cream)', border: '1px solid var(--border)',
                  borderRadius: 100, color: 'var(--mid)',
                }}>
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          <div style={{ marginTop: 48 }}>
            <Link href="/blog" style={{
              color: 'var(--gold)', fontWeight: 600,
              textDecoration: 'none', fontSize: 'var(--text-sm)',
            }}>
              ← Back to Blog
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
