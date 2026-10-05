import Link from 'next/link';

const DEFAULT_CTA = { href: '/tools/cover-checker', label: 'Check your cover before upload' };

// Server-rendered quick-answer box for cover requirement pages. A page opts in
// by giving its coverRequirements.js entry a `quickAnswer` array of
// { label, value } rows. `cta` overrides the button (e.g. print covers, which
// the ebook-only Cover Checker can't test); external hrefs open in a new tab.
export default function CoverQuickAnswer({ items, platform, cta = DEFAULT_CTA }) {
  if (!items?.length) return null;
  const external = /^https?:\/\//.test(cta.href);
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
      {external ? (
        <a href={cta.href} target="_blank" rel="noopener nofollow" className="btn btn-gold btn-cta">
          {cta.label} →
        </a>
      ) : (
        <Link href={cta.href} className="btn btn-gold btn-cta">
          {cta.label} →
        </Link>
      )}
    </section>
  );
}
