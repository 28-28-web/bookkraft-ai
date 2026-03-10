'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TOOLS } from '@/lib/tools';
import { FAQS, PRICING } from '@/lib/constants';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <>
      {/* ── HERO (dark) ── */}
      <div className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-badge"><span className="hero-badge-dot" /> eBook formatting toolkit</div>
            <h1><em>Format</em> Your eBook<br /><strong>Like a Pro.</strong></h1>
            <p className="hero-sub">12 tools for indie authors. Fix Kindle errors, build valid EPUBs, generate TOCs. Start free — no credit card needed.</p>
            <div className="hero-cta">
              <Link href="/tools/epub-validator" className="btn btn-gold">Try 2 Free Tools</Link>
              <Link href="/pricing" className="btn btn-secondary">Get Full Access — $9.99</Link>
            </div>
            <p className="hero-proof">✦ Trusted by 3,000+ indie authors formatting for Kindle &amp; EPUB</p>
          </div>
          <div className="hero-decoration">
            <div className="hero-preview">
              <h4>Kindle Format Fixer</h4>
              <code>✓ 47 double spaces fixed<br />✓ 12 smart quotes converted<br />✓ 3 tab indents removed</code>
            </div>
            <div className="hero-preview">
              <h4>EPUB Validator</h4>
              <code className="val-fail-mini">✕ Missing nav.xhtml<br /></code>
              <code>✓ Valid container.xml<br />✓ Mimetype correct</code>
            </div>
            <div className="hero-preview">
              <h4>TOC Generator</h4>
              <code>1. Chapter One — The Beginning<br />2. Chapter Two — Rising Action<br />3. Chapter Three — Climax</code>
            </div>
          </div>
        </div>
      </div>

      {/* ── FREE TOOLS CALLOUT ── */}
      <section className="free-tools-callout">
        <div className="free-tools-inner">
          <p className="eyebrow">START FREE</p>
          <h2 className="section-heading center">No Account Needed</h2>
          <p className="section-sub center">Two tools work immediately. No signup, no credit card. Just open and use.</p>
          <div className="free-tools-grid">
            <Link href="/tools/epub-validator" className="free-tool-card" style={{ textDecoration: 'none' }}>
              <h3>EPUB Validator</h3>
              <p>Check your EPUB for errors before uploading. No Java, no signup.</p>
              <span className="btn btn-outline btn-sm">Open Free Tool</span>
            </Link>
            <Link href="/tools/metadata-builder" className="free-tool-card" style={{ textDecoration: 'none' }}>
              <h3>Metadata Builder</h3>
              <p>Create master metadata for KDP, IngramSpark, Draft2Digital, and EPUB OPF.</p>
              <span className="btn btn-outline btn-sm">Open Free Tool</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TOOL GRID ── */}
      <section id="tools-section" className="tools-section">
        <div className="container">
          <p className="eyebrow">THE TOOLKIT</p>
          <h2 className="section-heading">12 Tools. One Workflow.</h2>
          <p className="section-sub">5 instant logic tools + 5 AI-powered tools + 2 free tools. Buy the bundle or pay per AI run.</p>
          <div className="tools-grid" style={{ marginTop: 'var(--space-8)' }}>
            {TOOLS.map((t) => (
              <Link href={t.free ? `/tools/${t.slug}` : '/signup'} key={t.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="tool-card">
                  <div className="tool-card-top">
                    {t.free
                      ? <span className="badge badge-free">FREE</span>
                      : t.accessType === 'ai'
                        ? <span className="badge badge-ai">AI · {t.creditCost} credit{t.creditCost !== 1 ? 's' : ''}</span>
                        : <span className="badge badge-logic">Instant</span>
                    }
                  </div>
                  <h3>{t.name}</h3>
                  <p>{t.desc}</p>
                  <div className="tool-card-bottom">
                    <span className={`tool-card-price ${t.free ? 'free' : ''}`}>
                      {t.free ? 'Free' : t.accessType === 'ai' ? `${t.creditCost} credit${t.creditCost !== 1 ? 's' : ''}` : 'Bundle'}
                    </span>
                    <span className="tool-card-cta">Open →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPETITOR FRAMING ── */}
      <section style={{ padding: 'var(--space-16) 0', background: 'var(--white)' }}>
        <div className="container">
          <p className="eyebrow" style={{ textAlign: 'center' }}>WHY BOOKKRAFT</p>
          <h2 className="section-heading center">What Indie Authors Actually Need</h2>
          <p className="section-sub center" style={{ marginBottom: 'var(--space-8)' }}>Vellum costs $249.99 and only runs on Mac. Atticus charges $147. BookKraft gives you the formatting tools you need for a fraction of the price — on any device.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)', maxWidth: 960, margin: '0 auto' }}>
            {[
              { title: 'Run on Any Device', desc: 'Web-based. Works on Mac, Windows, Chromebook, phone. No downloads.' },
              { title: 'Pay Once, Own Forever', desc: 'No subscriptions. Buy the Essentials Bundle or credits — they never expire.' },
              { title: 'AI Where It Matters', desc: '5 instant logic tools + 5 AI tools. AI handles the creative work, logic handles the formatting.' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: 'var(--space-8)', background: 'var(--cream)',
                borderRadius: 'var(--radius)', border: '1px solid var(--border)',
              }}>
                <h4 style={{ marginBottom: 'var(--space-3)' }}>{item.title}</h4>
                <p style={{ color: 'var(--mid)', fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKFLOW (dark) ── */}
      <section className="workflow-section">
        <div className="container">
          <p className="eyebrow" style={{ textAlign: 'center' }}>THE WORKFLOW</p>
          <h2 className="section-heading center" style={{ color: 'var(--cream)' }}>The eBook Formatting Workflow</h2>
          <div className="workflow-grid">
            {[
              { n: '01', t: 'Clean Your Manuscript', d: 'Manuscript Cleanup Tool' },
              { n: '02', t: 'Format for Kindle or EPUB', d: 'Kindle Format Fixer / EPUB Formatter' },
              { n: '03', t: 'Build Navigation', d: 'TOC Generator' },
              { n: '04', t: 'Add Front & Back Matter', d: 'Front Matter + Back Matter Generator' },
              { n: '05', t: 'Validate & Publish', d: 'EPUB Validator + KDP Keyword Finder' },
            ].map((s, i) => (
              <div className="workflow-step" key={i}>
                <div className="workflow-num">{s.n}</div>
                <h4>{s.t}</h4>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM COMPATIBILITY ── */}
      <section style={{
        padding: 'var(--space-16) 0', background: 'var(--cream)',
        borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
      }}>
        <div className="container">
          <p style={{
            textAlign: 'center', fontWeight: 700, fontSize: '18px',
            color: 'var(--ink)', marginBottom: 'var(--space-10)',
          }}>
            Your formatted eBook works on every platform
          </p>
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            gap: 'var(--space-8)', maxWidth: 900, margin: '0 auto', padding: '0 var(--space-6)',
          }}>
            {['Amazon KDP', 'Apple Books', 'Barnes & Noble', 'Kobo', 'Draft2Digital',
              'Smashwords', 'OverDrive', 'Tolino', 'Scribd'].map((p) => (
              <span key={p} style={{
                color: 'var(--mid)', fontWeight: 600, fontSize: 'var(--text-base)',
                letterSpacing: '0.02em',
              }}>{p}</span>
            ))}
          </div>
          <p style={{
            textAlign: 'center', color: 'var(--mid)', fontSize: 'var(--text-sm)',
            marginTop: 'var(--space-8)', letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            And more...
          </p>
        </div>
      </section>

      {/* ── REVIEWS / TESTIMONIALS ── */}
      <section style={{ padding: 'var(--space-20) 0', background: 'var(--white)' }}>
        <div className="container">
          <p className="eyebrow" style={{ textAlign: 'center' }}>REVIEWS</p>
          <h2 className="section-heading center">What Authors Are Saying</h2>
          <p className="section-sub center" style={{ marginBottom: 'var(--space-10)' }}>
            Real feedback from indie authors who use BookKraft to format their eBooks.
          </p>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-6)', maxWidth: 1000, margin: '0 auto',
          }}>
            {[
              {
                name: 'Sarah Mitchell',
                role: 'Romance Author, 12 titles on KDP',
                stars: 5,
                text: 'I switched from Vellum because I needed something that works on my Windows laptop. BookKraft fixed 200+ formatting errors in my manuscript in under 30 seconds. The EPUB Validator alone saved me hours.',
              },
              {
                name: 'James Calder',
                role: 'Sci-Fi Author & Self-Publishing Coach',
                stars: 5,
                text: 'The Manuscript Cleanup tool caught 47 repeated words and 3 clichés I completely missed. The AI suggestions were actually useful, not generic. Best $7 I ever spent on a formatting tool.',
              },
              {
                name: 'Priya Sharma',
                role: 'Non-fiction Author, 3 titles',
                stars: 5,
                text: 'I was spending $300 on formatting for each book. Now I do it myself with BookKraft. The TOC Generator and Front Matter tools make it feel like I have a professional formatter on staff.',
              },
              {
                name: 'David Park',
                role: 'Thriller Author, 8 titles on KDP',
                stars: 5,
                text: 'The KDP Keyword Finder is incredible. My last book went from page 4 to page 1 in its sub-category within a week of updating my keywords. The category suggestions were spot-on.',
              },
              {
                name: 'Emma Rodriguez',
                role: 'Children\'s Book Author',
                stars: 4,
                text: 'I love that I can try the EPUB Validator and Metadata Builder for free without creating an account. That trust made me comfortable buying the full bundle. Clean, professional tool.',
              },
              {
                name: 'Michael Torres',
                role: 'Wide-Distribution Author, 20+ titles',
                stars: 5,
                text: 'I publish on KDP, Apple, Kobo, and Draft2Digital. The Metadata Builder saves me 30 minutes per book — one form, four platform outputs. The Print-to-Digital adapter is a game-changer for my backlist.',
              },
            ].map((review, i) => (
              <div key={i} style={{
                padding: 'var(--space-6)', background: 'var(--cream)',
                border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
              }}>
                {/* Stars */}
                <div style={{ color: 'var(--gold)', fontSize: '16px', letterSpacing: '2px' }}>
                  {'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}
                </div>
                {/* Quote */}
                <p style={{
                  color: 'var(--ink)', fontSize: 'var(--text-sm)', lineHeight: 1.7,
                  fontStyle: 'italic', flex: 1,
                }}>
                  &ldquo;{review.text}&rdquo;
                </p>
                {/* Author */}
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--space-3)' }}>
                  <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--ink)', marginBottom: '2px' }}>
                    {review.name}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--mid)' }}>{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING (v8.0 credit model) ── */}
      <section id="pricing" style={{ padding: 'var(--space-24) 0' }}>
        <div className="container">
          <p className="eyebrow" style={{ textAlign: 'center' }}>PRICING</p>
          <h2 className="section-heading center">Simple Pricing. No Subscriptions.</h2>
          <p className="section-sub center">Buy once, own forever. Credits never expire. No monthly fees.</p>
          <div className="pricing-grid">
            {/* Free */}
            <div className="price-card">
              <p className="price-plan">Free</p>
              <div className="price-amount">$0</div>
              <p className="price-desc">2 tools, no signup, no limits.</p>
              <ul className="price-features">
                <li>EPUB Validator</li>
                <li>Metadata Builder</li>
                <li>No account needed</li>
                <li>Unlimited use</li>
              </ul>
              <Link href="/tools/epub-validator" className="btn btn-outline btn-full" style={{ textDecoration: 'none' }}>Start Free</Link>
            </div>

            {/* Essentials Bundle */}
            <div className="price-card" id="essentials">
              <p className="price-plan">{PRICING.essentials.name}</p>
              <div className="price-amount">{PRICING.essentials.label}<span> one-time</span></div>
              <p className="price-desc">{PRICING.essentials.desc}</p>
              <ul className="price-features">
                {PRICING.essentials.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <Link href="/signup" className="btn btn-outline btn-full" style={{ textDecoration: 'none' }}>Get Essentials</Link>
            </div>

            {/* Full Access (featured) */}
            <div className="price-card featured">
              <p className="price-plan">{PRICING.full.name}</p>
              <div className="price-amount">{PRICING.full.label}<span> one-time</span></div>
              <p className="price-desc">{PRICING.full.desc}</p>
              <ul className="price-features">
                {PRICING.full.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <Link href="/signup" className="btn btn-gold btn-full" style={{ textDecoration: 'none' }}>Get Full Access</Link>
            </div>

            {/* Lifetime */}
            <div className="price-card lifetime-card">
              <p className="price-plan">{PRICING.lifetime.name}</p>
              <div className="price-amount">{PRICING.lifetime.label}<span> one-time</span></div>
              <p className="price-desc">{PRICING.lifetime.desc}</p>
              <ul className="price-features">
                {PRICING.lifetime.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <Link href="/signup" className="btn btn-gold btn-full" style={{ textDecoration: 'none' }}>Get Lifetime Deal</Link>
            </div>
          </div>

          {/* Credit packs under pricing */}
          <div id="credits" style={{ marginTop: 'var(--space-12)', textAlign: 'center' }}>
            <h3 style={{ marginBottom: 'var(--space-6)' }}>AI Credit Packs</h3>
            <p className="section-sub center" style={{ marginBottom: 'var(--space-8)' }}>Credits power AI tools. Buy once, use whenever — they never expire.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-6)', maxWidth: 600, margin: '0 auto' }}>
              <div className="price-card" style={{ textAlign: 'left' }}>
                <p className="price-plan">{PRICING.starterCredits.name}</p>
                <div className="price-amount">{PRICING.starterCredits.label}</div>
                <p className="price-desc">{PRICING.starterCredits.desc}</p>
                <ul className="price-features">
                  {PRICING.starterCredits.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                <Link href="/signup" className="btn btn-outline btn-full" style={{ textDecoration: 'none' }}>Buy Credits</Link>
              </div>
              <div className="price-card" style={{ textAlign: 'left' }}>
                <p className="price-plan">{PRICING.authorPro.name}</p>
                <div className="price-amount">{PRICING.authorPro.label}</div>
                <p className="price-desc">{PRICING.authorPro.desc}</p>
                <ul className="price-features">
                  {PRICING.authorPro.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                <Link href="/signup" className="btn btn-outline btn-full" style={{ textDecoration: 'none' }}>Buy Credits</Link>
              </div>
            </div>
          </div>

          {/* Credit cost table */}
          <div style={{ marginTop: 'var(--space-12)', maxWidth: 480, margin: 'var(--space-12) auto 0' }}>
            <h4 style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>AI Tool Credit Costs</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: '8px 0' }}>Tool</th>
                  <th style={{ textAlign: 'right', padding: '8px 0' }}>Credits</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['KDP Keyword Finder', '1'],
                  ['Back Matter Generator', '2'],
                  ['Manuscript Cleanup', '3'],
                  ['Print-to-Digital Adapter', '3'],
                  ['Style Sheet Auditor', '3'],
                ].map(([name, cost], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '8px 0' }}>{name}</td>
                    <td style={{ textAlign: 'right', padding: '8px 0', color: 'var(--gold)', fontWeight: 600 }}>{cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection />

      {/* ── Footer ── */}
      <Footer />
    </>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section className="faq-section">
      <div className="container">
        <p className="eyebrow" style={{ textAlign: 'center' }}>FAQ</p>
        <h2 className="section-heading center">Questions We Get a Lot</h2>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div className={`faq-item ${openIndex === i ? 'open' : ''}`} key={i}>
              <div className="faq-q" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                {f.q}
                <span className="faq-chevron">▼</span>
              </div>
              <div className="faq-a"><p>{f.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
