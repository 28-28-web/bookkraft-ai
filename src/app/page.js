import dynamic from 'next/dynamic';
const LandingPage = dynamic(() => import('./landingpage'), { ssr: true, loading: () => <div style={{ minHeight: '100vh', background: 'var(--ink)' }} /> });
import { FAQS, PRICING, FREE_TOOLS } from '../lib/constants';
import { TOOLS } from '../lib/tools';

export const metadata = {
  title: 'BookKraft AI — EPUB & Kindle Tools for Indie Authors',
  description: `${TOOLS.length} tools for indie authors. Fix Kindle errors, validate EPUBs, build metadata, generate keywords. One-time price, no subscription. Start free.`,
  alternates: {
    canonical: 'https://bookkraftai.com/',
  },
};

export default function Page() {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'BookKraft AI',
    url: 'https://bookkraftai.com',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    description: `${TOOLS.length} eBook formatting tools for indie authors. EPUB validation, Kindle formatting, metadata builder, and more.`,
    offers: [
      {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        name: 'Free',
        description: `${FREE_TOOLS.length} free tools — EPUB Validator, Metadata Builder, Cover Checker, Word Cleanup Checker & Manuscript Mode`,
      },
      {
        '@type': 'Offer',
        price: PRICING.starter.label.replace(/[^0-9.]/g, ''),
        priceCurrency: 'USD',
        name: PRICING.starter.name,
        description: PRICING.starter.desc,
      },
      {
        '@type': 'Offer',
        price: PRICING.pro.label.replace(/[^0-9.]/g, ''),
        priceCurrency: 'USD',
        name: PRICING.pro.name,
        description: PRICING.pro.desc,
      },
      {
        '@type': 'Offer',
        price: PRICING.lifetime.label.replace(/[^0-9.]/g, ''),
        priceCurrency: 'USD',
        name: PRICING.lifetime.name,
        description: PRICING.lifetime.desc,
      },
    ],
  };

  const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
};

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LandingPage />
    </>
  );
}
