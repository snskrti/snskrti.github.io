import React from 'react';
import { useNavigate } from 'react-router-dom';
import StripePayment from '../../../components/shared/payment/StripePayment';

// This is just a sample component to show how to use the shared payment confirmation page
function DiwaliPayment2025() {
  const navigate = useNavigate();
  
  // Sample customer info
  const customerInfo = {
    name: "Example Customer",
    email: "example@email.com",
    isMember: true
  };
  
  const handlePaymentSuccess = (paymentId: string, invoiceDetails?: any) => {
    // Navigate to the shared payment confirmation page with payment details for Diwali event
    navigate('/payment-confirmation', { 
      state: { 
        paymentDetails: {
          paymentIntentId: paymentId,
          status: 'succeeded',
          ...invoiceDetails
        },
        eventInfo: {
          eventName: "Diwali 2025 Celebration",
          eventPath: "/events/diwali-2025",
          returnToEventText: "Back to Diwali Event"
        }
      } 
    });
  };

  const handlePaymentError = (error: string) => {
    // Handle payment error
  };

  return (
    <div>
      <h1>Diwali 2025 Payment</h1>
      
      {/* Using the same StripePayment component but with different event info */}
      <StripePayment
        amount={25.00} // Example amount
        currency="EUR"
        customerInfo={customerInfo}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
        description="Diwali 2025 Celebration Ticket"
        eventInfo={{
          eventName: "Diwali 2025 Celebration",
          eventPath: "/events/diwali-2025",
          returnToEventText: "Back to Diwali Event"
        }}
      />
    </div>
  );
}

export default DiwaliPayment2025;
