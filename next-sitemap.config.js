/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://bookkraftai.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  transform: async (config, path) => {
    try {
      await fetch(
        `https://api.indexnow.org/indexnow?url=${config.siteUrl}${path}&key=462dc3ce6a474e9fac2a2423c20fe204`
      )
    } catch (e) {}
    return {
      loc: path,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }
  },
}