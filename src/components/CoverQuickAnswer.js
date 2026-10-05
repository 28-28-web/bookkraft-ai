import Link from 'next/link';

// Server-rendered quick-answer box for cover requirement pages. A page opts in
// by giving its coverRequirements.js entry a `quickAnswer` array of
// { label, value } rows.
export default function CoverQuickAnswer({ items, platform }) {
  if (!items?.length) return null;
  return (
    <section
      aria-labelledby="cover-quick-answer"
      style={{ border: '1px solid var(--border)', borderLeft: '4px solid var(--gold)', borderRadius: 8, padding: '20px 22px', marginBottom: 32, background: 'var(--cream)' }}
    >
      <h2 id="cover-quick-answer" style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 12px', color: 'var(--ink)' }}>
        Quick answer: {platform} cover specs
      </h2>
      <dl style={{ margin: '0 0 16px', display: 'grid', gridTemplateColumns: 'minmax(110px, max-content) 1fr', gap: '8px 16px', fontSize: 14, lineHeight: 1.5 }}>
        {items.map(({ label, value }) => (
          <div key={label} style={{ display: 'contents' }}>
            <dt style={{ fontWeight: 600, color: 'var(--mid)' }}>{label}</dt>
            <dd style={{ margin: 0, color: 'var(--ink)' }}>{value}</dd>
          </div>
        ))}
      </dl>
      <Link href="/tools/cover-checker" className="btn btn-gold btn-cta">
        Check your cover before upload →
      </Link>
    </section>
  );
}
