'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AnimatedSection from '../components/AnimatedSection';
import BookKraftBanner from '../components/BookKraftBanner';
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

const WORKFLOW = [
  { n: '1', t: 'Upload manuscript',  d: 'DOCX, TXT, or paste directly'  },
  { n: '2', t: 'Choose a tool',      d: 'Cleanup, formatting, keywords' },
  { n: '3', t: 'AI processes it',    d: 'Claude AI works in seconds'    },
  { n: '4', t: 'Preview output',     d: 'Phone, tablet, e-ink preview'  },
  { n: '5', t: 'Download & publish', d: 'KDP-ready EPUB, PDF, DOCX'     },
];

// ─── HELPERS ─────────────────────────────────────────────────────────

function Badge({ tool }) {
  if (tool.free)
    return <span className="badge-v2 badge-v2-free">Free</span>;
  if (tool.accessType === 'ai')
    return <span className="badge-v2 badge-v2-ai">✦ AI · {tool.creditCost}cr</span>;
  if (tool.accessType === 'logic')
    return <span className="badge-v2 badge-v2-logic">Instant</span>;
  return <span className="badge-v2 badge-v2-locked">Locked</span>;
}

function typeLabel(tool) {
  if (tool.free) return 'instant · free';
  if (tool.accessType === 'ai') return 'ai-powered';
  return 'instant';
}

