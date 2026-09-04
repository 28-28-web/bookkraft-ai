#!/usr/bin/env node
// Submit URLs to IndexNow.
//
//   node scripts/indexnow-submit.mjs                    # every URL in the live sitemap
//   node scripts/indexnow-submit.mjs --tools            # the 11 tool pages only
//   node scripts/indexnow-submit.mjs /tools/epub-formatter /blog/foo
//
// Exits 0 even when the submission is skipped or rejected — this runs after a
// build, and IndexNow is best-effort. A non-zero exit would fail deploys for a
// service that owes us nothing.

const BASE = 'https://bookkraftai.com';

const TOOL_SLUGS = [
    'back-matter-generator',
    'css-snippet-generator',
    'epub-formatter',
    'epub-validator-premium',
    'front-matter-generator',
    'kdp-keyword-finder',
    'kindle-format-fixer',
    'manuscript-cleanup',
    'print-to-digital',
    'style-sheet-auditor',
    'toc-generator',
];

async function urlsFromSitemap() {
    const res = await fetch(`${BASE}/sitemap.xml`);
    if (!res.ok) throw new Error(`sitemap returned ${res.status}`);
    const xml = await res.text();
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function main() {
    const args = process.argv.slice(2);
    const explicit = args.filter((a) => !a.startsWith('--'));

    let urls;
    if (explicit.length > 0) {
        urls = explicit;
        console.log(`[indexnow] submitting ${urls.length} url(s) from arguments`);
    } else if (args.includes('--tools')) {
        urls = TOOL_SLUGS.map((s) => `${BASE}/tools/${s}`);
        console.log(`[indexnow] submitting ${urls.length} tool page(s)`);
    } else {
        urls = await urlsFromSitemap();
        console.log(`[indexnow] submitting ${urls.length} url(s) from sitemap.xml`);
    }

    const { submitToIndexNow } = await import('../src/lib/indexnow.js');
    const result = await submitToIndexNow(urls);

    if (result.ok) {
        console.log(`[indexnow] accepted (HTTP ${result.status}) — ${result.submitted} url(s)`);
    } else {
        console.warn(`[indexnow] not submitted — ${result.reason ?? `HTTP ${result.status}`}`);
    }
}

main().catch((err) => {
    console.warn('[indexnow] script error:', err?.message ?? err);
});
