import React, { useEffect } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Footer } from '../../components/shared/Footer';

function Diwali2025() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <div className="min-h-screen bg-inherit">

      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <img
          src="/images/candles-among-diwali-designs.jpg"
          alt="Diwali Celebration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Diwali 2025</h1>
            <div className="flex items-center justify-center space-x-2">
              <Calendar className="w-6 h-6" />
              <p className="text-xl">Oct 20, 2025</p>
              <MapPin className="w-6 h-6 ml-4" />
              <p className="text-xl">Hamburg, Germany</p>
            </div>
          </div>
        </div>
      </div>

      <main className="min-w-[70vw] mx-auto px-4 py-16">
        {/* Introduction */}
        <section className="prose lg:prose-xl mx-auto mb-16 w-full">
          <h2 className='text-lg font-semibold my-2'>The Festival of Lights</h2>
          <p>
            Diwali, also known as Deepavali, is one of the most celebrated festivals in India and around the world. It symbolizes the victory of light over darkness, good over evil, and knowledge over ignorance. Homes are decorated with lamps, candles, and rangoli, and families come together to share joy, sweets, and blessings.
          </p>
        </section>

        {/* Event Highlights */}
        <section className="prose lg:prose-xl mx-auto mb-16">
          <h2 className='text-lg font-semibold my-2'>Event Highlights</h2>
          <ul className="list-disc pl-6">
            <li>Traditional Diwali puja and lighting of diyas</li>
            <li>Cultural performances and music</li>
            <li>Delicious Indian festive foods and sweets</li>
            <li>Rangoli and art activities for kids</li>
            <li>Fireworks (subject to local regulations)</li>
            <li>Community gathering to celebrate togetherness</li>
          </ul>
        </section>

        {/* Sanskriti's Vision */}
        <section className="prose lg:prose-xl mx-auto mb-16">
          <h2 className='text-lg font-semibold my-2'>Sanskriti's Vision</h2>
          <p>
            Sanskriti e.V. is delighted to bring the spirit of Diwali to Hamburg. Our celebration aims to unite families, friends, and the wider community in a vibrant and joyous atmosphere. We invite everyone to join us in spreading light, happiness, and cultural heritage.
          </p>
        </section>

        {/* Call to Action */}
        <section className="prose lg:prose-xl mx-auto mb-16 bg-inherit p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-4">Get Involved</h3>
          <p>
            Would you like to perform, volunteer, or help organize the event? We welcome your participation and support!
          </p>
          <a
            href="mailto:info@sanskriti-hamburg.de" target='_blank' rel='noreferrer'
            className="inline-block mt-4 bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors">
            Contact Us to Participate
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Diwali2025;
