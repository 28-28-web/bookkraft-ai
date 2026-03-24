import PricingPage from './PricingPage';

export const metadata = {
  title: 'Pricing — BookKraft AI',
  description: 'One-time pricing. Free EPUB tools, $4.99 Essentials Bundle, $9.99 Full Access. No subscriptions. Credits never expire.',
  alternates: {
    canonical: 'https://bookkraftai.com/pricing',
  },
};

export default function Page() {
  return <PricingPage />;
}