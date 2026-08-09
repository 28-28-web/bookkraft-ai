import { notFound } from 'next/navigation';
import { getToolBySlug, TOOLS } from '@/lib/tools';
import ToolPageClient from './ToolPageClient';

export function generateStaticParams() {
  return TOOLS.map(tool => ({ slug: tool.slug }));
}

function extractJsonLd(html) {
  if (!html) return null;
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!match) return null;
  try { return JSON.parse(match[1]); } catch { return null; }
}

function stripJsonLd(html) {
  if (!html) return html;
  return html.replace(/<script[^>]+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, '').trim();
}

export default async function Page({ params }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const jsonLd = extractJsonLd(tool.seoContent);
  const faqItems = jsonLd?.mainEntity ?? [];
  const seoHtml = stripJsonLd(tool.seoContent);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ToolPageClient params={params} faqItems={faqItems}>
        {seoHtml && (
          <div
            className="seo-content"
            style={{ maxWidth: '800px', margin: '3rem auto', padding: '0 1rem' }}
            dangerouslySetInnerHTML={{ __html: seoHtml }}
          />
        )}
      </ToolPageClient>
    </>
  );
}
