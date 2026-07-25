import { useEffect, useState } from 'react';
import { initializePaddle } from '@paddle/paddle-js';

const INIT_TIMEOUT_MS = 8000;

let paddleInstance = null;
let paddlePromise = null;
let paddleFailed = false;
const listeners = new Set();
const failedListeners = new Set();

function notifyListeners() {
  listeners.forEach(fn => fn(paddleInstance));
}

function notifyFailedListeners() {
  failedListeners.forEach(fn => fn(true));
}

/**
 * Returns { paddle, failed }. `paddle` is null until the SDK is ready.
 * `failed` becomes true if init errors OR doesn't resolve within
 * INIT_TIMEOUT_MS — consumers must treat that as "assume it's never
 * coming" and fall back to something clickable, not sit on a disabled
 * button forever.
 */
export function usePaddle() {
  const [paddle, setPaddle] = useState(paddleInstance);
  const [failed, setFailed] = useState(paddleFailed);

  useEffect(() => {
    listeners.add(setPaddle);
    failedListeners.add(setFailed);

    if (paddleInstance) {
      setPaddle(paddleInstance);
    } else if (paddleFailed) {
      setFailed(true);
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
        paddleFailed = true;
        notifyFailedListeners();
        paddlePromise = null;
      });
    }

    const timer = setTimeout(() => {
      if (!paddleInstance && !paddleFailed) {
        console.error(`Paddle init did not resolve within ${INIT_TIMEOUT_MS}ms — treating as failed.`);
        paddleFailed = true;
        notifyFailedListeners();
      }
    }, INIT_TIMEOUT_MS);

    return () => {
      listeners.delete(setPaddle);
      failedListeners.delete(setFailed);
      clearTimeout(timer);
    };
  }, []);

  return { paddle, failed };
}
