import React from 'react';
import Link from 'next/link';
import HeroSection from '../components/HeroSection';
import YouTubeFacade from '../components/YouTubeFacade';
import { EPUB_CHECK_VIDEO_ID, epubCheckVideoSchema } from '../lib/seo';
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(epubCheckVideoSchema) }}
      />
      <HeroSection />
      <section style={{ background: 'var(--ink)', padding: '0 0 56px' }} aria-labelledby="homeVideoHeading">
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 28px' }}>
          <h2 id="homeVideoHeading" style={{
            fontFamily: 'var(--font-fraunces), Fraunces, serif', fontWeight: 500,
            fontSize: 'clamp(22px, 2.6vw, 28px)', lineHeight: 1.2,
            color: '#ffffff', margin: '0 0 18px',
          }}>
            See how it works in 75 seconds
          </h2>
          <YouTubeFacade id={EPUB_CHECK_VIDEO_ID} title="KDP sent your book back? Check your EPUB file first" />
          <p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', margin: 0 }}>
            Try it on your own file with the <Link href="/tools/epub-validator" className="link-gold">free EPUB Validator</Link>. No signup.
          </p>
        </div>
      </section>
      <LandingPage faqs={HOME_FAQS} epubFaqs={EPUB_KDP_FAQS} />
    </>
  );
}
