'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TOOLS } from '@/lib/tools';
import { FAQS } from '@/lib/constants';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <div className="hero">
        <div className="hero-badge"><span className="hero-badge-dot"></span> AI-powered writing toolkit</div>
        <h1>Write your non-fiction book <em>faster</em> than ever before</h1>
        <p className="hero-sub">12 AI tools built for authors. From blank page to back cover — without the overwhelm.</p>
        <div className="hero-cta">
          <Link href="/signup" className="btn btn-primary">Start Free — No Credit Card</Link>
          <a href="#tools-section" className="btn btn-outline">See All 12 Tools ↓</a>
        </div>
        <p className="hero-proof"><strong>2,400+</strong> authors already writing with BookKraft</p>
      </div>

      {/* Tools Grid */}
      <section id="tools-section" className="tools-section">
        <div className="container">
          <p className="section-label">The Toolkit</p>
          <h2 className="section-title">12 tools. Every stage of your book.</h2>
          <p className="section-sub">From your first idea to your final back cover blurb — we cover every part of the process.</p>
          <div className="tools-grid">
            {TOOLS.map((t) => (
              <Link href="/signup" key={t.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="tool-card">
                  <div className={`tool-icon ${t.category}`}>{t.icon}</div>
                  <h3>{t.name}</h3>
                  <p>{t.desc}</p>
                  <span className={`tool-badge badge-${t.category}`}>{t.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section>
        <div className="container">
          <p className="section-label">How It Works</p>
          <h2 className="section-title">Three steps. Real results.</h2>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <h3>Pick a tool</h3>
              <p>Choose from 12 tools designed for every stage of writing your book.</p>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <h3>Enter your details</h3>
              <p>Fill in a few quick fields about your book, topic, and what you need.</p>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <h3>Get your content</h3>
              <p>Claude AI generates tailored content you can copy, refine, and publish.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ background: 'var(--warm)' }}>
        <div className="container">
          <p className="section-label">Pricing</p>
          <h2 className="section-title">Start free. Upgrade when you&apos;re ready.</h2>
          <div className="pricing-grid">
            <div className="price-card">
              <p className="price-plan">Free</p>
              <div className="price-amount">$0<span>/mo</span></div>
              <p className="price-desc">Try 3 tools and see if BookKraft fits your workflow.</p>
              <ul className="price-features">
                <li>3 tools included</li>
                <li>10 AI runs per month</li>
                <li>Output history (7 days)</li>
                <li className="no">All 12 tools</li>
                <li className="no">Priority support</li>
              </ul>
              <Link href="/signup" className="btn btn-outline btn-full" style={{ textDecoration: 'none' }}>Get Started Free</Link>
            </div>
            <div className="price-card featured">
              <p className="price-plan">Starter</p>
              <div className="price-amount">$9<span>/mo</span></div>
              <p className="price-desc">For hobbyists who want to write their first book.</p>
              <ul className="price-features">
                <li>All 12 tools</li>
                <li>100 AI runs per month</li>
                <li>Full output history</li>
                <li>Email support</li>
                <li className="no">Priority support</li>
              </ul>
              <Link href="/signup" className="btn btn-gold btn-full" style={{ textDecoration: 'none' }}>Start Starter Plan</Link>
            </div>
            <div className="price-card">
              <p className="price-plan">Pro</p>
              <div className="price-amount">$29<span>/mo</span></div>
              <p className="price-desc">For serious authors writing multiple books.</p>
              <ul className="price-features">
                <li>All 12 tools</li>
                <li>500 AI runs per month</li>
                <li>Full output history</li>
                <li>Priority support</li>
                <li>Early access to new tools</li>
              </ul>
              <Link href="/signup" className="btn btn-primary btn-full" style={{ textDecoration: 'none' }}>Start Pro Plan</Link>
            </div>
            <div className="price-card lifetime-card">
              <p className="price-plan">Lifetime Deal</p>
              <div className="price-amount">$149<span>once</span></div>
              <p className="price-desc">Pay once. Use BookKraft forever. Capped at 1,000 runs/month.</p>
              <ul className="price-features">
                <li>All 12 tools</li>
                <li>1,000 runs/month</li>
                <li>Lifetime updates</li>
                <li>Priority support</li>
              </ul>
              <Link href="/signup" className="btn btn-gold btn-full" style={{ textDecoration: 'none' }}>Grab Lifetime Deal</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="faq-section">
      <div className="container">
        <p className="section-label">FAQ</p>
        <h2 className="section-title" style={{ textAlign: 'center' }}>Questions we get a lot</h2>
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
