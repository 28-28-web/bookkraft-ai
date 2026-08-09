/**
 * buildBreadcrumbSchema — generates BreadcrumbList JSON-LD.
 * items: [{ name: string, url: string }, ...]
 * The last item is the current page; include its URL so Google can
 * match it to the canonical.
 */
export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
