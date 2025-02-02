import { useEffect } from 'react';
import { Facebook, Instagram, Youtube, Mail } from 'lucide-react';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Home, Calendar, Users, Info } from 'lucide-react';

function HomePage() {

  const [activeSection, setActiveSection] = useState('home');

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

  const events = [
    {
      title: "Poila Boishakh 2025",
      date: "April 14, 2025",
      description: "Bengali New Year Celebration",
      image: "/images/lamps-cultural-event.jpg",
      link: "/events/poila-boishakh-2025"
    },
    {
      title: "Holi 2025",
      date: "Mar 14, 2025",
      description: "Holi Celebration",
      image: "/images/holi-colors-hands.jpg",
      link: "/events/holi-2025"
    },
    {
      title: "Durga Puja 2025",
      date: "Sep 28 - Oct 02, 2025",
      description: "Annual Durga Puja Festival",
      image: "/images/ma-durga-face-right.jpg",
      link: "/events/durga-puja-2025"
    },
    {
      title: "Sit and Draw Competition",
      date: "(tbd), 2025",
      description: "Drawing workshop for kids",
      image: "/images/hand-alpona.jpg",
      link: "/events/sit-and-draw-2025"
    },
    {
      title: "Diwali 2025",
      date: "(tbd), 2025",
      description: "Diwali 2025 Celebration",
      image: "/images/candles-among-diwali-designs.jpg",
      link: "/events/diwali-2025"
    }
  ];

  const sections = [
    { id: 'home', icon: <Home size={24} /> },
    { id: 'events', icon: <Calendar size={24} /> },
    { id: 'membership', icon: <Users size={24} /> },
    { id: 'organization', icon: <Info size={24} /> }
  ];

  return (
    <div className="w-full min-h-screen bg-background_color">
    
      {/* Overlay Navigation */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-700/50 backdrop-blur-md rounded-full p-4 flex space-x-4 z-50">
        {sections.map(section => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`p-2 rounded-full text-white transition-opacity duration-300 ${activeSection === section.id ? 'opacity-100' : 'opacity-50'}`}
          >
            {section.icon}
          </a>
        ))}
      </div>

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
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <Link to={event.link}>
                  <div className="absolute inset-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-sm mb-2">{event.date}</p>
                    <p>{event.description}</p>
                  </div>
                </Link>
              </div>
            </div>
          ))
        }
          </div>
        </div>
      </section>

      {/* Membership Callout Section */}
      <section className="w-full min-h-screen relative" id="membership">
        <div className="absolute inset-0">
          <img 
            src="/images/fireworkds-at-side-of-hill.jpg"
            alt="Bengali Culture" 
            className="absolute inset-0 w-full h-full object-cover object-center" 
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 to-transparent" />
        </div>

        <div className="min-h-screen flex items-center justify-end px-8 md:px-16 lg:px-24 animate-on-scroll opacity-0">
            <div className="max-w-2xl text-white animate-hero-fade-in opacity-0 text-center flex flex-col items-center justify-center h-full">
              <p className="mb-8 text-gray-100">
                Sanskriti e.V. is a multi-cultural club that welcomes people from all cultures, backgrounds, and interest groups. 
                We are dedicated to bringing together individuals who share a passion for celebrating Indian festivals and promoting cultural exchange. 
                <br /><br />
                By joining our club, you will become part of a vibrant community that values diversity and togetherness.
              </p>
              <div className="flex space-x-6 justify-end my-8">
                <a 
                  href="mailto:info@sanskriti-hamburg.de" target='_blank' rel='noreferrer'
                  className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300">
                  Become a Member
                </a>
              </div>
            </div>
        </div>
        
      </section>

      {/* Organization Section */}
      <section className="w-full min-h-screen py-20 px-8 md:px-16 lg:px-24 bg-white" id="organization">
        <div className="max-w-7xl mx-auto animate-on-scroll opacity-0">
          <h2 className="text-4xl font-bold mb-24 text-center">Our Organization</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <img 
                src="/images/vorstand_ladies_2.jpg"
                alt="Cultural Performance"
                className="object-cover rounded-lg"
                />
              </div>
              <p className="text-center text-gray-600 text-xs mt-2">Members of the Board of Sanskriti e.V.</p>
            </div>
            <div className="flex flex-col space-y-6">
              <div className="prose lg:prose-xl">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Sanskriti is a proud women-led non-profit organization dedicated to preserving and promoting Bengali culture in Hamburg. 
                  Our mission is to create a vibrant community that celebrates our rich heritage while fostering cultural exchange and understanding.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 py-12 justify-center">
                <form action="https://www.paypal.com/donate" method="post" target="_blank">
                  <button 
                    type="submit"
                    className="w-full sm:w-auto bg-[#0070BA] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#003087] transition-colors duration-300 flex items-center justify-center space-x-2">
                    <span>Donate to the Club</span>
                  </button>
                </form>
                <a 
                  href="mailto:info@sanskriti-hamburg.de" target='_blank' rel='noreferrer'
                  className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>Join Us</span>
                </a>
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