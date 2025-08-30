import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Calendar, ArrowLeft, Mail } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Footer } from '../../../components/shared/Footer';
import { SEOHead } from '../../../components/SEO/SEOHead';

// Initialize Stripe with publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '');

interface PaymentDetails {
  paymentIntentId?: string;
  invoiceId?: string;
  invoiceNumber?: string;
  invoiceUrl?: string;
  status?: string;
  amount?: number;
  customerName?: string;
  customerEmail?: string;
}

function PaymentConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if we have payment intent data in the URL (from Stripe redirect)
    const query = new URLSearchParams(location.search);
    const paymentIntentId = query.get('payment_intent');
    const paymentIntentClientSecret = query.get('payment_intent_client_secret');
    
    // If we have the payment intent, retrieve details
    if (paymentIntentId && paymentIntentClientSecret) {
      fetchPaymentDetails(paymentIntentId);
    } 
    // If we have state data from direct navigation (non-redirect flow)
    else if (location.state && location.state.paymentDetails) {
      setPaymentDetails(location.state.paymentDetails);
      setIsLoading(false);
    } 
    // No payment data, redirect to reservation page
    else {
      setError('No payment information found');
      setIsLoading(false);
    }
  }, [location]);

  const fetchPaymentDetails = async (paymentIntentId: string) => {
    try {
      // Determine the base URL for Netlify Functions
      const isLocalDev = window.location.hostname === 'localhost';
      const functionsBaseUrl = isLocalDev && window.location.port === '3000' 
        ? 'http://localhost:8888/.netlify/functions' 
        : '/.netlify/functions';
      
      const response = await fetch(`${functionsBaseUrl}/get-payment-details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentIntentId
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to retrieve payment details');
      }

      setPaymentDetails({
        paymentIntentId,
        status: data.status,
        amount: data.amount,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        invoiceId: data.invoiceId,
        invoiceNumber: data.invoiceNumber,
        invoiceUrl: data.invoiceUrl,
      });
    } catch (err) {
      console.error('Error retrieving payment details:', err);
      setError('Could not retrieve payment details. Please contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">Processing your payment...</h2>
          <p className="text-gray-600 mt-2">Please wait while we confirm your transaction.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Verification Failed</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/events/durga-puja-2025/meal-reservation')}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
          >
            Return to Meal Reservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <SEOHead 
        title="Payment Confirmation | Sanskriti Hamburg"
        description="Thank you for your Durga Puja 2025 meal reservation payment"
        url="/events/durga-puja-2025/payment-confirmation"
      />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header with Success Icon */}
          <div className="bg-green-50 p-8 text-center border-b border-green-100">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600">
              Your payment has been processed successfully.
            </p>
          </div>

          {/* Payment Details */}
          <div className="p-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h2>
            
            <div className="space-y-4 mb-8">
              {paymentDetails?.customerName && (
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Customer:</span>
                  <span className="font-medium text-gray-800">{paymentDetails.customerName}</span>
                </div>
              )}
              
              {paymentDetails?.amount && (
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-medium text-gray-800">€{(paymentDetails.amount / 100).toFixed(2)}</span>
                </div>
              )}
              
              {paymentDetails?.invoiceNumber && (
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Invoice Number:</span>
                  <span className="font-medium text-gray-800">{paymentDetails.invoiceNumber}</span>
                </div>
              )}
              
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Payment Status:</span>
                <span className="font-medium text-green-600">
                  {paymentDetails?.status === 'succeeded' ? 'Completed' : 'Processed'}
                </span>
              </div>
              
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Payment Date:</span>
                <span className="font-medium text-gray-800">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              {paymentDetails?.invoiceUrl && (
                <a 
                  href={paymentDetails.invoiceUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-5 h-5 mr-2" />
                  View & Download Invoice
                </a>
              )}
              
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate('/events/durga-puja-2025')}
                  className="flex-1 flex items-center justify-center bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Event Details
                </button>
                
                <button
                  onClick={() => navigate('/')}
                  className="flex-1 flex items-center justify-center bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Home
                </button>
              </div>
            </div>
          </div>
          
          {/* Information Box */}
          <div className="bg-blue-50 p-6 border-t border-blue-100">
            <div className="flex items-start">
              <Mail className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Confirmation Email</h3>
                <p className="text-sm text-blue-800">
                  A receipt has been sent to your email address. If you have any questions about your payment, 
                  please contact us at <a href="mailto:admin@sanskriti-hamburg.de" className="underline">admin@sanskriti-hamburg.de</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PaymentConfirmation;
