'use client';
import { useState } from 'react';

export default function FaqPage({ faqs }) {
  const [open, setOpen] = useState(null);
  const toggle = i => setOpen(open === i ? null : i);

  return (
    <main style={{ background: 'var(--cream)', minHeight: '60vh', padding: '72px 24px 96px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: '12.5px', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--mid)', marginBottom: 12 }}>
          Help &amp; FAQ
        </p>
        <h1 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontWeight: 500, fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.15, color: 'var(--ink)', marginBottom: 14 }}>
          Frequently Asked Questions
        </h1>
        <p style={{ fontSize: 16, color: 'var(--mid)', marginBottom: 48, lineHeight: 1.6 }}>
          Credits, plans, formats, and how BookKraft AI fits your workflow.
        </p>

        <div role="list">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`faq-item${isOpen ? ' open' : ''}`}
                role="listitem"
              >
                <button
                  id={`faq-btn-${i}`}
                  className="faq-question"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-ans-${i}`}
                >
                  {faq.q}
                  <span className="faq-chevron" aria-hidden="true">▾</span>
                </button>
                <div
                  id={`faq-ans-${i}`}
                  className="faq-answer"
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                >
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border)', fontSize: 14, color: 'var(--mid)', lineHeight: 1.7 }}>
          Still have questions?{' '}
          <a href="/contact" style={{ color: 'var(--ink)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Contact us
          </a>
        </div>
      </div>
    </main>
  );
}
