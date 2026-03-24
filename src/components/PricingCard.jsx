'use client';

import { usePaddle } from '@/app/hooks/usePaddle';
import { useAuth } from '@/components/AuthProvider';

export default function PricingCard({ priceId, purchaseType, children, className }) {
  const paddle = usePaddle();
  const { user } = useAuth();

  const handleCheckout = () => {
    if (!paddle) return;

    if (!user) {
      window.location.href = '/login?redirect=/pricing';
      return;
    }

    paddle.Checkout.open({
      items: [{ priceId: priceId, quantity: 1 }],
      customData: {
        userId: user.id,
        purchaseType: purchaseType,
      },
    });
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={!paddle}
      className={className}
      style={{ cursor: paddle ? 'pointer' : 'wait', width: '100%' }}
    >
      {paddle ? children : 'Loading...'}
    </button>
  );
}