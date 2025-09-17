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
import { Calendar, MapPin } from 'lucide-react';
import { Footer } from '../../components/shared/Footer';
import { SEOHead } from '../../components/SEO/SEOHead';
import { getEventDate } from '../../utils/eventUtils';
function Diwali2025() {
    useEffect(function () {
        window.scrollTo(0, 0);
    }, []);
    var eventDate = getEventDate('/events/diwali-2025');
    return (_jsxs("div", __assign({ className: "min-h-screen bg-inherit" }, { children: [_jsx(SEOHead, { title: "Diwali 2025 \u2013 Festival of Lights in Hamburg | Sanskriti Hamburg", description: "Celebrate Diwali 2025 with Sanskriti e.V. in Hamburg. Join us for the Festival of Lights with traditional puja, cultural performances, rangoli decorations, and community celebrations. Experience the joy of victory of light over darkness.", keywords: "Diwali 2025, Hamburg, Festival of Lights, Deepavali, Indian festival, rangoli, cultural performances, Sanskriti Hamburg, diyas, Hindu festival, community celebration", url: "/events/diwali-2025", type: "event", image: "/images/candles-among-diwali-designs.jpg", eventStartDate: "2025-11-01", eventLocation: "Hamburg, Germany", eventType: "Cultural Festival", performer: "Sanskriti e.V. Hamburg Community", offers: {
                    price: "0",
                    currency: "EUR",
                    availability: "https://schema.org/InStock",
                    url: "/events/diwali-2025"
                } }), _jsxs("div", __assign({ className: "relative h-[60vh]" }, { children: [_jsx("img", { src: "/images/candles-among-diwali-designs.jpg", alt: "Diwali Celebration", className: "w-full h-full object-cover" }), _jsx("div", __assign({ className: "absolute inset-0 bg-black/30 flex items-center justify-center" }, { children: _jsxs("div", __assign({ className: "text-center text-white" }, { children: [_jsx("h1", __assign({ className: "text-5xl md:text-6xl font-bold mb-4" }, { children: "Diwali 2025" })), _jsxs("div", __assign({ className: "flex items-center justify-center space-x-2" }, { children: [_jsx(Calendar, { className: "w-6 h-6" }), _jsx("p", __assign({ className: "text-xl" }, { children: eventDate })), _jsx(MapPin, { className: "w-6 h-6 ml-4" }), _jsx("p", __assign({ className: "text-xl" }, { children: "Hamburg, Germany" }))] }))] })) }))] })), _jsxs("main", __assign({ className: "min-w-[70vw] mx-auto px-4 py-16" }, { children: [_jsxs("section", __assign({ className: "prose lg:prose-xl mx-auto mb-16 w-full" }, { children: [_jsx("h2", __assign({ className: 'text-lg font-semibold my-2' }, { children: "The Festival of Lights" })), _jsx("p", { children: "Diwali, also known as Deepavali, is one of the most celebrated festivals in India and around the world. It symbolizes the victory of light over darkness, good over evil, and knowledge over ignorance. Homes are decorated with lamps, candles, and rangoli, and families come together to share joy, sweets, and blessings." })] })), _jsxs("section", __assign({ className: "prose lg:prose-xl mx-auto mb-16" }, { children: [_jsx("h2", __assign({ className: 'text-lg font-semibold my-2' }, { children: "Event Highlights" })), _jsxs("ul", __assign({ className: "list-disc pl-6" }, { children: [_jsx("li", { children: "Traditional Diwali puja and lighting of diyas" }), _jsx("li", { children: "Cultural performances and music" }), _jsx("li", { children: "Delicious Indian festive foods and sweets" }), _jsx("li", { children: "Rangoli and art activities for kids" }), _jsx("li", { children: "Fireworks (subject to local regulations)" }), _jsx("li", { children: "Community gathering to celebrate togetherness" })] }))] })), _jsxs("section", __assign({ className: "prose lg:prose-xl mx-auto mb-16" }, { children: [_jsx("h2", __assign({ className: 'text-lg font-semibold my-2' }, { children: "Sanskriti's Vision" })), _jsx("p", { children: "Sanskriti e.V. is delighted to bring the spirit of Diwali to Hamburg. Our celebration aims to unite families, friends, and the wider community in a vibrant and joyous atmosphere. We invite everyone to join us in spreading light, happiness, and cultural heritage." })] })), _jsxs("section", __assign({ className: "prose lg:prose-xl mx-auto mb-16 bg-inherit p-6 rounded-lg text-center" }, { children: [_jsx("h3", __assign({ className: "text-xl font-semibold mb-4" }, { children: "Get Involved" })), _jsx("p", { children: "Would you like to perform, volunteer, or help organize the event? We welcome your participation and support!" }), _jsx("a", __assign({ href: "mailto:admin@sanskriti-hamburg.de", target: '_blank', rel: 'noreferrer', className: "inline-block mt-4 bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors" }, { children: "Contact Us to Participate" }))] }))] })), _jsx(Footer, {})] })));
}
export default Diwali2025;
