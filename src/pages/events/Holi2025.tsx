import React, { useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Footer } from '../../components/shared/Footer';
import { getEventDate } from '../../utils/eventUtils';

function Holi2025() {

  useEffect(() => {
      window.scrollTo(0, 0)
    }, []);
    
  const eventDate = getEventDate('/events/holi-2025');
    
  return (
    <div className="min-h-screen bg-inherit">

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
              <p className="text-xl">{eventDate}</p>
            </div>
          </div>
        </div>
      </div>

      <main className="min-w-[70vw] mx-auto px-4 py-16">
        {/* Introduction */}
        <section className="prose lg:prose-xl mx-auto mb-16 w-full">
          <h2 className='text-lg font-semibold my-2'>The Story of Holi</h2>
          <p>
        Holi, also known as the Festival of Colors, is a popular ancient Hindu festival celebrated across India. It signifies the arrival of spring, the end of winter, and the blossoming of love. Holi is a time for people to come together, play with colors, and celebrate the triumph of good over evil.
          </p>
          <p>
        The festival is celebrated over two days. The first day is known as Holika Dahan or Chhoti Holi, where people light bonfires to symbolize the burning of the demoness Holika. The second day, known as Rangwali Holi, is when people smear each other with colors and enjoy festive foods and drinks.
          </p>
        </section>

        {/* Celebration in India */}
        <section className="prose lg:prose-xl mx-auto mb-16">
          <h2 className='text-lg font-semibold my-2'>Celebration in India</h2>
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
          <h2 className='text-lg font-semibold my-2'>Sanskriti's Vision for Holi 2025</h2>
          <p>
            At Sanskriti e.V., we aim to recreate the vibrant and joyous atmosphere of Holi as celebrated in India. Our 2025 celebration will be a grand showcase of Indian culture and traditions, bringing together our community in Hamburg for two days of festivities.
          </p>
          <br />
          <h3>Our Plans Include:</h3>
            <ul className='list-inside'>
            <li className='flex items-center'><span className='text-green-500 mr-2'>✔</span>A beautifully decorated venue with colorful aesthetics</li>
            <li className='flex items-center'><span className='text-green-500 mr-2'>✔</span>Playing with eco-friendly colors</li>
            <li className='flex items-center'><span className='text-green-500 mr-2'>✔</span>Music and dance performances</li>
            <li className='flex items-center'><span className='text-green-500 mr-2'>✔</span>Delicious Indian festive foods and drinks</li>
            <li className='flex items-center'><span className='text-green-500 mr-2'>✔</span>Community gathering and cultural programs</li>
            </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Holi2025;