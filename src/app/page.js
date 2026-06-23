import LandingPage from './landingpage';
import { FAQS, PRICING } from '../lib/constants';

export const metadata = {
  title: 'BookKraft AI — EPUB & Kindle Formatting Tools',
  description: '12 tools for indie authors. Fix Kindle errors, validate EPUBs, build metadata, generate keywords. One-time price, no subscription. Start free.',
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
    description: '12 eBook formatting tools for indie authors. EPUB validation, Kindle formatting, metadata builder, and more.',
    offers: [
      {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        name: 'Free',
        description: '2 free tools — EPUB Validator & Metadata Builder',
      },
      {
        '@type': 'Offer',
        price: PRICING.essentials.label.replace(/[^0-9.]/g, ''),
        priceCurrency: 'USD',
        name: PRICING.essentials.name,
        description: PRICING.essentials.desc,
      },
      {
        '@type': 'Offer',
        price: PRICING.full.label.replace(/[^0-9.]/g, ''),
        priceCurrency: 'USD',
        name: PRICING.full.name,
        description: PRICING.full.desc,
      },
      {
        '@type': 'Offer',
        price: PRICING.lifetime.label.replace(/[^0-9.]/g, ''),
        priceCurrency: 'USD',
        name: PRICING.lifetime.name,
        description: PRICING.lifetime.desc,
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '3000',
      bestRating: '5',
      worstRating: '1',
    },
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

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BookKraft AI',
    url: 'https://bookkraftai.com',
    logo: 'https://bookkraftai.com/favicon.png',
    sameAs: [
      'https://x.com/BookkraftTools',
      'https://www.facebook.com/bookkraftai',
      'https://linkedin.com/in/book-kraft-ai-b49a34401',
    ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <LandingPage />
    </>
  );
}
