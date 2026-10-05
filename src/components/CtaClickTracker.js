'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

// Blog posts are HTML strings, so their CTA links can't take an onClick.
// This listens for clicks on links marked data-cta and logs `cta_click`
// with only the source and target paths. Renders nothing.
export default function CtaClickTracker() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.('a[data-cta]');
      if (!a) return;
      const to = new URL(a.getAttribute('href'), window.location.origin).pathname;
      track('cta_click', { from: window.location.pathname, to });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}
