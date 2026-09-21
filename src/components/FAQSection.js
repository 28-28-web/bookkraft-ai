'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AnimatedSection from './AnimatedSection';

export default function FAQSection({ faqs }) {
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
