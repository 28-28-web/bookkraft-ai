import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  return {
    title: `${post.title} | BookKraft AI`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://bookkraftai.com/blog/${params.slug}`,
    },
  };
}

export default function PostPage({ params }) {
  const post = getPostBySlug(params.slug);
  return (
    <article style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>{post.title}</h1>
      <p style={{ color: '#999', marginBottom: '2rem' }}>{post.date}</p>
      <div style={{ lineHeight: '1.8' }}>
        <MDXRemote source={post.content} />
      </div>
      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f9f5f0', borderRadius: '8px' }}>
        <h3>Format your ebook in minutes</h3>
        <p>Stop wasting time on formatting. BookKraft AI does it for you.</p>
        <a href="/signup" style={{ background: '#8B6914', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '6px', textDecoration: 'none' }}>
          Try it free →
        </a>
      </div>
    </article>
  );
}