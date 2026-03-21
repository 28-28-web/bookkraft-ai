import { usePaddle } from '@/hooks/usePaddle';

export default function PricingCard({ priceId }) {
  const paddle = usePaddle();

  const handleCheckout = () => {
    if (!paddle) return;
    paddle.Checkout.open({
      items: [{ priceId: priceId, quantity: 1 }],
    });
  };

  return (
    <button onClick={handleCheckout}>
      Get Started
    </button>
  );
}