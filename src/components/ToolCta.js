import TrackedLink from '@/components/TrackedLink';

// Inline, non-intrusive article → tool CTA (same look as ReadinessReportCTA).
// Server component; only the link inside is client-side for tracking.
export default function ToolCta({ href, label, text, style }) {
  return (
    <div style={{
      margin: '24px 0', padding: '16px 20px', borderRadius: 12,
      background: '#faf7f0', border: '1px solid #e5e0d8',
      display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', ...style,
    }}>
      {text && <p style={{ flex: 1, minWidth: 200, margin: 0, fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.5 }}>{text}</p>}
      <TrackedLink
        href={href}
        style={{ display: 'inline-block', background: '#C9933A', color: '#fff', padding: '10px 20px', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}
      >
        {label} →
      </TrackedLink>
    </div>
  );
}
