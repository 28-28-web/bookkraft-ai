import { useEffect, useState } from 'react';
import { initializePaddle } from '@paddle/paddle-js';

let paddleInstance = null;
let paddlePromise = null;

export function usePaddle() {
  const [paddle, setPaddle] = useState(paddleInstance);

  useEffect(() => {
    if (paddleInstance) {
      setPaddle(paddleInstance);
      return;
    }

    if (!paddlePromise) {
      paddlePromise = initializePaddle({
        environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT,
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
      }).then((instance) => {
        paddleInstance = instance;
        return instance;
      }).catch(err => {
        console.error('Paddle init error:', err);
        paddlePromise = null;
      });
    }

    paddlePromise.then((instance) => {
      if (instance) setPaddle(instance);
    });
  }, []);

  return paddle;
}