#!/usr/bin/env node
// Inbound internal-link counts for the linking clusters.
//
//   node scripts/link-count.mjs [baseUrl] [--save before.json] [--compare before.json]
//
// Crawls every URL in the sitemap of a running build (default
// http://localhost:3000), reads links inside <main> only (navbar and footer
// are excluded), counts each source page once per target, and prints:
//   1. inbound counts for the cluster pages and the five priority pages
//   2. a cluster check: spoke → hub, hub → spokes, educational links, tool CTA
// Not part of the build; run it by hand against `next start`.

const args = process.argv.slice(2);
const base = (args.find((a) => /^https?:\/\//.test(a)) || 'http://localhost:3000').replace(/\/$/, '');
const flag = (name) => { const i = args.indexOf(name); return i === -1 ? null : args[i + 1]; };
const saveTo = flag('--save');
const compareTo = flag('--compare');

const CLUSTERS = {
  EPUB: {
    hub: '/tools/epub-validator',
    spokes: ['/epub-formatting-guide', '/blog/common-epub-validation-errors', '/how-to-make-epub-file', '/epub-fonts', '/epub-images', '/epub-errors/*'],
  },
  'KDP Formatting': {
    hub: '/kdp-formatting-guide',
    spokes: ['/kindle-epub-format', '/manuscript-format', '/chapter-breaks-epub', '/epub-toc-guide', '/tools/toc-generator', '/book-front-matter', '/blog/kindle-formatting-mistakes', '/tools/epub-validator'],
  },
  Covers: {
    hub: '/book-cover-size',
    spokes: ['/cover-requirements/*'],
  },
};
const PRIORITY = ['/tools/epub-validator', '/blog/common-epub-validation-errors', '/kdp-formatting-guide', '/blog/what-is-amazon-kdp-guide-for-new-authors', '/cover-requirements/kdp-print-cover'];

const isTool = (p) => p.startsWith('/tools/');
const norm = (href) => {
  let h = href.replace(/&amp;/g, '&').replace(/^https?:\/\/(www\.)?bookkraftai\.com/, '');
  if (!h.startsWith('/') || h.startsWith('//')) return null;
  h = h.split('#')[0].split('?')[0];
  if (h.length > 1) h = h.replace(/\/$/, '');
  if (/^\/(_next|api|images|brand|fonts)\b|\.\w{2,4}$/.test(h)) return null;
  return h;
};
const mainLinks = (html) => {
  const out = new Set();
  for (const m of html.matchAll(/<main[\s>][\s\S]*?<\/main>/g)) {
    for (const a of m[0].matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
      const n = norm(a[1]);
      if (n) out.add(n);
    }
  }
  return out;
};

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => norm(m[1].trim())).filter(Boolean);
const outbound = new Map();
let i = 0;
async function worker() {
  while (i < pages.length) {
    const p = pages[i++];
    try {
      const res = await fetch(base + p);
      outbound.set(p, res.ok ? mainLinks(await res.text()) : new Set());
      if (!res.ok) console.warn(`! ${res.status} ${p}`);
    } catch (e) { console.warn(`! fetch failed ${p}: ${e.message}`); outbound.set(p, new Set()); }
  }
}
await Promise.all(Array.from({ length: 8 }, worker));

const inbound = new Map();
for (const [src, links] of outbound) for (const t of links) if (t !== src) inbound.set(t, (inbound.get(t) || 0) + 1);

const expand = (s) => (s.endsWith('/*') ? pages.filter((p) => p.startsWith(s.slice(0, -1))) : [s]);
const clusterPages = new Set(PRIORITY);
for (const c of Object.values(CLUSTERS)) { clusterPages.add(c.hub); c.spokes.flatMap(expand).forEach((p) => clusterPages.add(p)); }
const counts = Object.fromEntries([...clusterPages].sort().map((p) => [p, inbound.get(p) || 0]));

const prev = compareTo ? JSON.parse((await import('fs')).readFileSync(compareTo, 'utf8')) : null;
console.log(`\nInbound links (unique source pages, <main> only) — ${pages.length} pages crawled\n`);
console.log(prev ? 'before  after  page' : 'count  page');
for (const [p, n] of Object.entries(counts)) {
  const mark = PRIORITY.includes(p) ? ' *' : '';
  console.log(prev ? `${String(prev.counts?.[p] ?? '-').padStart(6)} ${String(n).padStart(6)}  ${p}${mark}` : `${String(n).padStart(5)}  ${p}${mark}`);
}
console.log('\n* = priority page (target: 3+ inbound)');

console.log('\nCluster check');
const report = {};
for (const [name, c] of Object.entries(CLUSTERS)) {
  const spokes = c.spokes.flatMap(expand).filter((p) => p !== c.hub);
  const hubOut = outbound.get(c.hub) || new Set();
  const missingFromHub = spokes.filter((s) => !hubOut.has(s));
  console.log(`\n${name} (hub ${c.hub}): hub links ${spokes.length - missingFromHub.length}/${spokes.length} spokes`);
  if (missingFromHub.length) console.log(`  hub missing: ${missingFromHub.join(', ')}`);
  for (const s of spokes) {
    const out = outbound.get(s);
    if (!out) { console.log(`  ? ${s} not in sitemap`); continue; }
    const toHub = out.has(c.hub);
    const edu = [...out].filter((t) => !isTool(t) && t !== s && t !== '/').length;
    const tool = [...out].some(isTool);
    report[s] = { toHub, edu, tool };
    const issues = [!toHub && 'no hub link', edu < 2 && `${edu} edu links`, !tool && 'no tool CTA'].filter(Boolean);
    if (issues.length) console.log(`  ${s}: ${issues.join(', ')}`);
  }
}

if (saveTo) {
  (await import('fs')).writeFileSync(saveTo, JSON.stringify({ base, crawled: pages.length, counts, report }, null, 2));
  console.log(`\nSaved to ${saveTo}`);
}