function ToolCard({ tool, index, problem, solution, outcome, fileType, primary }) {
  // problem/solution/outcome/fileType are optional — when a caller passes
  // them (the free-tools promo section), the card leads with the author's
  // problem instead of the generic one-line desc. ToolGridSection doesn't
  // pass these, so its cards render exactly as before.
  const isPitchCard = !!problem;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={`tool-card-v2 tool-card-fade-in stagger-${Math.min((index%3)+1,6)}${primary ? ' tool-card-v2-primary' : ''}`}
      role="listitem"
    >
      <span className="tool-card-v2-num" aria-hidden="true">
        {String(index+1).padStart(2,'0')}
      </span>
      <div className="tool-card-v2-header">
        <span style={{ fontSize:22 }} aria-hidden="true">{tool.icon}</span>
        {isPitchCard ? <span className="badge-v2 badge-v2-free">No signup</span> : <Badge tool={tool} />}
      </div>
      <h3>{tool.name}</h3>
      {isPitchCard ? (
        <>
          <p style={{ fontWeight:700, color:'var(--ink)' }}>{problem}</p>
          <p>{solution}</p>
          <p style={{ color:'var(--mid)' }}>{outcome}</p>
        </>
      ) : (
        <p>{tool.desc}</p>
      )}
      <div className="tool-card-v2-footer">
        <span className="tool-type-label">{isPitchCard ? fileType : typeLabel(tool)}</span>
        <span style={{ fontSize:16, color:'var(--gold)' }} aria-hidden="true">→</span>
      </div>
    </Link>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────

export default function LandingPage({ tools, faqs, pricing }) {
  return (
    <>
      <style>{`
        @keyframes bkWordUp {
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes bkGoldLine {
          to { transform:scaleX(1); }
        }
        @keyframes bkFadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes bkTicker {
          from { transform:translateX(0); }
          to   { transform:translateX(-50%); }
        }
        @media (max-width: 768px) {
          .hero-canvas-grid {
            grid-template-columns: 1fr !important;
            padding: 100px 20px 60px !important;
          }
          .hero-conv-card { display: none; }
        }
      `}</style>

      <HeroSection />
      <ProcessDiagramSection />
      <FreeToolsSection tools={tools} />
      <TickerSection />
      <ManuscriptBanner />
      <ToolGridSection tools={tools} />
      <PositioningSection />
      <WorkflowSection />
      <TestimonialsSection />
      <BookKraftBanner />
      <PlatformsSection />
      <PricingSection pricing={pricing} />
      <FAQSection faqs={faqs} />
      <Footer />
    </>
  );
}

// ─── 1. HERO ─────────────────────────────────────────────────────────

const HERO_WORDS = ['Chapter', 'Prologue', 'Epilogue', 'Once upon', 'In 1842', 'Her eyes', 'He said', 'Contents', 'Preface', 'The End', 'Part I', 'Foreword'];
const BOOK_COLORS = ['#E74C3C', '#27AE60', '#2980B9', '#8E44AD', '#E67E22', '#C0392B', '#16A085'];
const BOOK_TITLES = ['1984', 'Dune', 'Hamlet', 'Jane Eyre', 'Dracula', 'Gatsby', 'Moby Dick', 'Emma', 'Ulysses', 'Beloved'];

function HeroSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const wordParticles = HERO_WORDS.map((text) => ({
      text,
      x: Math.random() * canvas.width * 0.42,
      y: 40 + Math.random() * (canvas.height - 80),
      speed: 0.25 + Math.random() * 0.35,
      opacity: 0.7 + Math.random() * 0.25,
      size: 16 + Math.floor(Math.random() * 6),
    }));

    const books = BOOK_COLORS.map((color, i) => ({
      color,
      title: BOOK_TITLES[i % BOOK_TITLES.length],
      x: canvas.width * 0.58 + Math.random() * canvas.width * 0.38,
      y: 30 + Math.random() * (canvas.height - 80),
      speedX: -(0.25 + Math.random() * 0.4),
      speedY: (Math.random() - 0.5) * 0.2,
      rot: (Math.random() - 0.5) * 0.5,
      rotSpd: (Math.random() - 0.5) * 0.004,
      w: 55 + Math.random() * 15,
      h: 75 + Math.random() * 20,
    }));

    let raf;
    let initTimer;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      wordParticles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = '#606059';
        ctx.font = `${p.size}px 'DM Sans',sans-serif`;
        const tw = ctx.measureText(p.text).width;
        ctx.fillText(p.text, p.x, p.y);
        ctx.strokeStyle = '#606059';
        ctx.lineWidth = 0.8;
        ctx.globalAlpha = p.opacity * 0.4;
        ctx.beginPath();
        ctx.moveTo(p.x + tw + 6, p.y - p.size * 0.28);
        ctx.lineTo(p.x + tw + 52, p.y - p.size * 0.28);
        ctx.stroke();
        ctx.restore();
        p.x += p.speed;
        if (p.x > canvas.width * 0.48) {
          p.x = -ctx.measureText(p.text).width - 10;
          p.y = 40 + Math.random() * (canvas.height - 80);
        }
      });

      books.forEach((b) => {
        ctx.save();
        ctx.translate(b.x + b.w / 2, b.y + b.h / 2);
        ctx.rotate(b.rot);
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.roundRect(-b.w / 2, -b.h / 2, b.w, b.h, 3);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.18)';
        ctx.fillRect(-b.w / 2, -b.h / 2, b.w * 0.14, b.h);
        ctx.fillStyle = 'rgba(0,0,0,0.18)';
        ctx.beginPath();
        ctx.moveTo(b.w / 2, -b.h / 2);
        ctx.lineTo(b.w / 2 + 5, -b.h / 2 + 5);
        ctx.lineTo(b.w / 2 + 5, b.h / 2 + 5);
        ctx.lineTo(b.w / 2, b.h / 2);
        ctx.closePath();
        ctx.fill();
        // title text on face
        const faceCx = b.w * 0.07;
        const rawWords = b.title.split(' ');
        const lines = rawWords.length >= 2
          ? [rawWords[0], rawWords[1]]
          : rawWords[0].length <= 6
            ? [rawWords[0]]
            : [rawWords[0].slice(0, 6), rawWords[0].slice(6)];
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if (lines.length === 1) {
          ctx.fillText(lines[0], faceCx, 0);
        } else {
          ctx.fillText(lines[0], faceCx, -6);
          ctx.fillText(lines[1], faceCx, 6);
        }
        ctx.restore();
        b.x += b.speedX;
        b.y += b.speedY;
        b.rot += b.rotSpd;
        if (b.x < canvas.width * 0.52) {
          b.x = canvas.width * 0.96 + Math.random() * 40;
          b.y = 30 + Math.random() * (canvas.height - 80);
        }
      });

      raf = requestAnimationFrame(draw);
    };
    initTimer = setTimeout(draw, 300);

    return () => {
      clearTimeout(initTimer);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section style={{
      position: 'relative', background: '#ffffff',
      minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden',
    }} aria-label="Hero">
      <canvas ref={canvasRef} aria-hidden="true" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.65,
      }} />

      <div className="hero-canvas-grid" style={{
        position: 'relative', zIndex: 1, width: '100%',
        maxWidth: 1200, margin: '0 auto', padding: '120px 32px 80px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center',
      }}>
        {/* Left copy */}
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.28)',
            borderRadius: 100, padding: '6px 16px', marginBottom: 32,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--gold)', textTransform: 'uppercase' }}>
              Readiness Score · Know Before You Publish
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem,4.6vw,3.5rem)', fontWeight: 800,
            color: '#1a1a18', lineHeight: 1.1, marginBottom: 8,
          }}>
            Your manuscript has small mistakes{' '}
            <em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>Amazon won&apos;t tell you about.</em>
          </h1>
          <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'rgba(26,26,24,0.42)', marginBottom: 24, letterSpacing: '0.01em' }}>
            EPUB &amp; Kindle formatting, checked before you publish.
          </p>

          <p style={{
            fontSize: 18, color: 'rgba(26,26,24,0.58)', lineHeight: 1.7,
            marginBottom: 40, maxWidth: 440,
          }}>
            Run a free Readiness Scan before you publish. One score, every platform, exactly what to fix first.
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="/free-tools" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--gold)', color: '#0d0a06', fontWeight: 700,
              fontSize: 16, padding: '14px 28px', borderRadius: 8, textDecoration: 'none',
            }}>Run free Readiness Scan →</a>
            <a href="/pricing" style={{
              display: 'inline-flex', alignItems: 'center',
              background: 'transparent', color: 'rgba(26,26,24,0.68)',
              fontWeight: 600, fontSize: 16, padding: '14px 28px',
              borderRadius: 8, textDecoration: 'none',
            }}>See pricing</a>
          </div>
        </div>

        {/* Right: Readiness Score preview card */}
        <div className="hero-conv-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <ReadinessScoreCard />
        </div>
      </div>
    </section>
  );
}

