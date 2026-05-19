import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact — BookKraft AI',
  description: 'Have a question or need help? Get in touch with the BookKraft AI team. We usually respond within 24 hours.',
  openGraph: {
    title: "Contact Us — BookKraft AI",
    description: "Get in touch with the BookKraft AI team. We are here to help with your eBook formatting questions.",
    url: "https://bookkraftai.com/contact",
    siteName: 'BookKraft AI',
    type: 'website',
    images: [{ url: 'https://bookkraftai.com/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contact Us — BookKraft AI",
    description: "Get in touch with the BookKraft AI team. We are here to help with your eBook formatting questions.",
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://bookkraftai.com/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}