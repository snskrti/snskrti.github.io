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
import { useEffect, useState } from 'react';
import { Calendar, HandHeart, Mail, Facebook, Instagram, MapPinIcon, ChefHat } from 'lucide-react';
import { Footer } from '../../../components/shared/Footer';
import { SEOHead } from '../../../components/SEO/SEOHead';
import { socialMediaLinks } from '../../../types/socialMediaLinks';
function Mahalaya2025() {
    // Typewriter component for bilingual translation
    var TypewriterTranslation = function () {
        var messages = [
            'মহালয়া',
            'Mahalaya'
        ];
        var _a = useState(''), displayText = _a[0], setDisplayText = _a[1];
        var _b = useState('idle'), phase = _b[0], setPhase = _b[1];
        var _c = useState(0), msgIndex = _c[0], setMsgIndex = _c[1];
        var _d = useState(0), charIndex = _d[0], setCharIndex = _d[1];
        var typingSpeed = 55; // ms per char
        var deletingSpeed = 30; // ms per char when deleting
        var pauseAfterTyping = 1600; // pause before deleting
        var startDelayAfterLoad = 2000; // 2s after full page load
        // Start only after full window load + delay
        useEffect(function () {
            var startTimer;
            var startIfReady = function () {
                startTimer = window.setTimeout(function () { return setPhase('typing'); }, startDelayAfterLoad);
            };
            if (document.readyState === 'complete') {
                startIfReady();
            }
            else {
                window.addEventListener('load', startIfReady, { once: true });
            }
            return function () {
                if (startTimer)
                    clearTimeout(startTimer);
                window.removeEventListener('load', startIfReady);
            };
        }, []);
        // Start after 1s delay
        useEffect(function () {
            var startTimer = setTimeout(function () { return setPhase('typing'); }, 1000);
            return function () { return clearTimeout(startTimer); };
        }, []);
        useEffect(function () {
            if (phase === 'idle')
                return; // wait until started
            if (phase === 'typing') {
                if (charIndex < messages[msgIndex].length) {
                    var timeout_1 = setTimeout(function () {
                        setDisplayText(messages[msgIndex].slice(0, charIndex + 1));
                        setCharIndex(charIndex + 1);
                    }, typingSpeed + (messages[msgIndex][charIndex] === '\n' ? 200 : 0));
                    return function () { return clearTimeout(timeout_1); };
                }
                else {
                    var timeout_2 = setTimeout(function () { return setPhase(msgIndex === 0 ? 'deleting' : 'done'); }, pauseAfterTyping);
                    return function () { return clearTimeout(timeout_2); };
                }
            }
            if (phase === 'deleting') {
                if (charIndex > 0) {
                    var timeout_3 = setTimeout(function () {
                        setDisplayText(messages[msgIndex].slice(0, charIndex - 1));
                        setCharIndex(charIndex - 1);
                    }, deletingSpeed);
                    return function () { return clearTimeout(timeout_3); };
                }
                else {
                    setMsgIndex(1);
                    setPhase('typing');
                }
            }
        }, [phase, charIndex, msgIndex, messages]);
        return (_jsxs("h1", __assign({ className: "text-8xl md:text-9xl font-bold mb-12" }, { children: [displayText, phase !== 'done' && _jsx("span", __assign({ className: "animate-pulse" }, { children: "|" }))] })));
    };
    // Gallery data with bullet points and CTA info
    var galleryData = [
        {
            id: 1,
            title: "Community Potluck",
            description: "Join us for a delightful feast where everyone contributes their favorite homemade dishes, creating a diverse spread of Bengali cuisine that brings us together.",
            bulletPoints: [
                "Homemade Bengali specialties",
                "Vegetarian and non-vegetarian options",
                "Traditional sweets and desserts",
                "Recipe sharing and food stories"
            ],
            ctaText: "Join the Potluck",
            ctaLink: "#gallery"
        },
        {
            id: 2,
            title: "Fashion Show",
            description: "Witness a spectacular fashion show featuring traditional Bengali attire with a modern twist, celebrating the essence of Durga Puja through fashion. Themes include:",
            bulletPoints: [
                "Cosmic Connection",
                "Nature's Embrace",
                "Traditional Elegance"
            ],
            ctaText: "Participate",
            ctaLink: "#gallery"
        },
        {
            id: 3,
            title: "Children's Go-As-You-Like",
            description: "Watch the little ones showcase their creativity and talent in a delightful performance segment specially designed for children to express themselves freely.",
            bulletPoints: [
                "Creative performances",
                "Costume showcase",
                "Talent display",
                "Fun and interactive activities"
            ],
            ctaText: "Register Your Child",
            ctaLink: "#gallery"
        },
        {
            id: 4,
            title: "Special Announcements",
            description: "Tune in for special announcements about the upcoming Durga Puja celebration, and learn how you can participate in this grand festival!",
            bulletPoints: [
                "Event schedule details",
                "Volunteer opportunities",
                "Special programs and guests",
                "Participation guidelines"
            ],
            ctaText: "Join to hear",
            ctaLink: "#"
        }
    ];
    useEffect(function () {
        window.scrollTo(0, 0);
        // Add scroll animations
        var observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    entry.target.classList.remove('opacity-0');
                }
            });
        }, observerOptions);
        document.querySelectorAll('.animate-on-scroll').forEach(function (element) {
            observer.observe(element);
        });
        // No need for gallery scroll effect to change images since we're using a single background
        // The text overlays will scroll naturally with the page scroll
        return function () {
            observer.disconnect();
        };
    }, []);
    // Event date is set to September 21, 2025, a week before Durga Puja
    var eventDate = "September 21, 2025";
    return (_jsxs("div", __assign({ className: "min-h-screen bg-inherit" }, { children: [_jsx(SEOHead, { title: "Mahalaya 2025 \u2013 Pre-Durga Puja Celebration in Hamburg | Sanskriti Hamburg", description: "Join Sanskriti e.V. for a special Mahalaya celebration in Hamburg on September 14, 2025. Experience community potluck, a fashion show, children's activities, and cultural performances as we prepare for Durga Puja. Connect with the local Bengali community and ignite the festive spirit.", keywords: "Mahalaya 2025, Hamburg, Bengali community, Pre-Durga Puja, Fashion show, Community potluck, Children's activities, Cultural event, Sanskriti eV, Mahalaya celebration Hamburg", url: "/events/durga-puja-2025/mahalaya", type: "event", image: "/images/logo.png", eventStartDate: "2025-09-14T10:00", eventEndDate: "2025-09-14T20:00", eventLocation: "DESY Building 9A, Notkestra\u00DFe 85, 22607 Hamburg, Germany", eventType: "Cultural Event", performer: "Sanskriti e.V.", offers: {
                    price: "0",
                    currency: "EUR",
                    availability: "open for all",
                    url: "/events/durga-puja-2025/mahalaya",
                    validFrom: "2025-09-14T10:00",
                    availabilityEnds: "2025-09-14T20:00"
                } }), _jsxs("div", __assign({ className: "relative h-screen" }, { children: [_jsx("img", { src: "/images/durga-puja-announcement-2025/mahalaya_banner.jpg" // Using existing image, will be replaced later
                        , alt: "Mahalaya Celebration", className: "w-full h-full object-cover blur-sm opacity-100" }), _jsx("div", __assign({ className: "absolute inset-0 bg-black/60 flex items-center justify-center" }, { children: _jsxs("div", __assign({ className: "text-center text-white" }, { children: [_jsxs("div", __assign({ className: "flex items-center justify-center space-x-2 mb-4" }, { children: [_jsx(Calendar, { className: "w-5 h-5" }), _jsx("p", __assign({ className: "text-xl font-light" }, { children: eventDate }))] })), _jsxs("a", __assign({ href: "https://maps.app.goo.gl/hfaUN7dyobJ8uSpQA", target: "_blank", rel: "noopener noreferrer", className: "flex items-center justify-center space-x-2 mb-4 hover:text-amber-300 transition-colors" }, { children: [_jsx(MapPinIcon, { className: "w-5 h-5" }), _jsx("p", __assign({ className: "text-xl font-light" }, { children: "DESY (Building 9A)" }))] })), _jsx("div", __assign({ className: "pt-6 mt-6" }, { children: _jsx(TypewriterTranslation, {}) })), _jsxs("div", __assign({ className: "flex flex-col sm:flex-row gap-4 justify-center items-center" }, { children: [_jsxs("a", __assign({ href: "#mahalaya-knowhow", className: "flex items-center space-x-2 px-6 py-3 rounded-full border-2 font-semibold btn-secondary" }, { children: [_jsx(ChefHat, { className: "w-5 h-5" }), _jsx("span", { children: "Discover Event" })] })), _jsxs("a", __assign({ href: "/images/durga-puja-announcement-2025/mahalaya_flyer.jpg", className: "flex items-center space-x-2 px-6 py-3 rounded-full border-2 font-semibold btn-secondary", download: "Mahalaya_2025_Flyer.jpg" }, { children: [_jsx(HandHeart, { className: "w-5 h-5" }), _jsx("span", { children: "Download Flyer" })] }))] }))] })) }))] })), _jsx("section", __assign({ className: "relative", id: "gallery" }, { children: _jsxs("div", __assign({ className: "relative", style: { height: "".concat(galleryData.length * 100, "vh") } }, { children: [_jsxs("div", __assign({ className: "sticky top-0 h-screen w-screen overflow-hidden" }, { children: [_jsxs("div", __assign({ className: "absolute inset-0 hidden md:block" }, { children: [_jsx("img", { src: "/images/durga-puja-announcement-2025/mahalaya_flyer_horizontal.jpeg", alt: "Mahalaya Celebration Background", className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0", style: { background: 'linear-gradient(to right, transparent 0%, transparent 20%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,1) 100%)' } })] })), _jsxs("div", __assign({ className: "absolute inset-0 md:hidden" }, { children: [_jsx("img", { src: "/images/durga-puja-announcement-2025/mahalaya_flyer_horizontal.jpeg", alt: "Mahalaya Celebration Background", className: "h-full w-full object-cover object-left", style: { objectPosition: "12% center" } }), _jsx("div", { className: "absolute inset-0 bg-black/10" }), _jsx("div", { className: "absolute right-0 top-0 w-1/2 h-full", style: { background: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.85) 100%)' } })] }))] })), _jsx("div", __assign({ className: "absolute inset-0 flex flex-col" }, { children: galleryData.map(function (item) { return (_jsxs("div", __assign({ className: "h-screen w-screen flex items-center" }, { children: [_jsx("div", __assign({ className: "md:hidden w-full flex justify-end" }, { children: _jsxs("div", __assign({ className: "max-w-xs text-white z-10 p-4 mr-4 bg-black/30 backdrop-blur-sm rounded-lg" }, { children: [_jsx("h3", __assign({ className: "text-xl font-bold mb-3" }, { children: item.title })), _jsx("p", __assign({ className: "text-sm leading-relaxed mb-3" }, { children: item.description })), _jsx("ul", __assign({ className: "space-y-1 mb-4 text-sm" }, { children: item.bulletPoints.map(function (point, index) { return (_jsxs("li", __assign({ className: "flex items-start" }, { children: [_jsx("span", __assign({ className: "text-amber-400 mr-2" }, { children: "\u2022" })), _jsx("span", { children: point })] }), index)); }) })), _jsx("div", { className: "w-12 h-1 bg-amber-500" })] })) })), _jsx("div", __assign({ className: "hidden md:flex w-full items-center justify-end pr-16 lg:pr-24" }, { children: _jsxs("div", __assign({ className: "max-w-md text-white z-10" }, { children: [_jsx("h3", __assign({ className: "text-4xl font-bold mb-6" }, { children: item.title })), _jsx("p", __assign({ className: "text-lg leading-relaxed mb-6" }, { children: item.description })), _jsx("ul", __assign({ className: "space-y-2 mb-8" }, { children: item.bulletPoints.map(function (point, index) { return (_jsxs("li", __assign({ className: "flex items-start" }, { children: [_jsx("span", __assign({ className: "text-amber-400 mr-2" }, { children: "\u2022" })), _jsx("span", { children: point })] }), index)); }) })), _jsx("div", { className: "w-16 h-1 bg-amber-500" })] })) }))] }), item.id)); }) }))] })) })), _jsxs("main", __assign({ className: "max-w-6xl mx-auto px-4 py-16 flex flex-col space-y-32", id: 'mahalaya-knowhow' }, { children: [_jsxs("section", __assign({ className: "animate-on-scroll opacity-0", id: "about" }, { children: [_jsxs("div", __assign({ className: "max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed my-12" }, { children: [_jsx("h2", __assign({ className: "text-4xl font-bold mb-6 text-gray-800 text-center" }, { children: "About Mahalaya" })), _jsx("div", { className: "w-24 h-1 bg-amber-500 mx-auto mb-8" }), _jsx("p", { children: "Mahalaya marks the beginning of Devi Paksha and the end of Pitri Paksha, signaling that Durga Puja is near. It's a day when we invoke the goddess Durga to descend on Earth and begin her battle against evil." }), _jsx("p", __assign({ className: "mt-4" }, { children: "Sanskriti e.V. and Hamburg Bangaliyana group is organising a special Mahalaya celebration that brings our community together before the grand Durga Puja festivities. This event is designed to ignite the festive spirit within our hearts and prepare us for the upcoming celebration." })), _jsx("p", __assign({ className: "mt-4" }, { children: "Through community potluck, cultural discussions, fashion show, and children's activities, we aim to strengthen our bonds as a Bengali community in Hamburg while sharing our beautiful traditions with everyone interested in our culture." })), _jsx("p", __assign({ className: "mt-4" }, { children: "This special celebration will infuse the true mood of Durga Puja in all Bengalis present, awakening our collective spirit to enjoy and immerse ourselves in the festivities through the next 10 days. Mahalaya serves as the perfect prelude that ignites our anticipation for the grand celebration ahead." })), _jsx("p", __assign({ className: 'mt-6 font-semibold' }, { children: "Join us for this special day of connection, culture, and celebration as we prepare to welcome Maa Durga!" }))] })), _jsxs("div", __assign({ className: "max-w-4xl mx-auto flex flex-col md:flex-row md:items-center" }, { children: [_jsx("p", __assign({ className: "text-gray-700 text-base md:text-lg flex-1 md:pr-4 text-center md:text-left" }, { children: "Follow us for event updates, photos, and community stories. Join our growing family online!" })), _jsxs("div", __assign({ className: "flex justify-center md:justify-start gap-10" }, { children: [_jsxs("a", __assign({ href: socialMediaLinks.instagram, target: "_blank", rel: "noreferrer", className: "flex flex-col items-center group" }, { children: [_jsx(Instagram, { className: "w-10 h-10 text-pink-600 group-hover:text-pink-800 transition-colors" }), _jsx("span", __assign({ className: "text-sm mt-2 text-pink-700" }, { children: "Instagram" }))] })), _jsxs("a", __assign({ href: socialMediaLinks.youtube, target: "_blank", rel: "noreferrer", className: "flex flex-col items-center group" }, { children: [_jsx(Mail, { className: "w-10 h-10 text-red-600 group-hover:text-red-800 transition-colors" }), _jsx("span", __assign({ className: "text-sm mt-2 text-red-700" }, { children: "YouTube" }))] })), _jsxs("a", __assign({ href: socialMediaLinks.facebook, target: "_blank", rel: "noreferrer", className: "flex flex-col items-center group" }, { children: [_jsx(Facebook, { className: "w-10 h-10 text-blue-600 group-hover:text-blue-800 transition-colors" }), _jsx("span", __assign({ className: "text-sm mt-2 text-blue-700" }, { children: "Facebook" }))] }))] }))] }))] })), _jsxs("section", __assign({ className: "animate-on-scroll opacity-0", id: "location" }, { children: [_jsxs("div", __assign({ className: "text-center mb-12" }, { children: [_jsx("h2", __assign({ className: "text-4xl font-bold mb-6 text-gray-800" }, { children: "Event Location" })), _jsx("div", { className: "w-24 h-1 bg-amber-500 mx-auto mb-8" }), _jsx("p", __assign({ className: "text-lg text-gray-600 max-w-3xl mx-auto" }, { children: "Join us at our venue in Hamburg for a day of celebration, community bonding, and cultural immersion." }))] })), _jsxs("div", __assign({ className: "bg-gradient-to-br from-gray-50 to-slate-50 p-8 rounded-lg shadow-lg" }, { children: [_jsxs("div", __assign({ className: "flex items-center mb-6 justify-center" }, { children: [_jsx(MapPinIcon, { className: "w-8 h-8 text-red-600 mr-3" }), _jsx("h3", __assign({ className: "text-2xl font-semibold text-gray-800" }, { children: "Event Venue" }))] })), _jsxs("p", __assign({ className: "text-gray-600 mb-6 text-center" }, { children: [_jsx("span", __assign({ className: "font-semibold text-lg block mb-2" }, { children: "DESY Building 9A, Notkestra\u00DFe 85, 22607 Hamburg" })), _jsx("br", {}), _jsxs("span", __assign({ className: "font-semibold" }, { children: ["Date: ", eventDate] })), _jsx("br", {}), _jsx("span", __assign({ className: "font-semibold" }, { children: "Time: 12:00 AM - 5:00 PM" }))] })), _jsx("div", __assign({ className: "flex justify-center" }, { children: _jsx("a", __assign({ href: "https://maps.app.goo.gl/hfaUN7dyobJ8uSpQA", target: "_blank", rel: "noreferrer", className: "inline-block bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors font-semibold" }, { children: "Get Directions" })) }))] }))] }))] })), _jsx(Footer, {})] })));
}
export default Mahalaya2025;
