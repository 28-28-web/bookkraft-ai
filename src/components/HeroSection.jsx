// This is a Server Component (no 'use client')
import React from 'react';

const HEADLINE_WORDS = [
  { text: 'Format', gold: false },
  { text: 'like', gold: false },
  { text: 'a', gold: false },
  { text: 'pro.', gold: true },
  { text: 'Price', gold: false },
  { text: 'like', gold: false },
  { text: 'a', gold: false },
  { text: 'newcomer.', gold: true },
];

export default function HeroSection() {
  return (
    <section
      style={{
        background: 'var(--ink)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(96px,10vh,128px) clamp(20px,4vw,48px) clamp(64px,8vh,96px)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Hero"
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.045,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,215,0,0.1) 0%, transparent 70%)',
          backgroundSize: '100% 100%',
        }}
      />

      <div style={{ maxWidth: 1160, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <p
          style={{
            fontFamily: 'var(--font-jetbrains), monospace',
            fontSize: 11,
            color: 'var(--gold)',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            marginBottom: 20,
            opacity: 1,
          }}
        >
          ✦ Professional eBook Formatting
        </p>

        <h1
          aria-label="Format like a pro. Price like a newcomer."
          style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: 'clamp(48px,7vw,96px)',
            fontWeight: 700,
            fontStyle: 'italic',
            lineHeight: 1.05,
            letterSpacing: '-1px',
            color: 'var(--cream)',
            marginBottom: 24,
          }}
        >
          {HEADLINE_WORDS.map((w, i) => (
            <React.Fragment key={i}>
              <span
                style={{
                  color: w.gold ? 'var(--gold)' : 'var(--cream)',
                  display: 'inline-block',
                  opacity: 1,
                  transform: 'translateY(0)',
                }}
              >
                {w.text}
              </span>
              {i < HEADLINE_WORDS.length - 1 && ' '}
            </React.Fragment>
          ))}
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: 'clamp(16px,1.3vw,22px)',
            color: 'rgba(255,248,235,0.75)',
            maxWidth: 560,
            marginBottom: 32,
            lineHeight: 1.6,
            opacity: 1,
          }}
        >
          Upload your manuscript. Pick a tool. Download KDP-ready EPUB, PDF, or DOCX in seconds.
          Start with two free tools — no account needed.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, opacity: 1 }}>
          <a
            href="/free-tools"
            style={{
              display: 'inline-block',
              padding: '14px 36px',
              background: 'var(--gold)',
              color: 'var(--ink)',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontWeight: 600,
              borderRadius: 6,
              fontSize: 16,
              textDecoration: 'none',
            }}
          >
            Start for Free →
          </a>
          <a
            href="/pricing"
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              border: '1.5px solid rgba(255,248,235,0.25)',
              color: 'var(--cream)',
              borderRadius: 6,
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: 16,
              textDecoration: 'none',
            }}
          >
            See Pricing
          </a>
        </div>
      </div>
    </section>
  );
}
