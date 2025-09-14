import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Users, Heart, Star, Mic, HandHeart, Music, PaintBucket, Mail, Facebook, Instagram, TicketX, Leaf, Utensils, MapPinIcon, ChefHat, Camera, Shirt, Palette } from 'lucide-react';
import { Footer } from '../../../components/shared/Footer';
import { SEOHead } from '../../../components/SEO/SEOHead';
import { getEventDate } from '../../../utils/eventUtils';
import { socialMediaLinks } from '../../../types/socialMediaLinks';

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

  // Gallery data
  const galleryData = [
    {
      id: 1,
      image: "/images/hand-alpona.jpg", // Using existing image for now
      alt: "Community Potluck",
      title: "Community Potluck",
      description: "Join us for a delightful feast where everyone contributes their favorite homemade dishes, creating a diverse spread of Bengali cuisine that brings us together."
    },
    {
      id: 2,
      image: "/images/lamps-cultural-event.jpg", // Using existing image for now
      alt: "Cultural Program",
      title: "Cultural Program",
      description: "Experience the vibrant cultural performances showcasing traditional Bengali music, dance, and theatrical presentations that celebrate our rich heritage."
    },
    {
      id: 3,
      image: "/images/ma-durga-face-right.jpg", // Using existing image for now
      alt: "Fashion Show",
      title: "Fashion Show",
      description: "Witness a spectacular fashion show featuring traditional Bengali attire with a modern twist, celebrating the essence of Durga Puja through fashion."
    },
    {
      id: 4,
      image: "/images/holi-colors-hands.jpg", // Using existing image for now
      alt: "Children's Activities",
      title: "Children's Go-As-You-Like",
      description: "Watch the little ones showcase their creativity and talent in a delightful performance segment specially designed for children to express themselves freely."
    },
    {
      id: 5,
      image: "/images/welcome_to_club.jpg", // Using existing image for now
      alt: "Community Building",
      title: "Community Connections",
      description: "Experience the warmth of our Bengali community as we come together, creating lasting bonds and igniting the excitement for the upcoming Durga Puja celebration."
    },
    {
      id: 6,
      image: "/images/diya-lights-bright-to-dark.jpg", // Using existing image for now
      alt: "Mahalaya Traditions",
      title: "Mahalaya Spirit",
      description: "Feel the spiritual significance of Mahalaya as we mark the beginning of Devi Paksha and prepare our hearts and minds for the arrival of Maa Durga."
    },
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

    // Gallery scroll effect
    const handleGalleryScroll = () => {
      const gallerySection = document.querySelector('section.relative > div.relative');
      if (!gallerySection) return;
      
      const rect = gallerySection.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      
      // Calculate which image should be visible
      const imageIndex = Math.floor(scrollProgress * galleryData.length);
      const currentIndex = Math.min(galleryData.length - 1, Math.max(0, imageIndex));
      
      // Update image visibility
      galleryData.forEach((item, index) => {
        const image = document.getElementById(`gallery-image-${item.id}`);
        if (image) {
          if (index === currentIndex) {
            image.style.opacity = '1';
          } else {
            image.style.opacity = '0';
          }
        }
      });
    };

    window.addEventListener('scroll', handleGalleryScroll);
    handleGalleryScroll(); // Initial call

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleGalleryScroll);
    };
  }, []);

  // Event date is set to September 14, 2025, a week before Durga Puja
  const eventDate = "14 September 2025";
  
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
        eventLocation="Hamburg, Germany" // Location to be updated when confirmed
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
                href="#potluck"
                className="flex items-center space-x-2 px-6 py-3 rounded-full border-2 font-semibold btn-secondary">
                <ChefHat className="w-5 h-5" />
                <span>Join the Potluck</span>
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
      <section className="relative">
        <div className="relative" style={{ height: `${galleryData.length * 100}vh` }}>
          {/* Background Images */}
          <div className="sticky top-0 h-screen w-screen overflow-hidden">
            {galleryData.map((item, index) => (
              <div 
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === 0 ? 'opacity-100' : 'opacity-0'}`} 
                id={`gallery-image-${item.id}`}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 0%, transparent 20%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 100%)' }}></div>
              </div>
            ))}
          </div>
          
          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col">
            {galleryData.map((item) => (
              <div key={item.id} className="h-screen w-screen flex items-center justify-end pr-8 md:pr-16 lg:pr-24">
                <div className="max-w-md text-white z-10">
                  <h3 className="text-3xl md:text-4xl font-bold mb-6">{item.title}</h3>
                  <p className="text-lg leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <div className="w-16 h-1 bg-amber-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-16 flex flex-col space-y-32">

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
                At Sanskriti Hamburg, we're creating a special Mahalaya celebration that brings our community together before the 
                grand Durga Puja festivities. This event is designed to ignite the festive spirit within our hearts and prepare 
                us for the upcoming celebration.
              </p>

              <p className="mt-4">
                Through community potluck, cultural performances, fashion show, and children's activities, we aim to strengthen 
                our bonds as a Bengali community in Hamburg while sharing our beautiful traditions with everyone interested in 
                our culture.
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

        {/* Event Highlights Section */}
        <section className="animate-on-scroll opacity-0">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Event Highlights</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our Mahalaya celebration features a variety of activities designed to bring the community together 
              and ignite the Durga Puja spirit.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Community Potluck */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-lg shadow-lg" id="potluck">
              <div className="flex items-center mb-6">
                <ChefHat className="w-8 h-8 text-amber-600 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-800">Community Potluck</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Bring your favorite homemade dish to share with the community! Let's create a diverse feast of Bengali cuisine together.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• Homemade Bengali specialties</li>
                <li>• Vegetarian and non-vegetarian options</li>
                <li>• Traditional sweets and desserts</li>
                <li>• Recipe sharing and food stories</li>
              </ul>
              <a
                href="#register"
                className="inline-block bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors font-semibold"
              >
                Join the Potluck
              </a>
            </div>
            
            {/* Fashion Show */}
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <Shirt className="w-8 h-8 text-rose-600 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-800">Fashion Show</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Showcase traditional Bengali attire with a modern twist in our Durga Puja-themed fashion show. All ages welcome!
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• Traditional sarees and dhotis</li>
                <li>• Modern fusion Bengali wear</li>
                <li>• Durga Puja color themes</li>
                <li>• Accessories and jewelry</li>
              </ul>
              <a
                href="#register"
                className="inline-block bg-rose-600 text-white px-6 py-3 rounded-full hover:bg-rose-700 transition-colors font-semibold"
              >
                Participate
              </a>
            </div>
            
            {/* Children's Go-As-You-Like */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <Palette className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-800">Children's Activities</h3>
              </div>
              <p className="text-gray-600 mb-6">
                A special "Go-As-You-Like" segment for children to express themselves creatively through performance, costume, and talent.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• Creative performances</li>
                <li>• Costume showcase</li>
                <li>• Talent display</li>
                <li>• Fun and interactive activities</li>
              </ul>
              <a
                href="#register"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors font-semibold"
              >
                Register Your Child
              </a>
            </div>
            
            {/* Cultural Program */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <Music className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-800">Cultural Program</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Enjoy and participate in a rich cultural program featuring music, dance, and theatrical performances celebrating Bengali heritage.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• Traditional Bengali songs</li>
                <li>• Classical and folk dances</li>
                <li>• Recitations and poetry</li>
                <li>• Short theatrical pieces</li>
              </ul>
              <a
                href="#register"
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors font-semibold"
              >
                Perform with Us
              </a>
            </div>
            
            {/* Community Building */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-800">Community Building</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Connect with fellow Bengali community members and others interested in our culture. Create lasting bonds and friendships.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• Meet and greet sessions</li>
                <li>• Cultural exchange</li>
                <li>• Networking opportunities</li>
                <li>• Shared celebration experience</li>
              </ul>
              <a
                href="#register"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors font-semibold"
              >
                Join the Community
              </a>
            </div>
            
            {/* Durga Puja Announcements */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <Mic className="w-8 h-8 text-yellow-600 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-800">Pujo Announcements</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Get the latest updates and important information about the upcoming Durga Puja celebration. Be the first to know!
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• Event schedule details</li>
                <li>• Volunteer opportunities</li>
                <li>• Special programs and guests</li>
                <li>• Participation guidelines</li>
              </ul>
              <a
                href="/events/durga-puja-2025"
                className="inline-block bg-yellow-600 text-white px-6 py-3 rounded-full hover:bg-yellow-700 transition-colors font-semibold"
              >
                Durga Puja Details
              </a>
            </div>
          </div>
        </section>

        {/* Registration and Volunteer Section */}
        <section className="animate-on-scroll opacity-0" id="register">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Join the Celebration</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Be part of our Mahalaya celebration by registering as a participant or volunteering to help organize the event.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <TicketX className="w-8 h-8 text-amber-600 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-800">Register to Participate</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Register now to participate in our Mahalaya celebration. Let us know how you'd like to contribute to make this event special.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• Join the community potluck</li>
                <li>• Participate in the fashion show</li>
                <li>• Register your child for the Go-As-You-Like</li>
                <li>• Perform in the cultural program</li>
              </ul>
              <a
                href="mailto:admin@sanskriti-hamburg.de?subject=Mahalaya%202025%20Registration"
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors font-semibold"
              >
                Register Now
              </a>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg shadow-lg" id="volunteer">
              <div className="flex items-center mb-6">
                <HandHeart className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-800">Volunteer With Us</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Help us make this Mahalaya celebration a success by volunteering your time and skills. We need your support!
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• Event setup and decoration</li>
                <li>• Food coordination and service</li>
                <li>• Program management</li>
                <li>• Photography and documentation</li>
              </ul>
              <a
                href="mailto:admin@sanskriti-hamburg.de?subject=Volunteer%20for%20Mahalaya%202025"
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors font-semibold"
              >
                Volunteer Now
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
              <h3 className="text-2xl font-semibold text-gray-800">Venue Details Coming Soon</h3>
            </div>
            <p className="text-gray-600 mb-6 text-center">
              We're finalizing our venue for the Mahalaya celebration. Stay tuned for updates!
              <br /><br />
              <span className="font-semibold">Date: {eventDate}</span>
              <br />
              <span className="font-semibold">Time: 10:00 AM - 8:00 PM</span>
            </p>
            <div className="flex justify-center">
              <a
                href="mailto:admin@sanskriti-hamburg.de?subject=Mahalaya%202025%20Venue%20Information"
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors font-semibold"
              >
                Request Venue Information
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
