'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TOOLS } from '../lib/tools';
import { FAQS, PRICING } from '../lib/constants';


// ─── DATA ────────────────────────────────────────────────────────────

// Matches index.html exactly: "Format like a pro. Price like a newcomer."
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
  '<strong>@sarah_writes</strong> cleaned 90k words in 3 mins',
  '<strong>@marcusthrillers</strong> ranked #1 with our keywords',
  '<strong>@jkromance</strong> published her 3rd book this month',
  '<strong>@indieauthor_pro</strong> saved $245 vs Vellum',
  '<strong>@bookcraft_fan</strong> formatted 5 EPUBs in one afternoon',
  '<strong>@writerdave</strong> found 12 KDP keywords in 30 seconds',
  '<strong>@publisherella</strong> passed Amazon review first try',
];

const REVIEWS = [
  { name: 'Sarah R.',    role: 'Fantasy author · 8 titles on KDP',      stars: 5, text: 'BookKraft cleaned up 4 years of inconsistent formatting in my 90,000-word novel in under 3 minutes. Absolutely jaw-dropping.' },
  { name: 'Marcus T.',   role: 'Self-published thriller writer',         stars: 5, text: "I was going to buy Vellum. Then I found BookKraft. $4.99 vs $250 — and the AI keyword finder paid for the full bundle in week one." },
  { name: 'Jennifer K.', role: 'Romance author · 3-book series',        stars: 5, text: 'The style sheet auditor caught 47 inconsistencies I never would have spotted. My editor was impressed for the first time ever.' },
  { name: 'David P.',    role: 'Thriller author · 8 KDP titles',        stars: 5, text: 'The KDP Keyword Finder is incredible. My last book went from page 4 to page 1 in its sub-category within a week of updating my keywords.' },
  { name: 'Emma R.',     role: "Children's book author",                 stars: 4, text: 'I love that I can try the EPUB Validator and Metadata Builder for free without creating an account. That trust made me comfortable buying the full bundle.' },
  { name: 'Michael T.',  role: 'Wide-distribution author · 20+ titles', stars: 5, text: 'The Metadata Builder saves me 30 minutes per book — one form, four platform outputs. The Print-to-Digital adapter is a game-changer.' },
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
      {/* Keyframes needed for hero animations */}
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
  useEffect(() => { const t = setTimeout(() => setAnimate(true), 260); return () => clearTimeout(t); }, []);

  return (
    <section
      style={{
        background: 'var(--ink)', minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        padding: 'clamp(60px,6vh,80px) clamp(20px,4vw,48px) clamp(48px,6vh,72px)',
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

        {/* H1 — "Format like a pro. Price like a newcomer." */}
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
            <span
              key={i}
              style={{
                display:'inline-block',
                // margin-right creates word gaps — inline-block eats whitespace
                marginRight: i < HEADLINE_WORDS.length - 1 ? '0.22em' : 0,
                opacity:0, transform:'translateY(28px)',
                animation: animate
                  ? `bkWordUp 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s forwards`
                  : 'none',
                ...(w.gold ? { color:'var(--gold)', position:'relative' } : {}),
              }}
            >
              {w.text}
              {/* Gold underline */}
              {w.gold && (
                <span aria-hidden="true" style={{
                  display:'block', height:3,
                  background:'var(--gold)', marginTop:2,
                  transform:'scaleX(0)', transformOrigin:'left',
                  animation:'bkGoldLine 0.5s ease 1.2s forwards',
                }} />
              )}
            </span>
          ))}
        </h1>

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
          Trusted by 3,000+ indie authors worldwide
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
// Exactly 2: EPUB Validator + Metadata Builder

function FreeToolsSection() {
  return (
    <section
      style={{ background:'var(--sage-bg)', borderTop:'1px solid rgba(46,94,40,0.14)', borderBottom:'1px solid rgba(46,94,40,0.14)' }}
      aria-labelledby="freeTitle"
    >
      <div>
        <div style={{ maxWidth:1160, margin:'0 auto', padding:'52px clamp(20px,4vw,48px)' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:48, alignItems:'center' }}
            className="animate-on-scroll">
            {/* Left text */}
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
                2 full-featured tools available with no account needed.
              </p>
            </div>

            {/* Right — exactly 2 chips */}
            <div style={{ display:'flex', gap:12, flexShrink:0 }}>
              {[
                { href:'/tools/epub-validator',   label:'EPUB Validator'  },
                { href:'/tools/metadata-builder', label:'Metadata Builder'},
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
      </div>
    </section>
  );
}

// ─── 4. TOOL GRID ────────────────────────────────────────────────────

function ToolGridSection() {
  return (
    <section className="tools-section-v2" id="tools-section" aria-labelledby="toolsHeading">
      <div className="section-inner-v2">
        <div>
          <div className="animate-on-scroll" style={{ textAlign:'center' }}>
            <p className="section-eyebrow-v2">12 Professional Tools</p>
            <h2 className="section-title-v2" id="toolsHeading">Everything an indie author needs</h2>
            <p className="section-sub-v2" style={{ maxWidth:500, margin:'0 auto' }}>
              From raw manuscript to polished EPUB — every step covered in one place.
            </p>
          </div>
        </div>

        <div className="tool-grid-v2" role="list">
          {TOOLS.map((tool, i) => (
            <div>
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
            </div>
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
        <div>
          <p className="section-eyebrow-v2 animate-on-scroll" style={{ color:'rgba(201,168,76,0.65)' }}>
            Why BookKraft AI wins on value
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 2px 1fr 2px 1fr', alignItems:'center', marginTop:44 }}
            className="animate-on-scroll stagger-1">
            {cols.map((col, i) => (
              <>
                <div key={col.name} style={{
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
                {/* Divider between columns */}
                {i < cols.length - 1 && (
                  <div key={`div-${i}`} aria-hidden="true" style={{
                    height:100,
                    background:'linear-gradient(to bottom,transparent,rgba(201,168,76,0.25),transparent)',
                  }} />
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 6. WORKFLOW ─────────────────────────────────────────────────────

function WorkflowSection() {
  return (
    <section style={{ background:'var(--cream)', padding:'88px clamp(20px,4vw,48px)' }} aria-labelledby="workflowHeading">
      <div style={{ maxWidth:1160, margin:'0 auto' }}>
        <div>
          <p className="section-eyebrow-v2 animate-on-scroll">How it works</p>
          <h2 className="section-title-v2 animate-on-scroll stagger-1" id="workflowHeading">
            From draft to published in 5 steps
          </h2>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:8, position:'relative', marginTop:52 }}>
          {/* Connecting line */}
          <div aria-hidden="true" style={{
            position:'absolute', top:26, left:'calc(10% + 20px)', right:'calc(10% + 20px)',
            height:1, background:'var(--border)', zIndex:0,
          }} />
          {WORKFLOW.map((step, i) => (
            <div>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 7. TESTIMONIALS ─────────────────────────────────────────────────

function TestimonialsSection() {
  return (
    <section style={{ background:'#fff', padding:'88px clamp(20px,4vw,48px)' }} aria-labelledby="reviewsHeading">
      <div style={{ maxWidth:1160, margin:'0 auto' }}>
        <div>
          <p className="section-eyebrow-v2 animate-on-scroll">Author wins</p>
          <h2 className="section-title-v2 animate-on-scroll stagger-1" id="reviewsHeading">
            What indie authors are saying
          </h2>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginTop:48 }}>
          {REVIEWS.map((r, i) => (
            <div>
              <article
                className={`animate-on-scroll stagger-${Math.min(i+1,6)}`}
                style={{
                  background:'var(--cream)', border:'1px solid var(--border)',
                  borderRadius:'var(--radius)', padding:26,
                  transition:'transform 0.2s, box-shadow 0.2s',
                }}
                itemScope itemType="https://schema.org/Review"
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 4px 12px rgba(15,14,12,0.12)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none';}}
              >
                <p style={{
                  fontFamily:"'Playfair Display',serif", fontSize:14.5,
                  fontStyle:'italic', lineHeight:1.72, color:'var(--ink)', marginBottom:18,
                }} itemProp="reviewBody">
                  <span style={{ color:'var(--gold)', fontSize:26, lineHeight:0, verticalAlign:'-9px', marginRight:3 }} aria-hidden="true">&ldquo;</span>
                  {r.text}
                </p>
                <div style={{ display:'flex', alignItems:'center', gap:10, paddingTop:14, borderTop:'1px solid var(--border)' }}>
                  <div style={{
                    width:38, height:38, borderRadius:'50%', background:'var(--border)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:13, fontWeight:700, color:'var(--mid)', flexShrink:0,
                  }} aria-hidden="true">
                    {r.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div>
                    <p style={{ fontSize:13, fontWeight:700 }} itemProp="author">{r.name}</p>
                    <p style={{ fontSize:11, color:'var(--mid)' }}>{r.role}</p>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 8. PLATFORMS ────────────────────────────────────────────────────

function PlatformsSection() {
  return (
    <section style={{ background:'var(--cream)', padding:'56px clamp(20px,4vw,48px)' }} aria-labelledby="platformsHeading">
      <div style={{ maxWidth:1160, margin:'0 auto', textAlign:'center' }}>
        <div>
          <h2 id="platformsHeading" className="animate-on-scroll"
            style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:700, marginBottom:24 }}>
            Your formatted eBook works on every platform
          </h2>
          <div className="animate-on-scroll stagger-1"
            style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:10 }}>
            {PLATFORMS.map(p => <span key={p} className="platform-badge">{p}</span>)}
          </div>
        </div>
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
        <div>
          <div className="animate-on-scroll" style={{ textAlign:'center', marginBottom:48 }}>
            <p className="section-eyebrow-v2">Simple, honest pricing</p>
            <h2 className="section-title-v2" id="pricingHeading">No subscriptions. Ever.</h2>
            <p className="section-sub-v2">Pay once, own forever. Credits never expire. No monthly fees.</p>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }} role="list">
          {plans.map((plan, i) => (
            <div>
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
            </div>
          ))}
        </div>

        <div className="pricing-trust">
          <div className="pricing-trust-item"><span className="pricing-trust-icon" aria-hidden="true">🔒</span>Secure Checkout via Paddle</div>
          <div className="pricing-trust-item"><span className="pricing-trust-icon" aria-hidden="true">⭐</span>4.8/5 from 3,000+ authors</div>
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
        <div>
          <p className="section-eyebrow-v2 animate-on-scroll">Common questions</p>
          <h2 className="section-title-v2 animate-on-scroll stagger-1" id="faqHeading">
            Everything you need to know
          </h2>
        </div>

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
              <a href="https://x.com/bookkraftai" className="footer-link" target="_blank" rel="noopener noreferrer" style={{ marginBottom:0 }}>X / Twitter</a>
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
          <div className="footer-legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
