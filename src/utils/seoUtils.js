var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { upcomingEvents } from '../types/events';
export var generateSitemap = function () {
    var baseUrl = 'https://sanskriti-hamburg.de';
    var currentDate = new Date().toISOString().split('T')[0];
    var staticPages = [
        { url: '', priority: '1.0', changefreq: 'weekly' },
        { url: '/sponsors-partners', priority: '0.7', changefreq: 'monthly' },
        { url: '/membership/request', priority: '0.8', changefreq: 'monthly' },
    ];
    var eventPages = upcomingEvents.map(function (event) { return ({
        url: event.link,
        priority: '0.8',
        changefreq: 'weekly'
    }); });
    var allPages = __spreadArray(__spreadArray([], staticPages, true), eventPages, true);
    var sitemapXml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n".concat(allPages.map(function (page) { return "  <url>\n    <loc>".concat(baseUrl).concat(page.url, "</loc>\n    <lastmod>").concat(currentDate, "</lastmod>\n    <changefreq>").concat(page.changefreq, "</changefreq>\n    <priority>").concat(page.priority, "</priority>\n  </url>"); }).join('\n'), "\n</urlset>");
    return sitemapXml;
};
export var generateRobotsTxt = function () {
    var baseUrl = 'https://sanskriti-hamburg.de';
    return "User-agent: *\nAllow: /\n\n# Sitemap\nSitemap: ".concat(baseUrl, "/sitemap.xml\n\n# Disallow admin and development files\nDisallow: /admin/\nDisallow: /.git/\nDisallow: /node_modules/\nDisallow: /src/\nDisallow: /build/\nDisallow: /public/\nDisallow: /dummy\n\n# Allow important files\nAllow: /images/\nAllow: /static/\nAllow: /.well-known/");
};
