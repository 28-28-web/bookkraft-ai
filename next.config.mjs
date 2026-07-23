/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: false,
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
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
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.paddle.com https://www.googletagmanager.com https://static.cloudflareinsights.com https://www.clarity.ms https://scripts.clarity.ms https://public.profitwell.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://www.googletagservices.com https://adservice.google.com",
              "connect-src 'self' https://api.paddle.com https://sandbox-api.paddle.com https://cdn.paddle.com https://*.supabase.co https://www.googletagmanager.com https://static.cloudflareinsights.com https://*.clarity.ms https://public.profitwell.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net",
              "frame-src 'self' https://paddle.com https://*.paddle.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
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
    ];
  },
};
export default nextConfig;