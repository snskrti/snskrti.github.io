import React from 'react';
import { SEOHead } from '../../../components/SEO/SEOHead';
import { Footer } from '../../../components/shared/Footer';
import { Music, BookOpen, ExternalLink } from 'lucide-react';

const ThemeSong2025 = () => {
  const contributors = [
    { name: "Diptarup Das", role: "Lyrics & Concept" },
    { name: "Shreyashi Halder", role: "Singer" },
    { name: "Joy Chakraborty", role: "Composer" },
    { name: "KRS Studio", role: "Music Production, Mixing & Mastering" },
  ];

  const streamingPlatforms = [
    { 
      name: "Spotify", 
      url: "https://open.spotify.com/track/3Z7YHYu52O5eBavzfnUC3U?si=JjnZKfUjSlmeL-SapmNE3g", 
      icon: <img src="/images/icons/spotify.png" alt="Spotify" className="w-8 h-8" />
    },
    { 
      name: "Apple Music", 
      url: "https://music.apple.com/in/album/durga-elen-hamburg-e-single/1836102088", 
      icon: <img src="/images/icons/apple-music.png" alt="Apple Music" className="w-8 h-8" />
    },
    { 
      name: "Amazon Music", 
      url: "https://music.amazon.com/albums/B0FP3Z985M?marketplaceId=A3K6Y4MI8GDYMT&musicTerritory=IN&ref=dm_sh_nTLK0IcyFTlwPjtcK2ktNSN16", 
      icon: <img src="/images/icons/amazon-music.png" alt="Amazon Music" className="w-8 h-8" />
    },
    { 
      name: "Jio Saavn", 
      url: "https://www.jiosaavn.com/album/durga-elen-hamburg-e/W6W7xH50aYE_", 
      icon: <img src="/images/icons/jiosaavn.png" alt="Jio Saavn" className="w-8 h-8" />
    },
    { 
      name: "Gaana", 
      url: "https://gaana.com/song/durga-elen-hamburg-e", 
      icon: <img src="/images/icons/gaana.png" alt="Gaana" className="w-8 h-8" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="Durga Elen Hamburg e - Theme Song | Sanskriti e.V. Hamburg"
        description="Listen to our official theme song for Durga Puja 2025 - Durga Elen Hamburg e, created by the members of Sanskriti e.V. Hamburg."
        keywords="Theme Song, Durga Puja, Durga Elen Hamburg e, Bengali Music, Hamburg"
        url="/events/durga-puja-2025/theme-song"
        type="website"
        image="/images/kash-flowers-amitabha-gupta.jpg"
      />

      <div className="relative h-96 overflow-hidden">
        <img 
          src="/images/kash-flowers-amitabha-gupta.jpg" 
          alt="Durga Puja Theme Song Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Durga Elen Hamburg e</h1>
          <p className="text-xl text-gray-200 mb-4">Official Theme Song for Durga Puja 2025</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Music className="mr-3" /> About the Theme Song
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            "Durga Elen Hamburg e" is our official theme song for Durga Puja 2025. This vibrant composition celebrates the arrival of Goddess Durga in Hamburg, blending traditional Bengali musical elements with contemporary arrangements to create a sound that represents our multicultural community.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            The lyrics beautifully capture the essence of Durga Puja celebrations in a foreign land, expressing how we recreate the magic and spirituality of this festival thousands of miles away from Bengal. The song depicts the unique fusion of cultures as we welcome Maa Durga to Hamburg with the same devotion and enthusiasm as in India.
          </p>
          <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold mb-4">Behind the Scenes</h3>
            <p className="text-gray-700 mb-4">
              Curious about how this beautiful theme song was created? Read about the journey, creative process, and experiences of our community members who brought this vision to life:
            </p>
            <a 
              href="https://sanskriti-hamburg.medium.com/making-of-durga-elen-hamburg-e" 
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

export default ThemeSong2025;