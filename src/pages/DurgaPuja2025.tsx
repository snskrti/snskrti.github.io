import React from 'react';
import { Calendar } from 'lucide-react';
import { Footer } from '../components/Footer';

function DurgaPuja2025() {
  return (
    <div className="min-h-screen bg-custom_background">

      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <img
          src="/images/ma-durga-face-right.jpg"
          alt="Durga Puja Celebration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Durga Pujo 2025</h1>
            <div className="flex items-center justify-center space-x-2">
              <Calendar className="w-6 h-6" />
              <p className="text-xl">Sep 28 - Oct 02, 2025</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Introduction */}
        <section className="prose lg:prose-xl mx-auto mb-16">
          <h2>The Story of Durga Puja</h2>
          <p>
            Durga Puja, also known as Durgotsava, is the annual Hindu festival celebrating the Mother Goddess and the victory of Goddess Durga over the demon king Mahishasura. This victory symbolizes the triumph of good over evil. The festival is particularly significant in Bengal, where it marks the homecoming of the Goddess with her children to her maternal home.
          </p>
          <p>
            The festival spans over ten days, with the last five days being the most significant. These days are known as Shashthi, Saptami, Ashtami, Navami, and Vijaya Dashami. Each day has its own significance and rituals, culminating in the immersion of the idol on Vijaya Dashami, symbolizing the Goddess's return to her abode in Kailash.
          </p>
        </section>

        {/* Celebration in West Bengal */}
        <section className="prose lg:prose-xl mx-auto mb-16">
          <h2>Celebration in West Bengal</h2>
          <p>
            In West Bengal, Durga Puja is more than just a religious festival - it's the state's biggest cultural event. The streets come alive with elaborate pandals (temporary structures) housing beautiful idols of Goddess Durga and her children. These pandals often showcase themes ranging from traditional to contemporary social issues.
          </p>
          <p>
            The festival is characterized by:
          </p>
          <ul>
            <li>Stunning artistic installations and decorations</li>
            <li>Cultural performances including music and dance</li>
            <li>Traditional Bengali cuisine</li>
            <li>Community gatherings and celebrations</li>
            <li>Evening processions and cultural programs</li>
          </ul>
        </section>

        {/* Sanskriti's Vision */}
        <section className="prose lg:prose-xl mx-auto mb-16">
          <h2>Sanskriti's Vision for Durga Pujo 2025</h2>
          <p>
            At Sanskriti Hamburg, we aim to recreate the magical atmosphere of Durga Puja as celebrated in West Bengal. Our 2025 celebration will be a grand showcase of Bengali culture and traditions, bringing together our community in Hamburg for five days of festivities.
          </p>

          <h3>Our Plans Include:</h3>
          <ul>
            <li>Traditional Durga Puja rituals performed by experienced priests</li>
            <li>A beautifully decorated venue with authentic Bengali aesthetics</li>
            <li>Cultural programs featuring local and invited artists</li>
            <li>Bengali food festival showcasing traditional cuisine</li>
            <li>Workshop on Bengali arts and crafts</li>
            <li>Special activities for children to learn about the festival</li>
          </ul>

          <div className="bg-amber-50 p-6 rounded-lg mt-8">
            <h3 className="text-xl font-semibold mb-4">Get Involved</h3>
            <p>
              We welcome volunteers and participants to join us in making this celebration memorable. Whether you'd like to perform, help with organization, or contribute in any other way, we'd love to hear from you.
            </p>
            <a
              href="mailto:info@sanskriti-hamburg.de"
              className="inline-block mt-4 bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors"
            >
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