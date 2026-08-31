export default function HeroSection() {
  return (
    <section style={{ background: 'var(--ink)', padding: '120px 0 56px' }} aria-label="Hero">
      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 28px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          border: '1px solid rgba(255,255,255,0.22)', borderRadius: 999,
          padding: '6px 14px', marginBottom: 26,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', display: 'inline-block', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: '12.5px', fontWeight: 500, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase' }}>
            Publishing Preflight
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-fraunces), Fraunces, serif', fontWeight: 500,
          fontSize: 'clamp(34px, 4.6vw, 54px)', lineHeight: 1.08, letterSpacing: '-0.01em',
          color: '#ffffff', maxWidth: 820, margin: '0 0 22px',
        }}>
          Make Your Book Publication-Ready
        </h1>

        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', maxWidth: 520, margin: '0 0 36px', lineHeight: 1.5 }}>
          Format, validate, clean and prepare your ebook before publishing.
        </p>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="/tools/epub-validator" style={{
            background: '#ffffff', color: '#23262d', fontWeight: 600, fontSize: '15.5px',
            padding: '14px 26px', borderRadius: 7, textDecoration: 'none', display: 'inline-block',
            boxShadow: '0 10px 24px -8px rgba(0,0,0,0.5)',
          }}>Check My Book — Free →</a>
          <a href="/free-tools" style={{
            color: '#ffffff', fontSize: 15, padding: '14px 4px',
            background: 'none', opacity: 0.75, textDecoration: 'underline',
            textUnderlineOffset: '4px', textDecorationColor: 'rgba(255,255,255,0.3)',
          }}>Explore Free Tools</a>
        </div>
      </div>
    </section>
  );
}
