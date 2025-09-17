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
import { Facebook, Instagram, Youtube, Heart, BookCopy } from 'lucide-react';
import { Footer } from '../components/shared/Footer';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Home, Calendar, Users, Info } from 'lucide-react';
import { upcomingEvents } from '../types/events';
import { SectionNavigation } from '../components/shared/SectionNavigation';
import { socialMediaLinks } from '../types/socialMediaLinks';
import { SEOHead } from '../components/SEO/SEOHead';
function HomePage() {
    var _a = useState('home'), activeSection = _a[0], setActiveSection = _a[1];
    var _b = useState(''), subscriptionEmail = _b[0], setSubscriptionEmail = _b[1];
    useEffect(function () {
        var handleScroll = function () {
            var currentSection = sections.find(function (section) {
                var element = document.getElementById(section.id);
                if (element) {
                    var rect = element.getBoundingClientRect();
                    return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
                }
                return false;
            });
            if (currentSection) {
                setActiveSection(currentSection.id);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return function () { return window.removeEventListener('scroll', handleScroll); };
    }, []);
    // refactor this to become a hook
    useEffect(function () {
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
        return function () { return observer.disconnect(); };
    }, []);
    // define the sections in the page
    var sections = [
        { id: 'home', name: 'Banner', icon: _jsx(Home, { size: 24 }) },
        { id: 'events', name: 'Events', icon: _jsx(Calendar, { size: 24 }) },
        { id: 'about', name: 'About the Verein', icon: _jsx(Info, { size: 24 }) },
        { id: 'organization', name: 'Organisational Structure', icon: _jsx(Users, { size: 24 }) }
    ];
    var handleSubscribe = function () {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(subscriptionEmail)) {
            alert('Please enter a valid email address.');
            return;
        }
        // todo: add functionality to subscribe the user as a google contact
    };
    return (_jsxs("div", __assign({ className: "w-full min-h-screen bg-inherit" }, { children: [_jsx(SEOHead, { title: "Sanskriti e.V. Hamburg - Where Tradition Meets Togetherness", description: "Sanskriti e.V. is a multicultural non-profit organization in Hamburg, Germany, dedicated to celebrating Indian festivals and promoting cultural exchange. Join our vibrant community for Durga Puja, Holi, Diwali, and more cultural events.", keywords: "Sanskriti, Hamburg, Indian culture, Bengali culture, Durga Puja, Holi, Diwali, cultural events, non-profit, community, Indian festivals Germany", url: "/", type: "website", image: "/images/candles-among-diwali-designs.jpg" }), _jsx(SectionNavigation, { activeSection: activeSection, sections: sections }), _jsxs("section", __assign({ id: "home", className: "h-screen relative bg-inherit" }, { children: [_jsxs("div", __assign({ className: "absolute inset-0" }, { children: [_jsx("img", { src: "/images/candles-among-diwali-designs.jpg", alt: "Bengali Culture", className: "absolute inset-0 w-full h-full object-cover object-center" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" })] })), _jsx("div", __assign({ className: "relative h-full flex items-center px-8 md:px-16 lg:px-24" }, { children: _jsxs("div", __assign({ className: "max-w-2xl text-white animate-hero-fade-in opacity-0" }, { children: [_jsx("h1", __assign({ className: "text-7xl md:text-7xl font-bold mb-4" }, { children: "Sanskriti" })), _jsx("p", __assign({ className: "text-xl md:text-2xl mb-8 text-gray-400" }, { children: "Where tradition meets togetherness" })), _jsxs("div", __assign({ className: "flex space-x-6" }, { children: [_jsx("a", __assign({ href: socialMediaLinks.facebook, target: '_blank', className: "transform hover:scale-110 transition-transform" }, { children: _jsx(Facebook, { size: 32 }) })), _jsx("a", __assign({ href: socialMediaLinks.instagram, target: '_blank', className: "transform hover:scale-110 transition-transform" }, { children: _jsx(Instagram, { size: 32 }) })), _jsx("a", __assign({ href: socialMediaLinks.youtube, target: '_blank', className: "transform hover:scale-110 transition-transform" }, { children: _jsx(Youtube, { size: 32 }) }))] }))] })) }))] })), _jsx("section", __assign({ className: "w-full min-h-screen bg-gray-50 bg-inherit", id: "events" }, { children: _jsxs("div", __assign({ className: "h-full w-full animate-on-scroll opacity-0 flex flex-col justify-center px-8 md:px-16 lg:px-24" }, { children: [_jsx("h2", __assign({ className: "text-4xl font-bold mb-12 text-center mt-12" }, { children: "Upcoming Events" })), _jsx("div", __assign({ className: "h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" }, { children: upcomingEvents.map(function (event, index) { return (_jsx("div", __assign({ className: "group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex items-center justify-center" }, { children: _jsxs("div", __assign({ className: "relative h-full w-full" }, { children: [_jsx("div", __assign({ className: "absolute bottom-0 left-0 p-6 group-hover:opacity-0 transition-opacity duration-300" }, { children: _jsx("h3", __assign({ className: "text-xl text-white font-bold mb-2 transition-opacity duration-300 ease-in-out" }, { children: event.title })) })), _jsx("img", { src: event.image, alt: event.title, className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" }), _jsx("div", { className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" }), _jsx("div", __assign({ className: "absolute inset-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end" }, { children: _jsxs(Link, __assign({ to: event.link }, { children: [_jsx("h3", __assign({ className: "text-xl font-bold mb-2" }, { children: event.title })), _jsx("p", __assign({ className: "text-sm mb-2" }, { children: event.date })), _jsx("p", { children: event.description })] })) }))] })) }), index)); }) }))] })) })), _jsxs("section", __assign({ className: "w-full min-h-screen relative bg-inherit", id: "about" }, { children: [_jsxs("div", __assign({ className: "absolute inset-0" }, { children: [_jsx("img", { src: "/images/fireworkds-at-side-of-hill.jpg", alt: "About the Verein", className: "absolute inset-0 w-full h-full object-cover object-center" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-l from-black/80 to-transparent" })] })), _jsx("div", __assign({ className: "min-h-screen flex items-center justify-end px-8 md:px-16 lg:px-24 animate-on-scroll opacity-0" }, { children: _jsxs("div", __assign({ className: "max-w-2xl text-white animate-hero-fade-in text-center flex flex-col items-center justify-center h-full" }, { children: [_jsxs("p", __assign({ className: "mb-8 text-gray-100" }, { children: ["Sanskriti e.V. is a multi-cultural club that welcomes people from all cultures, backgrounds, and interest groups. We are dedicated to bringing together individuals, in and around Hamburg, who share a passion for celebrating Indian festivals and promoting cultural exchange.", _jsx("br", {}), _jsx("br", {}), "We welcome you to join our vibrant community by subscribing to our newsletters. Stay updated with our latest events and activities."] })), _jsxs("button", __assign({ onClick: function () { return window.location.href = '/donations'; }, className: "w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2" }, { children: [_jsx(Heart, { className: "w-6 h-6" }), _jsx("span", { children: "Support Sanskriti" })] }))] })) }))] })), _jsx("section", __assign({ className: "w-full min-h-[70vh] py-20 px-8 md:px-16 lg:px-24 bg-inherit", id: "organization" }, { children: _jsxs("div", __assign({ className: "max-w-7xl mx-auto animate-on-scroll opacity-0" }, { children: [_jsx("h2", __assign({ className: "text-4xl font-bold mb-24 text-center" }, { children: "Our Organization" })), _jsxs("div", __assign({ className: "grid grid-cols-1 md:grid-cols-2 gap-12 items-center" }, { children: [_jsx("div", __assign({ className: "prose lg:prose-xl" }, { children: _jsxs("p", __assign({ className: "text-lg font-semibold text-gray-700 animate-hero-fade-in opacity-0 text-center" }, { children: ["Sanskriti is a non-profit organization dedicated to preserving and promoting Indian culture in Hamburg. ", _jsx("br", {}), "Our mission is to create a vibrant community that celebrates our rich heritage while fostering cultural exchange and understanding."] })) })), _jsx("div", __assign({ className: "flex flex-col space-y-6" }, { children: _jsxs("div", __assign({ className: "flex flex-col gap-4 py-12 justify-center items-center space-y-12" }, { children: [_jsxs("button", __assign({ onClick: function () { return window.location.href = '/membership/request'; }, className: "w-full sm:w-auto bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-emerald-700 transition-colors duration-300 flex items-center justify-center space-x-2" }, { children: [_jsx(Users, { className: "w-6 h-6" }), _jsx("span", { children: "Become a Member" })] })), _jsxs("button", __assign({ onClick: function () { return window.open('https://sanskriti-hamburg.medium.com/', '_blank'); }, className: "w-full sm:w-auto bg-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center space-x-2" }, { children: [_jsx(BookCopy, { className: "w-6 h-6" }), _jsx("span", { children: "Read Our Blogs" })] }))] })) }))] }))] })) })), _jsx(Footer, {})] })));
}
export default HomePage;
