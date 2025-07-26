import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CreditCard, Lock, ArrowLeft, CheckCircle } from 'lucide-react';
import { Footer } from '../../components/shared/Footer';
import { SEOHead } from '../../components/SEO/SEOHead';
import { MealReservation } from '../../types/mealReservation';
import { getPriceByDay } from '../../utils/mealData';

// Initialize Stripe
const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '';
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

const PaymentWrapper: React.FC<{ reservation: MealReservation }> = ({ reservation }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/.netlify/functions/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: reservation.finalAmount,
            currency: 'eur',
            customerInfo: reservation.customerInfo,
            reservationData: reservation,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create payment intent');
        }

        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize payment');
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [reservation]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        <span className="ml-2 text-gray-600">Initializing payment...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Failed to initialize payment. Please try again.</p>
      </div>
    );
  }

  return (
    <Elements 
      stripe={stripePromise} 
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
        },
      }}
    >
      <PaymentForm reservation={reservation} clientSecret={clientSecret} />
    </Elements>
  );
};

const PaymentForm: React.FC<{ reservation: MealReservation; clientSecret: string }> = ({ reservation, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      // Confirm payment using PaymentElement
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/events/durga-puja-2025',
        },
        redirect: 'if_required',
      });

      if (error) {
        setPaymentError(error.message || 'Payment failed');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Send receipt confirmation
        await fetch('/.netlify/functions/send-receipt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
          }),
        });

        setPaymentSuccess(true);
        
        // Redirect to success page after 3 seconds
        setTimeout(() => {
          navigate('/events/durga-puja-2025', { 
            state: { paymentSuccess: true, paymentId: paymentIntent.id } 
          });
        }, 3000);
      }
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-700 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-4">
          Your meal reservation has been confirmed. You will receive a receipt email shortly.
        </p>
        <p className="text-sm text-gray-500">
          Redirecting you back to the event page...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Payment Details</h3>
        <div className="bg-white p-4 rounded border">
          <PaymentElement
            options={{
              layout: {
                type: 'accordion',
                defaultCollapsed: false,
                radios: false,
                spacedAccordionItems: true,
              },
              defaultValues: {
                billingDetails: {
                  name: reservation.customerInfo.name,
                  email: reservation.customerInfo.email,
                },
              },
              paymentMethodOrder: ['card', 'google_pay', 'apple_pay', 'link'],
            }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Choose from cards, Google Pay, Apple Pay, Link, and other available payment methods
        </p>
      </div>

      {paymentError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{paymentError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing Payment...
          </>
        ) : (
          <>
            <Lock className="w-5 h-5 mr-2" />
            Pay €{reservation.finalAmount.toFixed(2)}
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Your payment is secured by Stripe. We do not store your card information.
      </p>
    </form>
  );
};

function MealPayment2025() {
  const location = useLocation();
  const navigate = useNavigate();
  const reservation = location.state as MealReservation;

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Redirect if no reservation data
    if (!reservation) {
      navigate('/events/durga-puja-2025/meal-reservation');
    }
  }, [reservation, navigate]);

  // Check if Stripe is configured
  if (!stripePromise) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment System Unavailable</h2>
          <p className="text-gray-600 mb-4">The payment system is currently being configured. Please try again later.</p>
          <button
            onClick={() => navigate('/events/durga-puja-2025/meal-reservation')}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
          >
            Back to Meal Reservation
          </button>
        </div>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Invalid Access</h2>
          <p className="text-gray-600 mb-4">Please start from the meal reservation page.</p>
          <button
            onClick={() => navigate('/events/durga-puja-2025/meal-reservation')}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
          >
            Go to Meal Reservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <SEOHead 
        title="Payment - Meal Reservation | Sanskriti Hamburg"
        description="Complete your meal reservation payment for Durga Puja 2025"
        url="/events/durga-puja-2025/meal-payment"
      />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Reservation
          </button>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Complete Your Payment
          </h1>
          <p className="text-sm text-gray-600">
            Secure payment for your Durga Puja 2025 meal reservation
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-700 mb-2 text-sm">Customer Information</h3>
                <p className="text-xs text-gray-600">Name: {reservation.customerInfo.name}</p>
                <p className="text-xs text-gray-600">Email: {reservation.customerInfo.email}</p>
                <p className="text-xs text-gray-600">
                  Status: {reservation.customerInfo.isMember ? 'Member' : 'Non-member'}
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-700 mb-2 text-sm">Selected Meals</h3>
                <div className="space-y-3">
                  {Object.entries(reservation.selectedItems).map(([itemId, quantity]) => {
                    if (quantity === 0) return null;
                    
                    // Parse item details from the ID
                    const isVeg = itemId.includes('veg-');
                    const dayNumber = itemId.match(/day(\d+)/)?.[1];
                    const thaliType = isVeg && !itemId.includes('nonveg') ? 'Veg Thali' : 'Non-Veg Thali';
                    
                    // Get the date based on day number
                    let dateDisplay = '';
                    switch(dayNumber) {
                      case '1': dateDisplay = 'Sept 28 - Shashti'; break;
                      case '2': dateDisplay = 'Sept 29 - Saptami'; break;
                      case '3': dateDisplay = 'Sept 30 - Ashtami'; break;
                      default: dateDisplay = 'TBD';
                    }
                    
                    // Get price based on day and type using helper function
                    const pricePerItem = getPriceByDay(dayNumber || '1', isVeg && !itemId.includes('nonveg'));
                    const totalPrice = pricePerItem * quantity;
                    
                    return (
                      <div key={itemId} className="bg-gray-50 p-3 rounded">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="font-medium text-gray-800 text-sm">
                              {thaliType} ({dateDisplay})
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              €{pricePerItem.toFixed(2)} per plate
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">
                              {quantity} × €{pricePerItem.toFixed(2)}
                            </div>
                            <div className="font-semibold text-gray-800">
                              €{totalPrice.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>€{reservation.totalAmount.toFixed(2)}</span>
                </div>
                {reservation.discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Member Discount (20%):</span>
                    <span>-€{reservation.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-orange-600">€{reservation.finalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              Secure Payment
            </h2>

            <PaymentWrapper reservation={reservation} />
          </div>
        </div>

        {/* Security Notice */}
        <div className="max-w-2xl mx-auto mt-8 bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Secure Payment</h3>
          <p className="text-sm text-blue-800">
            Your payment is processed securely through Stripe. We never store your card information. 
            You will receive a confirmation email once your payment is successful.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MealPayment2025;
