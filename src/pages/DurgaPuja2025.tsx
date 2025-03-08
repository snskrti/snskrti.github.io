import React, { useEffect } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Footer } from '../components/shared/Footer';

function DurgaPuja2025() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  
  return (
    <div className="min-h-screen bg-inherit">

      {/* Hero Section */}
      <div className="relative h-screen">
        <img
          src="/images/kallol_durga_idol.jpg"
          alt="Durga Puja Celebration"
          className="w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-8xl md:text-8xl font-bold mb-4">মা আসছে</h1>
            
            <div className="flex items-center justify-center space-x-2 my-16">
              <MapPin className="w-6 h-6" />
              <p className="text-xl">Hamburg, Germany</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-16 bg-inherit">
        
        {/* Sanskriti's Vision */}
        <section className=" mx-auto mb-16 bg-inherit">

            <div className="bg-inherit p-6 rounded-lg mt-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Get Involved</h3>
              <p>
                We welcome volunteers and participants to join us in making this celebration memorable. Whether you'd like to perform, help with organization, or contribute in any other way, we'd love to hear from you.
              </p>
              <a
                href="mailto:info@sanskriti-hamburg.de" target='_blank' rel='noreferrer'
                className="inline-block mt-4 bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors">
                Contact Us to Participate
              </a>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default DurgaPuja2025;