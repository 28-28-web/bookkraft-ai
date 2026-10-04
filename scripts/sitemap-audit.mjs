#!/usr/bin/env node
// Audit every URL in the sitemap against a running server.
//
//   npm run build && npm start          # in one terminal
//   node scripts/sitemap-audit.mjs      # defaults to http://localhost:3000
//   node scripts/sitemap-audit.mjs https://bookkraftai.com
//
// Each URL must: return 200 with no redirect, carry no noindex (meta or
// X-Robots-Tag), have a canonical equal to its own sitemap <loc>, have no
// query string, not be a private/auth page, and appear only once.
// Exits 1 when anything fails, so it can gate a deploy.

const PROD = 'https://bookkraftai.com';
const base = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '');
const PRIVATE = /^\/(login|signup|dashboard|checkout|account|admin|onboarding|history|upgrade|forgot-password|auth|api)(\/|$)/;
const CONCURRENCY = 8;

const strip = (u) => u.replace(/\/$/, '');
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1];

async function check(loc) {
    const problems = [];
    const url = new URL(loc);
    if (url.search) problems.push('query string');
    if (PRIVATE.test(url.pathname)) problems.push('private page');

    let res;
    try {
        res = await fetch(base + url.pathname + url.search, { redirect: 'manual' });
    } catch (err) {
        return [...problems, `fetch failed: ${err.message}`];
    }
    if (res.status !== 200) {
        const to = res.headers.get('location');
        return [...problems, `HTTP ${res.status}${to ? ` -> ${to}` : ''}`];
    }

    if (/noindex/i.test(res.headers.get('x-robots-tag') || '')) problems.push('X-Robots-Tag noindex');
    // Only the <head> matters, and Next may stream a large body after it.
    const head = (await res.text()).split(/<\/head>/i)[0];

    for (const tag of head.match(/<meta\b[^>]*>/gi) || []) {
        if (/^(robots|googlebot)$/i.test(attr(tag, 'name') || '') && /noindex/i.test(attr(tag, 'content') || '')) {
            problems.push(`meta ${attr(tag, 'name')} noindex`);
        }
    }

    const canonicals = (head.match(/<link\b[^>]*>/gi) || [])
        .filter((tag) => /^canonical$/i.test(attr(tag, 'rel') || ''))
        .map((tag) => attr(tag, 'href'));
    if (canonicals.length === 0) problems.push('no canonical');
    else if (canonicals.length > 1) problems.push(`${canonicals.length} canonicals`);
    else if (strip(new URL(canonicals[0], PROD).href) !== strip(loc)) problems.push(`canonical -> ${canonicals[0]}`);

    return problems;
}

async function main() {
    const res = await fetch(`${base}/sitemap.xml`);
    if (!res.ok) throw new Error(`${base}/sitemap.xml returned ${res.status}`);
    const locs = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

    const failures = [];
    const seen = new Set();
    for (const loc of locs) {
        if (seen.has(loc)) failures.push({ url: loc, problems: ['duplicate in sitemap'] });
        seen.add(loc);
    }

    const queue = [...seen];
    await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
        while (queue.length) {
            const loc = queue.shift();
            const problems = await check(loc);
            if (problems.length) failures.push({ url: loc, problems });
        }
    }));

    console.log(`Checked ${seen.size} unique URLs (${locs.length} <loc> entries) against ${base}`);
    if (failures.length === 0) {
        console.log('All URLs pass.');
        return;
    }
    failures.sort((a, b) => a.url.localeCompare(b.url));
    console.table(failures.map(({ url, problems }) => ({ url: url.replace(PROD, '') || '/', problems: problems.join('; ') })));
    console.log(`${failures.length} failing URL(s).`);
    process.exitCode = 1;
}

main().catch((err) => {
    console.error(`[sitemap-audit] ${err.message}`);
    process.exitCode = 1;
});
