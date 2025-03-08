import React from 'react';
import { useEffect } from 'react';
import { Facebook, Instagram, Youtube, Mail, Navigation } from 'lucide-react';
import { Footer } from '../components/shared/Footer';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Home, Calendar, Users, Info } from 'lucide-react';
import { NavigationSection } from '../types/navigation_section';
import { events } from '../types/events';
import { SectionNavigation } from '../components/shared/SectionNavigation';

function HomePage() {

  const [activeSection, setActiveSection] = useState('home');
  const [subscriptionEmail, setSubscriptionEmail] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = sections.find(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // refactor this to become a hook
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // define the sections in the page
  const sections: NavigationSection[] = [
    { id: 'home', name: 'Banner', icon: <Home size={24} /> },
    { id: 'events', name: 'Events', icon: <Calendar size={24} /> },
    { id: 'about', name: 'About the Verein', icon: <Users size={24} /> },
    { id: 'organization', name: 'Organisational Structure', icon: <Info size={24} /> }
  ];

  const handleSubscribe = () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(subscriptionEmail)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // todo: add functionality to subscribe the user as a google contact
  }

  return (
    <div className="w-full min-h-screen bg-background_color">

      <SectionNavigation activeSection={activeSection} sections={sections} />

      {/* Hero Section */}
      <section id="home" className="h-screen relative">
        <div className="absolute inset-0">
          <img 
            src="/images/candles-among-diwali-designs.jpg"
            alt="Bengali Culture" 
            className="absolute inset-0 w-full h-full object-cover object-center" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>

        <div className="relative h-full flex items-center px-8 md:px-16 lg:px-24">
          <div className="max-w-2xl text-white animate-hero-fade-in opacity-0">
            <h1 className="text-7xl md:text-7xl font-bold mb-4">Sanskriti</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-400">Where tradition meets togetherness</p>
            <div className="flex space-x-6">
              <a href="https://instagram.com" className="transform hover:scale-110 transition-transform">
          <Instagram size={32} />
              </a>
              <a href="https://facebook.com" className="transform hover:scale-110 transition-transform">
          <Facebook size={32} />
              </a>
              <a href="https://youtube.com" className="transform hover:scale-110 transition-transform">
          <Youtube size={32} />
              </a>
            </div>
          </div>
        </div>
        
      </section>

      {/* Events Section */}
      <section className="w-full min-h-screen bg-gray-50" id="events">
        <div className="h-full w-full animate-on-scroll opacity-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <h2 className="text-4xl font-bold mb-12 text-center mt-12">Upcoming Events</h2>
          <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {
          events.map((event, index) => (
          <div 
            key={index}
            className="group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex items-center justify-center">
            
            <div className="relative h-full w-full">
                <div className="absolute bottom-0 left-0 p-6 group-hover:opacity-0 transition-opacity duration-300">
                    <h3 className="text-xl text-white font-bold mb-2 transition-opacity duration-300 ease-in-out">{event.title}</h3>
                </div>

              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute inset-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
                  <Link to={event.link}>
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="text-sm mb-2">{event.date}</p>
                      <p>{event.description}</p>
                  </Link>
                </div>
              </div>
            </div>
          ))
        }
          </div>
        </div>
      </section>

      {/* About the Verein Section */}
      <section className="w-full min-h-screen relative" id="about">
        <div className="absolute inset-0">
          <img 
            src="/images/fireworkds-at-side-of-hill.jpg"
            alt="About the Verein" 
            className="absolute inset-0 w-full h-full object-cover object-center" 
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 to-transparent" />
        </div>

        <div className="min-h-screen flex items-center justify-end px-8 md:px-16 lg:px-24 animate-on-scroll opacity-0">
            <div className="max-w-2xl text-white animate-hero-fade-in opacity-0 text-center flex flex-col items-center justify-center h-full">
              <p className="mb-8 text-gray-100">
                Sanskriti e.V. is a multi-cultural club that welcomes people from all cultures, backgrounds, and interest groups. 
                We are dedicated to bringing together individuals, in and around Hamburg, who share a passion for celebrating Indian festivals and promoting cultural exchange. 
                <br /><br />
                We welcome you to join our vibrant community by subscribing to our newsletters. Stay updated with our latest events and activities.
              </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-end my-8">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  onChange={(e) => setSubscriptionEmail(e.target.value)}
                  className="px-4 py-3 text-black shadow-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600" 
                  id="email-input"
                />
                <button 
                  className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
                  onClick={handleSubscribe}
                >
                  Subscribe
                </button>
                </div>
            </div>
        </div>
        
      </section>

      {/* Organization Section */}
      <section className="w-full min-h-screen py-20 px-8 md:px-16 lg:px-24 bg-white" id="organization">
        <div className="max-w-7xl mx-auto animate-on-scroll opacity-0">
          <h2 className="text-4xl font-bold mb-24 text-center">Our Organization</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="prose lg:prose-xl">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Sanskriti is a proud women-led non-profit organization dedicated to preserving and promoting Indian culture in Hamburg. 
                  Our mission is to create a vibrant community that celebrates our rich heritage while fostering cultural exchange and understanding.
                </p>
              </div>
            <div className="flex flex-col space-y-6">
              
                <div className="flex flex-col gap-4 py-12 justify-center items-center space-y-12">

                <button 
                  onClick={() => window.location.href = '/membership/request'}
                  className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>Join Us</span>
                </button>

                <form action="https://www.paypal.com/donate" method="post" target="_blank">
                  <button 
                  type="submit"
                  className="w-full sm:w-auto bg-[#0070BA] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#003087] transition-colors duration-300 flex items-center justify-center space-x-2">
                  <span>Donate to the Club</span>
                  </button>
                </form>

                </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;