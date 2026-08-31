/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
        has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
        destination: 'https://bookkraftai.com/:path*',
        permanent: true,
      },
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
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
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=86400, must-revalidate',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.paddle.com https://www.googletagmanager.com https://static.cloudflareinsights.com https://www.clarity.ms https://scripts.clarity.ms https://public.profitwell.com https://files.tlt-cdn.com https://cdn.jsdelivr.net",
              "connect-src 'self' https://api.paddle.com https://sandbox-api.paddle.com https://cdn.paddle.com https://*.supabase.co https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.google.com https://static.cloudflareinsights.com https://*.clarity.ms https://public.profitwell.com https://files.tlt-cdn.com https://api.tolt.io",
              "frame-src 'self' https://paddle.com https://*.paddle.com",
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
        // OAuth codes are single-use — no caching at any layer.
        source: '/auth/callback',
        headers: [{ key: 'Cache-Control', value: 'no-store' }],
      },
    ];
  },
};
export default nextConfig;