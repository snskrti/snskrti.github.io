import React from 'react';
import { Footer } from '../components/shared/Footer';
import { SEOHead } from '../components/SEO/SEOHead';

function DonationsPage() {
  // Sanskriti bank details
  const bankDetails = {
    accountHolder: 'Sanskriti e.V',
    iban: 'DE82200400000350026100',
    bic: 'COBADEFFXXX',
    bankName: 'Commerzbank'
  };

  // Stripe checkout link - replace with your actual link
  const stripeCheckoutLink = 'https://donate.stripe.com/14A4gA4JU5P66919UEb7y01';

  // Calculate example fee offset
  const calculateStripeOffset = (amount: number) => {
    return ((amount * 0.0125) + 0.25).toFixed(2);
  };

  return (
    <div className="w-full min-h-screen bg-inherit">
      <SEOHead
        title="Donate to Sanskriti e.V. - Support Our Cultural Initiatives"
        description="Support Sanskriti e.V. Hamburg's cultural initiatives through donations. Your contribution helps us preserve and promote Indian culture in Hamburg."
        keywords="donate, Sanskriti, Hamburg, cultural support, Indian culture, community support, donations"
        url="/donations"
        type="website"
        image="/images/candles-among-diwali-designs.jpg"
      />

      {/* Header Section */}
      <section className="w-full py-20 px-8 md:px-16 lg:px-24 bg-inherit">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Support Our Cultural Journey</h1>
          <p className="text-lg text-gray-600 mb-8">
            Your donations help us continue celebrating and sharing Indian culture in Hamburg.
            Every contribution, no matter the size, makes a difference in our community's cultural landscape.
          </p>
        </div>
      </section>

      {/* Donation Options Section */}
      <section className="w-full py-10 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Bank Transfer Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-800">Bank Transfer</h2>
              <p className="mb-6 text-gray-600">
                Direct bank transfers are our preferred donation method as they have no transaction fees,
                ensuring 100% of your donation goes to our cultural initiatives.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Account Holder</p>
                  <p className="font-medium">{bankDetails.accountHolder}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">IBAN</p>
                  <p className="font-medium font-mono">{bankDetails.iban}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">BIC</p>
                  <p className="font-medium font-mono">{bankDetails.bic}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Bank</p>
                  <p className="font-medium">{bankDetails.bankName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Verwendungszweck (Reference)</p>
                  <p className="font-medium">Donation - &lt;full name of donor&gt;</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stripe Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-purple-800">Card Payment via Stripe</h2>
              <p className="mb-6 text-gray-600">
                For quick and convenient donations, we offer card payments through Stripe.
                This method incurs a processing fee of approximately 1.25% + €0.25.
              </p>
              
              <div className="bg-purple-50 p-6 rounded-lg mb-6">
                <h3 className="font-semibold mb-3">Example Fee Calculation:</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Donation Amount</p>
                    <p className="font-medium">€50.00</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Processing Fee</p>
                    <p className="font-medium">€{calculateStripeOffset(50)}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  We would be grateful if you could consider adding this small amount to your donation
                  to offset the processing fees.
                </p>
              </div>
              
              <a 
                href={stripeCheckoutLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-purple-600 text-white font-semibold py-4 px-6 rounded-lg text-center hover:bg-purple-700 transition-colors duration-300"
              >
                Donate Online
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="w-full py-16 px-8 md:px-16 lg:px-24 bg-inherit">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Thank You for Your Support</h2>
          <p className="text-lg mb-8">
            Your generosity helps us continue our mission of preserving and promoting
            Indian cultural heritage in Hamburg. We are deeply grateful for your contribution
            to our community.
          </p>
          <a 
            href="/"
            className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Return to Home
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default DonationsPage;
