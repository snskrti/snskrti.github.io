import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, ArrowLeft, Lock } from 'lucide-react';
import { Footer } from '../../../components/shared/Footer';
import { SEOHead } from '../../../components/SEO/SEOHead';
import { MealReservation } from '../../../types/mealReservation';
import { getPriceByDay, AGE_GROUPS } from '../../../utils/mealData';
import StripePayment from '../../../components/shared/payment/StripePayment';

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

  const handlePaymentSuccess = (paymentId: string, invoiceDetails?: any) => {
    // Navigate to the shared payment confirmation page with payment details
    navigate('/payment-confirmation', { 
      state: { 
        paymentDetails: {
          paymentIntentId: paymentId,
          status: 'succeeded',
          ...invoiceDetails
        },
        eventInfo: {
          eventName: "Durga Puja 2025 Meal Reservation",
          eventPath: "/events/durga-puja-2025",
          returnToEventText: "Back to Durga Puja Event"
        }
      } 
    });
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    // You can add additional error handling here if needed
  };

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
                  {/* Anandamela attendance - show first if selected */}
                  {Object.entries(reservation.selectedItems)
                    .filter(([compositeKey]) => compositeKey.includes('anandamela'))
                    .some(([_, itemDetails]) => itemDetails.quantity > 0) && (
                      <div className="bg-orange-50 p-3 rounded-lg mb-2 border border-orange-100">
                        <div className="font-medium text-sm text-orange-800 mb-1">Anandamela Attendance</div>
                        <div className="text-xs text-orange-700 flex justify-between">
                          <span>Expected Attendees:</span>
                          <span className="font-medium">
                            {Object.entries(reservation.selectedItems)
                              .filter(([compositeKey]) => compositeKey.includes('anandamela'))
                              .reduce((sum, [_, itemDetails]) => sum + itemDetails.quantity, 0)}
                          </span>
                        </div>
                        {Object.entries(reservation.selectedItems)
                          .filter(([compositeKey]) => compositeKey.includes('anandamela'))
                          .map(([compositeKey, itemDetails]) => {
                            try {
                              if (itemDetails.quantity === 0) return null;
                              
                              // Extract age group from composite key
                              const parts = compositeKey.split('-');
                              const ageGroupKey = parts[parts.length - 1] as keyof typeof AGE_GROUPS;
                              
                              // Ensure we have a valid age group
                              if (!AGE_GROUPS[ageGroupKey]) {
                                console.error(`Invalid age group in key ${compositeKey}`);
                                return null;
                              }
                              
                              const ageGroupInfo = AGE_GROUPS[ageGroupKey];
                              
                              return (
                                <div key={compositeKey} className="text-xs text-orange-600 flex justify-between">
                                  <span>{ageGroupInfo.name}:</span>
                                  <span>{itemDetails.quantity}</span>
                                </div>
                              );
                            } catch (error) {
                              console.error(`Error rendering Anandamela item ${compositeKey}:`, error);
                              return null;
                            }
                          })}
                        <div className="text-xs mt-2 text-orange-600 italic">
                          Free registration - Pay for food at stalls
                        </div>
                      </div>
                    )
                  }
                  
                  {/* Meal items with pricing */}
                  {Object.entries(reservation.selectedItems)
                    .filter(([compositeKey]) => !compositeKey.includes('anandamela') && reservation.selectedItems[compositeKey].quantity > 0)
                    .map(([compositeKey, itemDetails]) => {
                      try {
                        // Parse item details from the composite key
                        const parts = compositeKey.split('-');
                        const itemId = parts[0] + (parts.length > 2 ? `-${parts[1]}` : '');
                        const ageGroupKey = parts[parts.length - 1] as keyof typeof AGE_GROUPS;
                        
                        // Ensure we have a valid age group
                        if (!AGE_GROUPS[ageGroupKey]) {
                          console.error(`Invalid age group in key ${compositeKey}`);
                          return null;
                        }
                        
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
                        
                        // Get price based on day, type, and age group using helper function
                        const pricePerItem = getPriceByDay(
                          dayNumber || '1', 
                          isVeg && !itemId.includes('nonveg'), 
                          ageGroupKey,
                          reservation.customerInfo.isMember
                        );
                        
                        // Make sure price is a valid number
                        if (isNaN(pricePerItem)) {
                          console.error(`Invalid price calculated for ${compositeKey}`);
                          return null;
                        }
                        
                        const totalPrice = pricePerItem * itemDetails.quantity;
                        
                        // Get the age group display name
                        let ageGroupDisplay = 'Adult';
                        switch(ageGroupKey) {
                          case 'child': ageGroupDisplay = 'Child (8-12 years)'; break;
                          case 'infant': ageGroupDisplay = 'Infant (0-8 years)'; break;
                          default: ageGroupDisplay = 'Adult (12+ years)';
                        }
                        
                        return (
                          <div key={compositeKey} className="bg-gray-50 p-3 rounded">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="font-medium text-gray-800 text-sm">
                                  {thaliType} ({dateDisplay})
                                </div>
                                <div className="text-xs text-gray-600 mt-1">
                                  Age Group: {ageGroupDisplay}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {pricePerItem > 0 ? `€${pricePerItem.toFixed(2)} per plate` : 'Free'}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-gray-600">
                                  {itemDetails.quantity} × {pricePerItem > 0 ? `€${pricePerItem.toFixed(2)}` : 'Free'}
                                </div>
                                <div className="font-semibold text-gray-800">
                                  {totalPrice > 0 ? `€${totalPrice.toFixed(2)}` : 'Free'}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      } catch (error) {
                        console.error(`Error rendering item ${compositeKey}:`, error);
                        return null;
                      }
                    })}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="text-orange-600 font-bold">€{(reservation.totalAmount || 0).toFixed(2)}</span>
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

            <StripePayment 
              amount={reservation.totalAmount}
              currency="EUR"
              customerInfo={reservation.customerInfo}
              reservationData={reservation}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              description="Food - Durga Puja 2025(Sanskriti eV)"
              eventInfo={{
                eventName: "Durga Puja 2025 Meal Reservation",
                eventPath: "/events/durga-puja-2025",
                returnToEventText: "Back to Durga Puja Event"
              }}
            />
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
