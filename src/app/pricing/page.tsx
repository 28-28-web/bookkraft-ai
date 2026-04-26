import PricingClient from './PricingClient';

export const metadata = {
  title: 'Simple Pricing — No Subscriptions | BookKraft AI',
  description: 'Buy once, own forever. Credits never expire. No monthly fees. Choose from Essentials, Credit Packs, or Lifetime access.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://bookkraftai.com/pricing',
  },
};

export default function PricingPage() {
  return <PricingClient />;
}