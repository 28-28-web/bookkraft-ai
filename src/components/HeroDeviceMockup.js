'use client';

import { useState, useEffect } from 'react';

const SLIDES = [
  {
    title: 'EPUB Validator',
    items: [
      { icon: '✓', type: 'ok', text: 'container.xml — valid' },
      { icon: '✓', type: 'ok', text: 'mimetype — correct' },
      { icon: '✓', type: 'ok', text: 'content.opf — valid' },
      { icon: '✗', type: 'err', text: 'nav.xhtml — missing' },
      { icon: '✓', type: 'ok', text: 'toc.ncx — present' },
      { icon: '✗', type: 'err', text: 'images/cover.jpg — not listed in manifest' },
    ],
  },
  {
    title: 'Manuscript Cleanup',
    items: [
      { icon: '✦', type: 'ai', text: '47 double spaces → fixed' },
      { icon: '✦', type: 'ai', text: '12 smart quotes → converted' },
      { icon: '✦', type: 'ai', text: '3 tab indents → removed' },
      { icon: '✦', type: 'ai', text: '6 repeated words flagged' },
      { icon: '✦', type: 'ai', text: 'Oxford comma: 9 instances' },
    ],
  },
  {
    title: 'KDP Keyword Finder',
    items: [
      { icon: '✦', type: 'ai', text: 'indie author publishing' },
      { icon: '✦', type: 'ai', text: 'self publishing guide 2025' },
      { icon: '✦', type: 'ai', text: 'kindle direct publishing' },
      { icon: '✦', type: 'ai', text: 'ebook formatting software' },
      { icon: '✦', type: 'ai', text: 'amazon kdp bestseller' },
    ],
  },
];

export default function HeroDeviceMockup() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [typedLines, setTypedLines] = useState([]);

  // Cycle slides every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
      setTypedLines([]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter: reveal items one by one on slide change
  useEffect(() => {
    setTypedLines([]);
    const slide = SLIDES[activeSlide];
    slide.items.forEach((_, i) => {
      setTimeout(() => {
        setTypedLines((prev) => [...prev, i]);
      }, i * 280);
    });
  }, [activeSlide]);

  const slide = SLIDES[activeSlide];

  return (
    <div className="device-mockup-wrap">
      <div className="device-frame">
        <div className="device-notch" />
        <div className="device-screen">
          <div className="device-screen-header">
            <div className="device-dot" style={{ background: '#ff5f57' }} />
            <div className="device-dot" style={{ background: '#febc2e' }} />
            <div className="device-dot" style={{ background: '#28c840' }} />
            <span className="device-screen-title" style={{ marginLeft: '8px' }}>
              {slide.title}
            </span>
          </div>
          <div className="device-screen-body">
            {slide.items.map((item, i) => (
              <div
                key={`${activeSlide}-${i}`}
                className="device-item"
                style={{
                  opacity: typedLines.includes(i) ? 1 : 0,
                  transform: typedLines.includes(i) ? 'translateY(0)' : 'translateY(6px)',
                  transition: 'opacity 0.25s ease, transform 0.25s ease',
                }}
              >
                <span
                  className={
                    item.type === 'ok'
                      ? 'device-icon-ok'
                      : item.type === 'err'
                      ? 'device-icon-err'
                      : 'device-icon-ai'
                  }
                >
                  {item.icon}
                </span>
                <span>{item.text}</span>
              </div>
            ))}
            {/* Typewriter cursor */}
            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="device-icon-ai">✦</span>
              <span className="typewriter-cursor" />
            </div>

            {/* Slide indicator dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '16px' }}>
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveSlide(i); setTypedLines([]); }}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: i === activeSlide ? 'var(--gold)' : 'var(--border)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'background 0.2s',
                  }}
                  aria-label={`View ${SLIDES[i].title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
