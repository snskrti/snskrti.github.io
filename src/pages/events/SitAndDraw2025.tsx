import React, { useEffect } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Footer } from '../../components/shared/Footer';
import { SEOHead } from '../../components/SEO/SEOHead';
import { getEventDate } from '../../utils/eventUtils';

function SitAndDraw2025() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const eventDate = getEventDate('/events/sit-and-draw-2025');

  return (
    <div className="min-h-screen bg-inherit">
      <SEOHead
        title="Sit and Draw Competition 2025 – Art Contest in Hamburg | Sanskriti Hamburg"
        description="Join Sanskriti e.V. for the Sit and Draw Competition 2025 in Hamburg. A creative art contest showcasing alpona, traditional designs, and artistic talents from the community. All ages welcome!"
        keywords="Sit and Draw 2025, Hamburg, art competition, alpona, traditional art, creative contest, Sanskriti Hamburg, art event, cultural art, drawing competition"
        url="/events/sit-and-draw-2025"
        type="event"
        image="/images/hand-alpona.jpg"
        eventDate="2025-05-15"
        eventLocation="Hamburg, Germany"
        eventType="Art Competition"
        performer="Sanskriti e.V. Hamburg Community"
        offers={{
          price: "0",
          currency: "EUR",
          availability: "https://schema.org/InStock",
          url: "/events/sit-and-draw-2025"
        }}
      />

      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <img
          src="/images/hand-alpona.jpg"
          alt="Sit and Draw Competition"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Sit and Draw Competition 2025</h1>
            <div className="flex items-center justify-center space-x-2">
              <Calendar className="w-6 h-6" />
              <p className="text-xl">{eventDate}</p>
              <MapPin className="w-6 h-6 ml-4" />
              <p className="text-xl">Hamburg, Germany</p>
            </div>
          </div>
        </div>
      </div>

      <main className="min-w-[70vw] mx-auto px-4 py-16">
        {/* Introduction */}
        <section className="prose lg:prose-xl mx-auto mb-16 w-full">
          <h2 className='text-lg font-semibold my-2'>Unleash Your Creativity!</h2>
          <p>
            Sanskriti e.V. is excited to announce the Sit and Draw Competition 2025, a creative event designed to bring together young kids from across Hamburg. This is a wonderful opportunity for children to express themselves through art, make new friends, and enjoy a day filled with imagination and fun.
          </p>
        </section>

        {/* Event Highlights */}
        <section className="prose lg:prose-xl mx-auto mb-16">
          <h2 className='text-lg font-semibold my-2'>Event Highlights</h2>
        <ul className="list-disc pl-6">
            <li>Open to children of all ages and backgrounds</li>
            <li>All drawing materials will be provided</li>
            <li>Theme-based drawing sessions to inspire creativity</li>
            <li>Participation certificates and exciting prizes</li>
            <li>Snacks and refreshments for all participants</li>
            <li>A platform to showcase young talent in Hamburg</li>
        </ul>
        </section>

        {/* Sanskriti's Vision */}
        <section className="prose lg:prose-xl mx-auto mb-16">
          <h2 className='text-lg font-semibold my-2'>Sanskriti's Vision</h2>
          <p>
            At Sanskriti e.V., we believe in nurturing creativity and community spirit among children. The Sit and Draw Competition is more than just an art contest—it's a celebration of imagination, diversity, and togetherness. We hope to see kids from all over Hamburg come together, learn from each other, and have a memorable experience.
          </p>
        </section>

        {/* Call to Action */}
        <section className="prose lg:prose-xl mx-auto mb-16 bg-inherit p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-4">Get Involved</h3>
          <p>
            Interested in participating or volunteering? We welcome parents, teachers, and art enthusiasts to join us in making this event a success!
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

export default SitAndDraw2025;
