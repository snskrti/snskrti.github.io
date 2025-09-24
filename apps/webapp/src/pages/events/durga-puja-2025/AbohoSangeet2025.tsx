import React from 'react';
import { SEOHead } from '../../../components/SEO/SEOHead';
import { Footer } from '../../../components/shared/Footer';
import { Music, BookOpen, ExternalLink } from 'lucide-react';

const AbohoSangeet2025 = () => {
  const contributors = [
    { name: "Diptarup Das", role: "Lyrics & Recitation" },
    { name: "Diptarup Das & Sohail Hasan Mallik", role: "Composition" },
    { name: "Sohail Hasan Mallik", role: "Vocal" },
    { name: "Anupam Dutta", role: "Dholak, Tabla, Duff" },
    { name: "Akash Banerjee", role: "Guitar, Ukelele, Mandolin" },
    { name: "Arunabha Sengupta", role: "Flute" },
    { name: "Kaustav Mazumder", role: "Sitar" },
    { name: "Sohail Hasan Mallik", role: "Programming, Mix & Master" },
  ];

  const streamingPlatforms = [
    { 
      name: "Spotify", 
      url: "https://open.spotify.com/track/0Zg7YaMf1unM129SsFxkcx?si=VxZf0-opQlu_YYhyi3iPPw", 
      icon: <img src="/images/icons/spotify.png" alt="Spotify" className="w-8 h-8" />
    },
    { 
      name: "Amazon Music", 
      url: "https://music.amazon.co.uk/albums/B0FPX7S5N1?marketplaceId=A1F83G8C2ARO7P&musicTerritory=GB&ref=dm_sh_BqmnOIYJJXCqOVPiLGOHMY4ZS", 
      icon: <img src="/images/icons/amazon-music.png" alt="Amazon Music" className="w-8 h-8" />
    },
    { 
      name: "Jio Saavn", 
      url: "https://www.saavn.com/p/album/bengali/shankha-dhaker-sure-baje-pran-2025/sOYllGuRleA_", 
      icon: <img src="/images/icons/jiosaavn.png" alt="Jio Saavn" className="w-8 h-8" />
    },
    { 
      name: "Gaana", 
      url: "https://gaana.com/song/shankha-dhaker-sure-baje-pran", 
      icon: <img src="/images/icons/gaana.png" alt="Gaana" className="w-8 h-8" />
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="Shankha Dhaker Sure Baje Pran - Aboho Sangeet | Sanskriti e.V. Hamburg"
        description="Listen to our official Aboho Sangeet for Durga Puja 2025 - Shankha Dhaker Sure Baje Pran, created by the members of Sanskriti e.V. Hamburg."
        keywords="Aboho Sangeet, Durga Puja, Shankha Dhaker Sure Baje Pran, Bengali Music, Hamburg"
        url="/events/durga-puja-2025/aboho-sangeet"
        type="website"
        image="/images/background-black-white-guitar.jpg"
      />

      <div className="relative h-96 overflow-hidden">
        <img 
          src="/images/background-black-white-guitar.jpg" 
          alt="Aboho Sangeet Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Shankha Dhaker Sure Baje Pran</h1>
          <p className="text-xl text-gray-200 mb-4">Aboho Sangeet for Durga Puja 2025</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Music className="mr-3" /> About the Aboho Sangeet
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            "Shankha Dhaker Sure Baje Pran" is our official Aboho Sangeet for Durga Puja 2025. This devotional song celebrates the arrival of Maa Durga and the joyous atmosphere of the festival. Created with love by the members of our Sanskriti community, this composition blends traditional Bengali musical elements with contemporary arrangements.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            The lyrics express the heartfelt emotions of devotees as they welcome the goddess with the sounds of conch shells and dhak drums, which resonate deep within our souls. The song encapsulates the spiritual essence of Durga Puja while highlighting the unique celebration we have here in Hamburg.
          </p>
          <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold mb-4">Behind the Scenes</h3>
            <p className="text-gray-700 mb-4">
              Want to know how this beautiful composition came to life? Read about the journey, creative process, and experiences of our community members who made this possible:
            </p>
            <a 
              href="https://sanskriti-hamburg.medium.com/making-of-shankha-dhaker-sure-baje-pran" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors duration-300"
            >
              <BookOpen className="mr-2" size={18} />
              Read the Story on Medium
            </a>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Listen Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {streamingPlatforms.map((platform, index) => (
              <a 
                key={index}
                href={platform.url} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div className="w-12 h-12 mb-3 flex items-center justify-center">{platform.icon}</div>
                <span className="text-sm font-medium text-gray-800">{platform.name}</span>
                <ExternalLink size={14} className="mt-1 text-gray-500" />
              </a>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Contributors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contributors.map((contributor, index) => (
              <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                <div className="ml-3">
                  <h3 className="font-semibold text-lg">{contributor.name}</h3>
                  <p className="text-gray-600">{contributor.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AbohoSangeet2025;