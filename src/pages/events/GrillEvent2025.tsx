import React, { useEffect } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Footer } from '../../components/shared/Footer';

function GrillEvent2025() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <div className="min-h-screen bg-inherit">

      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <img
          src="/images/grill_event_banner_2025.jpeg"
          alt="Sanskriti Grill Event"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Sanskriti Summer Grill 2025</h1>
            <div className="flex items-center justify-center space-x-2">
              <Calendar className="w-6 h-6" />
              <p className="text-xl">August 2025</p>
              <MapPin className="w-6 h-6 ml-4" />
              <p className="text-xl">Hamburg, Germany</p>
            </div>
          </div>
        </div>
      </div>

      <main className="min-w-[70vw] mx-auto px-4 py-16">
        {/* Introduction */}
        <section className="prose lg:prose-xl mx-auto mb-16 w-full">
          <h2 className='text-lg font-semibold my-2'>Bringing the Community Together</h2>
          <p>
            Summer is the perfect time to come together, enjoy the sunshine, and share good food and laughter. Sanskriti e.V. is excited to organize a Grill Event in Hamburg, inviting families and friends to celebrate the spirit of togetherness.
          </p>
        </section>

        {/* Event Highlights */}
        <section className="prose lg:prose-xl mx-auto mb-16">
          <h2 className='text-lg font-semibold my-2'>What to Expect</h2>
          <ul>
            <li>Delicious grilled food – both vegetarian and non-vegetarian options</li>
            <li>Fun outdoor games and activities for all ages</li>
            <li>Music, dance, and cultural performances</li>
            <li>Opportunities to meet new people and strengthen community bonds</li>
            <li>Relaxed, family-friendly atmosphere in a beautiful Hamburg park</li>
          </ul>
        </section>

        {/* Sanskriti's Vision */}
        <section className="prose lg:prose-xl mx-auto mb-16">
          <h2 className='text-lg font-semibold my-2'>Sanskriti's Vision</h2>
          <p>
            At Sanskriti e.V., we believe in fostering a sense of belonging and cultural exchange. Our Grill Event is more than just a picnic—it's a chance to celebrate our diverse community, make new memories, and enjoy the best of summer together.
          </p>
          <p>
            Everyone is welcome! Whether you are a long-time member or new to Hamburg, join us for a day of food, fun, and friendship.
          </p>
        </section>

        {/* Call to Action */}
        <section className="prose lg:prose-xl mx-auto mb-16 bg-inherit p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-4">Get Involved</h3>
          <p>
            Want to help organize, perform, or contribute in any way? We would love to hear from you!
          </p>
          <a
            href="mailto:admin@sanskriti-hamburg.de" target='_blank' rel='noreferrer'
            className="inline-block mt-4 bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors">
            Contact Us to Participate
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default GrillEvent2025;
