import { upcomingEvents } from 'types';

export const generateSitemap = () => {
  const baseUrl = 'https://sanskriti-hamburg.de';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/sponsors-partners', priority: '0.7', changefreq: 'monthly' },
    { url: '/membership/request', priority: '0.8', changefreq: 'monthly' },
  ];
  
  const eventPages = upcomingEvents.map(event => ({
    url: event.link,
    priority: '0.8',
    changefreq: 'weekly'
  }));
  
  const allPages = [...staticPages, ...eventPages];
  
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  return sitemapXml;
};

export const generateRobotsTxt = () => {
  const baseUrl = 'https://sanskriti-hamburg.de';
  
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin and development files
Disallow: /admin/
Disallow: /.git/
Disallow: /node_modules/
Disallow: /src/
Disallow: /build/
Disallow: /public/
Disallow: /dummy

# Allow important files
Allow: /images/
Allow: /static/
Allow: /.well-known/`;
};
