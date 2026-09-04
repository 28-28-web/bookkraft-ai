// IndexNow — notify participating search engines (Bing, Yandex, Seznam, Naver)
// that URLs have changed, instead of waiting to be recrawled.
//
// Best-effort by design: every failure is logged and swallowed. Nothing here
// may throw into a publish, build, or request path — a missed ping costs a
// slower recrawl, never a broken deploy.
//
// The key is a plain string that must also be served as a text file at
// https://<host>/<key>.txt (public/<key>.txt), which is how IndexNow verifies
// that whoever submits the URLs controls the domain.

const ENDPOINT = 'https://api.indexnow.org/indexnow';
const HOST = 'bookkraftai.com';
const BASE = `https://${HOST}`;

// IndexNow accepts at most 10,000 URLs per request.
const MAX_URLS_PER_REQUEST = 10000;

/**
 * Submit URLs to IndexNow.
 *
 * @param {string[]} urls Absolute URLs on this host, or site-root paths.
 * @returns {Promise<{ok: boolean, status?: number, submitted: number, reason?: string}>}
 *          Never rejects.
 */
export async function submitToIndexNow(urls) {
    const key = process.env.INDEXNOW_KEY;
    if (!key) {
        console.warn('[indexnow] INDEXNOW_KEY not set — skipping submission');
        return { ok: false, submitted: 0, reason: 'no_key' };
    }

    const urlList = [...new Set((urls || []).filter(Boolean).map(toAbsolute))].filter((u) =>
        u.startsWith(`${BASE}/`)
    );

    if (urlList.length === 0) {
        return { ok: false, submitted: 0, reason: 'no_urls' };
    }
    if (urlList.length > MAX_URLS_PER_REQUEST) {
        urlList.length = MAX_URLS_PER_REQUEST;
    }

    try {
        const res = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({
                host: HOST,
                key,
                keyLocation: `${BASE}/${key}.txt`,
                urlList,
            }),
        });

        // 200 accepted, 202 accepted but key still being validated. Anything
        // else is a real problem worth seeing in the logs, but not worth
        // failing the caller over.
        if (res.status !== 200 && res.status !== 202) {
            console.warn(`[indexnow] submission returned ${res.status} for ${urlList.length} url(s)`);
            return { ok: false, status: res.status, submitted: 0 };
        }

        return { ok: true, status: res.status, submitted: urlList.length };
    } catch (err) {
        console.warn('[indexnow] submission failed:', err?.message ?? err);
        return { ok: false, submitted: 0, reason: 'fetch_failed' };
    }
}

/** Convenience wrapper for a single URL or path. */
export function submitUrlToIndexNow(url) {
    return submitToIndexNow([url]);
}

function toAbsolute(url) {
    const u = String(url).trim();
    if (u.startsWith('http://') || u.startsWith('https://')) return u;
    return `${BASE}${u.startsWith('/') ? '' : '/'}${u}`;
}
