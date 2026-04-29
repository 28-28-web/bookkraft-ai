/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false, // Enforce no trailing slash (matches your canonical)

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
        permanent: true,
      },
      // Redirect www to non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            key: 'host',
            value: 'www.bookkraftai.com',
          },
        ],
        destination: 'https://bookkraftai.com/:path*',
        permanent: true,
      },
      // Redirect trailing slash to no trailing slash
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;