function HeroConversionCard() {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
      borderRadius: 16, padding: 32, width: '100%', maxWidth: 360,
      backdropFilter: 'blur(12px)',
    }}>
      {/* DOCX input */}
      <div style={{
        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center',
        gap: 16, marginBottom: 20,
      }}>
        <div style={{
          width: 44, height: 44, background: '#2563EB', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 800, color: '#fff', flexShrink: 0,
        }}>DOCX</div>
        <div>
          <div style={{ fontSize: 10, color: 'rgba(247,243,236,0.38)', fontWeight: 600, marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Your Manuscript</div>
          <div style={{ fontSize: 14, color: '#fff', fontWeight: 600 }}>my-novel-draft.docx</div>
          <div style={{ fontSize: 12, color: 'rgba(247,243,236,0.42)' }}>124 pages · 87,400 words</div>
        </div>
      </div>

      <div style={{ textAlign: 'center', color: 'rgba(247,243,236,0.35)', fontSize: 14, marginBottom: 20 }}>
        ↓ processing...
      </div>

      {/* EPUB output */}
      <div style={{
        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.25)',
        borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center',
        gap: 16, marginBottom: 16,
      }}>
        <div style={{
          width: 44, height: 44, background: '#D97706', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 800, color: '#fff', flexShrink: 0,
        }}>EPUB</div>
        <div>
          <div style={{ fontSize: 10, color: 'rgba(247,243,236,0.38)', fontWeight: 600, marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.08em' }}>KDP-Ready Output</div>
          <div style={{ fontSize: 14, color: '#fff', fontWeight: 600 }}>my-novel-draft.epub</div>
          <div style={{ fontSize: 12, color: 'rgba(247,243,236,0.42)' }}>EPUB 3.0 · valid</div>
        </div>
      </div>

      {/* Ready badge */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.28)',
        borderRadius: 100, padding: '10px 20px',
      }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
        <span style={{ fontSize: 14, fontWeight: 600, color: '#22C55E' }}>Ready to upload</span>
      </div>
    </div>
  );
}

