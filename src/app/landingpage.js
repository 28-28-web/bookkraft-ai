'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TOOLS } from '../lib/tools';
import { FAQS, PRICING } from '../lib/constants';
import AnimatedSection from '../components/AnimatedSection';
import SocialProofTicker from '../components/SocialProofTicker';
import BookKraftBanner from '../components/BookKraftBanner';
import Footer from '../components/Footer';
import dynamic from 'next/dynamic';
const SenjaReviews = dynamic(() => import('@/components/SenjaReviews'), {
  ssr: false,
  loading: () => <div style={{ height: '200px' }} />,
});

// ─── DATA ────────────────────────────────────────────────────────────

const TICKER_ITEMS = [
  '<strong>@alex_rivera</strong> via CodeTrendy — "The interface is clean and does exactly what it promises"',
  '<strong>@januine_dev</strong> via CodeTrendy — "Cleans up Word export mess in minutes"',
  '<strong>@januine_dev</strong> via CodeTrendy — "Makes a real EPUB 3.0 that KDP accepts"',
  '<strong>@januine_dev</strong> via CodeTrendy — "Two free tools, no signup. Best formatting money I\'ve spent"',
  '<strong>@alex_rivera</strong> via CodeTrendy — "Really appreciate how well it\'s put together. Nice work by the team"',
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
    return <span className="badge-v2 badge-v2-logic">Logic</span>;
  return <span className="badge-v2 badge-v2-locked">Locked</span>;
}

function typeLabel(tool) {
  if (tool.free) return 'instant · free';
  if (tool.accessType === 'ai') return 'ai-powered';
  return 'instant logic';
}

// ─── ROOT ────────────────────────────────────────────────────────────

