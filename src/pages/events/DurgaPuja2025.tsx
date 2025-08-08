import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Users, Heart, Star, Mic, HandHeart, Music, PaintBucket, Mail, Facebook, Instagram, TicketX } from 'lucide-react';
import { Footer } from '../../components/shared/Footer';
import { SEOHead } from '../../components/SEO/SEOHead';
import { getEventDate } from '../../utils/eventUtils';
import { socialMediaLinks } from '../../types/socialMediaLinks';

function DurgaPuja2025() {
  // Typewriter component for bilingual translation
  const TypewriterTranslation: React.FC = () => {
    const messages = [
      'মা আসছে',
      'Durga Puja'
    ];
    const [displayText, setDisplayText] = useState('');
    const [phase, setPhase] = useState<'typing'|'pause'|'deleting'|'done'>('typing');
    const [msgIndex, setMsgIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    const typingSpeed = 55; // ms per char
    const deletingSpeed = 30; // ms per char when deleting
    const pauseAfterTyping = 1600; // pause before deleting

    useEffect(() => {
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
          // move to next message
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

  const eventDate = getEventDate('/events/durga-puja-2025');
  
  return (
    <div className="min-h-screen bg-inherit">
      <SEOHead
        title="Durga Puja 2025 – Bengali Festival in Hamburg | Sanskriti Hamburg"
        description="Join Sanskriti e.V. for the historic first Durga Puja celebration in Hamburg from Sep 28 - Oct 01, 2025. Experience divine festivities, cultural performances, traditional Bengali rituals, and community bonding. Volunteers and participants welcome!"
        keywords="Durga Puja 2025, Hamburg, Bengali festival, Maa Durga, Durga Puja Hamburg, Indian cultural events, Sanskriti eV, Bengali community, volunteers, cultural performances, Sanskriti Hamburg, Durga festival Hamburg"
        url="/events/durga-puja-2025"
        type="event"
        image="/images/logo.png"
        eventStartDate="2025-09-28T00:00"
        eventEndDate="2025-10-01T00:00"
        eventLocation="Nienhöfener Str. 18, 25421 Pinneberg"
        eventType="Cultural Festival"
        performer="Sanskriti e.V."
        offers={{
          price: "0",
          currency: "EUR",
          availability: "open for all",
          url: "/events/durga-puja-2025",
          validFrom: "2025-09-28T00:00",
          availabilityEnds: "2025-10-01T00:00"
        }}
      />



      {/* Hero Section */}
      <div className="relative h-screen">
        <img
          src="/images/kallol_durga_idol.jpg"
          alt="Durga Puja Celebration"
          className="w-full h-full object-cover blur-sm opacity-90"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Calendar className="w-5 h-5" />
              <p className="text-xl font-light">{eventDate}</p>
            </div>
            
            {/* <h1 className="text-8xl md:text-9xl font-bold mb-12">Durga Puja</h1> */}
            <div className="pt-6 mt-6">
              {/* Replaced static translation with animated bilingual typewriter */}
              <TypewriterTranslation />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://www.google.com/maps/place/B%C3%BCrgerverein+Waldenau-Datum+e.V./@53.6211916,9.7977995,17z/data=!3m2!4b1!5s0x47b1811264d608b1:0x1d2d3e834f7f79f0!4m6!3m5!1s0x47b1811264ab5c7b:0xec3cd5b12fe9e60e!8m2!3d53.6211884!4d9.8003744!16s%2Fg%2F1tdmjjnt?entry=ttu&g_ep=EgoyMDI1MDcwOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-6 py-3 rounded-full border-2 font-semibold btn-secondary">
                <MapPin className="w-5 h-5" />
                <span>View Location</span>
              </a>
              
              <a
                href="https://www.desipass.com/events/events-details?eventId=01K206DZB1DAGBX15RZV6SAH52"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-6 py-3 rounded-full border-2 font-semibold btn-secondary">
                <TicketX className="w-5 h-5" />
                <span>Get your Entry ticket</span>
              </a>

            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-16 flex flex-col space-y-48">
        
        {/* Sanskrit Shlok Section */}
        <section className="flex items-center justify-center animate-on-scroll opacity-0 w-full h-screen">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-16 rounded-lg shadow-lg flex items-center justify-center w-full">
            <div className="max-w-4xl mx-auto w-full">
              <div className="relative">
                <div className="absolute -top-8 -left-8 text-8xl text-amber-200 font-serif">"</div>
                <div className="absolute -bottom-8 -right-8 text-8xl text-amber-200 font-serif">"</div>
                <div className="py-8">
                  <p className="text-4xl md:text-5xl font-bold text-amber-800 mb-8 leading-relaxed tracking-wide">
                    या देवी सर्वभूतेषु मातृरूपेण संस्थिता<br/>
                    नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
      </main>

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
        <section className="animate-on-scroll opacity-0">
          <div className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed my-12">
              <p>
                Durga Puja is more than a religious ritual — it's a feeling, a reunion, and a deep expression of joy, identity, and community. <br />
                For those of us living far from Kolkata, it is our way of creating home away from home. In the crisp autumn breeze of Hamburg, we recreate the fragrance of shiuli, the echo of dhaak, and the warmth of community gatherings that define this beloved celebration.
                At Sanskriti Hamburg, our Durga Puja is a space where generations connect, where children witness traditions, and where language, food, music, and rituals come alive — not just remembered, but lived.
                This Puja is our tribute to heritage, inclusiveness, and the joy of coming together. Whether you are Bengali, Indian, German, or simply curious — you are part of this celebration.
              </p>

              <p className='pt-8'>
                This is more than just an event—it's the beginning of a cherished tradition in Hamburg. Your participation will help us create memories that will last for generations.
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

        <section className="animate-on-scroll opacity-0">
          <div className="bg-gradient-to-r from-orange-50 to-amber-100 p-10 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-amber-800 mb-6 text-center">Program Schedule & Food Menu</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Program Schedule Item */}
              <div className="bg-white rounded-lg shadow p-8 flex flex-col h-full">
                <div className="flex-grow">
                  <div className="flex justify-center mb-6">
                    <div className="bg-amber-100 p-4 rounded-full">
                      <Calendar className="w-10 h-10 text-amber-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-amber-800 mb-4 text-center">Program Schedule</h3>
                  <p className="text-gray-700 text-center leading-relaxed">
                    Discover the rituals, timings, and cultural performances planned for each day of Durga Puja 2025. A detailed schedule will be published soon!
                  </p>
                </div>
                <div className="flex justify-center mt-6">
                  <span className="text-gray-500 text-sm italic">Coming soon ...</span>
                </div>
              </div>
              {/* Food Menu Item */}
              <div className="bg-white rounded-lg shadow p-8 flex flex-col h-full">
                <div className="flex-grow">
                  <div className="flex justify-center mb-6">
                    <div className="bg-amber-100 p-4 rounded-full">
                      <Heart className="w-10 h-10 text-amber-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-amber-800 mb-4 text-center">Food Menu</h3>
                  <p className="text-gray-700 text-center leading-relaxed">
                    Enjoy authentic Bengali cuisine prepared by our community. The full menu for all four days will be revealed closer to the event!
                  </p>
                </div>
                <div className="flex justify-center mt-6">
                  <span className="text-gray-500 text-sm italic">Coming soon ...</span>
                </div>
              </div>
            </div>
            <p className="text-md text-gray-600 text-center mt-10">
              Stay tuned for updates on rituals, cultural performances, and delicious food!
            </p>
          </div>
        </section>

        {/* Call to Action Sections */}
        <section className="animate-on-scroll opacity-0">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Join Us in Making History</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              This is our inaugural Durga Puja in Hamburg, and we need your support to make it extraordinary. 
              There are many ways to contribute and be part of this historic celebration.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <HandHeart className="w-8 h-8 text-amber-600 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-800">Volunteer with Us</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Join our dedicated team of volunteers! Help with decoration, food preparation, event coordination, 
                and ensuring every visitor has a memorable experience.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• Event setup and decoration</li>
                <li>• Food service and hospitality</li>
                <li>• Registration and crowd management</li>
                <li>• Photography and documentation</li>
              </ul>
              <a
                href="mailto:admin@sanskriti-hamburg.de?subject=Volunteer%20for%20Durga%20Puja%202025"
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors font-semibold"
              >
                Volunteer Now
              </a>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <Music className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-800">Showcase Your Talent</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Share your artistic talents with the community! We welcome performers of all ages and skill levels 
                to participate in our cultural program.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• Traditional and modern dance</li>
                <li>• Vocal and instrumental music</li>
                <li>• Poetry and storytelling</li>
                <li>• Drama and theatrical performances</li>
              </ul>
              <a
                href="mailto:admin@sanskriti-hamburg.de?subject=Cultural%20Performance%20-%20Durga%20Puja%202025"
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors font-semibold"
              >
                Register to Perform
              </a>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-800">Community Participation</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Be part of our historic first Durga Puja! Whether you're Bengali or from another background, 
                everyone is welcome to join our celebration.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• Participate in traditional rituals</li>
                <li>• Join community prayers and ceremonies</li>
                <li>• Enjoy cultural programs and food</li>
                <li>• Connect with the Hamburg Bengali community</li>
              </ul>
              <a
                href="mailto:admin@sanskriti-hamburg.de?subject=Community%20Participation%20-%20Durga%20Puja%202025"
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors font-semibold"
              >
                Join the Celebration
              </a>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <Star className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-800">Support & Sponsor</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Help us create a magnificent celebration through your generous support. Your contribution will help 
                establish this annual tradition in Hamburg.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• Financial contributions</li>
                <li>• Material donations</li>
                <li>• Business sponsorship opportunities</li>
                <li>• In-kind services and support</li>
              </ul>
              <a
                href="mailto:admin@sanskriti-hamburg.de?subject=Sponsorship%20-%20Durga%20Puja%202025"
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors font-semibold"
              >
                Become a Sponsor
              </a>
            </div>
          </div>
        </section>

        {/* Final Call to Action - section removed */}
        
      </main>

      <Footer />
    </div>
  );
}

export default DurgaPuja2025;