var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Helmet } from 'react-helmet-async';
export var SEOHead = function (_a) {
    var title = _a.title, description = _a.description, keywords = _a.keywords, image = _a.image, url = _a.url, _b = _a.type, type = _b === void 0 ? 'website' : _b, datePublished = _a.datePublished, dateModified = _a.dateModified, _c = _a.author, author = _c === void 0 ? 'Sanskriti e.V.' : _c, eventStartDate = _a.eventStartDate, _d = _a.eventLocation, eventLocation = _d === void 0 ? 'Hamburg, Germany' : _d, eventType = _a.eventType, performer = _a.performer, eventEndDate = _a.eventEndDate, offers = _a.offers;
    var siteUrl = 'https://sanskriti-hamburg.de';
    var fullUrl = url ? "".concat(siteUrl).concat(url) : siteUrl;
    var fullImageUrl = image ? (image.startsWith('http') ? image : "".concat(siteUrl).concat(image)) : "".concat(siteUrl, "/images/logo.png");
    var fullTitle = title.includes('Sanskriti') ? title : "".concat(title, " | Sanskriti e.V. Hamburg");
    // Generate structured data based on type
    var generateStructuredData = function () {
        var baseData = {
            '@context': 'https://schema.org',
            '@type': type === 'event' ? 'Event' : 'Organization',
            name: type === 'event' ? title : 'Sanskriti e.V.',
            description: description,
            url: fullUrl,
            image: fullImageUrl,
        };
        if (type === 'event' && eventStartDate) {
            var eventData = __assign(__assign({}, baseData), { '@type': 'Event', startDate: eventStartDate, location: {
                    '@type': 'Place',
                    name: eventLocation,
                    address: {
                        '@type': 'PostalAddress',
                        addressRegion: 'Hamburg',
                        addressLocality: 'Hamburg',
                        addressCountry: 'DE'
                    }
                }, organizer: {
                    '@type': 'Organization',
                    name: 'Sanskriti e.V.',
                    url: siteUrl
                }, eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode', eventStatus: 'https://schema.org/EventScheduled' });
            // Add end date if provided
            if (eventEndDate) {
                eventData.endDate = eventEndDate;
            }
            // Add performer if provided
            if (performer) {
                eventData.performer = {
                    '@type': 'Organization',
                    name: performer
                };
            }
            // Add offers if provided
            if (offers) {
                eventData.offers = {
                    '@type': 'Offer',
                    price: offers.price || '0',
                    priceCurrency: offers.currency || 'EUR',
                    availability: offers.availability || 'https://schema.org/InStock',
                    url: offers.url || fullUrl,
                    validFrom: offers.validFrom || eventStartDate,
                    availabilityEnds: offers.availabilityEnds || eventEndDate
                };
            }
            return eventData;
        }
        if (type === 'website' || type === 'article') {
            return __assign(__assign({}, baseData), { '@type': 'Organization', name: 'Sanskriti e.V.', alternateName: 'Sanskriti Hamburg', url: siteUrl, logo: "".concat(siteUrl, "/images/logo.png"), sameAs: [
                    'https://www.facebook.com/profile.php?id=61573798568184',
                    'https://www.youtube.com/@SanskritiHamburg'
                ], address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Hamburg',
                    addressCountry: 'Germany'
                }, contactPoint: {
                    '@type': 'ContactPoint',
                    email: 'admin@sanskriti-hamburg.de',
                    contactType: 'customer service'
                }, foundingDate: '2024', memberOf: {
                    '@type': 'Organization',
                    name: 'Registered Non-Profit Organizations Germany'
                } });
        }
        return baseData;
    };
    return (_jsxs(Helmet, { children: [_jsx("title", { children: fullTitle }), _jsx("meta", { name: "description", content: description }), keywords && _jsx("meta", { name: "keywords", content: keywords }), _jsx("meta", { name: "author", content: author }), _jsx("meta", { name: "robots", content: "index, follow" }), _jsx("meta", { name: "language", content: "en" }), _jsx("meta", { name: "revisit-after", content: "7 days" }), _jsx("meta", { property: "og:title", content: fullTitle }), _jsx("meta", { property: "og:description", content: description }), _jsx("meta", { property: "og:image", content: fullImageUrl }), _jsx("meta", { property: "og:url", content: fullUrl }), _jsx("meta", { property: "og:type", content: type }), _jsx("meta", { property: "og:site_name", content: "Sanskriti e.V. Hamburg" }), _jsx("meta", { property: "og:locale", content: "en_US" }), _jsx("meta", { name: "twitter:card", content: "summary_large_image" }), _jsx("meta", { name: "twitter:title", content: fullTitle }), _jsx("meta", { name: "twitter:description", content: description }), _jsx("meta", { name: "twitter:image", content: fullImageUrl }), type === 'article' && datePublished && (_jsx("meta", { property: "article:published_time", content: datePublished })), type === 'article' && dateModified && (_jsx("meta", { property: "article:modified_time", content: dateModified })), type === 'article' && (_jsx("meta", { property: "article:author", content: author })), _jsx("meta", { name: "theme-color", content: "#005F73" }), _jsx("meta", { name: "msapplication-TileColor", content: "#005F73" }), _jsx("link", { rel: "canonical", href: fullUrl }), _jsx("script", __assign({ type: "application/ld+json" }, { children: JSON.stringify(generateStructuredData()) }))] }));
};
