import { notFound } from 'next/navigation';
import { getToolBySlug, TOOLS } from '@/lib/tools';
import ToolPageClient from './ToolPageClient';

export function generateStaticParams() {
  return TOOLS.map(tool => ({ slug: tool.slug }));
}

function extractAllJsonLd(html) {
  if (!html) return [];
  const results = [];
  const re = /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    try { results.push(JSON.parse(m[1])); } catch { /* skip malformed */ }
  }
  return results;
}

function stripJsonLd(html) {
  if (!html) return html;
  return html.replace(/<script[^>]+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, '').trim();
}

export default async function Page({ params }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const schemas = extractAllJsonLd(tool.seoContent);
  const faqItems = schemas.find(s => s['@type'] === 'FAQPage')?.mainEntity ?? [];
  const seoHtml = stripJsonLd(tool.seoContent);

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
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
