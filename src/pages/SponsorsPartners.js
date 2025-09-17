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
import { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { Footer } from '../components/shared/Footer';
var sponsors = [
    {
        name: "Hamburg Cultural Board",
        description: "Supporting cultural diversity and artistic expression in Hamburg",
        logo: "/images/sponsor1.jpg",
        website: "#"
    },
    {
        name: "Local Business Council",
        description: "Promoting community engagement and cultural events",
        logo: "/images/sponsor2.jpg",
        website: "#"
    },
    {
        name: "Arts Foundation Hamburg",
        description: "Fostering artistic growth and cultural preservation",
        logo: "/images/sponsor3.jpg",
        website: "#"
    }
];
var partners = [
    {
        name: "Hamburg University",
        description: "Academic collaboration for cultural research and education",
        logo: "/images/partner1.jpg",
        website: "#"
    },
    {
        name: "Cultural Exchange Network",
        description: "Connecting communities through cultural programs",
        logo: "/images/partner2.jpg",
        website: "#"
    },
    {
        name: "Hamburg Arts Society",
        description: "Promoting artistic collaboration and cultural events",
        logo: "/images/partner3.jpg",
        website: "#"
    }
];
function SponsorsPartners() {
    useEffect(function () {
        window.scrollTo(0, 0);
    }, []);
    return (_jsxs("div", __assign({ className: "min-h-screen bg-gray-50" }, { children: [_jsxs("main", __assign({ className: "py-16 px-4 sm:px-6 lg:px-8" }, { children: [_jsxs("section", __assign({ id: 'sponsors', className: "max-w-7xl mx-auto mb-20" }, { children: [_jsx("h1", __assign({ className: "text-4xl font-bold text-center mb-16" }, { children: "Our Sponsors" })), _jsx("div", __assign({ className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" }, { children: sponsors.map(function (sponsor, index) { return (_jsxs("div", __assign({ className: "bg-white rounded-lg shadow-lg overflow-hidden" }, { children: [_jsx("div", __assign({ className: "h-48 bg-gray-200" }, { children: _jsx("img", { src: sponsor.logo, alt: sponsor.name, className: "w-full h-full object-cover" }) })), _jsxs("div", __assign({ className: "p-6" }, { children: [_jsx("h3", __assign({ className: "text-xl font-semibold mb-2" }, { children: sponsor.name })), _jsx("p", __assign({ className: "text-gray-600 mb-4" }, { children: sponsor.description })), _jsxs("a", __assign({ href: sponsor.website, className: "inline-flex items-center text-blue-600 hover:text-blue-800" }, { children: ["Visit Website ", _jsx(ExternalLink, { className: "ml-1 w-4 h-4" })] }))] }))] }), index)); }) }))] })), _jsxs("section", __assign({ id: 'partners', className: "max-w-7xl mx-auto" }, { children: [_jsx("h2", __assign({ className: "text-4xl font-bold text-center mb-16" }, { children: "Our Partners" })), _jsx("div", __assign({ className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" }, { children: partners.map(function (partner, index) { return (_jsxs("div", __assign({ className: "bg-white rounded-lg shadow-lg overflow-hidden" }, { children: [_jsx("div", __assign({ className: "h-48 bg-gray-200" }, { children: _jsx("img", { src: partner.logo, alt: partner.name, className: "w-full h-full object-cover" }) })), _jsxs("div", __assign({ className: "p-6" }, { children: [_jsx("h3", __assign({ className: "text-xl font-semibold mb-2" }, { children: partner.name })), _jsx("p", __assign({ className: "text-gray-600 mb-4" }, { children: partner.description })), _jsxs("a", __assign({ href: partner.website, className: "inline-flex items-center text-blue-600 hover:text-blue-800" }, { children: ["Visit Website ", _jsx(ExternalLink, { className: "ml-1 w-4 h-4" })] }))] }))] }), index)); }) }))] }))] })), _jsx(Footer, {})] })));
}
export default SponsorsPartners;
