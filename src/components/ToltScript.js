'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Tolt affiliate tracking (tlt.js). Loads only where it does something:
// - any page opened from an affiliate link (?ref= or ?via=), so tlt.js can set
//   its tolt_referral cookie;
// - /pricing and /checkout, which pass window.tolt_referral into Paddle
//   customData (PricingClient.tsx, checkout/page.js).
// Re-checked on every client-side navigation; once added it stays for the visit.
const REFERRAL_PARAMS = ['ref', 'via'];
const PATHS = ['/pricing', '/checkout'];

export default function ToltScript() {
  const pathname = usePathname();

  useEffect(() => {
    if (document.querySelector('script[data-tolt]')) return;
    const params = new URLSearchParams(window.location.search);
    // ?ref=<tool>&issues=N is an internal tool cross-link, not an affiliate
    // click (same rule as captureReferral in lib/analytics.js).
    const fromAffiliate = REFERRAL_PARAMS.some((p) => params.get(p)) && !params.has('issues');
    if (!fromAffiliate && !PATHS.includes(pathname)) return;

    const s = document.createElement('script');
    s.src = 'https://files.tlt-cdn.com/tlt.js';
    s.async = true;
    s.dataset.tolt = 'pk_mLNuSRb6fKgNANwUVumQGKQb';
    document.head.appendChild(s);
  }, [pathname]);

  return null;
}
