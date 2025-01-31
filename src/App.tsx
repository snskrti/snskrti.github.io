import React, { useEffect } from 'react';
import { Facebook, Instagram, Youtube, Mail, Home, Calendar, Users } from 'lucide-react';

function App() {
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
      title: "Pohela Boishakh 2024",
      date: "April 14, 2024",
      description: "Bengali New Year Celebration",
      image: "/images/hero-image.jpg" // Using hero image as fallback
    },
    {
      title: "Durga Puja 2024",
      date: "October 9-13, 2024",
      description: "Annual Durga Puja Festival",
      image: "/images/durga-puja.jpg"
    },
    {
      title: "Winter Cultural Night",
      date: "December 15, 2024",
      description: "Music and Dance Performance",
      image: "/images/durga_puja2.jpg"
    }
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section id="home" className="h-screen relative">
        <div className="absolute inset-0">
          <img 
            src="/images/hero-image.jpg"
            alt="Bengali Culture" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>
        
        <div className="relative h-full flex items-center px-8 md:px-16 lg:px-24">
          <div className="max-w-2xl text-white animate-hero-fade-in opacity-0">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">Sanskriti</h1>
            <p className="text-xl md:text-2xl mb-8">A piece of Bengali life in Hamburg</p>
            <div className="flex space-x-6">
              <a href="#" className="transform hover:scale-110 transition-transform">
                <Instagram size={32} />
              </a>
              <a href="#" className="transform hover:scale-110 transition-transform">
                <Facebook size={32} />
              </a>
              <a href="#" className="transform hover:scale-110 transition-transform">
                <Youtube size={32} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="animate-on-scroll opacity-0">
          <h2 className="text-4xl font-bold mb-12 text-center">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-64">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-sm mb-2">{event.date}</p>
                    <p>{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organization Section */}
      <section id="organization" className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto animate-on-scroll opacity-0">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Organization</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] overflow-hidden rounded-lg">
              <div className="absolute inset-0 blur-lg transform scale-110">
                <img 
                  src="/images/durga_puja2.jpg"
                  alt="Cultural Performance"
                  className="w-full h-full object-cover"
                />
              </div>
              <img 
                src="/images/durga_puja2.jpg"
                alt="Cultural Performance"
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col space-y-6">
              <div className="prose lg:prose-xl">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Sanskriti is a proud women-led non-profit organization dedicated to preserving and promoting Bengali culture in Hamburg. 
                  Our mission is to create a vibrant community that celebrates our rich heritage while fostering cultural exchange and understanding.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <form action="https://www.paypal.com/donate" method="post" target="_blank">
                  <button 
                    type="submit"
                    className="w-full sm:w-auto bg-[#0070BA] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#003087] transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Donate with PayPal</span>
                  </button>
                </form>
                <a 
                  href="mailto:info@sanskriti-hamburg.de"
                  className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>Contact Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Navigation */}
      <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-md px-6 py-3 rounded-full shadow-lg z-50">
        <ul className="flex space-x-8">
          <li>
            <a 
              href="#home"
              className="text-white/80 hover:text-white flex flex-col items-center transition-colors duration-300"
            >
              <Home className="w-6 h-6" />
              <span className="text-xs mt-1">Home</span>
            </a>
          </li>
          <li>
            <a 
              href="#events"
              className="text-white/80 hover:text-white flex flex-col items-center transition-colors duration-300"
            >
              <Calendar className="w-6 h-6" />
              <span className="text-xs mt-1">Events</span>
            </a>
          </li>
          <li>
            <a 
              href="#organization"
              className="text-white/80 hover:text-white flex flex-col items-center transition-colors duration-300"
            >
              <Users className="w-6 h-6" />
              <span className="text-xs mt-1">About</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;