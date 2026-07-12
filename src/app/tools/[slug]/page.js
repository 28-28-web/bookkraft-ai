import { notFound } from 'next/navigation';
import { getToolBySlug } from '@/lib/tools';
import ToolPageClient from './ToolPageClient';

export default async function Page({ params }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return <ToolPageClient params={params} />;
}