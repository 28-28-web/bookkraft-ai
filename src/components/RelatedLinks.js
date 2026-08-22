import Link from 'next/link';

const TYPE_CONFIG = {
  'epub-error': {
    href: (slug) => `/epub-errors/${slug}`,
    heading: 'Common EPUB errors',
  },
  'platform-rejection': {
    href: (slug) => `/platform-rejection/${slug}`,
    heading: 'Platform rejection guides',
  },
  alternative: {
    href: (slug) => `/alternatives/${slug}`,
    heading: 'Tool comparisons',
  },
};

export default function RelatedLinks({ related }) {
  if (!related?.length) return null;

  const byType = {};
  for (const item of related) {
    (byType[item.type] ??= []).push(item);
  }

  return (
    <div style={{ marginTop: 8 }}>
      {Object.entries(byType).map(([type, items]) => {
        const config = TYPE_CONFIG[type];
        if (!config) return null;
        return (
          <p key={type} style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 4 }}>
            {config.heading}:{' '}
            {items.map((item, i, arr) => (
              <span key={item.slug}>
                <Link
                  href={config.href(item.slug)}
                  style={{ color: 'var(--gold, #c9a84c)', textDecoration: 'none' }}
                >
                  {item.label}
                </Link>
                {i < arr.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
