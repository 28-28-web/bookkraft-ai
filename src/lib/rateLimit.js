// In-memory sliding-window rate limiter — a soft limit for anonymous free
// tools. NOTE: per-process and resets on restart/redeploy. Fine for a single
// instance; if the app is scaled to multiple instances, move this to a shared
// store (DB/Redis) so the limit is global.

const buckets = new Map(); // key -> number[] of hit timestamps (ms)
let lastSweep = 0;

// Drop expired timestamps and empty IP entries so the Map can't grow unbounded.
function sweep(now, windowMs) {
    for (const [key, times] of buckets) {
        const kept = times.filter((t) => now - t < windowMs);
        if (kept.length === 0) buckets.delete(key);
        else buckets.set(key, kept);
    }
    lastSweep = now;
}

/**
 * Record a hit for `key` and report whether it's within `limit` per `windowMs`.
 * Returns { allowed, remaining, retryAfterSec }. Only counts the hit when allowed.
 */
export function rateLimit(key, limit, windowMs) {
    const now = Date.now();

    // Opportunistic global cleanup, at most once a minute, to bound memory.
    if (now - lastSweep > 60_000) sweep(now, windowMs);

    const recent = (buckets.get(key) || []).filter((t) => now - t < windowMs);

    if (recent.length >= limit) {
        buckets.set(key, recent); // keep only unexpired timestamps for this key
        const retryAfterSec = Math.max(1, Math.ceil((recent[0] + windowMs - now) / 1000));
        return { allowed: false, remaining: 0, retryAfterSec };
    }

    recent.push(now);
    buckets.set(key, recent);
    return { allowed: true, remaining: limit - recent.length, retryAfterSec: 0 };
}
