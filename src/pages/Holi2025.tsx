import React, { useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Footer } from '../components/shared/Footer';

function Holi2025() {

  useEffect(() => {
      window.scrollTo(0, 0)
    }, []);
    
  return (
    <div className="min-h-screen bg-custom_background">

      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <img
          src="/images/holi-crowd-1.jpg"
          alt="Durga Puja Celebration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Holi 2025</h1>
            <div className="flex items-center justify-center space-x-2">
              <Calendar className="w-6 h-6" />
              <p className="text-xl">Mar 14, 2025</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Introduction */}
        <section className="prose lg:prose-xl mx-auto mb-16">
          <h2>The Story of Holi</h2>
          <p>
            Holi, also known as the Festival of Colors, is a popular ancient Hindu festival celebrated across India. It signifies the arrival of spring, the end of winter, and the blossoming of love. Holi is a time for people to come together, play with colors, and celebrate the triumph of good over evil.
          </p>
          <p>
            The festival is celebrated over two days. The first day is known as Holika Dahan or Chhoti Holi, where people light bonfires to symbolize the burning of the demoness Holika. The second day, known as Rangwali Holi, is when people smear each other with colors and enjoy festive foods and drinks.
          </p>
        </section>

        {/* Celebration in India */}
        <section className="prose lg:prose-xl mx-auto mb-16">
          <h2>Celebration in India</h2>
          <p>
            Holi is celebrated with great enthusiasm and joy across India. The streets come alive with people playing with vibrant colors, singing, dancing, and enjoying festive delicacies. Each region has its own unique traditions and ways of celebrating Holi.
          </p>
          <p>
            The festival is characterized by:
          </p>
          <ul>
            <li>Throwing and applying colors on each other</li>
            <li>Traditional music and dance performances</li>
            <li>Delicious festive foods like gujiya, thandai, and more</li>
            <li>Community gatherings and celebrations</li>
            <li>Bonfires on the eve of Holi to signify Holika Dahan</li>
          </ul>
        </section>

        {/* Sanskriti's Vision */}
        <section className="prose lg:prose-xl mx-auto mb-16">
          <h2>Sanskriti's Vision for Holi 2025</h2>
          <p>
            At Sanskriti Hamburg, we aim to recreate the vibrant and joyous atmosphere of Holi as celebrated in India. Our 2025 celebration will be a grand showcase of Indian culture and traditions, bringing together our community in Hamburg for two days of festivities.
          </p>

          <h3>Our Plans Include:</h3>
          <ul>
            <li>Traditional Holika Dahan bonfire ceremony</li>
            <li>A beautifully decorated venue with colorful aesthetics</li>
            <li>Playing with eco-friendly colors</li>
            <li>Music and dance performances</li>
            <li>Delicious Indian festive foods and drinks</li>
            <li>Community gatherings and cultural programs</li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Holi2025;