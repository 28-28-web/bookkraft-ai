'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { track } from '@/lib/analytics';

// Drop-in next/link for article → tool CTAs. Logs `cta_click` with only the
// source and target paths; the page around it stays server-rendered.
export default function TrackedLink({ href, from, onClick, children, ...rest }) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      onClick={(e) => {
        track('cta_click', { from: from || pathname, to: href });
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
