import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact — BookKraft AI',
  description: 'Have a question or need help? Get in touch with the BookKraft AI team. We usually respond within 24 hours.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://bookkraftai.com/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}