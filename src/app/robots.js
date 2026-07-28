export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/account/', '/admin/', '/api/'],
      },
    ],
    sitemap: 'https://bookkraftai.com/sitemap.xml',
  };
}
