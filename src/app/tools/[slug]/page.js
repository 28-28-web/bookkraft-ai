import { notFound } from 'next/navigation';
import { getToolBySlug } from '@/lib/tools';
import ToolPageClient from './ToolPageClient';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: 'Tool Not Found | BookKraft AI' };
  return {
    title: `${tool.name} | BookKraft AI`,
    description: tool.desc,
    alternates: {
      canonical: `https://bookkraftai.com/tools/${slug}`,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return <ToolPageClient params={params} />;
}