// ─── READINESS SCORE CARD ────────────────────────────────────────────

const RS_PLATFORMS = [
  { name: 'Amazon KDP',    status: 'pass', label: 'Ready' },
  { name: 'Apple Books',   status: 'warn', label: '2 issues' },
  { name: 'Kobo',          status: 'pass', label: 'Ready' },
  { name: 'IngramSpark',   status: 'fail', label: '1 critical issue' },
];

const RS_FIXES = [
  {
    severity: 'critical',
    title: 'Missing NCX navigation table',
    detail: 'EPUB 2 readers (IngramSpark) require an NCX file. Your file doesn\'t have one.',
    href: '/tools/epub-formatter',
  },
  {
    severity: 'warning',
    title: 'Author name inconsistency',
    detail: 'Metadata "author" field differs from the byline on the cover image.',
    href: '/tools/metadata-builder',
  },
];

function ReadinessScoreCard() {
  return (
    <div style={{
      background: '#fff', border: '1px solid var(--border)', borderRadius: 14,
      width: '100%', maxWidth: 390, boxShadow: 'var(--shadow-lg)', overflow: 'hidden',
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '20px 22px 16px', borderBottom: '1px solid var(--border)' }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--mid)', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 3 }}>Readiness Report</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>my-novel-draft.epub</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: 32, fontWeight: 800, color: 'var(--ink)', lineHeight: 1 }}>91</span>
          <span style={{ fontSize: 14, color: 'var(--mid)', fontWeight: 500 }}>/100</span>
        </div>
      </div>

      {/* Platform status matrix */}
      <div style={{ padding: '14px 22px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--mid)', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 10 }}>Platform Status</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {RS_PLATFORMS.map(({ name, status, label }) => {
            const dotColor = status === 'pass' ? 'var(--green)' : status === 'fail' ? 'var(--terracotta)' : 'var(--amber)';
            const labelColor = status === 'pass' ? 'var(--green)' : status === 'fail' ? 'var(--terracotta)' : 'var(--amber)';
            return (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor, flexShrink: 0, display: 'inline-block' }} />
                <span style={{ flex: 1, fontSize: 13, color: 'var(--ink)' }}>{name}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: labelColor }}>{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ordered fix list */}
      <div style={{ padding: '14px 22px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--mid)', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 10 }}>Fix List</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {RS_FIXES.map(({ severity, title, detail, href }) => {
            const badgeBg = severity === 'critical' ? 'var(--terracotta)' : 'var(--amber)';
            return (
              <div key={title}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: badgeBg, color: '#fff', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace', flexShrink: 0 }}>{severity}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{title}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--mid)', lineHeight: 1.5, marginBottom: 4 }}>{detail}</div>
                <a href={href} style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', textDecoration: 'none' }}>Fix now →</a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 22px', background: 'var(--paper-dim)' }}>
        <span style={{ fontSize: 12, color: 'var(--mid)', fontFamily: 'monospace' }}>3 credits · full report</span>
        <a href="/tools" style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', textDecoration: 'none' }}>Rescan after fixing →</a>
      </div>
    </div>
  );
}

// ─── PROCESS DIAGRAM ─────────────────────────────────────────────────

const AUTHOR_STEPS = [
  { n: '1', label: 'Write',           detail: 'Your draft, your tools', active: false },
  { n: '2', label: 'Clean & Validate', detail: 'BookKraft AI checks here', active: true  },
  { n: '3', label: 'Format & Design', detail: 'Vellum, Atticus, InDesign', active: false },
];

