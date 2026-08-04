export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/', '/account/', '/admin/', '/api/',
          '/checkout/', '/history/', '/onboarding/', '/upgrade/', '/forgot-password/',
        ],
      },
    ],
    sitemap: 'https://bookkraftai.com/sitemap.xml',
  };
}
