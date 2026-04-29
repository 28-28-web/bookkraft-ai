'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function UpsellBanner({ toolName = 'this tool' }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div style={{
      position: 'relative',
      margin: '28px 0 0',
      padding: '20px 24px',
      background: 'var(--ink, #0f0e0c)',
      borderRadius: 10,
      border: '1px solid rgba(201,168,76,0.25)',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      flexWrap: 'wrap',
    }}>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        style={{
          position: 'absolute', top: 10, right: 12,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(247,243,236,0.35)', fontSize: 16, lineHeight: 1, padding: 4,
        }}
      >✕</button>

      <span style={{ fontSize: 28, flexShrink: 0 }}>✦</span>

      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{
          color: 'var(--gold, #c9a84c)', fontSize: 11, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 4px',
        }}>
          Liked {toolName}?
        </p>
        <p style={{ color: 'rgba(247,243,236,0.75)', fontSize: 14, lineHeight: 1.5, margin: 0 }}>
          Get all 12 professional tools — formatting, keywords, metadata, cleanup and more.
          <strong style={{ color: 'var(--cream, #f7f3ec)' }}> One-time payment. No subscription.</strong>
        </p>
      </div>

      <Link
        href="/pricing"
        style={{
          display: 'inline-block',
          background: 'var(--gold, #c9a84c)',
          color: 'var(--ink, #0f0e0c)',
          fontWeight: 700, fontSize: 13,
          padding: '10px 20px', borderRadius: 6,
          textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0,
        }}
      >
        Get Full Access — $9.99 →
      </Link>
    </div>
  );
}