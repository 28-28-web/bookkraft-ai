'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TOOLS } from '../lib/tools';
import { FAQS, PRICING } from '../lib/constants';
import AnimatedSection from '../components/AnimatedSection';
import SocialProofTicker from '../components/SocialProofTicker';
import dynamic from 'next/dynamic';
const SenjaReviews = dynamic(() => import('@/components/SenjaReviews'), {
  ssr: false,
  loading: () => <div style={{ height: '200px' }} />,
});

// ─── DATA ────────────────────────────────────────────────────────────

const HEADLINE_WORDS = [
  { text: 'Format',    gold: false },
  { text: 'like',      gold: false },
  { text: 'a',         gold: false },
  { text: 'pro.',      gold: true  },
  { text: 'Price',     gold: false },
  { text: 'like',      gold: false },
  { text: 'a',         gold: false },
  { text: 'newcomer.', gold: true  },
];

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
      <PlatformsSection />
      <PricingSection />
      <FAQSection />
      <FooterSection />
    </>
  );
}

// ─── 1. HERO ─────────────────────────────────────────────────────────

function HeroSection() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 260);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        background: 'var(--ink)', minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        padding: 'clamp(96px,10vh,128px) clamp(20px,4vw,48px) clamp(64px,8vh,96px)',
        position: 'relative', overflow: 'hidden',
      }}
      aria-label="Hero"
    >
      {/* Grain */}
      <div aria-hidden="true" style={{
        position:'absolute',inset:0,pointerEvents:'none',opacity:0.045,
        backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize:'220px',
      }} />

      <div style={{ maxWidth:1160, margin:'0 auto', width:'100%', position:'relative', zIndex:1 }}>

        {/* Eyebrow */}
        <p style={{
          fontFamily:"'JetBrains Mono',monospace", fontSize:11,
          color:'var(--gold)', letterSpacing:'2.5px', textTransform:'uppercase',
          marginBottom:20, opacity:0,
          animation:'bkFadeUp 0.4s ease 0.5s forwards',
        }}>
          ✦ Professional eBook Formatting
        </p>

        {/* H1 */}
        <h1
          aria-label="Format like a pro. Price like a newcomer."
          style={{
            fontFamily:"'Playfair Display',serif",
            fontSize:'clamp(48px,7vw,96px)',
            fontWeight:700, fontStyle:'italic',
            lineHeight:1.05, letterSpacing:'-1px',
            color:'var(--cream)', marginBottom:24,
          }}
        >
          {HEADLINE_WORDS.map((w, i) => (
            <React.Fragment key={i}>
              <span
                style={{
                  display:'inline-block',
                  marginRight: i < HEADLINE_WORDS.length - 1 ? '0.22em' : 0,
                  opacity: animate ? 0 : 1,
                  transform: animate ? 'translateY(28px)' : 'none',
                  animation: animate
                    ? `bkWordUp 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s forwards`
                    : 'none',
                  ...(w.gold ? { color:'var(--gold)', position:'relative' } : {}),
                }}
              >
                {w.text}
                {w.gold && (
                  <span aria-hidden="true" style={{
                    display:'block', height:3,
                    background:'var(--gold)', marginTop:2,
                    transform:'scaleX(0)', transformOrigin:'left',
                    animation:'bkGoldLine 0.5s ease 1.2s forwards',
                  }} />
                )}
              </span>
              {i < HEADLINE_WORDS.length - 1 ? ' ' : ''}
            </React.Fragment>
          ))}
        </h1>

        {/* Keyword H2 */}
        <h2 style={{
          fontSize: 14, fontWeight: 600, letterSpacing: '0.5px',
          color: 'rgba(247,243,236,.55)', marginBottom: 16,
          textTransform: 'uppercase',
        }}>
          EPUB Validation, Kindle Formatting &amp; 12 More Tools
        </h2>

        {/* Sub */}
        <p style={{
          fontSize:17, color:'rgba(247,243,236,0.58)',
          lineHeight:1.65, maxWidth:460, marginBottom:36,
          opacity:0, animation:'bkFadeUp 0.5s ease 1.1s forwards',
        }}>
          Stop paying $250 for formatting software. BookKraft AI gives indie authors
          12 professional-grade tools — starting at $4.99 with no subscriptions.
        </p>

        {/* CTAs */}
        <div style={{
          display:'flex', gap:14, flexWrap:'wrap', alignItems:'center',
          marginBottom:20, opacity:0,
          animation:'bkFadeUp 0.5s ease 1.3s forwards',
        }}>
          <Link href="/tools/epub-validator" className="btn-hero-primary">
            Try 2 Free Tools →
          </Link>
          <Link href="/pricing" className="btn-hero-secondary">
            Get Full Access — $9.99
          </Link>
        </div>

        {/* Social proof */}
        <div style={{
          display:'flex', alignItems:'center', gap:10,
          fontSize:13, color:'rgba(247,243,236,0.45)',
          opacity:0, animation:'bkFadeUp 0.5s ease 1.5s forwards',
        }}>
          <span style={{ color:'var(--gold)', letterSpacing:1 }} aria-label="5 stars">★★★★★</span>
          Rated 5/5 by verified authors on CodeTrendy
        </div>

      </div>
    </section>
  );
}

