'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AnimatedSection from '../components/AnimatedSection';
import Footer from '../components/Footer';
import dynamic from 'next/dynamic';
const SenjaReviews = dynamic(() => import('@/components/SenjaReviews'), {
  ssr: false,
  loading: () => <div style={{ height: '200px' }} />,
});

// ─── DATA ────────────────────────────────────────────────────────────

const TICKER_ITEMS = [
  '<strong>@alex_rivera</strong>: "The interface is clean and does exactly what it promises"',
  '<strong>@januine_dev</strong>: "Cleans up Word export mess in minutes"',
  '<strong>@januine_dev</strong>: "Makes a real EPUB 3.0 that KDP accepts"',
  '<strong>@januine_dev</strong>: "Two free tools, no signup. Best formatting money I\'ve spent"',
  '<strong>@alex_rivera</strong>: "Really appreciate how well it\'s put together. Nice work by the team"',
];

const PLATFORMS = [
  'Amazon KDP','Apple Books','Barnes & Noble','Kobo',
  'Draft2Digital','Smashwords','OverDrive','Tolino','Scribd',
];


// ─── HOW IT WORKS ────────────────────────────────────────────────────

const HOW_STEPS = [
  {
    n: '01',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M11 4v12M7 8l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 18h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Upload your book',
    detail: 'Drop your EPUB, DOCX, or manuscript file',
  },
  {
    n: '02',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M14.5 14.5L18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Find problems',
    detail: 'Scan for structure, metadata, and platform issues',
  },
  {
    n: '03',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M14.5 4a3 3 0 01.7 4.9L8 16l-4 1 1-4 7.2-7.2A3 3 0 0114.5 4z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Fix them',
    detail: 'Use the matching tool — most fixes take under a minute',
  },
  {
    n: '04',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M7.5 11l2.5 2.5L14.5 8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Publish with confidence',
    detail: 'Upload knowing your file will pass platform review',
  },
];