function ProcessDiagramSection() {
  return (
    <section style={{ background: 'var(--paper-dim)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '40px 32px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
        {AUTHOR_STEPS.map((step, i) => (
          <React.Fragment key={step.label}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minWidth: 160, padding: '0 12px' }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%', marginBottom: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, fontWeight: 800,
                background: step.active ? 'var(--gold)' : 'transparent',
                border: step.active ? 'none' : '2px solid var(--border)',
                color: step.active ? '#0d0a06' : 'var(--mid)',
              }}>{step.n}</div>
              <div style={{ fontSize: 14, fontWeight: step.active ? 800 : 500, color: step.active ? 'var(--ink)' : 'var(--mid)', marginBottom: 4 }}>{step.label}</div>
              <div style={{ fontSize: 12, color: step.active ? 'var(--mid)' : 'rgba(107,101,96,0.55)', lineHeight: 1.4 }}>{step.detail}</div>
            </div>
            {i < AUTHOR_STEPS.length - 1 && (
              <div style={{ fontSize: 18, color: 'var(--border)', flexShrink: 0, paddingBottom: 24 }}>→</div>
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
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2410 100%)',
      padding: '48px 24px',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{
          display: 'inline-block',
          background: 'var(--gold)',
          color: '#fff',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.1em',
          padding: '4px 12px',
          borderRadius: 20,
          marginBottom: 16,
          textTransform: 'uppercase',
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
          color: 'rgba(247,243,236,0.55)',
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
              background: 'var(--gold)',
              color: 'var(--ink)',
              padding: '14px 32px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 16,
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Try Full Manuscript Mode →
          </Link>
          <Link
            href="/tools/epub-validator"
            style={{
              background: 'transparent',
              color: 'var(--gold)',
              padding: '14px 32px',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 16,
              textDecoration: 'none',
              border: '1px solid var(--gold)',
              display: 'inline-block',
            }}
          >
            Validate EPUB 3.0 Files
          </Link>
        </div>
        <div style={{ marginTop: 20, color: 'rgba(247,243,236,0.35)', fontSize: 13 }}>
          Works with .docx and .txt · Chapter detection included · EPUB 3.0 output
        </div>
      </div>
    </section>
  );
}

// Ordered deliberately — first entry is the visually primary card
// (widest pain point: a rejected upload). Copy leads with the problem in
// the author's own words, not the tool's feature name.
const FREE_TOOL_PITCHES = [
  {
    slug: 'epub-validator',
    problem: 'KDP rejected your file?',
    solution: 'Finds the exact errors Amazon and Apple Books flag, explained in plain English — not raw XML error codes.',
    outcome: 'Upload your .epub, get a full error report in seconds.',
    fileType: '.epub file',
    primary: true,
  },
  {
    slug: 'word-cleanup',
    problem: 'Your formatting broke somewhere in Word?',
    solution: 'Scans for double spaces, straight quotes, stacked blank paragraphs, and stray bold or italic tags.',
    outcome: 'Upload your .docx, get a line-by-line list of what to fix before it hits KDP.',
    fileType: '.docx file',
  },
  {
    slug: 'cover-checker',
    problem: 'Not sure your cover is the right size?',
    solution: 'Checks pixel dimensions, aspect ratio, and file format against KDP and Apple Books requirements.',
    outcome: 'Upload your cover, know in seconds if it would get rejected.',
    fileType: '.png or .jpg',
  },
  {
    slug: 'metadata-builder',
    problem: 'Re-typing the same book details for every platform?',
    solution: 'Fill in title, keywords, and categories once — it formats them for KDP, IngramSpark, and EPUB OPF.',
    outcome: 'One form, ready-to-paste metadata for every store you publish to.',
    fileType: 'no file — just a form',
  },
  {
    slug: 'manuscript-mode',
    problem: 'Manuscript is a DOCX and you need a real EPUB?',
    solution: 'Detects chapters, fixes smart quotes and em dashes, and builds a valid EPUB 3.0 file — no Calibre, no Sigil.',
    outcome: 'Upload your .docx or .txt, download a KDP-ready EPUB.',
    fileType: '.docx or .txt file',
  },
];

function FreeToolsSection({ tools }) {
  const pitches = FREE_TOOL_PITCHES
    .map(pitch => ({ ...pitch, tool: tools.find(t => t.slug === pitch.slug) }))
    .filter(p => p.tool);

  return (
    <section className="tools-section-v2" style={{ background:'var(--sage-bg)' }} id="free-tools-section" aria-labelledby="freeToolsHeading">
      <div className="section-inner-v2">
        <AnimatedSection>
          <div className="animate-on-scroll" style={{ textAlign:'center' }}>
            <p className="section-eyebrow-v2">Free — No Signup Required</p>
            <h2 className="section-title-v2" id="freeToolsHeading">Five free tools. No signup, no card, no email.</h2>
            <p className="section-sub-v2" style={{ maxWidth:640, margin:'0 auto' }}>
              Validate an EPUB, check a cover's dimensions, scan a manuscript, build KDP metadata, or run a full manuscript check.
            </p>
          </div>
        </AnimatedSection>

        <div className="tool-grid-v2" role="list">
          {pitches.map((p, i) => (
            <ToolCard
              key={p.slug}
              tool={p.tool}
              index={i}
              problem={p.problem}
              solution={p.solution}
              outcome={p.outcome}
              fileType={p.fileType}
              primary={p.primary}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. TOOL GRID ────────────────────────────────────────────────────

const TOOL_FILTERS = [
  { key: 'all',   label: 'All' },
  { key: 'free',  label: 'Free' },
  { key: 'ai',    label: 'AI-Powered' },
  { key: 'logic', label: 'Instant' },
];

function matchesToolFilter(tool, filter) {
  if (filter === 'all') return !tool.free;
  if (filter === 'free') return !!tool.free;
  if (filter === 'ai') return tool.accessType === 'ai';
  if (filter === 'logic') return tool.accessType === 'logic';
  return true;
}

function ToolGridSection({ tools }) {
  const [filter, setFilter] = useState('all');
  const filteredTools = tools.filter((t) => matchesToolFilter(t, filter));

  return (
    <section className="tools-section-v2" id="tools-section" aria-labelledby="toolsHeading">
      <div className="section-inner-v2">
        <AnimatedSection>
          <div className="animate-on-scroll" style={{ textAlign:'center' }}>
            <p className="section-eyebrow-v2">{tools.length} Professional Tools</p>
            <h2 className="section-title-v2" id="toolsHeading">EPUB 3.0 Validator, Kindle Manuscript Formatter & More</h2>
            <p className="section-sub-v2" style={{ maxWidth:500, margin:'0 auto' }}>
              From raw manuscript to polished EPUB — every step covered in one place.
            </p>
          </div>
        </AnimatedSection>

        <div className="tool-filter-tabs" role="tablist" aria-label="Filter tools">
          {TOOL_FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={filter === f.key}
              className={`tool-filter-tab${filter === f.key ? ' active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="tool-grid-v2" role="list" key={filter}>
          {filteredTools.map((tool, i) => (
            <ToolCard key={tool.slug} tool={tool} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 5. POSITIONING ──────────────────────────────────────────────────

function PositioningSection() {
  const steps = [
    { n: '01', title: 'Write', tool: 'Word, Scrivener, Google Docs', desc: 'Draft wherever you already write.' },
    { n: '02', title: 'Clean & Validate', tool: 'BookKraft AI', desc: 'Strip formatting artifacts, validate your EPUB, build metadata.', highlight: true },
    { n: '03', title: 'Format & Design', tool: 'Vellum, Atticus, or KDP', desc: 'Hand off a clean file to whichever formatter you already use.' },
  ];
  return (
    <section style={{ background:'var(--ink)', padding:'72px clamp(20px,4vw,48px)' }} aria-label="How BookKraft AI fits your workflow">
      <div style={{ maxWidth:900, margin:'0 auto' }}>
        <AnimatedSection>
          <p className="section-eyebrow-v2 animate-on-scroll" style={{ color:'rgba(201,168,76,0.65)', textAlign:'center' }}>
            BookKraft AI runs before your formatter
          </p>
          <p className="animate-on-scroll" style={{ textAlign:'center', color:'rgba(247,243,236,.65)', fontSize:15, maxWidth:520, margin:'0 auto 40px' }}>
            Vellum and Atticus are full writing and design environments — BookKraft AI is the pre-flight step that happens before either one.
          </p>
          <div className="animate-on-scroll stagger-1" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:16 }}>
            {steps.map((s) => (
              <div key={s.n} style={{
                border: s.highlight ? '2px solid #C9933A' : '1px solid rgba(255,255,255,0.12)',
                background: s.highlight ? 'rgba(201,147,58,0.08)' : 'transparent',
                borderRadius:12, padding:'24px 20px',
              }}>
                <div style={{ fontSize:12, fontWeight:700, letterSpacing:'0.1em', color:'#C9933A', marginBottom:10 }}>STEP {s.n}</div>
                <h3 style={{ color:'#fff', fontSize:19, fontWeight:700, marginBottom:4 }}>{s.title}</h3>
                <p style={{ color:'rgba(247,243,236,.5)', fontSize:13, fontWeight:600, marginBottom:10 }}>{s.tool}</p>
                <p style={{ color:'rgba(247,243,236,.65)', fontSize:14, lineHeight:1.6, margin:0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── 6. WORKFLOW ─────────────────────────────────────────────────────

function WorkflowSection() {
  return (
    <section className="section-cream" aria-labelledby="workflowHeading">
      <div className="content-wrap">
        <AnimatedSection>
          <p className="section-eyebrow-v2 animate-on-scroll">How it works</p>
          <h2 className="section-title-v2 animate-on-scroll stagger-1" id="workflowHeading">
            From draft to published in 5 steps
          </h2>
        </AnimatedSection>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:8, position:'relative', marginTop:52 }}>
          <div aria-hidden="true" style={{
            position:'absolute', top:26, left:'calc(10% + 20px)', right:'calc(10% + 20px)',
            height:1, background:'var(--border)', zIndex:0,
          }} />
          {WORKFLOW.map((step, i) => (
            <AnimatedSection key={i}>
              <div className={`animate-on-scroll stagger-${i+1}`}
                style={{ textAlign:'center', padding:'0 10px', position:'relative', zIndex:1 }}>
                <div style={{
                  width:52, height:52, borderRadius:'50%',
                  background:'#fff', border:'1.5px solid var(--border)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  margin:'0 auto 14px',
                  fontFamily:"'Playfair Display',serif",
                  fontSize:18, fontWeight:700, fontStyle:'italic',
                }} aria-hidden="true">{step.n}</div>
                <p style={{ fontSize:13, fontWeight:700, marginBottom:5 }}>{step.t}</p>
                <p style={{ fontSize:11.5, color:'var(--mid)', lineHeight:1.5 }}>{step.d}</p>
              </div>
            </AnimatedSection>
          ))}
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

// ─── 8. PLATFORMS ────────────────────────────────────────────────────

function PlatformsSection() {
  return (
    <section style={{ background:'var(--cream)', padding:'56px clamp(20px,4vw,48px)' }} aria-labelledby="platformsHeading">
      <div className="content-wrap" style={{ textAlign:'center' }}>
        <AnimatedSection>
          <h2 id="platformsHeading" className="animate-on-scroll"
            style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:700, marginBottom:24 }}>
            Your formatted eBook works on every platform
          </h2>
          <div className="animate-on-scroll stagger-1"
            style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:10 }}>
            {PLATFORMS.map(p => <span key={p} className="platform-badge">{p}</span>)}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── 9. PRICING ──────────────────────────────────────────────────────

function PricingSection({ pricing }) {
  const plans = [
    {
      key:'free', name:'Free', price:'$0', period:'forever',
      desc:'4 tools, no signup, no limits.',
      features:['EPUB Validator','Metadata Builder','Cover Checker','Word Cleanup Checker','No account needed','Unlimited use'],
      cta:'Start Free', href:'/tools/epub-validator', featured:false,
    },
    {
      key:'starter',
      name: pricing.starter.name,
      price: pricing.starter.label, period:'one-time',
      desc: pricing.starter.desc,
      features: pricing.starter.features,
      cta:'Get Starter', href:'/pricing', featured:false,
    },
    {
      key:'pro',
      name: pricing.pro.name,
      price: pricing.pro.label, period:'one-time',
      desc: pricing.pro.desc,
      features: pricing.pro.features,
      cta:'Get Pro', href:'/pricing', featured:true,
    },
    {
      key:'lifetime',
      name: pricing.lifetime.name,
      price: pricing.lifetime.label, period:'one-time',
      desc: pricing.lifetime.desc,
      features: pricing.lifetime.features,
      cta:'Get Lifetime', href:'/pricing', featured:false,
    },
  ];

  return (
    <section className="section-white" id="pricing" aria-labelledby="pricingHeading">
      <div className="content-wrap">
        <AnimatedSection>
          <div className="animate-on-scroll" style={{ textAlign:'center', marginBottom:48 }}>
            <p className="section-eyebrow-v2">Simple, honest pricing</p>
            <h2 className="section-title-v2" id="pricingHeading">No subscriptions. Ever.</h2>
            <p className="section-sub-v2">Pay once, own forever. Credits never expire. No monthly fees.</p>
          </div>
        </AnimatedSection>

        <div className="pricing-grid-v2" role="list">
          {plans.map((plan, i) => (
            <AnimatedSection key={plan.key}>
              <div
                className={`pricing-card-v2 animate-on-scroll stagger-${i+1}${plan.featured?' featured':''}`}
                role="listitem" style={{ position:'relative' }}
              >
                {plan.featured && <span className="pricing-best-badge">Best Value</span>}
                <h3>{plan.name}</h3>
                <div className="pricing-price">{plan.price}<span> / {plan.period}</span></div>
                {plan.retail && <p className="pricing-retail">{plan.retail}</p>}
                <p className="pricing-desc">{plan.desc}</p>
                <ul className="pricing-features-v2">
                  {plan.features.slice(0,6).map((f,j)=><li key={j}>{f}</li>)}
                </ul>
                <Link href={plan.href}
                  className={plan.featured ? 'btn btn-gold btn-full' : 'btn btn-outline btn-full'}>
                  {plan.cta}
                </Link>
                <p className="pricing-tax">Tax included where applicable</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="pricing-trust">
          <div className="pricing-trust-item"><span className="pricing-trust-icon" aria-hidden="true">🔒</span>Secure Checkout via Paddle</div>
          <div className="pricing-trust-item"><span className="pricing-trust-icon" aria-hidden="true">⭐</span>5/5 on CodeTrendy · Real author reviews</div>
          <div className="pricing-trust-item"><span className="pricing-trust-icon" aria-hidden="true">♾️</span>Credits never expire</div>
        </div>
      </div>
    </section>
  );
}

// ─── 10. FAQ ─────────────────────────────────────────────────────────

function FAQSection({ faqs }) {
  const [open, setOpen] = useState(null);
  const toggle = i => setOpen(open === i ? null : i);

  return (
    <section className="section-cream" aria-labelledby="faqHeading">
      <div style={{ maxWidth:680, margin:'0 auto' }}>
        <AnimatedSection>
          <p className="section-eyebrow-v2 animate-on-scroll">Common questions</p>
          <h2 className="section-title-v2 animate-on-scroll stagger-1" id="faqHeading">
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
      </div>
    </section>
  );
}

// ─── 11. FOOTER ──────────────────────────────────────────────────────

