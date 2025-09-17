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
function SitAndDraw2025() {
    useEffect(function () {
        window.scrollTo(0, 0);
    }, []);
    var eventDate = getEventDate('/events/sit-and-draw-2025');
    return (_jsxs("div", __assign({ className: "min-h-screen bg-inherit" }, { children: [_jsx(SEOHead, { title: "Sit and Draw Competition 2025 \u2013 Art Contest in Hamburg | Sanskriti Hamburg", description: "Join Sanskriti e.V. for the Sit and Draw Competition 2025 in Hamburg. A creative art contest showcasing alpona, traditional designs, and artistic talents from the community. All ages welcome!", keywords: "Sit and Draw 2025, Hamburg, art competition, alpona, traditional art, creative contest, Sanskriti Hamburg, art event, cultural art, drawing competition", url: "/events/sit-and-draw-2025", type: "event", image: "/images/hand-alpona.jpg", eventStartDate: "2025-05-15", eventLocation: "Hamburg, Germany", eventType: "Art Competition", performer: "Sanskriti e.V. Hamburg Community", offers: {
                    price: "0",
                    currency: "EUR",
                    availability: "https://schema.org/InStock",
                    url: "/events/sit-and-draw-2025"
                } }), _jsxs("div", __assign({ className: "relative h-[60vh]" }, { children: [_jsx("img", { src: "/images/hand-alpona.jpg", alt: "Sit and Draw Competition", className: "w-full h-full object-cover" }), _jsx("div", __assign({ className: "absolute inset-0 bg-black/30 flex items-center justify-center" }, { children: _jsxs("div", __assign({ className: "text-center text-white" }, { children: [_jsx("h1", __assign({ className: "text-5xl md:text-6xl font-bold mb-4" }, { children: "Sit and Draw Competition 2025" })), _jsxs("div", __assign({ className: "flex items-center justify-center space-x-2" }, { children: [_jsx(Calendar, { className: "w-6 h-6" }), _jsx("p", __assign({ className: "text-xl" }, { children: eventDate })), _jsx(MapPin, { className: "w-6 h-6 ml-4" }), _jsx("p", __assign({ className: "text-xl" }, { children: "Hamburg, Germany" }))] }))] })) }))] })), _jsxs("main", __assign({ className: "min-w-[70vw] mx-auto px-4 py-16" }, { children: [_jsxs("section", __assign({ className: "prose lg:prose-xl mx-auto mb-16 w-full" }, { children: [_jsx("h2", __assign({ className: 'text-lg font-semibold my-2' }, { children: "Unleash Your Creativity!" })), _jsx("p", { children: "Sanskriti e.V. is excited to announce the Sit and Draw Competition 2025, a creative event designed to bring together young kids from across Hamburg. This is a wonderful opportunity for children to express themselves through art, make new friends, and enjoy a day filled with imagination and fun." })] })), _jsxs("section", __assign({ className: "prose lg:prose-xl mx-auto mb-16" }, { children: [_jsx("h2", __assign({ className: 'text-lg font-semibold my-2' }, { children: "Event Highlights" })), _jsxs("ul", __assign({ className: "list-disc pl-6" }, { children: [_jsx("li", { children: "Open to children of all ages and backgrounds" }), _jsx("li", { children: "All drawing materials will be provided" }), _jsx("li", { children: "Theme-based drawing sessions to inspire creativity" }), _jsx("li", { children: "Participation certificates and exciting prizes" }), _jsx("li", { children: "Snacks and refreshments for all participants" }), _jsx("li", { children: "A platform to showcase young talent in Hamburg" })] }))] })), _jsxs("section", __assign({ className: "prose lg:prose-xl mx-auto mb-16" }, { children: [_jsx("h2", __assign({ className: 'text-lg font-semibold my-2' }, { children: "Sanskriti's Vision" })), _jsx("p", { children: "At Sanskriti e.V., we believe in nurturing creativity and community spirit among children. The Sit and Draw Competition is more than just an art contest\u2014it's a celebration of imagination, diversity, and togetherness. We hope to see kids from all over Hamburg come together, learn from each other, and have a memorable experience." })] })), _jsxs("section", __assign({ className: "prose lg:prose-xl mx-auto mb-16 bg-inherit p-6 rounded-lg text-center" }, { children: [_jsx("h3", __assign({ className: "text-xl font-semibold mb-4" }, { children: "Get Involved" })), _jsx("p", { children: "Interested in participating or volunteering? We welcome parents, teachers, and art enthusiasts to join us in making this event a success!" }), _jsx("a", __assign({ href: "mailto:admin@sanskriti-hamburg.de", target: '_blank', rel: 'noreferrer', className: "inline-block mt-4 bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors" }, { children: "Contact Us to Participate" }))] }))] })), _jsx(Footer, {})] })));
}
export default SitAndDraw2025;
