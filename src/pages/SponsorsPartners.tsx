import { ExternalLink } from 'lucide-react';
import { Footer } from '../components/Footer';

function SponsorsPartners() {
  const sponsors = [
    {
      name: "Hamburg Cultural Board",
      description: "Supporting cultural diversity and artistic expression in Hamburg",
      logo: "/images/sponsor1.jpg",
      website: "#"
    },
    {
      name: "Local Business Council",
      description: "Promoting community engagement and cultural events",
      logo: "/images/sponsor2.jpg",
      website: "#"
    },
    {
      name: "Arts Foundation Hamburg",
      description: "Fostering artistic growth and cultural preservation",
      logo: "/images/sponsor3.jpg",
      website: "#"
    }
  ];

  const partners = [
    {
      name: "Hamburg University",
      description: "Academic collaboration for cultural research and education",
      logo: "/images/partner1.jpg",
      website: "#"
    },
    {
      name: "Cultural Exchange Network",
      description: "Connecting communities through cultural programs",
      logo: "/images/partner2.jpg",
      website: "#"
    },
    {
      name: "Hamburg Arts Society",
      description: "Promoting artistic collaboration and cultural events",
      logo: "/images/partner3.jpg",
      website: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-16 px-4 sm:px-6 lg:px-8">
        {/* Sponsors Section */}
        <section id='sponsors' className="max-w-7xl mx-auto mb-20">
          <h1 className="text-4xl font-bold text-center mb-16">Our Sponsors</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{sponsor.name}</h3>
                  <p className="text-gray-600 mb-4">{sponsor.description}</p>
                  <a
                    href={sponsor.website}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    Visit Website <ExternalLink className="ml-1 w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Partners Section */}
        <section id='partners' className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Our Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
                  <p className="text-gray-600 mb-4">{partner.description}</p>
                  <a
                    href={partner.website}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    Visit Website <ExternalLink className="ml-1 w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default SponsorsPartners;