import { useEffect, useState } from 'react';
import { initializePaddle } from '@paddle/paddle-js';

let paddleInstance = null;
let paddlePromise = null;
const listeners = new Set();

function notifyListeners() {
  listeners.forEach(fn => fn(paddleInstance));
}

export function usePaddle() {
  const [paddle, setPaddle] = useState(paddleInstance);

  useEffect(() => {
    listeners.add(setPaddle);

    if (paddleInstance) {
      setPaddle(paddleInstance);
    } else if (!paddlePromise) {
      paddlePromise = initializePaddle({
        environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT,
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
      }).then((instance) => {
        paddleInstance = instance;
        notifyListeners();
        return instance;
      }).catch(err => {
        console.error('Paddle init error:', err);
        paddlePromise = null;
      });
    }

    return () => listeners.delete(setPaddle);
  }, []);

  return paddle;
}