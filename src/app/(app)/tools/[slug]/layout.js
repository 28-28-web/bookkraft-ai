import { getToolBySlug } from '@/lib/tools';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Tool Not Found — BookKraft AI',
      robots: 'noindex',
    };
  }

  return {
    title: tool.seoTitle || `${tool.name} — BookKraft AI`,
    description: tool.desc,
    alternates: {
      canonical: `https://bookkraftai.com/tools/${slug}`,
    },
    robots: 'index, follow',
  };
}

export default function ToolLayout({ children }) {
  return children;
}