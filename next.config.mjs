import { PHASE_PRODUCTION_BUILD } from 'next/constants.js';

// NEXT_PUBLIC_* values are inlined into the client bundle at build time. A
// missing one doesn't error, it ships as `undefined` and breaks at runtime
// (that's how checkout broke on Coolify). Fail the production build instead.
// Optional by design, so not listed: NEXT_PUBLIC_TURNSTILE_SITE_KEY (widget
// hides without it) and NEXT_PUBLIC_PADDLE_PRICE_HEADSHOT_* (/credits shows
// "not available"). GA and Clarity IDs are hardcoded, not env.
const REQUIRED_PUBLIC_ENV = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_PADDLE_CLIENT_TOKEN',
  'NEXT_PUBLIC_PADDLE_ENVIRONMENT',
];

function checkPublicEnv() {
  const env = (k) => process.env[k]?.trim();
  const errors = REQUIRED_PUBLIC_ENV.filter((k) => !env(k)).map((k) => `${k} is missing or empty`);

  const url = env('NEXT_PUBLIC_SUPABASE_URL');
  if (url && !/^https:\/\/\S+$/.test(url)) errors.push('NEXT_PUBLIC_SUPABASE_URL must be an https:// URL');

  const paddleEnv = env('NEXT_PUBLIC_PADDLE_ENVIRONMENT');
  const token = env('NEXT_PUBLIC_PADDLE_CLIENT_TOKEN');
  if (paddleEnv && !['sandbox', 'production'].includes(paddleEnv)) {
    errors.push(`NEXT_PUBLIC_PADDLE_ENVIRONMENT must be "sandbox" or "production" (got "${paddleEnv}")`);
  } else if (paddleEnv && token) {
    // Paddle client-side tokens are prefixed live_ (production) or test_ (sandbox);
    // this also catches placeholder values like "your_token_here".
    const prefix = paddleEnv === 'production' ? 'live_' : 'test_';
    if (!token.startsWith(prefix)) {
      errors.push(`NEXT_PUBLIC_PADDLE_CLIENT_TOKEN must start with "${prefix}" when NEXT_PUBLIC_PADDLE_ENVIRONMENT is "${paddleEnv}"`);
    }
  }

  if (errors.length) {
    throw new Error(
      `\n\nBuild stopped: required public environment variables are not set correctly.\n` +
      errors.map((e) => `  - ${e}`).join('\n') +
      `\n\nNEXT_PUBLIC_* values are baked in at build time. In Coolify, set them as build-time variables, then redeploy.\n`
    );
  }
}

// Old Ghost blog. Cloudflare 301s blog.bookkraftai.com/<path> to
// /old-blog/<path> with the trailing slash removed (Next strips a trailing
// slash with its own 308 before these rules run, which would add a hop).
// Each rule sends the old URL straight to its final page.
const OLD_BLOG = {
  'fix-epub-errors-kdp': '/blog/common-epub-validation-errors',
  'kdp-rejecting-epub-fix': '/blog/common-epub-validation-errors',
  'how-to-format-an-ebook-for-free-in-2026': '/blog/how-to-format-an-ebook-for-free-in-2026',
  'kdp-no-toc-found-fix': '/blog/kdp-no-toc-found-fix',
  'what-is-bookkraft-ai-and-why-we-built-it': '/blog/what-is-bookkraft-ai-and-why-we-built-it',
  'best-ebook-formats-epub-vs-pdf-vs-mobi': '/blog/best-ebook-formats-epub-vs-pdf-vs-mobi',
  'ghost-spacing-opf-errors-epub-fix': '/blog/ghost-spacing-opf-errors-epub-fix',
  'about': '/blog/what-is-bookkraft-ai-and-why-we-built-it', // no /about page
  'privacy-policy': '/privacy',
  'terms-of-service': '/terms',
};
const oldBlogRedirects = [
  ...Object.entries(OLD_BLOG).map(([slug, destination]) => ({ source: `/old-blog/${slug}`, destination, permanent: true })),
  { source: '/old-blog', destination: '/blog', permanent: true },
  { source: '/old-blog/:path*', destination: '/blog', permanent: true },
];

