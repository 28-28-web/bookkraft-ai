import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://bookkraftai.com', lastModified: new Date(), priority: 1.0 },
    { url: 'https://bookkraftai.com/#features', lastModified: new Date(), priority: 0.8 },
    { url: 'https://bookkraftai.com/#pricing', lastModified: new Date(), priority: 0.8 },
    { url: 'https://bookkraftai.com/#faq', lastModified: new Date(), priority: 0.7 },
    // Add more pages as needed
  ]
}
