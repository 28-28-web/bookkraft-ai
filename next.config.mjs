/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Redirect HTTP to HTTPS
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://bookkraftai.com/:path*',
        permanent: true, // 301 redirect
      },
      // Redirect www to non-www (or flip it — just pick one)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.bookkraftai.com',
          },
        ],
        destination: 'https://bookkraftai.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;