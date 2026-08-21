import FaqPage from './FaqPage';
import { FAQ_PAGE_FAQS } from '@/lib/constants';

export const metadata = {
  title: 'FAQ — BookKraft AI',
  description: 'Answers about credits, Starter vs Pro plans, supported formats, AI model, and what happens after you purchase. Everything you need to know about BookKraft AI.',
  alternates: {
    canonical: 'https://bookkraftai.com/faq',
  },
  openGraph: {
    title: 'FAQ — BookKraft AI',
    description: 'Answers about credits, Starter vs Pro plans, supported formats, AI model, and what happens after you purchase.',
    siteName: 'BookKraft AI',
    type: 'website',
    url: 'https://bookkraftai.com/faq',
    images: [{ url: 'https://bookkraftai.com/og-image.jpg', width: 1200, height: 630, alt: 'BookKraft AI FAQ' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ — BookKraft AI',
    description: 'Answers about credits, Starter vs Pro plans, supported formats, AI model, and what happens after you purchase.',
  },
};

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_PAGE_FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqPage faqs={FAQ_PAGE_FAQS} />
    </>
  );
}
