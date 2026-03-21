import { useEffect, useState } from 'react';
import { initializePaddle } from '@paddle/paddle-js';

export function usePaddle() {
  const [paddle, setPaddle] = useState(null);

  useEffect(() => {
    initializePaddle({
      environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT,
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
    }).then((instance) => {
      if (instance) setPaddle(instance);
    });
  }, []);

  return paddle;
}