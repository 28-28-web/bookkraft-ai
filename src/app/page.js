import HeroSection from '../components/HeroSection';
import LandingPage from './landingpage';
import { PRICING, FREE_TOOLS, HOME_FAQS, EPUB_KDP_FAQS } from '../lib/constants';
import { TOOLS } from '../lib/tools';

const _HOME_TITLE = 'BookKraft AI — EPUB & Kindle Tools for Indie Authors';
const _HOME_DESC = `${TOOLS.length} tools for indie authors. Fix Kindle errors, validate EPUBs, build metadata, generate keywords. One-time price, no subscription. Start free.`;

export const metadata = {
  title: _HOME_TITLE,
  description: _HOME_DESC,
  alternates: {
    canonical: 'https://bookkraftai.com/',
  },
  openGraph: {
    title: _HOME_TITLE,
    description: _HOME_DESC,
    siteName: 'BookKraft AI',
    type: 'website',
    url: 'https://bookkraftai.com/',
    images: [{ url: 'https://bookkraftai.com/og-image.jpg', width: 1200, height: 630, alt: 'BookKraft AI – eBook Formatting Toolkit' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: _HOME_TITLE,
    description: _HOME_DESC,
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
    mainEntity: [...HOME_FAQS, ...EPUB_KDP_FAQS].map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
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
      <HeroSection />
      <LandingPage faqs={HOME_FAQS} epubFaqs={EPUB_KDP_FAQS} />
    </>
  );
}