function HowItWorksSection() {
  return (
    <section style={{
      background: 'var(--ink)',
      borderTop: '1px solid rgba(255,255,255,0.09)',
      borderBottom: '1px solid rgba(255,255,255,0.09)',
      padding: '44px 0',
    }}>
      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 28px' }}>
        <div className="bk-how-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
        }}>
          {HOW_STEPS.map((step, i) => (
            <div key={step.n} style={{
              padding: '0 28px',
              borderRight: i < HOW_STEPS.length - 1 ? '1px solid rgba(255,255,255,0.09)' : 'none',
            }}>
              <div style={{ color: 'var(--gold)', marginBottom: 12 }}>
                {step.icon}
              </div>
              <div style={{
                fontFamily: 'var(--font-ibm-mono), monospace',
                fontSize: 11, letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.35)', marginBottom: 7,
              }}>
                {step.n}
              </div>
              <div style={{
                fontFamily: 'var(--font-fraunces), Fraunces, serif',
                fontSize: 17, color: '#ffffff',
                fontWeight: 500, marginBottom: 6, lineHeight: 1.3,
              }}>
                {step.label}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.55 }}>
                {step.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── INTENT CARDS ────────────────────────────────────────────────────

const INTENTS = [
  {
    label: 'I have a Word manuscript',
    desc: 'Convert .docx or .txt to EPUB, or clean formatting errors first',
    href: '/tools/manuscript-mode',
    cta: 'Format My Book →',
  },
  {
    label: 'I have an EPUB',
    desc: 'Validate structure and check KDP, Apple Books, Kobo compliance',
    href: '/tools/epub-validator',
    cta: 'Validate My EPUB →',
  },
  {
    label: 'My manuscript has formatting problems',
    desc: 'Fix smart quotes, encoding artifacts, and style inconsistencies',
    href: '/tools/manuscript-cleanup',
    cta: 'Clean My Manuscript →',
  },
  {
    label: 'I want to publish on KDP',
    desc: 'Get a readiness score, see exactly what to fix before you upload',
    href: '/tools/publishing-score',
    cta: 'Prepare for KDP →',
  },
];

function IntentSection() {
  return (
    <section style={{
      background: 'var(--white)',
      borderBottom: '1px solid var(--border)',
      padding: '52px 28px',
    }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <p style={{
          textAlign: 'center',
          fontFamily: 'var(--font-ibm-mono), monospace',
          fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--mid)', marginBottom: 32,
        }}>
          What are you trying to do?
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 14,
        }}>
          {INTENTS.map(({ label, desc, href, cta }) => (
            <a key={href} href={href} style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}>
              <div style={{
                flex: 1, border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                padding: '22px 22px 20px', background: 'var(--white)',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', lineHeight: 1.3 }}>
                  {label}
                </div>
                <div style={{ fontSize: 13, color: 'var(--mid)', lineHeight: 1.5, flex: 1 }}>
                  {desc}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold)', marginTop: 6 }}>
                  {cta}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────

export default function LandingPage({ faqs }) {
  return (
    <>
      <style>{`
        @keyframes bkFadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes bkTicker {
          from { transform:translateX(0); }
          to   { transform:translateX(-50%); }
        }
        @media (max-width: 720px) {
          .bk-process-grid {
            grid-template-columns: 1fr !important;
            gap: 22px !important;
          }
          .bk-process-arrow { display: none !important; }
          .bk-card-top { flex-direction: column !important; align-items: flex-start !important; gap: 14px !important; }
          .bk-how-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px 0 !important;
          }
          .bk-how-grid > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.09); padding-bottom: 28px !important; }
          .bk-how-grid > div:nth-child(3), .bk-how-grid > div:nth-child(4) { border-bottom: none !important; }
        }
        @media (max-width: 460px) {
          .bk-how-grid { grid-template-columns: 1fr !important; }
          .bk-how-grid > div:nth-child(3) { border-bottom: 1px solid rgba(255,255,255,0.09) !important; }
          .bk-how-grid > div:nth-child(4) { border-bottom: none !important; }
        }
      `}</style>

      <HowItWorksSection />
      <IntentSection />
      <ProcessDiagramSection />
      <ScorecardSection />
      <TickerSection />
      <ManuscriptBanner />
      <TestimonialsSection />
      <PricingSection />
      <PlatformsStripLine />
      <FAQSection faqs={faqs} />
      <Footer />
    </>
  );
}

// ─── READINESS SCORE CARD ────────────────────────────────────────────

const RS_PLATFORMS = [
  { name: 'Amazon KDP',  status: 'pass', label: 'Ready' },
  { name: 'Apple Books', status: 'warn', label: '3 issues' },
  { name: 'Kobo',        status: 'pass', label: 'Ready' },
  { name: 'IngramSpark', status: 'fail', label: '2 issues' },
];

const RS_FIXES = [
  {
    severity: 'critical',
    title: 'Table of contents isn’t connected to chapter 7',
    detail: 'Readers can’t jump to it from the Kindle navigation.',
    href: '/tools/epub-formatter',
  },
  {
    severity: 'critical',
    title: 'Title doesn’t match across cover and metadata',
    detail: '“The Long Way Home” vs “The Long Way Home: A Novel.”',
    href: '/tools/metadata-builder',
  },
  {
    severity: 'warning',
    title: 'Cover is 118px short of Apple Books’ minimum height',
    detail: 'Current: 2382 × 1500. Needed: 2400 × 1600 or larger.',
    href: '/tools/epub-formatter',
  },
];

function ReadinessScoreCard() {
  return (
    <div style={{
      background: '#fff', color: '#1a1a1a',
      borderRadius: 14, maxWidth: 760, margin: '0 auto',
      boxShadow: '0 40px 80px -30px rgba(0,0,0,0.65), 0 0 0 1px rgba(0,0,0,0.06)',
      overflow: 'hidden', position: 'relative',
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 10, border: '1px solid rgba(20,20,20,0.1)',
        borderRadius: 9, pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Header row */}
      <div className="bk-card-top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '26px 34px 22px', borderBottom: '1px solid rgba(20,20,20,0.1)' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: '12.5px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(20,20,20,0.5)', marginBottom: 4 }}>Readiness Report</div>
          <div style={{ fontSize: 14, color: 'rgba(20,20,20,0.7)' }}>my-novel-draft.epub</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontWeight: 600, fontSize: 44, lineHeight: 1, color: 'var(--charcoal)' }}>
            91<span style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 16, fontWeight: 500, color: 'rgba(20,20,20,0.4)' }}>/100</span>
          </div>
          <div style={{ fontSize: '12.5px', color: 'rgba(20,20,20,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Readiness</div>
        </div>
      </div>

      {/* Platform status matrix */}
      <div style={{ padding: '22px 34px', borderBottom: '1px solid rgba(20,20,20,0.1)' }}>
        <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: '11.5px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(20,20,20,0.45)', marginBottom: 14 }}>Platform status</div>
        <div>
          {RS_PLATFORMS.map(({ name, status, label }, i) => {
            const dotColor = status === 'pass' ? 'var(--green)' : status === 'fail' ? 'var(--terracotta)' : 'var(--amber)';
            const labelColor = status === 'pass' ? 'var(--green)' : status === 'fail' ? 'var(--terracotta)' : 'var(--amber)';
            return (
              <div key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', fontSize: '14.5px', borderBottom: i < RS_PLATFORMS.length - 1 ? '1px dashed rgba(20,20,20,0.12)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 500 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor, flexShrink: 0, display: 'inline-block' }} />
                  {name}
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, color: labelColor }}>{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fix list */}
      <div style={{ padding: '26px 34px 30px' }}>
        <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: '11.5px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(20,20,20,0.45)', marginBottom: 16 }}>Fix these, in order</div>
        {RS_FIXES.map(({ severity, title, detail, href }, i) => {
          const badgeBg = severity === 'critical' ? 'rgba(182,80,63,0.12)' : 'rgba(192,122,43,0.12)';
          const badgeColor = severity === 'critical' ? 'var(--terracotta)' : 'var(--amber)';
          return (
            <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '12px 0', borderBottom: i < RS_FIXES.length - 1 ? '1px solid rgba(20,20,20,0.08)' : 'none' }}>
              <span style={{ flexShrink: 0, fontFamily: 'var(--font-ibm-mono), monospace', fontSize: '10.5px', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '4px 8px', borderRadius: 4, marginTop: 1, background: badgeBg, color: badgeColor }}>{severity}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: '14.5px', marginBottom: 2 }}>{title}</div>
                <div style={{ fontSize: 13, color: 'rgba(20,20,20,0.55)' }}>{detail}</div>
              </div>
              <a href={href} style={{ flexShrink: 0, fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', textDecoration: 'none', whiteSpace: 'nowrap', marginTop: 1 }}>Fix now →</a>
            </div>
          );
        })}
      </div>

      {/* Footer bar */}
      <div style={{ padding: '18px 34px', background: 'var(--paper-dim)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, color: 'rgba(20,20,20,0.55)' }}>
        <span style={{ fontFamily: 'var(--font-ibm-mono), monospace' }}>3 credits · full report</span>
        <a href="/tools" style={{ color: 'var(--charcoal)', fontWeight: 600, textDecoration: 'none' }}>Rescan after fixing →</a>
      </div>
    </div>
  );
}

