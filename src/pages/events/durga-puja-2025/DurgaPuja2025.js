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
import { Calendar, Users, Heart, Star, HandHeart, Music, Mail, Facebook, Instagram, TicketX, MapPinIcon } from 'lucide-react';
import { Footer } from '../../../components/shared/Footer';
import { SEOHead } from '../../../components/SEO/SEOHead';
import { getEventDate } from '../../../utils/eventUtils';
import { socialMediaLinks } from '../../../types/socialMediaLinks';
function DurgaPuja2025() {
    // Typewriter component for bilingual translation
    var TypewriterTranslation = function () {
        var messages = [
            'মা আসছে',
            'Durga Puja'
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
    // Gallery data
    var galleryData = [
        {
            id: 1,
            image: "/images/durga-puja-announcement-2025/event-value-puja.jpg",
            alt: "Sacred Worship",
            title: "The Worship",
            description: "Experience the profound spiritual atmosphere as our community comes together in devotion to Maa Durga, following age-old traditions and rituals."
        },
        {
            id: 2,
            image: "/images/durga-puja-announcement-2025/event-value-community.JPG",
            alt: "Community Gathering",
            title: "Community Adda",
            description: "Join the heartwarming conversations and connections that make Durga Puja special - where strangers become friends and bonds are strengthened."
        },
        {
            id: 3,
            image: "/images/durga-puja-announcement-2025/event-value-food.jpg",
            alt: "Traditional Bengali Cuisine",
            title: "Authentic Flavors",
            description: "Savor the rich, traditional Bengali cuisine prepared with love by our community volunteers, bringing the taste of home to Hamburg."
        },
        {
            id: 4,
            image: "/images/durga-puja-announcement-2025/event-value-spirit.jpg",
            alt: "Festival Spirit",
            title: "Festival Spirit",
            description: "Feel the infectious joy, enthusiasm and devotion that fills the air during Durga Puja, as the entire community comes alive with celebration and devotion."
        },
        {
            id: 5,
            image: "/images/durga-puja-announcement-2025/event-value-dhunuchi.jpg",
            alt: "Dhunuchi Dance",
            title: "Dhunuchi Dance",
            description: "Witness the mesmerizing dhunuchi dance, where devotees perform rhythmic movements with smoking incense burners, creating a divine atmosphere of worship."
        },
        {
            id: 6,
            image: "/images/durga-puja-announcement-2025/event-value-sindoor.jpg",
            alt: "Sindoor Khela Tradition",
            title: "Sindoor Khela",
            description: "Participate in the beautiful tradition of sindoor khela, where married women apply vermillion to each other and to Maa Durga, symbolizing marital bliss and prosperity."
        },
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
        // Gallery scroll effect
        var handleGalleryScroll = function () {
            var gallerySection = document.querySelector('section.relative > div.relative');
            if (!gallerySection)
                return;
            var rect = gallerySection.getBoundingClientRect();
            var scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
            // Calculate which image should be visible
            var imageIndex = Math.floor(scrollProgress * galleryData.length);
            var currentIndex = Math.min(galleryData.length - 1, Math.max(0, imageIndex));
            // Update image visibility
            galleryData.forEach(function (item, index) {
                var image = document.getElementById("gallery-image-".concat(item.id));
                if (image) {
                    if (index === currentIndex) {
                        image.style.opacity = '1';
                    }
                    else {
                        image.style.opacity = '0';
                    }
                }
            });
        };
        window.addEventListener('scroll', handleGalleryScroll);
        handleGalleryScroll(); // Initial call
        return function () {
            observer.disconnect();
            window.removeEventListener('scroll', handleGalleryScroll);
        };
    }, []);
    var eventDate = getEventDate('/events/durga-puja-2025');
    return (_jsxs("div", __assign({ className: "min-h-screen bg-inherit" }, { children: [_jsx(SEOHead, { title: "Durga Puja 2025 \u2013 Bengali Festival in Hamburg | Sanskriti Hamburg", description: "Join Sanskriti e.V. for the historic first Durga Puja celebration in Hamburg from Sep 28 - Oct 01, 2025. Experience divine festivities, cultural performances, traditional Bengali rituals, and community bonding. Volunteers and participants welcome!", keywords: "Durga Puja 2025, Hamburg, Bengali festival, Maa Durga, Durga Puja Hamburg, Indian cultural events, Sanskriti eV, Bengali community, volunteers, cultural performances, Sanskriti Hamburg, Durga festival Hamburg", url: "/events/durga-puja-2025", type: "event", image: "/images/logo.png", eventStartDate: "2025-09-28T00:00", eventEndDate: "2025-10-01T00:00", eventLocation: "Nienh\u00F6fener Str. 18, 25421 Pinneberg", eventType: "Cultural Festival", performer: "Sanskriti e.V.", offers: {
                    price: "0",
                    currency: "EUR",
                    availability: "open for all",
                    url: "/events/durga-puja-2025",
                    validFrom: "2025-09-28T00:00",
                    availabilityEnds: "2025-10-01T00:00"
                } }), _jsxs("div", __assign({ className: "relative h-screen" }, { children: [_jsx("img", { src: "/images/kallol_durga_idol.jpg", alt: "Durga Puja Celebration", className: "w-full h-full object-cover blur-sm opacity-90" }), _jsx("div", __assign({ className: "absolute inset-0 bg-black/60 flex items-center justify-center" }, { children: _jsxs("div", __assign({ className: "text-center text-white" }, { children: [_jsxs("div", __assign({ className: "flex items-center justify-center space-x-2 mb-4" }, { children: [_jsx(Calendar, { className: "w-5 h-5" }), _jsx("p", __assign({ className: "text-xl font-light" }, { children: eventDate }))] })), _jsxs("a", __assign({ href: "https://maps.app.goo.gl/LR2jQubpbd4EkBXh6", target: "_blank", rel: "noreferrer", className: "flex items-center justify-center space-x-2 mb-4 hover:text-amber-300 transition-colors" }, { children: [_jsx(MapPinIcon, { className: "w-5 h-5" }), _jsx("p", __assign({ className: "text-xl font-light" }, { children: "Nienh\u00F6fener Str. 18, 25421 Pinneberg" }))] })), _jsx("div", __assign({ className: "pt-6 mt-6" }, { children: _jsx(TypewriterTranslation, {}) })), _jsxs("div", __assign({ className: "flex flex-col sm:flex-row gap-4 justify-center items-center" }, { children: [_jsxs("a", __assign({ href: "/events/durga-puja-2025/schedule", rel: "noreferrer", className: "flex items-center space-x-2 px-6 py-3 rounded-full border-2 font-semibold btn-secondary" }, { children: [_jsx(TicketX, { className: "w-5 h-5" }), _jsx("span", { children: "Program Schedule" })] })), _jsxs("a", __assign({ href: "/events/durga-puja-2025/food-menu", rel: "noreferrer", className: "flex items-center space-x-2 px-6 py-3 rounded-full border-2 font-semibold btn-secondary" }, { children: [_jsx(TicketX, { className: "w-5 h-5" }), _jsx("span", { children: "Secure your Dining Experience" })] })), _jsxs("a", __assign({ href: "https://www.desipass.com/events/events-details?eventId=01K206DZB1DAGBX15RZV6SAH52", target: "_blank", rel: "noreferrer", className: "flex items-center space-x-2 px-6 py-3 rounded-full border-2 font-semibold btn-secondary" }, { children: [_jsx(TicketX, { className: "w-5 h-5" }), _jsx("span", { children: "Get your Entry-only ticket" })] }))] }))] })) }))] })), _jsx("main", __assign({ className: "max-w-6xl mx-auto px-4 py-16 flex flex-col space-y-48" }, { children: _jsx("section", __assign({ className: "flex items-center justify-center animate-on-scroll opacity-0 w-full h-screen" }, { children: _jsx("div", __assign({ className: "bg-gradient-to-r from-amber-50 to-orange-50 p-16 rounded-lg shadow-lg flex items-center justify-center w-full" }, { children: _jsx("div", __assign({ className: "max-w-4xl mx-auto w-full" }, { children: _jsxs("div", __assign({ className: "relative" }, { children: [_jsx("div", __assign({ className: "absolute -top-8 -left-8 text-8xl text-amber-200 font-serif" }, { children: "\"" })), _jsx("div", __assign({ className: "absolute -bottom-8 -right-8 text-8xl text-amber-200 font-serif" }, { children: "\"" })), _jsx("div", __assign({ className: "py-8" }, { children: _jsxs("p", __assign({ className: "text-4xl md:text-5xl font-bold text-amber-800 mb-8 leading-relaxed tracking-wide" }, { children: ["\u092F\u093E \u0926\u0947\u0935\u0940 \u0938\u0930\u094D\u0935\u092D\u0942\u0924\u0947\u0937\u0941 \u092E\u093E\u0924\u0943\u0930\u0942\u092A\u0947\u0923 \u0938\u0902\u0938\u094D\u0925\u093F\u0924\u093E", _jsx("br", {}), "\u0928\u092E\u0938\u094D\u0924\u0938\u094D\u092F\u0948 \u0928\u092E\u0938\u094D\u0924\u0938\u094D\u092F\u0948 \u0928\u092E\u0938\u094D\u0924\u0938\u094D\u092F\u0948 \u0928\u092E\u094B \u0928\u092E\u0903"] })) }))] })) })) })) })) })), _jsx("section", __assign({ className: "relative" }, { children: _jsxs("div", __assign({ className: "relative", style: { height: "".concat(galleryData.length * 100, "vh") } }, { children: [_jsx("div", __assign({ className: "sticky top-0 h-screen w-screen overflow-hidden" }, { children: galleryData.map(function (item, index) { return (_jsxs("div", __assign({ className: "absolute inset-0 transition-opacity duration-1000 ".concat(index === 0 ? 'opacity-100' : 'opacity-0'), id: "gallery-image-".concat(item.id) }, { children: [_jsx("img", { src: item.image, alt: item.alt, className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0", style: { background: 'linear-gradient(to right, transparent 0%, transparent 20%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 100%)' } })] }), item.id)); }) })), _jsx("div", __assign({ className: "absolute inset-0 flex flex-col" }, { children: galleryData.map(function (item) { return (_jsx("div", __assign({ className: "h-screen w-screen flex items-center justify-end pr-8 md:pr-16 lg:pr-24" }, { children: _jsxs("div", __assign({ className: "max-w-md text-white z-10" }, { children: [_jsx("h3", __assign({ className: "text-3xl md:text-4xl font-bold mb-6" }, { children: item.title })), _jsx("p", __assign({ className: "text-lg leading-relaxed mb-6" }, { children: item.description })), _jsx("div", { className: "w-16 h-1 bg-amber-500" })] })) }), item.id)); }) }))] })) })), _jsxs("main", __assign({ className: "max-w-6xl mx-auto px-4 py-16 flex flex-col space-y-32" }, { children: [_jsxs("section", __assign({ className: "animate-on-scroll opacity-0" }, { children: [_jsxs("div", __assign({ className: "max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed my-12" }, { children: [_jsxs("p", { children: ["Durga Puja is more than a religious ritual \u2014 it's a feeling, a reunion, and a deep expression of joy, identity, and community. ", _jsx("br", {}), "For those of us living far from Kolkata, it is our way of creating home away from home. In the crisp autumn breeze of Hamburg, we recreate the fragrance of shiuli, the echo of dhaak, and the warmth of community gatherings that define this beloved celebration. At Sanskriti Hamburg, our Durga Puja is a space where generations connect, where children witness traditions, and where language, food, music, and rituals come alive \u2014 not just remembered, but lived. This Puja is our tribute to heritage, inclusiveness, and the joy of coming together. Whether you are Bengali, Indian, German, or simply curious \u2014 you are part of this celebration."] }), _jsx("p", __assign({ className: 'pt-8' }, { children: "This is more than just an event\u2014it's the beginning of a cherished tradition in Hamburg. Your participation will help us create memories that will last for generations." }))] })), _jsxs("div", __assign({ className: "max-w-4xl mx-auto flex flex-col md:flex-row md:items-center" }, { children: [_jsx("p", __assign({ className: "text-gray-700 text-base md:text-lg flex-1 md:pr-4 text-center md:text-left" }, { children: "Follow us for event updates, photos, and community stories. Join our growing family online!" })), _jsxs("div", __assign({ className: "flex justify-center md:justify-start gap-10" }, { children: [_jsxs("a", __assign({ href: socialMediaLinks.instagram, target: "_blank", rel: "noreferrer", className: "flex flex-col items-center group" }, { children: [_jsx(Instagram, { className: "w-10 h-10 text-pink-600 group-hover:text-pink-800 transition-colors" }), _jsx("span", __assign({ className: "text-sm mt-2 text-pink-700" }, { children: "Instagram" }))] })), _jsxs("a", __assign({ href: socialMediaLinks.youtube, target: "_blank", rel: "noreferrer", className: "flex flex-col items-center group" }, { children: [_jsx(Mail, { className: "w-10 h-10 text-red-600 group-hover:text-red-800 transition-colors" }), _jsx("span", __assign({ className: "text-sm mt-2 text-red-700" }, { children: "YouTube" }))] })), _jsxs("a", __assign({ href: socialMediaLinks.facebook, target: "_blank", rel: "noreferrer", className: "flex flex-col items-center group" }, { children: [_jsx(Facebook, { className: "w-10 h-10 text-blue-600 group-hover:text-blue-800 transition-colors" }), _jsx("span", __assign({ className: "text-sm mt-2 text-blue-700" }, { children: "Facebook" }))] }))] }))] }))] })), _jsx("section", __assign({ className: "animate-on-scroll opacity-0" }, { children: _jsxs("div", __assign({ className: "bg-gradient-to-r from-orange-50 to-amber-100 p-10 rounded-lg shadow-lg max-w-4xl mx-auto" }, { children: [_jsx("h2", __assign({ className: "text-3xl font-bold text-amber-800 mb-6 text-center" }, { children: "Food & Schedule" })), _jsx("div", { className: "w-20 h-1 bg-amber-500 mx-auto mb-10" }), _jsxs("div", __assign({ className: "grid grid-cols-1 md:grid-cols-2 gap-8" }, { children: [_jsxs("div", __assign({ className: "bg-white rounded-lg shadow p-8 flex flex-col h-full" }, { children: [_jsxs("div", __assign({ className: "flex-grow" }, { children: [_jsx("div", __assign({ className: "flex justify-center mb-6" }, { children: _jsx("div", __assign({ className: "bg-amber-100 p-4 rounded-full" }, { children: _jsx(Calendar, { className: "w-10 h-10 text-amber-600" }) })) })), _jsx("h3", __assign({ className: "text-xl font-semibold text-amber-800 mb-4 text-center" }, { children: "Program Schedule" })), _jsx("p", __assign({ className: "text-gray-700 text-center leading-relaxed" }, { children: "Discover the rituals, timings, and cultural performances planned for each day of Durga Puja 2025. A detailed schedule will be published soon!" }))] })), _jsx("div", __assign({ className: "flex justify-center mt-6" }, { children: _jsx("a", __assign({ href: "/events/durga-puja-2025/schedule", className: "inline-block bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors font-semibold" }, { children: "View Schedule" })) }))] })), _jsxs("div", __assign({ className: "bg-white rounded-lg shadow p-8 flex flex-col h-full" }, { children: [_jsxs("div", __assign({ className: "flex-grow" }, { children: [_jsx("div", __assign({ className: "flex justify-center mb-6" }, { children: _jsx("div", __assign({ className: "bg-amber-100 p-4 rounded-full" }, { children: _jsx(Heart, { className: "w-10 h-10 text-amber-600" }) })) })), _jsx("h3", __assign({ className: "text-xl font-semibold text-amber-800 mb-4 text-center" }, { children: "Food Menu" })), _jsx("p", __assign({ className: "text-gray-700 text-center leading-relaxed" }, { children: "The celebration isn\u2019t complete without the cuisine. Book your dining experience now!" }))] })), _jsx("div", __assign({ className: "flex justify-center mt-6" }, { children: _jsx("a", __assign({ href: "/events/durga-puja-2025/food-menu", className: "inline-block bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors font-semibold" }, { children: "View Food Menu" })) }))] }))] })), _jsx("p", __assign({ className: "text-md text-gray-600 text-center mt-10" }, { children: "Stay tuned for updates on rituals, cultural performances, and delicious food!" }))] })) })), _jsxs("section", __assign({ className: "animate-on-scroll opacity-0" }, { children: [_jsxs("div", __assign({ className: "text-center mb-12" }, { children: [_jsx("h2", __assign({ className: "text-4xl font-bold mb-6 text-gray-800" }, { children: "Join Us in Making History" })), _jsx("div", { className: "w-24 h-1 bg-amber-500 mx-auto mb-8" }), _jsx("p", __assign({ className: "text-lg text-gray-600 max-w-3xl mx-auto" }, { children: "This is our inaugural Durga Puja in Hamburg, and we need your support to make it extraordinary. There are many ways to contribute and be part of this historic celebration." }))] })), _jsxs("div", __assign({ className: "grid grid-cols-1 md:grid-cols-2 gap-8" }, { children: [_jsxs("div", __assign({ className: "bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-lg shadow-lg" }, { children: [_jsxs("div", __assign({ className: "flex items-center mb-6" }, { children: [_jsx(HandHeart, { className: "w-8 h-8 text-amber-600 mr-3" }), _jsx("h3", __assign({ className: "text-2xl font-semibold text-gray-800" }, { children: "Volunteer with Us" }))] })), _jsx("p", __assign({ className: "text-gray-600 mb-6" }, { children: "Join our dedicated team of volunteers! Help with decoration, food preparation, event coordination, and ensuring every visitor has a memorable experience." })), _jsxs("ul", __assign({ className: "text-gray-600 mb-6 space-y-2" }, { children: [_jsx("li", { children: "\u2022 Event setup and decoration" }), _jsx("li", { children: "\u2022 Food service and hospitality" }), _jsx("li", { children: "\u2022 Registration and crowd management" }), _jsx("li", { children: "\u2022 Photography and documentation" })] })), _jsx("a", __assign({ href: "mailto:admin@sanskriti-hamburg.de?subject=Volunteer%20for%20Durga%20Puja%202025", target: "_blank", rel: "noreferrer", className: "inline-block bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors font-semibold" }, { children: "Volunteer Now" }))] })), _jsxs("div", __assign({ className: "bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg shadow-lg" }, { children: [_jsxs("div", __assign({ className: "flex items-center mb-6" }, { children: [_jsx(Music, { className: "w-8 h-8 text-blue-600 mr-3" }), _jsx("h3", __assign({ className: "text-2xl font-semibold text-gray-800" }, { children: "Showcase Your Talent" }))] })), _jsx("p", __assign({ className: "text-gray-600 mb-6" }, { children: "Share your artistic talents with the community! We welcome performers of all ages and skill levels to participate in our cultural program." })), _jsxs("ul", __assign({ className: "text-gray-600 mb-6 space-y-2" }, { children: [_jsx("li", { children: "\u2022 Traditional and modern dance" }), _jsx("li", { children: "\u2022 Vocal and instrumental music" }), _jsx("li", { children: "\u2022 Poetry and storytelling" }), _jsx("li", { children: "\u2022 Drama and theatrical performances" })] })), _jsx("a", __assign({ href: "mailto:admin@sanskriti-hamburg.de?subject=Cultural%20Performance%20-%20Durga%20Puja%202025", target: "_blank", rel: "noreferrer", className: "inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors font-semibold" }, { children: "Register to Perform" }))] })), _jsxs("div", __assign({ className: "bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-lg shadow-lg" }, { children: [_jsxs("div", __assign({ className: "flex items-center mb-6" }, { children: [_jsx(Users, { className: "w-8 h-8 text-green-600 mr-3" }), _jsx("h3", __assign({ className: "text-2xl font-semibold text-gray-800" }, { children: "Community Participation" }))] })), _jsx("p", __assign({ className: "text-gray-600 mb-6" }, { children: "Be part of our historic first Durga Puja! Whether you're Bengali or from another background, everyone is welcome to join our celebration." })), _jsxs("ul", __assign({ className: "text-gray-600 mb-6 space-y-2" }, { children: [_jsx("li", { children: "\u2022 Participate in traditional rituals" }), _jsx("li", { children: "\u2022 Join community prayers and ceremonies" }), _jsx("li", { children: "\u2022 Enjoy cultural programs and food" }), _jsx("li", { children: "\u2022 Connect with the Hamburg Bengali community" })] })), _jsx("a", __assign({ href: "mailto:admin@sanskriti-hamburg.de?subject=Community%20Participation%20-%20Durga%20Puja%202025", target: "_blank", rel: "noreferrer", className: "inline-block bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors font-semibold" }, { children: "Join the Celebration" }))] })), _jsxs("div", __assign({ className: "bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-lg shadow-lg" }, { children: [_jsxs("div", __assign({ className: "flex items-center mb-6" }, { children: [_jsx(Star, { className: "w-8 h-8 text-purple-600 mr-3" }), _jsx("h3", __assign({ className: "text-2xl font-semibold text-gray-800" }, { children: "Support & Sponsor" }))] })), _jsx("p", __assign({ className: "text-gray-600 mb-6" }, { children: "Help us create a magnificent celebration through your generous support. Your contribution will help establish this annual tradition in Hamburg." })), _jsxs("ul", __assign({ className: "text-gray-600 mb-6 space-y-2" }, { children: [_jsx("li", { children: "\u2022 Financial contributions" }), _jsx("li", { children: "\u2022 Material donations" }), _jsx("li", { children: "\u2022 Business sponsorship opportunities" }), _jsx("li", { children: "\u2022 In-kind services and support" })] })), _jsx("a", __assign({ href: "/donations", className: "inline-block bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors font-semibold" }, { children: "Become a Sponsor" }))] }))] }))] }))] })), _jsx(Footer, {})] })));
}
export default DurgaPuja2025;