/** @type {import('next').NextConfig} */
export const nextConfig = { // named export: src/lib/ghost.js reads redirects()
  output: 'standalone',
  // The handbook EPUBs are read from disk by their download route, which checks
  // the user's plan first. They sit outside public/ so there is no static URL,
  // and this makes the standalone build copy them next to the route.
  outputFileTracingIncludes: {
    '/api/downloads/handbook': ['./private/downloads/**/*'],
  },
  trailingSlash: false,
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
  // E: is a network/slow drive — native fs change events don't reliably
  // reach the dev watcher (both webpack and Turbopack use this same key;
  // see hot-reloader-turbopack.js and webpack-config.js). There is no
  // separate aggregateTimeout knob in this Next version's schema.
  watchOptions: {
    pollIntervalMs: 1000,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    minimumCacheTTL: 31536000,
  },
  async redirects() {
    return [
         {
          source: '/:path*',
          has: [{ type: 'host', value: 'www.bookkraftai.com' }],
          destination: 'https://bookkraftai.com/:path*',
          permanent: true,
        },
        // blog.bookkraftai.com → /blog is a Cloudflare 301 rule, not handled here.
        {
         source: '/:path*',
         has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
         destination: 'https://bookkraftai.com/:path*',
         permanent: true,
       },
      ...oldBlogRedirects,
      {
        source: '/epub-validator',
        destination: '/tools/epub-validator',
        permanent: true,
      },
      {
        source: '/kindle-format-fixer',
        destination: '/tools/kindle-format-fixer',
        permanent: true,
      },
      {
        source: '/metadata-builder',
        destination: '/tools/metadata-builder',
        permanent: true,
      },
      // Consolidated blog posts — merged into common-epub-validation-errors.
      {
        source: '/blog/fix-epub-errors-kdp',
        destination: '/blog/common-epub-validation-errors',
        permanent: true,
      },
      {
        source: '/blog/kdp-rejecting-epub-fix',
        destination: '/blog/common-epub-validation-errors',
        permanent: true,
      },
      // Cannibalizing duplicate — merged into the comprehensive EPUB vs PDF vs MOBI post.
      {
        source: '/blog/epub-vs-mobi-vs-pdf-kdp',
        destination: '/blog/best-ebook-formats-epub-vs-pdf-vs-mobi',
        permanent: true,
      },
      // Duplicate of the cover mistakes page — unique content merged there.
      {
        source: '/blog/kdp-cover-requirements-mistakes',
        destination: '/mistakes/ebook-cover-mistakes',
        permanent: true,
      },
      // Legacy Ghost sub-sitemaps. Nothing links to them; Google may still
      // have them from the Ghost era. Redirect (not 410) so fetches resolve to
      // a valid sitemap instead of logging "Couldn't fetch" errors in GSC.
      {
        source: '/sitemap-:kind(posts|pages|tags|authors).xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      // The book prints BOOKKRAFTAI.COM/B1 (no slash). Source matching is not
      // case-sensitive, so this also catches /b1. It cannot match /b/1 itself,
      // which is what made the old /B/:n rule loop.
      {
        source: '/B:n(\\d{1,3})',
        destination: '/b/:n',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            // Marketing HTML: Cloudflare's cache rule uses this as the edge TTL.
            // Kept short because a cached page points at the previous build's
            // chunks, which 404 after deploy (that's why s-maxage=86400 was
            // dropped). Browsers always revalidate. App/API paths override below.
            value: 'public, max-age=0, s-maxage=300, must-revalidate',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.paddle.com https://www.googletagmanager.com https://static.cloudflareinsights.com https://www.clarity.ms https://scripts.clarity.ms https://public.profitwell.com https://files.tlt-cdn.com https://cdn.jsdelivr.net https://challenges.cloudflare.com",
              "connect-src 'self' https://api.paddle.com https://sandbox-api.paddle.com https://cdn.paddle.com https://*.supabase.co https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.google.com https://cloudflareinsights.com https://*.clarity.ms https://public.profitwell.com https://files.tlt-cdn.com https://api.tolt.io",
              "media-src 'self' https://assets.bookkraftai.com",
              "frame-src 'self' https://paddle.com https://*.paddle.com https://challenges.cloudflare.com https://www.youtube-nocookie.com",
              "img-src 'self' data: https: blob:",
              "style-src 'self' 'unsafe-inline' https://cdn.paddle.com",
            ].join('; '),
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/',
        has: [{ type: 'query', key: 'ref' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      {
        source: '/login',
        has: [{ type: 'query', key: 'redirect' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      {
        source: '/admin',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      {
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      {
        source: '/dashboard',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      {
        source: '/dashboard/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      {
        // Must come AFTER the /(.*) catch-all so it wins the Cache-Control key.
        // User, app, auth and API paths: no caching at any layer, whether or not
        // the Cloudflare cache rule excludes them. /login and /signup run the
        // session proxy (signed-in redirect, refreshed cookies); OAuth codes on
        // /auth/callback are single-use. Route handlers can't override this:
        // Next skips a handler's Cache-Control when config already set one.
        source: '/:p(dashboard|account|history|credits|onboarding|admin|api|checkout|auth|login|signup|welcome|forgot-password)/:path*',
        headers: [{ key: 'Cache-Control', value: 'private, no-store' }],
      },
    ];
  },
};
export default function config(phase) {
  if (phase === PHASE_PRODUCTION_BUILD) checkPublicEnv();
  return nextConfig;
}