export default function LandingPage() {
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
      `}</style>

      <HeroSection />
      <TickerSection />
      <ManuscriptBanner />
      <FreeToolsSection />
      <ToolGridSection />
      <CompetitorSection />
      <WorkflowSection />
      <TestimonialsSection />
      <BookKraftBanner />
      <PlatformsSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </>
  );
}

// ─── 1. HERO ─────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="hero-section-v3" aria-label="Hero">
      <div className="hero-ambient" aria-hidden="true">
        <span className="hero-blob hero-blob-1" />
        <span className="hero-blob hero-blob-2" />
        <span className="hero-blob hero-blob-3" />
      </div>

      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow">✦ Professional eBook Formatting</p>
          <h1 className="hero-headline">Format Your EPUB & Kindle Books Like a Pro.</h1>
          <p className="hero-sub">
            Upload your manuscript, pick a tool, and download a KDP-ready EPUB, PDF, or DOCX — in seconds. Start with two free tools, no account needed.
          </p>
          <div className="hero-ctas">
            <a href="/free-tools" className="hero-cta-primary">Start for Free →</a>
            <a href="/pricing" className="hero-cta-secondary">See Pricing</a>
          </div>
        </div>

        <div className="hero-visual-wrap">
          <div className="hero-visual">
            <HeroMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroMockup() {
  return (
    <div className="hero-mockup" role="img" aria-label="A rough manuscript page transforming into a polished, KDP-ready eBook file">
      <div className="hero-mockup-card hero-mockup-card-docx">
        <svg viewBox="0 0 150 212" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <g transform="translate(-30,-30)">
            <path d="M40 40h130v190a10 10 0 0 1-10 10H50a10 10 0 0 1-10-10V40z" fill="var(--white)" stroke="var(--border)" strokeWidth="2"/>
            <path d="M140 40l30 30h-30V40z" fill="var(--cream)" stroke="var(--border)" strokeWidth="1.5"/>
            <rect x="58" y="90" width="94" height="6" rx="3" fill="var(--border)"/>
            <rect x="58" y="108" width="74" height="6" rx="3" fill="var(--border)"/>
            <rect x="58" y="126" width="86" height="6" rx="3" fill="var(--border)"/>
            <rect x="58" y="144" width="60" height="6" rx="3" fill="var(--border)"/>
            <rect x="58" y="162" width="80" height="6" rx="3" fill="var(--border)"/>
            <rect x="40" y="212" width="52" height="20" rx="4" fill="var(--mid)" opacity="0.12"/>
            <text x="66" y="226" textAnchor="middle" fontSize="10" fontFamily="'DM Sans',sans-serif" fontWeight="700" fill="var(--mid)">DOCX</text>
          </g>
        </svg>
      </div>

      <div className="hero-mockup-arrow" aria-hidden="true">
        <svg viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12h26"/>
            <path d="M18 0l14 12-14 12"/>
          </g>
        </svg>
      </div>

      <div className="hero-mockup-card hero-mockup-card-epub">
        <svg viewBox="0 0 150 212" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <g transform="translate(-240,-34)">
            <rect x="250" y="55" width="130" height="170" rx="8" fill="var(--ink)"/>
            <rect x="250" y="55" width="14" height="170" rx="4" fill="var(--gold)" opacity="0.35"/>
            <rect x="278" y="80" width="86" height="6" rx="3" fill="rgba(247,243,236,0.5)"/>
            <rect x="278" y="98" width="66" height="6" rx="3" fill="rgba(247,243,236,0.3)"/>
            <rect x="278" y="116" width="76" height="6" rx="3" fill="rgba(247,243,236,0.3)"/>
            <circle cx="345" cy="195" r="18" fill="var(--gold)"/>
            <path d="M337 195l6 6 12-13" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <rect x="278" y="150" width="56" height="20" rx="10" fill="var(--gold)"/>
            <text x="306" y="164" textAnchor="middle" fontSize="10" fontFamily="'DM Sans',sans-serif" fontWeight="700" fill="var(--ink)">EPUB</text>
          </g>
        </svg>
      </div>
    </div>
  );
}function TickerSection() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      style={{ background:'var(--white)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', padding:'14px 0', overflow:'hidden' }}
      aria-label="Author wins" role="marquee"
    >
      <div style={{ display:'flex', whiteSpace:'nowrap', animation:'bkTicker 32s linear infinite' }}>
        {doubled.map((item, i) => (
          <div key={i} style={{
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
          Turn your full manuscript into a publish-ready EPUB — free
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
            Validate EPUB Free
          </Link>
        </div>
        <div style={{ marginTop: 20, color: 'rgba(247,243,236,0.35)', fontSize: 13 }}>
          Works with .docx and .txt · Chapter detection included · EPUB 3.0 output
        </div>
      </div>
    </section>
  );
}

function FreeToolsSection() {
  return (
    <section
      style={{ background:'var(--sage-bg)', borderTop:'1px solid rgba(46,94,40,0.14)', borderBottom:'1px solid rgba(46,94,40,0.14)' }}
      aria-labelledby="freeTitle"
    >
      <AnimatedSection>
        <div style={{ maxWidth:1160, margin:'0 auto', padding:'52px clamp(20px,4vw,48px)' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:48, alignItems:'center' }}
            className="animate-on-scroll">
            <div>
              <div style={{
                display:'inline-block', background:'var(--sage)', color:'#fff',
                fontSize:10, fontWeight:700, padding:'4px 10px',
                borderRadius:2, letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:14,
              }}>
                Free — No Login Required
              </div>
              <h2 id="freeTitle" style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, marginBottom:6 }}>
                Start for free, right now
              </h2>
              <p style={{ fontSize:14, color:'var(--sage)', margin:0 }}>
                4 free tools available with no account needed.
              </p>
            </div>
            <div style={{ display:'flex', gap:12, flexShrink:0 }}>
              {[
                { href:'/tools/manuscript-mode', label:'Full Manuscript Mode' },
                { href:'/tools/epub-validator',   label:'EPUB Validator'  },
                { href:'/tools/metadata-builder', label:'Metadata Builder'},
                { href:'/tools/cover-checker', label:'Cover Checker'},
              ].map(chip => (
                <Link key={chip.href} href={chip.href} style={{
                  background:'#fff', border:'1px solid rgba(46,94,40,0.22)',
                  padding:'12px 22px', borderRadius:'var(--radius)',
                  fontSize:14, fontWeight:500, color:'var(--ink)',
                  display:'flex', alignItems:'center', gap:8,
                  textDecoration:'none', whiteSpace:'nowrap',
                  transition:'border-color 0.2s, transform 0.15s, box-shadow 0.15s',
                }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--sage)';e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 1px 3px rgba(15,14,12,0.08)';}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(46,94,40,0.22)';e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none';}}
                >
                  <span style={{
                    width:20, height:20, borderRadius:'50%',
                    background:'var(--sage-bg)', border:'1px solid rgba(46,94,40,0.25)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:11, color:'var(--sage)', flexShrink:0,
                  }} aria-hidden="true">✓</span>
                  {chip.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}

// ─── 4. TOOL GRID ────────────────────────────────────────────────────

const TOOL_FILTERS = [
  { key: 'all',   label: 'All' },
  { key: 'free',  label: 'Free' },
  { key: 'ai',    label: 'AI-Powered' },
  { key: 'logic', label: 'Instant Logic' },
];

function matchesToolFilter(tool, filter) {
  if (filter === 'all') return true;
  if (filter === 'free') return !!tool.free;
  if (filter === 'ai') return tool.accessType === 'ai';
  if (filter === 'logic') return tool.accessType === 'logic';
  return true;
}

function ToolGridSection() {
  const [filter, setFilter] = useState('all');
  const filteredTools = TOOLS.filter((t) => matchesToolFilter(t, filter));

  return (
    <section className="tools-section-v2" id="tools-section" aria-labelledby="toolsHeading">
      <div className="section-inner-v2">
        <AnimatedSection>
          <div className="animate-on-scroll" style={{ textAlign:'center' }}>
            <p className="section-eyebrow-v2">12 Professional Tools</p>
            <h2 className="section-title-v2" id="toolsHeading">Everything an indie author needs</h2>
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
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className={`tool-card-v2 tool-card-fade-in stagger-${Math.min((i%3)+1,6)}`}
              role="listitem"
            >
              <span className="tool-card-v2-num" aria-hidden="true">
                {String(i+1).padStart(2,'0')}
              </span>
              <div className="tool-card-v2-header">
                <span style={{ fontSize:22 }} aria-hidden="true">{tool.icon}</span>
                <Badge tool={tool} />
              </div>
              <h3>{tool.name}</h3>
              <p>{tool.desc}</p>
              <div className="tool-card-v2-footer">
                <span className="tool-type-label">{typeLabel(tool)}</span>
                <span style={{ fontSize:16, color:'var(--gold)' }} aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 5. COMPETITOR ───────────────────────────────────────────────────

function CompetitorSection() {
  const cols = [
    { name:'Atticus',     price:147,  label:'$147',  note:'One-time · No AI · No cloud',  featured:false },
    { name:'BookKraft AI',price:4.99, label:'$4.99', note:'All 12 tools · AI-powered',    featured:true  },
    { name:'Vellum',      price:250,  label:'$250',  note:'Mac only · No AI · No cleanup',featured:false },
  ];
  const maxPrice = Math.max(...cols.map(c => c.price));
  return (
    <section style={{ background:'var(--ink)', padding:'72px clamp(20px,4vw,48px)' }} aria-label="Price comparison">
      <div style={{ maxWidth:640, margin:'0 auto' }}>
        <AnimatedSection>
          <p className="section-eyebrow-v2 animate-on-scroll" style={{ color:'rgba(201,168,76,0.65)', textAlign:'center' }}>
            Why BookKraft AI wins on value
          </p>
          <div className="competitor-bars animate-on-scroll stagger-1">
            {cols.map((col) => (
              <div key={col.name} className={`competitor-bar-row${col.featured ? ' featured' : ''}`}>
                <div className="competitor-bar-label">
                  <span className="competitor-bar-name">{col.name}</span>
                  <span className="competitor-bar-note">{col.note}</span>
                </div>
                <div className="competitor-bar-track">
                  <div className="competitor-bar-fill" style={{ width: `${(col.price / maxPrice) * 100}%` }} />
                </div>
                <span className="competitor-bar-price">{col.label}</span>
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
    <section style={{ background:'var(--cream)', padding:'88px clamp(20px,4vw,48px)' }} aria-labelledby="workflowHeading">
      <div style={{ maxWidth:1160, margin:'0 auto' }}>
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
  ];

  return (
    <section style={{ background: '#fff', padding: '88px clamp(20px,4vw,48px)' }} aria-labelledby="reviewsHeading">
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
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
      <div style={{ maxWidth:1160, margin:'0 auto', textAlign:'center' }}>
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

function PricingSection() {
  const plans = [
    {
      key:'free', name:'Free', price:'$0', period:'forever',
      desc:'2 tools, no signup, no limits.',
      features:['EPUB Validator','Metadata Builder','No account needed','Unlimited use'],
      cta:'Start Free', href:'/tools/epub-validator', featured:false,
    },
    {
      key:'essentials',
      name: PRICING.essentials?.name || 'Essentials Bundle',
      price: PRICING.essentials?.label || '$4.99', period:'one-time',
      desc: PRICING.essentials?.desc || '5 instant logic tools.',
      features: PRICING.essentials?.features || [],
      cta:'Get Essentials', href:'/pricing', featured:false,
    },
    {
      key:'full',
      name: PRICING.full?.name || 'Full Access',
      price: PRICING.full?.label || '$9.99', period:'one-time',
      desc: PRICING.full?.desc || 'All tools + AI credits.',
      retail:'Retail value: $35+',
      features: PRICING.full?.features || [],
      cta:'Get Full Access', href:'/pricing', featured:true,
    },
    {
      key:'lifetime',
      name: PRICING.lifetime?.name || 'Lifetime Access',
      price: PRICING.lifetime?.label || '$149', period:'one-time',
      desc: PRICING.lifetime?.desc || 'Unlimited everything, forever.',
      features: PRICING.lifetime?.features || [],
      cta:'Get Lifetime', href:'/pricing', featured:false,
    },
  ];

  return (
    <section style={{ background:'#fff', padding:'88px clamp(20px,4vw,48px)' }} id="pricing" aria-labelledby="pricingHeading">
      <div style={{ maxWidth:1160, margin:'0 auto' }}>
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

function FAQSection() {
  const [open, setOpen] = useState(null);
  const toggle = i => setOpen(open === i ? null : i);

  return (
    <section style={{ background:'var(--cream)', padding:'88px clamp(20px,4vw,48px)' }} aria-labelledby="faqHeading">
      <div style={{ maxWidth:680, margin:'0 auto' }}>
        <AnimatedSection>
          <p className="section-eyebrow-v2 animate-on-scroll">Common questions</p>
          <h2 className="section-title-v2 animate-on-scroll stagger-1" id="faqHeading">
            Everything you need to know
          </h2>
        </AnimatedSection>

        <div style={{ marginTop:40 }} role="list">
          {FAQS.map((faq, i) => {
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

