#!/usr/bin/env node
// Purge the Cloudflare cache after a deploy.
//
//   node scripts/purge-cache.mjs
//
// Run as Coolify's post-deployment command, inside the new container. Cached
// marketing HTML (s-maxage in next.config.mjs) points at the previous build's
// chunks, which 404 once the new container is live, so the edge copy has to go.
//
// Needs CLOUDFLARE_ZONE_ID and CLOUDFLARE_API_TOKEN (Zone > Cache Purge only)
// as runtime env. Exits 1 on failure so it shows in the deploy log.

try {
    process.loadEnvFile('.env.local');
} catch {
    // no .env.local — production carries the variables in the environment.
}

const zone = process.env.CLOUDFLARE_ZONE_ID?.trim();
const token = process.env.CLOUDFLARE_API_TOKEN?.trim();

if (!zone || !token) {
    console.error('[purge-cache] CLOUDFLARE_ZONE_ID or CLOUDFLARE_API_TOKEN not set — cache NOT purged');
    process.exit(1);
}

async function purge(label) {
    try {
        const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zone}/purge_cache`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ purge_everything: true }),
        });
        const body = await res.json().catch(() => ({}));
        if (res.ok && body.success) {
            console.log(`[purge-cache] ${label}: Cloudflare cache purged`);
            return true;
        }
        console.error(`[purge-cache] ${label}: failed (${res.status}):`, JSON.stringify(body.errors ?? body));
    } catch (err) {
        console.error(`[purge-cache] ${label}: failed:`, err?.message ?? err);
    }
    return false;
}

// Purge twice: during switchover the old container can still answer a request
// and re-cache its HTML right after the first purge.
const first = await purge('purge 1/2');
console.log('[purge-cache] waiting 60s before second purge');
await new Promise((r) => setTimeout(r, 60_000));
const second = await purge('purge 2/2');

// exitCode, not exit(): exiting while fetch sockets are still closing trips a
// libuv assertion on Windows and the exit code comes out as 127.
if (!first || !second) process.exitCode = 1;
