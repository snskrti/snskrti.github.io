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
function Rakhi2025() {
    useEffect(function () {
        window.scrollTo(0, 0);
    }, []);
    var eventDate = getEventDate('/events/rakhi-2025');
    return (_jsxs("div", __assign({ className: "min-h-screen bg-inherit" }, { children: [_jsx(SEOHead, { title: "Raksha Bandhan 2025 \u2013 Rakhi Festival in Hamburg | Sanskriti Hamburg", description: "Celebrate Raksha Bandhan 2025 with Sanskriti e.V. in Hamburg. Join us for the sacred festival of brother-sister bond with traditional rakhi tying ceremonies, cultural programs, and family celebrations.", keywords: "Raksha Bandhan 2025, Hamburg, Rakhi festival, brother sister bond, Indian festival, traditional ceremony, Sanskriti Hamburg, family celebration, cultural event", url: "/events/rakhi-2025", type: "event", image: "/images/rakhi-event-banner-2025.jpg", eventStartDate: "2025-08-03T00:00", eventLocation: "Hamburg, Germany", eventType: "Cultural Festival", performer: "Sanskriti e.V. Hamburg Community", offers: {
                    price: "0",
                    currency: "EUR",
                    availability: "https://schema.org/InStock",
                    url: "/events/rakhi-2025"
                } }), _jsxs("div", __assign({ className: "relative h-[60vh]" }, { children: [_jsx("img", { src: "/images/rakhi-event-banner-2025.jpg", alt: "Raksha Bandhan Celebration", className: "w-full h-full object-cover" }), _jsx("div", __assign({ className: "absolute inset-0 bg-black/30 flex items-center justify-center" }, { children: _jsxs("div", __assign({ className: "text-center text-white" }, { children: [_jsx("h1", __assign({ className: "text-5xl md:text-6xl font-bold mb-4" }, { children: "Raksha Bandhan 2025" })), _jsxs("div", __assign({ className: "flex items-center justify-center space-x-2" }, { children: [_jsx(Calendar, { className: "w-6 h-6" }), _jsx("p", __assign({ className: "text-xl" }, { children: eventDate })), _jsx(MapPin, { className: "w-6 h-6 ml-4" }), _jsx("p", __assign({ className: "text-xl" }, { children: "Hamburg, Germany" }))] }))] })) }))] })), _jsxs("main", __assign({ className: "min-w-[70vw] mx-auto px-4 py-16" }, { children: [_jsxs("section", __assign({ className: "prose lg:prose-xl mx-auto mb-16 w-full" }, { children: [_jsx("h2", __assign({ className: 'text-lg font-semibold my-2' }, { children: "Celebrating the Bond of Love" })), _jsx("p", { children: "Raksha Bandhan is a cherished festival that celebrates the special bond between siblings and cousins. It is a day to express love, care, and lifelong commitment to each other, symbolized by the tying of a rakhi." })] })), _jsxs("section", __assign({ className: "prose lg:prose-xl mx-auto mb-16" }, { children: [_jsx("h2", __assign({ className: 'text-lg font-semibold my-2' }, { children: "Event Highlights" })), _jsxs("ul", { children: [_jsx("li", { children: "Traditional Rakhi tying ceremony for children and families" }), _jsx("li", { children: "Storytelling and cultural activities about the significance of Raksha Bandhan" }), _jsx("li", { children: "Fun games and creative workshops for kids" }), _jsx("li", { children: "Delicious festive treats and refreshments" }), _jsx("li", { children: "Opportunities for families to connect and celebrate together" })] })] })), _jsxs("section", __assign({ className: "prose lg:prose-xl mx-auto mb-16" }, { children: [_jsx("h2", __assign({ className: 'text-lg font-semibold my-2' }, { children: "Sanskriti's Vision" })), _jsx("p", { children: "Sanskriti e.V. is committed to nurturing family values and cultural traditions. Through events like Raksha Bandhan, we aim to bring together families and their young ones, fostering a sense of belonging and togetherness within our community." }), _jsx("p", { children: "Join us in Hamburg for a heartwarming celebration that honors the beautiful relationships between siblings and cousins!" })] })), _jsxs("section", __assign({ className: "prose lg:prose-xl mx-auto mb-16 bg-inherit p-6 rounded-lg text-center" }, { children: [_jsx("h3", __assign({ className: "text-xl font-semibold mb-4" }, { children: "Get Involved" })), _jsx("p", { children: "Would you like to help organize, perform, or contribute to the event? We welcome your participation!" }), _jsx("a", __assign({ href: "mailto:admin@sanskriti-hamburg.de", target: '_blank', rel: 'noreferrer', className: "inline-block mt-4 bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors" }, { children: "Contact Us to Participate" }))] }))] })), _jsx(Footer, {})] })));
}
export default Rakhi2025;
