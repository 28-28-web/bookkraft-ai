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
          color: '#ffffff', maxWidth: 820, margin: '0 0 12px',
        }}>
          Your manuscript has small mistakes Amazon won&apos;t tell you about &mdash;{' '}
          <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>until after you upload it.</em>
        </h1>

        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', margin: '0 0 26px', letterSpacing: '0.03em' }}>
          EPUB &amp; Kindle formatting, checked before you publish.
        </p>

        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', maxWidth: 560, margin: '0 0 36px', lineHeight: 1.5 }}>
          Run a free Readiness Scan before you publish. One score, every platform, exactly what to fix first.
        </p>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="/free-tools" style={{
            background: '#ffffff', color: '#23262d', fontWeight: 600, fontSize: '15.5px',
            padding: '14px 26px', borderRadius: 7, textDecoration: 'none', display: 'inline-block',
            boxShadow: '0 10px 24px -8px rgba(0,0,0,0.5)',
          }}>Run a Free Book Readiness Check →</a>
          <a href="/pricing" style={{
            color: '#ffffff', fontSize: 15, padding: '14px 4px',
            background: 'none', opacity: 0.75, textDecoration: 'underline',
            textUnderlineOffset: '4px', textDecorationColor: 'rgba(255,255,255,0.3)',
          }}>See pricing</a>
        </div>
      </div>
    </section>
  );
}