// ─── SCORECARD SECTION ───────────────────────────────────────────────

function ScorecardSection() {
  return (
    <section style={{ background: 'var(--ink)', padding: '70px 0 90px' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 28px' }}>
        <p style={{ textAlign: 'center', fontFamily: 'var(--font-ibm-mono), monospace', fontSize: '12.5px', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>
          What the scan gives back
        </p>
        <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-fraunces), Fraunces, serif', fontWeight: 500, fontSize: 'clamp(24px, 3vw, 32px)', maxWidth: 640, margin: '0 auto 46px', color: '#ffffff', lineHeight: 1.25 }}>
          One score. Every store you publish to. Exactly what to fix first.
        </h2>
        <ReadinessScoreCard />
        <p style={{ textAlign: 'center', marginTop: 26, fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
          Preview — not connected to live data
        </p>
      </div>
    </section>
  );
}

// ─── PROCESS DIAGRAM ─────────────────────────────────────────────────

const AUTHOR_STEPS = [
  { n: '01', label: 'Write',            detail: 'Word, Scrivener, Google Docs', active: false },
  { n: '02', label: 'Clean & Validate', detail: 'BookKraft AI runs the scan',   active: true  },
  { n: '03', label: 'Format & Publish', detail: 'Vellum, Atticus, or KDP',      active: false },
];

function ProcessDiagramSection() {
  return (
    <section style={{
      background: 'var(--ink)',
      borderTop: '1px solid rgba(255,255,255,0.09)',
      borderBottom: '1px solid rgba(255,255,255,0.09)',
      padding: '30px 0',
    }}>
      <div className="bk-process-grid" style={{
        maxWidth: 1040, margin: '0 auto', padding: '0 28px',
        display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', alignItems: 'center',
      }}>
        {AUTHOR_STEPS.map((step, i) => (
          <React.Fragment key={step.label}>
            <div style={{ padding: '0 18px' }}>
              <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, letterSpacing: '0.1em', color: step.active ? '#ffffff' : 'rgba(255,255,255,0.5)' }}>
                {step.n}
              </div>
              <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 19, margin: '6px 0 4px', color: step.active ? '#ffffff' : 'rgba(255,255,255,0.4)' }}>
                {step.label}
              </div>
              <div style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.45)' }}>{step.detail}</div>
            </div>
            {i < AUTHOR_STEPS.length - 1 && (
              <div className="bk-process-arrow" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 20 }}>→</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

function TickerSection() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      style={{ background:'var(--white)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', padding:'14px 0', overflow:'hidden' }}
      aria-label="Author wins" role="marquee"
    >
      <div style={{ display:'flex', whiteSpace:'nowrap', animation:'bkTicker 32s linear infinite' }}>
        {doubled.map((item, i) => (
          <div key={i} aria-hidden={i >= TICKER_ITEMS.length ? 'true' : undefined} style={{
            display:'inline-flex', alignItems:'center', gap:10,
            padding:'0 36px', fontSize:13, color:'var(--mid)',
            borderRight:'1px solid var(--border)', flexShrink:0,
          }}>
            <span style={{ color:'var(--gold)', fontSize:10 }} aria-hidden="true">✦</span>
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 3. FREE TOOLS ───────────────────────────────────────────────────

function ManuscriptBanner() {
  return (
    <section style={{
      background: 'var(--charcoal)',
      padding: '48px 24px',
      textAlign: 'center',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.75)',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.1em',
          padding: '4px 12px',
          borderRadius: 20,
          marginBottom: 16,
          textTransform: 'uppercase',
          border: '1px solid rgba(255,255,255,0.18)',
        }}>
          New Feature
        </div>
        <h2 style={{
          color: '#fff',
          fontSize: 32,
          fontWeight: 800,
          marginBottom: 12,
          lineHeight: 1.2,
          fontFamily: "'Playfair Display', serif",
        }}>
          Convert Word DOCX to EPUB 3.0 — One Step, No Calibre
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: 16,
          marginBottom: 28,
          lineHeight: 1.6,
        }}>
          Upload your .docx or .txt file. We detect chapters, clean formatting errors, and generate a valid EPUB 3.0 file in one step. No Calibre. No Sigil. No coding.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/tools/manuscript-mode"
            style={{
              background: '#ffffff',
              color: 'var(--charcoal)',
              padding: '14px 32px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 16,
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 10px 24px -8px rgba(0,0,0,0.5)',
            }}
          >
            Try Full Manuscript Mode →
          </Link>
          <Link
            href="/tools/epub-validator"
            style={{
              background: 'transparent',
              color: 'rgba(255,255,255,0.75)',
              padding: '14px 32px',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 16,
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.3)',
              display: 'inline-block',
            }}
          >
            Validate EPUB 3.0 Files
          </Link>
        </div>
        <div style={{ marginTop: 20, color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>
          Works with .docx and .txt · Chapter detection included · EPUB 3.0 output
        </div>
      </div>
    </section>
  );
}


// ─── 7. TESTIMONIALS ─────────────────────────────────────────────────

function initials(name) {
  return name.split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function TestimonialsSection() {
  const REVIEWS = [
    {
      name: 'Alex Rivera',
      source: 'CodeTrendy',
      rating: 5,
      text: 'I\'ve been using this for a bit and really appreciate how well it\'s put together. The interface is clean and it does exactly what it promises. Nice work by the team.',
    },
    {
      name: 'Januine Developer',
      source: 'CodeTrendy',
      rating: 5,
      text: 'If you\'ve ever spent 2 hours fixing smart quotes or wanted to throw your laptop because Word broke your formatting again... read this. Cleans up Word export mess in minutes. Makes a real EPUB 3.0 that KDP accepts. Two free tools – no signup. Best formatting money I\'ve spent. And I\'m cheap.',
    },
    {
      name: 'Jamie Park',
      source: 'CodeTrendy',
      rating: 5,
      text: 'Output ePub passed Kindle preview clean. Saved me a freelancer pass.',
    },
  ];

  return (
    <section className="section-white" aria-labelledby="reviewsHeading">
      <div className="content-wrap">
        <AnimatedSection>
          <p className="section-eyebrow-v2 animate-on-scroll">Author wins</p>
          <h2 className="section-title-v2 animate-on-scroll stagger-1" id="reviewsHeading">
            What indie authors are saying
          </h2>
        </AnimatedSection>

        {/* CodeTrendy Reviews */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginTop: 48, marginBottom: 48 }}>
          {REVIEWS.map((review, i) => (
            <AnimatedSection key={i}>
              <div className={`testimonial-card-v2 animate-on-scroll stagger-${i + 1}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="testimonial-avatar" aria-hidden="true">{initials(review.name)}</div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{review.name}</p>
                      <p style={{ fontSize: 12, color: 'var(--mid)' }}>via {review.source}</p>
                    </div>
                  </div>
                  <span className="testimonial-stars-v2" aria-label={`${review.rating} stars`}>
                    {'★'.repeat(review.rating)}
                  </span>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink)', fontStyle: 'italic' }}>
                  "{review.text}"
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

       {/* Senja widget - disabled until real reviews collected */}
      </div>
    </section>
  );
}

// ─── 8. PLATFORMS STRIP ──────────────────────────────────────────────

function PlatformsStripLine() {
  return (
    <div style={{
      textAlign: 'center', padding: '14px 24px',
      background: 'var(--ink)', borderTop: '1px solid rgba(255,255,255,0.08)',
      fontSize: 12, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em',
      fontFamily: 'var(--font-ibm-mono), monospace',
    }}>
      {PLATFORMS.join(' · ')}
    </div>
  );
}

// ─── 9. PRICING CTA ──────────────────────────────────────────────────

function PricingSection() {
  return (
    <section className="section-white" id="pricing" style={{ padding: '64px 0' }}>
      <div className="content-wrap" style={{ textAlign: 'center' }}>
        <p className="section-eyebrow-v2">Simple, honest pricing</p>
        <h2 className="section-title-v2" style={{ marginBottom: 12 }}>Pay once, own forever.</h2>
        <p className="section-sub-v2" style={{ marginBottom: 32 }}>
          No subscriptions. No monthly fees. Credits never expire.
        </p>
        <Link href="/pricing" className="btn btn-gold" style={{ fontSize: 16, padding: '12px 32px', textDecoration: 'none' }}>
          See pricing
        </Link>
      </div>
    </section>
  );
}

// ─── 10. FAQ ─────────────────────────────────────────────────────────

function FAQSection({ faqs }) {
  const [open, setOpen] = useState(null);
  const toggle = i => setOpen(open === i ? null : i);

  return (
    <section className="section-cream" style={{ background: 'var(--ink)' }} aria-labelledby="faqHeading">
      <div style={{ maxWidth:680, margin:'0 auto' }}>
        <AnimatedSection>
          <p className="section-eyebrow-v2 animate-on-scroll">Common questions</p>
          <h2 className="section-title-v2 animate-on-scroll stagger-1" id="faqHeading" style={{ color: 'var(--cream)' }}>
            EPUB & Kindle Formatting — Common Questions
          </h2>
        </AnimatedSection>

        <div style={{ marginTop:40 }} role="list">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i}
                className={`faq-item animate-on-scroll stagger-${Math.min(i+1,6)}${isOpen?' open':''}`}
                role="listitem">
                <button id={`faq-btn-${i}`} className="faq-question"
                  onClick={()=>toggle(i)} aria-expanded={isOpen} aria-controls={`faq-ans-${i}`}>
                  {faq.q}
                  <span className="faq-chevron" aria-hidden="true">▾</span>
                </button>
                <div id={`faq-ans-${i}`} className="faq-answer" role="region" aria-labelledby={`faq-btn-${i}`}>
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link href="/faq" style={{ fontSize: 14, color: 'var(--gold)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            More questions →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── 11. FOOTER ──────────────────────────────────────────────────────

