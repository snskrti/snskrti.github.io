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
import { DonateByPaypal } from '../components/DonateActions/DonateByPaypal';
import { socialMediaLinks } from '../types/socialMediaLinks';
import { NewsletterSubscribe } from '../components/shared/NewsletterSubscribe';
import { SEOHead } from '../components/SEO/SEOHead';

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
    { id: 'about', name: 'About the Verein', icon: <Info size={24} /> },
    { id: 'organization', name: 'Organisational Structure', icon: <Users size={24} /> }
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
    <div className="w-full min-h-screen bg-inherit">
      <SEOHead
        title="Sanskriti e.V. Hamburg - Where Tradition Meets Togetherness"
        description="Sanskriti e.V. is a multicultural non-profit organization in Hamburg, Germany, dedicated to celebrating Indian festivals and promoting cultural exchange. Join our vibrant community for Durga Puja, Holi, Diwali, and more cultural events."
        keywords="Sanskriti, Hamburg, Indian culture, Bengali culture, Durga Puja, Holi, Diwali, cultural events, non-profit, community, Indian festivals Germany"
        url="/"
        type="website"
        image="/images/candles-among-diwali-designs.jpg"
      />

      <SectionNavigation activeSection={activeSection} sections={sections} />

      {/* Hero Section */}
      <section id="home" className="h-screen relative bg-inherit">
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
              <a href={socialMediaLinks.facebook} target='_blank'
                className="transform hover:scale-110 transition-transform">
                  <Facebook size={32} />
              </a>
              <a href={socialMediaLinks.youtube} target='_blank'
                className="transform hover:scale-110 transition-transform">
                  <Youtube size={32} />
              </a>
            </div>
          </div>
        </div>
        
      </section>

      {/* Events Section */}
      <section className="w-full min-h-screen bg-gray-50 bg-inherit" id="events">
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
      <section className="w-full min-h-screen relative bg-inherit" id="about">
        <div className="absolute inset-0">
          <img 
            src="/images/fireworkds-at-side-of-hill.jpg"
            alt="About the Verein" 
            className="absolute inset-0 w-full h-full object-cover object-center" 
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 to-transparent" />
        </div>

        <div className="min-h-screen flex items-center justify-end px-8 md:px-16 lg:px-24 animate-on-scroll opacity-0">
            <div className="max-w-2xl text-white animate-hero-fade-in text-center flex flex-col items-center justify-center h-full">
              <p className="mb-8 text-gray-100">
                Sanskriti e.V. is a multi-cultural club that welcomes people from all cultures, backgrounds, and interest groups. 
                We are dedicated to bringing together individuals, in and around Hamburg, who share a passion for celebrating Indian festivals and promoting cultural exchange. 
                <br /><br />
                We welcome you to join our vibrant community by subscribing to our newsletters. Stay updated with our latest events and activities.
              </p>
              <NewsletterSubscribe />
            </div>
        </div>
        
      </section>

      {/* Organization Section */}
      <section className="w-full min-h-[70vh] py-20 px-8 md:px-16 lg:px-24 bg-inherit" id="organization">
        <div className="max-w-7xl mx-auto animate-on-scroll opacity-0">
          <h2 className="text-4xl font-bold mb-24 text-center">Our Organization</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="prose lg:prose-xl">
                <p className="text-lg font-semibold text-gray-700 animate-hero-fade-in opacity-0 text-center">
                  Sanskriti is a proud women-led non-profit organization dedicated to preserving and promoting Indian culture in Hamburg. <br /> 
                  Our mission is to create a vibrant community that celebrates our rich heritage while fostering cultural exchange and understanding.
                </p>
              </div>
            <div className="flex flex-col space-y-6">
              
                <div className="flex flex-col gap-4 py-12 justify-center items-center space-y-12">

                <button 
                  onClick={() => window.location.href = '/membership/request'}
                  className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-emerald-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <Users className="w-6 h-6" />
                  <span>Become a Member</span>
                </button>

                <DonateByPaypal />

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