import { getToolBySlug } from '@/lib/tools';
import ToolPageClient from './ToolPageClient';

export async function generateMetadata({ params }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) return { title: 'Tool Not Found | BookKraft AI' };
  return {
    title: `${tool.name} | BookKraft AI`,
    description: tool.desc,
    alternates: {
      canonical: `https://bookkraftai.com/tools/${params.slug}`,
    },
  };
}

export default function Page({ params }) {
  return <ToolPageClient params={params} />;
}