// ─── 2. TICKER ───────────────────────────────────────────────────────

function TickerSection() {
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
          background: '#B8962E',
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
          color: '#aaa',
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
              background: '#B8962E',
              color: '#fff',
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
              color: '#B8962E',
              padding: '14px 32px',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 16,
              textDecoration: 'none',
              border: '1px solid #B8962E',
              display: 'inline-block',
            }}
          >
            Validate EPUB Free
          </Link>
        </div>
        <div style={{ marginTop: 20, color: '#666', fontSize: 13 }}>
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

function ToolGridSection() {
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

        <div className="tool-grid-v2" role="list">
          {TOOLS.map((tool, i) => (
            <AnimatedSection key={tool.slug}>
              <Link
                href={`/tools/${tool.slug}`}
                className={`tool-card-v2 animate-on-scroll stagger-${Math.min((i%3)+1,6)}`}
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
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 5. COMPETITOR ───────────────────────────────────────────────────

function CompetitorSection() {
  const cols = [
    { name:'Atticus',     price:'$147', note:'One-time · No AI · No cloud', featured:false },
    { name:'BookKraft AI',price:'$4.99',note:'All 12 tools · AI-powered',   featured:true  },
    { name:'Vellum',      price:'$250', note:'Mac only · No AI · No cleanup',featured:false },
  ];
  return (
    <section style={{ background:'var(--ink)', padding:'72px clamp(20px,4vw,48px)' }} aria-label="Price comparison">
      <div style={{ maxWidth:860, margin:'0 auto', textAlign:'center' }}>
        <AnimatedSection>
          <p className="section-eyebrow-v2 animate-on-scroll" style={{ color:'rgba(201,168,76,0.65)' }}>
            Why BookKraft AI wins on value
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 2px 1fr 2px 1fr', alignItems:'center', marginTop:44 }}
            className="animate-on-scroll stagger-1">
            {cols.map((col, i) => (
              <React.Fragment key={col.name}>
                <div style={{
                  padding:'28px 24px', textAlign:'center',
                  ...(col.featured ? { borderTop:'2px solid var(--gold)', background:'rgba(201,168,76,0.04)' } : {}),
                }}>
                  <p style={{ fontSize:12, textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:8,
                    color: col.featured ? 'rgba(201,168,76,0.7)' : 'rgba(247,243,236,0.42)' }}>
                    {col.name}
                  </p>
                  <p style={{
                    fontFamily:"'Playfair Display',serif",
                    fontSize:'clamp(48px,6vw,64px)', fontStyle:'italic', lineHeight:1,
                    color: col.featured ? 'var(--gold)' : 'rgba(247,243,236,0.25)',
                  }}>
                    {col.price}
                  </p>
                  <p style={{ fontSize:12, marginTop:8,
                    color: col.featured ? 'rgba(201,168,76,0.55)' : 'rgba(247,243,236,0.3)' }}>
                    {col.note}
                  </p>
                </div>
                {i < cols.length - 1 && (
                  <div aria-hidden="true" style={{
                    height:100,
                    background:'linear-gradient(to bottom,transparent,rgba(201,168,76,0.25),transparent)',
                  }} />
                )}
              </React.Fragment>
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
              <div className={`animate-on-scroll stagger-${i + 1}`} style={{
                background: 'var(--cream)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius)', padding: '28px 28px 24px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{review.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--mid)' }}>via {review.source}</p>
                  </div>
                  <span style={{ color: 'var(--gold)', fontSize: 14, letterSpacing: 1 }} aria-label={`${review.rating} stars`}>
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

        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }} role="list">
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

function FooterSection() {
  return (
    <footer className="footer-v2" aria-label="Site footer">
      <div className="footer-v2-inner">
        <div className="footer-v2-grid">
          <div>
            <div className="footer-logo-v2">BookKraft <span>AI</span></div>
            <p className="footer-tagline">
              Professional eBook formatting for indie authors. 12 tools that make
              your manuscript publishable on any platform.
            </p>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              <a href="https://x.com/BookkraftTools" className="footer-link" target="_blank" rel="noopener noreferrer" style={{ marginBottom:0 }}>X / Twitter</a>
              <a href="https://www.linkedin.com/in/book-kraft-ai-b49a34401/" className="footer-link" target="_blank" rel="noopener noreferrer" style={{ marginBottom:0 }}>LinkedIn</a>
              <a href="https://www.facebook.com/profile.php?id=61570875517722" className="footer-link" target="_blank" rel="noopener noreferrer" style={{ marginBottom:0 }}>Facebook</a>
              <a href="https://reddit.com/r/bookkraftai" className="footer-link" target="_blank" rel="noopener noreferrer" style={{ marginBottom:0 }}>Reddit</a>
              <a href="https://www.quora.com/profile/Book-Kraft" className="footer-link" target="_blank" rel="noopener noreferrer" style={{ marginBottom:0 }}>Quora</a>
              <a href="mailto:hello@bookkraftai.com" className="footer-link" style={{ marginBottom:0 }}>Email</a>
            </div>
          </div>
          <div>
            <p className="footer-col-title">Tools</p>
            <Link href="/tools/epub-validator"     className="footer-link">EPUB Validator</Link>
            <Link href="/tools/metadata-builder"   className="footer-link">Metadata Builder</Link>
            <Link href="/tools/toc-generator"      className="footer-link">TOC Generator</Link>
            <Link href="/tools/manuscript-cleanup" className="footer-link">Manuscript Cleanup</Link>
            <Link href="/free-tools"               className="footer-link">All Free Tools</Link>
          </div>
          <div>
            <p className="footer-col-title">Company</p>
            <Link href="/pricing" className="footer-link">Pricing</Link>
            <Link href="/contact" className="footer-link">Contact</Link>
            <a href="https://blog.bookkraftai.com" className="footer-link" target="_blank" rel="noopener noreferrer">Blog</a>
          </div>
          <div>
            <p className="footer-col-title">Legal</p>
            <Link href="/privacy" className="footer-link">Privacy Policy</Link>
            <Link href="/terms"   className="footer-link">Terms of Service</Link>
          </div>
        </div>
        <div className="footer-v2-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} BookKraft AI. All rights reserved.</p>
          <a href="https://sellwithboost.com" target="_blank" rel="noopener noreferrer">
            <img src="https://sellwithboost.com/badge/listing.svg" alt="Listed on SellWithBoost" width="108" height="36" style={{ height: '36px', width: 'auto', opacity: 0.75 }} />
          </a>
          <a href="https://codetrendy.com" target="_blank" rel="noopener noreferrer">
            <img src="https://codetrendy.com/api/badge?style=classic" alt="Listed on codetrendy.com" width="108" height="36" style={{ height: '36px', width: 'auto', opacity: 0.75 }} />
          </a>
          <a href="https://www.uneed.best/tool/bookkraft-ai" target="_blank" rel="noopener noreferrer">
           <img src="https://www.uneed.best/EMBED3.png" alt="Launching on Uneed" width="108" height="36" style={{ height: '36px', width: 'auto', opacity: 0.75 }} />
          </a>
           <div className="footer-legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}