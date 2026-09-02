'use client';

import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';

// ── Thumbnail Components ───────────────────────────────────────

function ReadinessRingThumb() {
  const platforms = [
    { label: 'KDP', s: 'pass' },
    { label: 'Apple', s: 'warn' },
    { label: 'Kobo', s: 'pass' },
    { label: 'IS', s: 'fail' },
  ];
  return (
    <div
      role="img"
      aria-label="Publishing Readiness Score — circular score ring at 91 out of 100, with platform results for KDP, Apple Books, Kobo, and IngramSpark"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, height: '100%' }}
    >
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: 'conic-gradient(#c09a4a 328deg, rgba(192,154,74,0.15) 0deg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'var(--paper-dim,#f4f4f2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <span style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'monospace', color: 'var(--ink,#15171d)', lineHeight: 1 }}>91</span>
          <span style={{ fontSize: '0.48rem', fontFamily: 'monospace', color: 'rgba(21,23,29,0.45)', letterSpacing: '0.05em' }}>/100</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 5 }}>
        {platforms.map(({ label, s }) => (
          <div key={label} style={{
            width: 30, height: 18, borderRadius: 3,
            background: s === 'pass' ? 'rgba(63,122,90,0.12)' : s === 'warn' ? 'rgba(192,122,43,0.12)' : 'rgba(182,80,63,0.12)',
            border: `1px solid ${s === 'pass' ? '#3f7a5a' : s === 'warn' ? '#c07a2b' : '#b6503f'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.44rem', fontFamily: 'monospace', color: 'var(--ink,#15171d)',
          }}>{label}</div>
        ))}
      </div>
    </div>
  );
}

function EpubFormatterThumb() {
  return (
    <div
      role="img"
      aria-label="Word DOCX document converting to EPUB file"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, height: '100%' }}
    >
      <div style={{ width: 44, height: 52, borderRadius: 4, background: '#4472c4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
        <span style={{ fontSize: '0.5rem', color: '#fff', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.04em' }}>DOCX</span>
        <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.25)' }} />
        {[22, 28, 20, 26].map((w, i) => <div key={i} style={{ height: 2, borderRadius: 1, background: 'rgba(255,255,255,0.45)', width: w }} />)}
      </div>
      <span style={{ fontSize: '1.1rem', color: '#c09a4a' }}>→</span>
      <div style={{ width: 44, height: 52, borderRadius: 4, background: '#c09a4a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
        <span style={{ fontSize: '0.5rem', color: '#fff', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.04em' }}>EPUB</span>
        <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.3)' }} />
        {[22, 28, 20, 26].map((w, i) => <div key={i} style={{ height: 2, borderRadius: 1, background: 'rgba(255,255,255,0.8)', width: w }} />)}
      </div>
    </div>
  );
}

function KindleFixerThumb() {
  const fixes = [
    ['"Hello"', '“Hello”'],
    ['--', '—'],
    ['double  space', 'double space'],
  ];
  return (
    <div
      role="img"
      aria-label="Kindle format fixer correcting straight quotes, double hyphens, and double spaces"
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 14px', height: '100%', gap: 9 }}
    >
      {fixes.map(([before, after], i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'monospace', fontSize: '0.6rem' }}>
          <span style={{ color: 'rgba(21,23,29,0.38)', textDecoration: 'line-through' }}>{before}</span>
          <span style={{ color: '#c09a4a', fontSize: '0.52rem' }}>→</span>
          <span style={{ color: '#3f7a5a', fontWeight: 600 }}>{after}</span>
        </div>
      ))}
    </div>
  );
}

function TocGeneratorThumb() {
  const items = [
    { text: 'Chapter 1', level: 0 },
    { text: '1.1 Opening', level: 1 },
    { text: 'Chapter 2', level: 0 },
    { text: '2.1 Rising', level: 1 },
    { text: '2.2 Conflict', level: 1 },
    { text: 'Chapter 3', level: 0 },
  ];
  return (
    <div
      role="img"
      aria-label="Table of contents with chapter and section hierarchy"
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 14px', height: '100%', gap: 5 }}
    >
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, paddingLeft: item.level * 10 }}>
          <div style={{
            width: item.level ? 3 : 5, height: item.level ? 3 : 4, borderRadius: 2, flexShrink: 0,
            background: item.level ? 'rgba(21,23,29,0.2)' : '#c09a4a',
          }} />
          <div style={{
            height: 2, borderRadius: 1, flexShrink: 0,
            background: item.level ? 'rgba(21,23,29,0.18)' : 'rgba(21,23,29,0.38)',
            width: item.level ? 38 : 52,
          }} />
        </div>
      ))}
    </div>
  );
}

function FrontMatterThumb() {
  return (
    <div
      role="img"
      aria-label="Book front matter showing title page and copyright page side by side"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, height: '100%' }}
    >
      <div style={{ width: 46, height: 58, borderRadius: 3, background: '#fff', border: '1px solid rgba(21,23,29,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, boxShadow: '2px 2px 8px rgba(0,0,0,0.07)' }}>
        <div style={{ width: 30, height: 3, borderRadius: 1, background: 'rgba(21,23,29,0.55)' }} />
        <div style={{ width: 20, height: 2, borderRadius: 1, background: 'rgba(21,23,29,0.28)' }} />
        <div style={{ width: 14, height: 1.5, borderRadius: 1, background: 'rgba(21,23,29,0.18)', marginTop: 3 }} />
      </div>
      <div style={{ width: 46, height: 58, borderRadius: 3, background: '#fff', border: '1px solid rgba(21,23,29,0.1)', display: 'flex', flexDirection: 'column', padding: '8px 7px', gap: 3, boxShadow: '2px 2px 8px rgba(0,0,0,0.07)' }}>
        {[26, 20, 24, 16, 22, 18, 14].map((w, i) => (
          <div key={i} style={{ height: 2, borderRadius: 1, background: 'rgba(21,23,29,0.13)', width: w }} />
        ))}
      </div>
    </div>
  );
}

function CssSnippetThumb() {
  return (
    <div
      role="img"
      aria-label="CSS snippet for EPUB drop cap styling with syntax-highlighted code"
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8px 12px', height: '100%', gap: 4, fontFamily: 'monospace', fontSize: '0.54rem', lineHeight: 1.4 }}
    >
      <span style={{ color: '#c09a4a' }}>{'p::first-letter {'}</span>
      <div style={{ paddingLeft: 10, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <div>
          <span style={{ color: '#4472c4' }}>float</span>
          <span style={{ color: 'rgba(21,23,29,0.4)' }}>:</span>
          <span style={{ color: '#3f7a5a' }}> left</span>
          <span style={{ color: 'rgba(21,23,29,0.3)' }}>;</span>
        </div>
        <div>
          <span style={{ color: '#4472c4' }}>font-size</span>
          <span style={{ color: 'rgba(21,23,29,0.4)' }}>:</span>
          <span style={{ color: '#3f7a5a' }}> 3em</span>
          <span style={{ color: 'rgba(21,23,29,0.3)' }}>;</span>
        </div>
        <div>
          <span style={{ color: '#4472c4' }}>line-height</span>
          <span style={{ color: 'rgba(21,23,29,0.4)' }}>:</span>
          <span style={{ color: '#3f7a5a' }}> 0.8</span>
          <span style={{ color: 'rgba(21,23,29,0.3)' }}>;</span>
        </div>
      </div>
      <span style={{ color: 'rgba(21,23,29,0.4)' }}>{'}'}</span>
    </div>
  );
}

function ManuscriptCleanupThumb() {
  return (
    <div
      role="img"
      aria-label="Manuscript text with repeated words highlighted in red and clichés underlined in amber"
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8px 14px', height: '100%', gap: 5, fontFamily: 'monospace', fontSize: '0.57rem', lineHeight: 1.6, color: 'rgba(21,23,29,0.68)' }}
    >
      <div>He walked <span style={{ background: 'rgba(182,80,63,0.15)', borderBottom: '1.5px solid #b6503f', padding: '0 1px' }}>quickly</span>, and</div>
      <div><span style={{ background: 'rgba(182,80,63,0.15)', borderBottom: '1.5px solid #b6503f', padding: '0 1px' }}>quickly</span> turned to—</div>
      <div>{'"'}<span style={{ background: 'rgba(192,122,43,0.13)', borderBottom: '1.5px solid #c07a2b', padding: '0 1px' }}>at the end of the day</span>{'"'}</div>
    </div>
  );
}

function PrintToDigitalThumb() {
  return (
    <div
      role="img"
      aria-label="Print book page with page numbers and footnotes converting to digital eReader format"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, height: '100%' }}
    >
      <div style={{ width: 42, height: 54, borderRadius: 2, background: '#fff', border: '1px solid rgba(21,23,29,0.12)', display: 'flex', flexDirection: 'column', padding: '5px 5px', gap: 2.5, boxShadow: '1px 1px 5px rgba(0,0,0,0.08)' }}>
        <div style={{ textAlign: 'center', fontSize: '0.4rem', fontFamily: 'monospace', color: 'rgba(21,23,29,0.25)', marginBottom: 1 }}>— 42 —</div>
        {[24, 20, 22, 18, 22, 16].map((w, i) => <div key={i} style={{ height: 2, borderRadius: 1, background: 'rgba(21,23,29,0.14)', width: w }} />)}
        <div style={{ marginTop: 1, fontSize: '0.38rem', fontFamily: 'monospace', color: 'rgba(21,23,29,0.3)' }}>¹ See page 31</div>
      </div>
      <span style={{ fontSize: '0.9rem', color: '#c09a4a' }}>→</span>
      <div style={{ width: 42, height: 54, borderRadius: 5, background: '#1a1a1a', border: '2px solid rgba(255,255,255,0.12)', display: 'flex', flexDirection: 'column', padding: '5px 5px', gap: 2.5 }}>
        {[22, 18, 22, 16, 20].map((w, i) => <div key={i} style={{ height: 2, borderRadius: 1, background: 'rgba(255,255,255,0.28)', width: w }} />)}
        <div style={{ marginTop: 1, fontSize: '0.38rem', fontFamily: 'monospace', color: '#c09a4a' }}>→ Chapter 3</div>
      </div>
    </div>
  );
}

function StyleAuditorThumb() {
  const pairs = [
    ['Grey', 'Gray'],
    ['grey-eyed', 'grey eyed'],
    ['EPUB', 'epub'],
  ];
  return (
    <div
      role="img"
      aria-label="Style sheet auditor showing inconsistencies: Grey vs Gray, grey-eyed vs grey eyed, EPUB vs epub"
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 14px', height: '100%', gap: 9 }}
    >
      <div style={{ fontSize: '0.5rem', fontFamily: 'monospace', color: 'rgba(21,23,29,0.38)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Style drift detected</div>
      {pairs.map(([a, b], i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.58rem', color: '#b6503f', fontWeight: 600 }}>{a}</span>
          <span style={{ fontSize: '0.48rem', color: 'rgba(21,23,29,0.28)' }}>vs</span>
          <span style={{ fontFamily: 'monospace', fontSize: '0.58rem', color: 'rgba(21,23,29,0.55)' }}>{b}</span>
        </div>
      ))}
    </div>
  );
}

function ValidatorProThumb() {
  const stores = [
    ['Amazon KDP', 'pass'],
    ['Apple Books', 'warn'],
    ['Google Play', 'fail'],
    ['IngramSpark', 'pass'],
  ];
  return (
    <div
      role="img"
      aria-label="EPUB Validator Pro store report: KDP pass, Apple Books warning, Google Play fail, IngramSpark pass"
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 14px', height: '100%', gap: 7 }}
    >
      {stores.map(([store, s]) => (
        <div key={store} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.53rem', color: 'rgba(21,23,29,0.6)' }}>{store}</span>
          <span style={{
            fontSize: '0.5rem', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.04em',
            color: s === 'pass' ? '#3f7a5a' : s === 'warn' ? '#c07a2b' : '#b6503f',
          }}>
            {s === 'pass' ? '✓ PASS' : s === 'warn' ? '⚠ WARN' : '✗ FAIL'}
          </span>
        </div>
      ))}
    </div>
  );
}

function BackMatterThumb() {
  return (
    <div
      role="img"
      aria-label="Book back matter showing About the Author bio and Also By section"
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8px 14px', height: '100%', gap: 9 }}
    >
      <div>
        <div style={{ fontSize: '0.5rem', fontFamily: 'monospace', color: 'rgba(21,23,29,0.38)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 3 }}>About the Author</div>
        {[28, 22, 26, 18].map((w, i) => <div key={i} style={{ height: 2, borderRadius: 1, background: 'rgba(21,23,29,0.16)', width: w, marginBottom: 2.5 }} />)}
      </div>
      <div>
        <div style={{ fontSize: '0.5rem', fontFamily: 'monospace', color: 'rgba(21,23,29,0.38)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 3 }}>Also By</div>
        {[52, 42].map((w, i) => <div key={i} style={{ height: 2, borderRadius: 1, background: 'rgba(21,23,29,0.16)', width: w, marginBottom: 2.5 }} />)}
      </div>
    </div>
  );
}

function KdpKeywordThumb() {
  const keywords = ['cozy mystery with recipes', 'romance small town bakery', 'fantasy magic academy ya'];
  return (
    <div
      role="img"
      aria-label="KDP keyword finder showing long-tail Amazon search phrases for indie authors"
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 12px', height: '100%', gap: 6 }}
    >
      {keywords.map((kw, i) => (
        <div key={i} style={{
          background: 'rgba(21,23,29,0.05)', borderRadius: 3,
          padding: '3px 7px', fontFamily: 'monospace', fontSize: '0.51rem',
          color: 'rgba(21,23,29,0.65)', border: '1px solid rgba(21,23,29,0.09)',
        }}>{kw}</div>
      ))}
    </div>
  );
}

// ── Tool Data ───────────────────────────────────────────────────

const TOOLS = [
  {
    slug: 'epub-formatter',
    name: 'EPUB Formatter',
    desc: 'Paste your manuscript to generate a valid EPUB 3.0 with chapters, metadata, and cover image. No Calibre or Sigil needed.',
    badge: 'Instant', badgeType: 'logic',
    Thumb: EpubFormatterThumb,
  },
  {
    slug: 'kindle-format-fixer',
    name: 'Kindle Format Fixer',
    desc: 'Fix smart quotes, em dashes, double spaces, and encoding artifacts from Word exports in one automated pass.',
    badge: 'Instant', badgeType: 'logic',
    Thumb: KindleFixerThumb,
  },
  {
    slug: 'toc-generator',
    name: 'TOC Generator',
    desc: 'Generate clickable tables of contents in Kindle HTML, EPUB3 nav.xhtml, and NCX formats from your chapter headings.',
    badge: 'Instant', badgeType: 'logic',
    Thumb: TocGeneratorThumb,
  },
  {
    slug: 'front-matter-generator',
    name: 'Front Matter Generator',
    desc: 'Generate title page, copyright page, dedication, and disclaimer formatted for KDP — fill a form, copy the output.',
    badge: 'Instant', badgeType: 'logic',
    Thumb: FrontMatterThumb,
  },
  {
    slug: 'css-snippet-generator',
    name: 'CSS Snippet Generator',
    desc: 'Get tested CSS for drop caps, scene breaks, blockquotes, and pull quotes — optimised for Kindle KFX and EPUB.',
    badge: 'Instant', badgeType: 'logic',
    Thumb: CssSnippetThumb,
  },
  {
    slug: 'manuscript-cleanup',
    name: 'Manuscript Cleanup',
    desc: 'AI flags repeated words, dialogue punctuation errors, and clichés that spell checkers miss — any manuscript length.',
    badge: '1cr / 10k', badgeType: 'ai',
    Thumb: ManuscriptCleanupThumb,
  },
  {
    slug: 'print-to-digital',
    name: 'Print-to-Digital Adapter',
    desc: 'Convert page references, footnotes, running headers, and fixed-width tables to eBook-ready format using AI.',
    badge: '1cr / 10k', badgeType: 'ai',
    Thumb: PrintToDigitalThumb,
  },
  {
    slug: 'style-sheet-auditor',
    name: 'Style Sheet Auditor',
    desc: 'AI scans for name spelling drift, capitalisation inconsistencies, and hyphenation changes across your full manuscript.',
    badge: '1cr / 10k', badgeType: 'ai',
    Thumb: StyleAuditorThumb,
  },
  {
    slug: 'epub-validator-premium',
    name: 'EPUB Validator Pro',
    desc: 'Deep validation: ghost spacing, duplicate IDs, manifest check, cover dimensions, and store-specific pass/fail report.',
    badge: '3 credits', badgeType: 'ai',
    Thumb: ValidatorProThumb,
  },
  {
    slug: 'back-matter-generator',
    name: 'Back Matter Generator',
    desc: 'AI writes your author bio, Also By section, reader list CTA, acknowledgements, and connect page in minutes.',
    badge: '3 credits', badgeType: 'ai',
    Thumb: BackMatterThumb,
  },
  {
    slug: 'kdp-keyword-finder',
    name: 'KDP Keyword Finder',
    desc: 'Generate long-tail Amazon keyword phrases and ghost category paths formatted for KDP\'s 7 backend keyword fields.',
    badge: '2 credits', badgeType: 'ai',
    Thumb: KdpKeywordThumb,
  },
];

// ── Credit Strip ───────────────────────────────────────────────

function CreditStrip() {
  const { user, profile, loading } = useAuth();
  if (loading) return null;

  const stripStyle = {
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    padding: '10px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    flexWrap: 'wrap',
  };

  if (!user) {
    return (
      <div style={stripStyle}>
        <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
          Paid tools need an account. Free tools below require no signup.
        </span>
        <Link href="/login" style={{
          fontSize: '0.78rem', color: '#c09a4a', fontFamily: 'monospace',
          fontWeight: 600, textDecoration: 'none', letterSpacing: '0.02em',
        }}>
          Sign up for 3 free credits →
        </Link>
      </div>
    );
  }

  const isLifetime = profile?.is_lifetime;
  const isFullAccess = profile?.has_full_access && !isLifetime;
  const isStarter = profile?.has_logic_bundle && !isFullAccess && !isLifetime;
  const credits = profile?.credits_balance ?? 0;

  const planLabel = isLifetime ? 'Lifetime' : isFullAccess ? 'Pro' : isStarter ? 'Starter' : null;

  return (
    <div style={stripStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {planLabel && (
          <span style={{
            fontSize: '0.68rem', fontFamily: 'monospace', fontWeight: 700,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: '#c09a4a', border: '1px solid rgba(192,154,74,0.35)',
            borderRadius: 3, padding: '2px 7px',
          }}>{planLabel}</span>
        )}
        {isLifetime ? (
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace' }}>Unlimited access</span>
        ) : (
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace' }}>
            <strong style={{ color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{credits}</strong> credits remaining
          </span>
        )}
      </div>
      {!isLifetime && (
        <Link href="/credits" style={{
          fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace',
          textDecoration: 'none', letterSpacing: '0.02em',
        }}>
          Buy more →
        </Link>
      )}
    </div>
  );
}

// ── Flagship Card ──────────────────────────────────────────────

function FlagshipCard() {
  return (
    <Link href="/tools/publishing-score" style={{ textDecoration: 'none', display: 'block' }}>
      <div className="bk-flagship-card">
        <div style={{
          width: 120, height: 120, borderRadius: 10,
          background: 'var(--paper-dim,#f4f4f2)',
          flexShrink: 0,
        }}>
          <ReadinessRingThumb />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{
              fontSize: '0.62rem', fontFamily: 'monospace', fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: '#c09a4a', border: '1px solid rgba(192,154,74,0.4)',
              borderRadius: 3, padding: '2px 7px',
            }}>FLAGSHIP</span>
            <span style={{
              fontSize: '0.62rem', fontFamily: 'monospace',
              color: 'rgba(255,255,255,0.45)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 3, padding: '2px 7px',
            }}>3 credits</span>
          </div>
          <h2 style={{ margin: '0 0 8px', fontSize: '1.25rem', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
            Publishing Readiness Score
          </h2>
          <p style={{ margin: '0 0 16px', fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: 520 }}>
            Upload your EPUB and get a scored breakdown across formatting, metadata, structure, and cover requirements — with a platform-by-platform pass/fail for KDP, Apple Books, Kobo, and IngramSpark.
          </p>
          <span style={{
            fontSize: '0.82rem', fontFamily: 'monospace', fontWeight: 600,
            color: '#c09a4a', letterSpacing: '0.02em',
          }}>
            Run scan →
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Tool Card ──────────────────────────────────────────────────

function ToolCard({ tool }) {
  const { slug, name, desc, badge, badgeType, Thumb } = tool;
  const isLogic = badgeType === 'logic';
  const badgeColor = isLogic ? '#3f7a5a' : '#c07a2b';
  const badgeBg = isLogic ? 'rgba(63,122,90,0.12)' : 'rgba(192,122,43,0.12)';

  return (
    <Link href={`/tools/${slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div className="bk-tool-card">
        <div style={{ height: 140, background: 'var(--paper-dim,#f4f4f2)', borderBottom: '1px solid rgba(21,23,29,0.06)', flexShrink: 0 }}>
          <Thumb />
        </div>
        <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--ink,#15171d)', lineHeight: 1.25 }}>{name}</span>
            <span style={{
              flexShrink: 0,
              fontSize: '0.6rem', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.05em',
              color: badgeColor, background: badgeBg,
              border: `1px solid ${badgeColor}`,
              borderRadius: 3, padding: '2px 6px', whiteSpace: 'nowrap',
            }}>{badge}</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(21,23,29,0.6)', lineHeight: 1.55, flex: 1 }}>{desc}</p>
        </div>
        <div style={{
          padding: '10px 16px', borderTop: '1px solid rgba(21,23,29,0.06)',
          display: 'flex', justifyContent: 'flex-end',
        }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 600, color: 'var(--ink,#15171d)', letterSpacing: '0.02em' }}>
            Open →
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Page ───────────────────────────────────────────────────────

export default function ToolsPage() {
  return (
    <>
      <style>{`
        .bk-tools-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .bk-tools-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 580px) {
          .bk-tools-grid { grid-template-columns: 1fr; }
        }
        .bk-tool-card {
          background: var(--paper-dim, #f4f4f2);
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(21,23,29,0.08);
          cursor: pointer;
          transition: box-shadow 0.2s, transform 0.15s;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .bk-tool-card:hover {
          box-shadow: 0 6px 24px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }
        .bk-flagship-card {
          background: var(--charcoal, #23262d);
          border: 2px solid rgba(192,154,74,0.4);
          border-radius: 12px;
          padding: 28px 32px;
          display: flex;
          gap: 32px;
          align-items: center;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .bk-flagship-card:hover {
          border-color: rgba(192,154,74,0.7);
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }
        @media (max-width: 600px) {
          .bk-flagship-card { flex-direction: column; padding: 20px; }
        }
      `}</style>

      {/* Hero */}
      <section style={{ background: 'var(--ink,#15171d)', padding: '64px 24px 0' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', paddingBottom: 48 }}>
          <p style={{
            fontSize: '0.72rem', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16,
          }}>
            /tools
          </p>
          <h1 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800,
            color: '#fff', margin: '0 0 14px', lineHeight: 1.15, textWrap: 'balance',
          }}>
            AI-powered tools for indie authors.
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, margin: 0 }}>
            Manuscript cleanup, EPUB formatting, keyword research, and more.{' '}
            <Link href="/free-tools" style={{ color: '#c09a4a', textDecoration: 'none', fontWeight: 600 }}>
              Not ready? Try five free tools →
            </Link>
          </p>
        </div>

        {/* Credit strip sits inside the dark band */}
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <CreditStrip />
        </div>
      </section>

      {/* Main content */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px' }}>
        {/* Flagship */}
        <div style={{ marginBottom: 40 }}>
          <FlagshipCard />
        </div>

        {/* Tool grid */}
        <div className="bk-tools-grid">
          {TOOLS.map(tool => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
    </>
  );
}
