import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Users, Heart, Star, Mic, HandHeart, Music, PaintBucket, Mail, Facebook, Instagram, TicketX, Leaf, Utensils, MapPinIcon, ChefHat, Camera, Shirt, Palette } from 'lucide-react';
import { Footer } from '../../../components/shared/Footer';
import { SEOHead } from '../../../components/SEO/SEOHead';
import { getEventDate } from '../../../utils/eventUtils';
import { socialMediaLinks } from 'types';

function Mahalaya2025() {
  // Typewriter component for bilingual translation
  const TypewriterTranslation: React.FC = () => {
    const messages = [
      'মহালয়া',
      'Mahalaya'
    ];
    const [displayText, setDisplayText] = useState('');
    const [phase, setPhase] = useState<'idle'|'typing'|'pause'|'deleting'|'done'>('idle');
    const [msgIndex, setMsgIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    const typingSpeed = 55; // ms per char
    const deletingSpeed = 30; // ms per char when deleting
    const pauseAfterTyping = 1600; // pause before deleting
    const startDelayAfterLoad = 2000; // 2s after full page load

    // Start only after full window load + delay
    useEffect(() => {
      let startTimer: number | undefined;
      const startIfReady = () => {
        startTimer = window.setTimeout(() => setPhase('typing'), startDelayAfterLoad);
      };
      if (document.readyState === 'complete') {
        startIfReady();
      } else {
        window.addEventListener('load', startIfReady, { once: true });
      }
      return () => {
        if (startTimer) clearTimeout(startTimer);
        window.removeEventListener('load', startIfReady);
      };
    }, []);

    // Start after 1s delay
    useEffect(() => {
      const startTimer = setTimeout(() => setPhase('typing'), 1000);
      return () => clearTimeout(startTimer);
    }, []);

    useEffect(() => {
      if (phase === 'idle') return; // wait until started
      if (phase === 'typing') {
        if (charIndex < messages[msgIndex].length) {
          const timeout = setTimeout(() => {
            setDisplayText(messages[msgIndex].slice(0, charIndex + 1));
            setCharIndex(charIndex + 1);
          }, typingSpeed + (messages[msgIndex][charIndex] === '\n' ? 200 : 0));
          return () => clearTimeout(timeout);
        } else {
          const timeout = setTimeout(() => setPhase(msgIndex === 0 ? 'deleting' : 'done'), pauseAfterTyping);
          return () => clearTimeout(timeout);
        }
      }
      if (phase === 'deleting') {
        if (charIndex > 0) {
          const timeout = setTimeout(() => {
            setDisplayText(messages[msgIndex].slice(0, charIndex - 1));
            setCharIndex(charIndex - 1);
          }, deletingSpeed);
          return () => clearTimeout(timeout);
        } else {
            setMsgIndex(1);
            setPhase('typing');
        }
      }
    }, [phase, charIndex, msgIndex, messages]);

    return (
      <h1 className="text-8xl md:text-9xl font-bold mb-12">
        {displayText}
        {phase !== 'done' && <span className="animate-pulse">|</span>}
      </h1>
    );
  };

  // Gallery data with bullet points and CTA info
  const galleryData = [
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

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Add scroll animations
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

    // No need for gallery scroll effect to change images since we're using a single background
    // The text overlays will scroll naturally with the page scroll

    return () => {
      observer.disconnect();
    };
  }, []);

  // Event date is set to September 21, 2025, a week before Durga Puja
  const eventDate = "September 21, 2025";
  
  return (
    <div className="min-h-screen bg-inherit">
      <SEOHead
        title="Mahalaya 2025 – Pre-Durga Puja Celebration in Hamburg | Sanskriti Hamburg"
        description="Join Sanskriti e.V. for a special Mahalaya celebration in Hamburg on September 14, 2025. Experience community potluck, a fashion show, children's activities, and cultural performances as we prepare for Durga Puja. Connect with the local Bengali community and ignite the festive spirit."
        keywords="Mahalaya 2025, Hamburg, Bengali community, Pre-Durga Puja, Fashion show, Community potluck, Children's activities, Cultural event, Sanskriti eV, Mahalaya celebration Hamburg"
        url="/events/durga-puja-2025/mahalaya"
        type="event"
        image="/images/logo.png"
        eventStartDate="2025-09-14T10:00"
        eventEndDate="2025-09-14T20:00"
        eventLocation="DESY Building 9A, Notkestraße 85, 22607 Hamburg, Germany"
        eventType="Cultural Event"
        performer="Sanskriti e.V."
        offers={{
          price: "0",
          currency: "EUR",
          availability: "open for all",
          url: "/events/durga-puja-2025/mahalaya",
          validFrom: "2025-09-14T10:00",
          availabilityEnds: "2025-09-14T20:00"
        }}
      />

      {/* Hero Section */}
      <div className="relative h-screen">
        <img
          src="/images/durga-puja-announcement-2025/mahalaya_banner.jpg" // Using existing image, will be replaced later
          alt="Mahalaya Celebration"
          className="w-full h-full object-cover blur-sm opacity-100"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Calendar className="w-5 h-5" />
              <p className="text-xl font-light">{eventDate}</p>
            </div>

            <a href="https://maps.app.goo.gl/hfaUN7dyobJ8uSpQA" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 mb-4 hover:text-amber-300 transition-colors">
              <MapPinIcon className="w-5 h-5" />
              <p className="text-xl font-light">DESY (Building 9A)</p>
            </a>
            
            <div className="pt-6 mt-6">
              {/* Animated bilingual typewriter */}
              <TypewriterTranslation />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                href="#mahalaya-knowhow"
                className="flex items-center space-x-2 px-6 py-3 rounded-full border-2 font-semibold btn-secondary">
                  <ChefHat className="w-5 h-5" />
                  <span>Discover Event</span>
                </a>
              <a
                href="/images/durga-puja-announcement-2025/mahalaya_flyer.jpg"
                className="flex items-center space-x-2 px-6 py-3 rounded-full border-2 font-semibold btn-secondary"
                download="Mahalaya_2025_Flyer.jpg"
              >
                <HandHeart className="w-5 h-5" />
                <span>Download Flyer</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Section - Full Screen */}
      <section className="relative" id="gallery">
        <div className="relative" style={{ height: `${galleryData.length * 100}vh` }}>
          {/* Fixed Background Image - Different styles for mobile vs desktop */}
          <div className="sticky top-0 h-screen w-screen overflow-hidden">
            {/* Desktop view (md and above) */}
            <div className="absolute inset-0 hidden md:block">
              <img
                src="/images/durga-puja-announcement-2025/mahalaya_flyer_horizontal.jpeg"
                alt="Mahalaya Celebration Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 0%, transparent 20%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,1) 100%)' }}></div>
            </div>
            
            {/* Mobile view (below md) - Shows full image with left side clear */}
            <div className="absolute inset-0 md:hidden">
              <img
                src="/images/durga-puja-announcement-2025/mahalaya_flyer_horizontal.jpeg"
                alt="Mahalaya Celebration Background" 
                className="h-full w-full object-cover object-left"
                style={{ objectPosition: "12% center" }}
              />
              {/* Light overlay across entire image */}
              <div className="absolute inset-0 bg-black/10"></div>
              
              {/* Stronger gradient only on right side for text readability */}
              <div className="absolute right-0 top-0 w-1/2 h-full" 
                style={{ background: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.85) 100%)' }}>
              </div>
            </div>
          </div>
          
          {/* Text Content - This will change as user scrolls */}
          <div className="absolute inset-0 flex flex-col">
            {galleryData.map((item) => (
              <div key={item.id} className="h-screen w-screen flex items-center">
                {/* Mobile text positioning - Right aligned */}
                <div className="md:hidden w-full flex justify-end">
                  <div className="max-w-xs text-white z-10 p-4 mr-4 bg-black/30 backdrop-blur-sm rounded-lg">
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-sm leading-relaxed mb-3">
                      {item.description}
                    </p>
                    
                    {/* Bullet Points */}
                    <ul className="space-y-1 mb-4 text-sm">
                      {item.bulletPoints.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-amber-400 mr-2">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="w-12 h-1 bg-amber-500"></div>
                  </div>
                </div>
                
                {/* Desktop text positioning */}
                <div className="hidden md:flex w-full items-center justify-end pr-16 lg:pr-24">
                  <div className="max-w-md text-white z-10">
                    <h3 className="text-4xl font-bold mb-6">{item.title}</h3>
                    <p className="text-lg leading-relaxed mb-6">
                      {item.description}
                    </p>
                    
                    {/* Bullet Points */}
                    <ul className="space-y-2 mb-8">
                      {item.bulletPoints.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-amber-400 mr-2">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="w-16 h-1 bg-amber-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-16 flex flex-col space-y-32" id='mahalaya-knowhow'>

        {/* About Section */}
        <section className="animate-on-scroll opacity-0" id="about">
          <div className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed my-12">
              <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">About Mahalaya</h2>
              <div className="w-24 h-1 bg-amber-500 mx-auto mb-8"></div>
              
              <p>
                Mahalaya marks the beginning of Devi Paksha and the end of Pitri Paksha, signaling that Durga Puja is near. 
                It's a day when we invoke the goddess Durga to descend on Earth and begin her battle against evil.
              </p>
              
              <p className="mt-4">
                Sanskriti e.V. and Hamburg Bangaliyana group is organising a special Mahalaya celebration that brings our community together before the 
                grand Durga Puja festivities. This event is designed to ignite the festive spirit within our hearts and prepare 
                us for the upcoming celebration.
              </p>

                <p className="mt-4">
                Through community potluck, cultural discussions, fashion show, and children's activities, we aim to strengthen 
                our bonds as a Bengali community in Hamburg while sharing our beautiful traditions with everyone interested in 
                our culture.
                </p>
                
                <p className="mt-4">
                This special celebration will infuse the true mood of Durga Puja in all Bengalis present, awakening our 
                collective spirit to enjoy and immerse ourselves in the festivities through the next 10 days. Mahalaya serves as 
                the perfect prelude that ignites our anticipation for the grand celebration ahead.
                </p>

              <p className='mt-6 font-semibold'>
                Join us for this special day of connection, culture, and celebration as we prepare to welcome Maa Durga!
              </p>
          </div>
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center">
            <p className="text-gray-700 text-base md:text-lg flex-1 md:pr-4 text-center md:text-left">
              Follow us for event updates, photos, and community stories. Join our growing family online!
            </p>
            <div className="flex justify-center md:justify-start gap-10">
              <a
                href={socialMediaLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center group"
              >
                <Instagram className="w-10 h-10 text-pink-600 group-hover:text-pink-800 transition-colors" />
                <span className="text-sm mt-2 text-pink-700">Instagram</span>
              </a>
              <a
                href={socialMediaLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center group"
              >
                <Mail className="w-10 h-10 text-red-600 group-hover:text-red-800 transition-colors" />
                <span className="text-sm mt-2 text-red-700">YouTube</span>
              </a>
              <a
                href={socialMediaLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center group"
              >
                <Facebook className="w-10 h-10 text-blue-600 group-hover:text-blue-800 transition-colors" />
                <span className="text-sm mt-2 text-blue-700">Facebook</span>
              </a>
            </div>
          </div>
        </section>



        {/* Location Section - To be updated once confirmed */}
        <section className="animate-on-scroll opacity-0" id="location">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Event Location</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join us at our venue in Hamburg for a day of celebration, community bonding, and cultural immersion.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-8 rounded-lg shadow-lg">
            <div className="flex items-center mb-6 justify-center">
              <MapPinIcon className="w-8 h-8 text-red-600 mr-3" />
              <h3 className="text-2xl font-semibold text-gray-800">Event Venue</h3>
            </div>
            <p className="text-gray-600 mb-6 text-center">
              <span className="font-semibold text-lg block mb-2">DESY Building 9A, Notkestraße 85, 22607 Hamburg</span>
              <br />
              <span className="font-semibold">Date: {eventDate}</span>
              <br />
              <span className="font-semibold">Time: 12:00 AM - 5:00 PM</span>
            </p>
            <div className="flex justify-center">
              <a
                href="https://maps.app.goo.gl/hfaUN7dyobJ8uSpQA"
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors font-semibold"
              >
                Get Directions
              </a>
            </div>
          </div>
        </section>
        
      </main>

      <Footer />
    </div>
  );
}

export default Mahalaya2025;
