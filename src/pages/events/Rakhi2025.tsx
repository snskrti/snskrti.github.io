import React, { useEffect } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Footer } from '../../components/shared/Footer';
import { SEOHead } from '../../components/SEO/SEOHead';
import { getEventDate } from '../../utils/eventUtils';

function Rakhi2025() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const eventDate = getEventDate('/events/rakhi-2025');
  return (
    <div className="min-h-screen bg-inherit">
      <SEOHead
        title="Raksha Bandhan 2025 – Rakhi Festival in Hamburg | Sanskriti Hamburg"
        description="Celebrate Raksha Bandhan 2025 with Sanskriti e.V. in Hamburg. Join us for the sacred festival of brother-sister bond with traditional rakhi tying ceremonies, cultural programs, and family celebrations."
        keywords="Raksha Bandhan 2025, Hamburg, Rakhi festival, brother sister bond, Indian festival, traditional ceremony, Sanskriti Hamburg, family celebration, cultural event"
        url="/events/rakhi-2025"
        type="event"
        image="/images/rakhi-event-banner-2025.jpg"
        eventStartDate="2025-08-03T00:00"
        eventLocation="Hamburg, Germany"
        eventType="Cultural Festival"
        performer="Sanskriti e.V. Hamburg Community"
        offers={{
          price: "0",
          currency: "EUR",
          availability: "https://schema.org/InStock",
          url: "/events/rakhi-2025"
        }}
      />

      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <img
          src="/images/rakhi-event-banner-2025.jpg"
          alt="Raksha Bandhan Celebration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Raksha Bandhan 2025</h1>
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
          <h2 className='text-lg font-semibold my-2'>Celebrating the Bond of Love</h2>
          <p>
            Raksha Bandhan is a cherished festival that celebrates the special bond between siblings and cousins. It is a day to express love, care, and lifelong commitment to each other, symbolized by the tying of a rakhi.
          </p>
        </section>

        {/* Event Highlights */}
        <section className="prose lg:prose-xl mx-auto mb-16">
          <h2 className='text-lg font-semibold my-2'>Event Highlights</h2>
          <ul>
            <li>Traditional Rakhi tying ceremony for children and families</li>
            <li>Storytelling and cultural activities about the significance of Raksha Bandhan</li>
            <li>Fun games and creative workshops for kids</li>
            <li>Delicious festive treats and refreshments</li>
            <li>Opportunities for families to connect and celebrate together</li>
          </ul>
        </section>

        {/* Sanskriti's Vision */}
        <section className="prose lg:prose-xl mx-auto mb-16">
          <h2 className='text-lg font-semibold my-2'>Sanskriti's Vision</h2>
          <p>
            Sanskriti e.V. is committed to nurturing family values and cultural traditions. Through events like Raksha Bandhan, we aim to bring together families and their young ones, fostering a sense of belonging and togetherness within our community.
          </p>
          <p>
            Join us in Hamburg for a heartwarming celebration that honors the beautiful relationships between siblings and cousins!
          </p>
        </section>

        {/* Call to Action */}
        <section className="prose lg:prose-xl mx-auto mb-16 bg-inherit p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-4">Get Involved</h3>
          <p>
            Would you like to help organize, perform, or contribute to the event? We welcome your participation!
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

export default Rakhi2025;
