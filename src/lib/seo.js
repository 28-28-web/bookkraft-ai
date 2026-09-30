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

// "Check your EPUB first" video, embedded on / and /kdp-quality-issues.
export const EPUB_CHECK_VIDEO_ID = 'QDtwukJXtiM';

// Values from the YouTube listing. duration uses its lengthSeconds (75); the
// watch page's own meta rounds that up to PT1M16S.
export const epubCheckVideoSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'KDP Sent Your Book Back? Check Your EPUB File First (Free)',
  description: 'KDP sent your book back? Often the problem is the file, not your writing. This short video shows how to check your EPUB with BookKraft AI’s free EPUB Validator. It runs in your browser, needs no signup, and explains problems in plain English.',
  thumbnailUrl: 'https://bookkraftai.com/images/video-thumb-1280.webp',
  uploadDate: '2026-09-30T11:18:23-07:00',
  duration: 'PT1M15S',
  embedUrl: `https://www.youtube.com/embed/${EPUB_CHECK_VIDEO_ID}`,
};
