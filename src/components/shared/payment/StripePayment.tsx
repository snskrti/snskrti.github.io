import React, { useEffect, useState, useRef } from 'react';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckoutForm from './StripeCheckoutForm';

// Initialize Stripe with publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '');

export interface StripePaymentProps {
  description: string; // Description of the payment
  amount: number; // Amount in euros
  currency: string; // Currency code (in caps), e.g., 'EUR'
  customerInfo: {
    name: string;
    email: string;
    isMember: boolean;
  };
  reservationData?: any; // Optional reservation data to pass to the payment intent
  onSuccess?: (paymentId: string, invoiceDetails?: {
    invoiceId?: string;
    invoiceNumber?: string;
    invoiceUrl?: string;
  }) => void; // Callback when payment is successful
  onError?: (error: string) => void; // Callback when payment fails
  eventInfo?: {
    eventName: string;
    eventPath: string;
    returnToEventText?: string;
  }; // Optional event information for the payment confirmation page
}

export const StripePayment: React.FC<StripePaymentProps> = (props) => {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [paymentDetails, setPaymentDetails] = useState<{
    paymentIntentId?: string;
    invoiceId?: string;
    invoiceNumber?: string;
    invoiceUrl?: string;
  }>({});
  const initializationRef = useRef<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only initialize once using ref to prevent race conditions
    if (!initializationRef.current) {
      initializationRef.current = true;
      
      // Create payment intent
      createPaymentIntentFromServer();
    }
  }, [props.amount, props.currency, props.description, props.customerInfo, props.reservationData]);

  const createPaymentIntentFromServer = async () => {
    try {
      // Determine the base URL for Netlify Functions
      // When running locally with netlify dev, functions are served at port 8888
      const isLocalDev = window.location.hostname === 'localhost';
      const functionsBaseUrl = isLocalDev && window.location.port === '3000' 
        ? 'http://localhost:8888/.netlify/functions' 
        : '/.netlify/functions';
      
      const response = await fetch(`${functionsBaseUrl}/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: props.amount,
          currency: props.currency.toLowerCase(),
          customerInfo: props.customerInfo,
          reservationData: props.reservationData,
          description: props.description
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment intent');
      }

      // Store client secret (required for payment)
      setClientSecret(data.clientSecret);
      
      // Store additional payment details for future reference
      setPaymentDetails({
        paymentIntentId: data.paymentIntentId,
        invoiceId: data.invoiceId,
        invoiceNumber: data.invoiceNumber,
        invoiceUrl: data.invoiceUrl,
      });

      // Log success message with invoice details
      console.log(`Payment intent created. Invoice #${data.invoiceNumber} available at: ${data.invoiceUrl}`);
    } catch (err) {
      console.error('Error creating payment intent:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize payment';
      setError(errorMessage);
      if (props.onError) props.onError(errorMessage);
    }
  };

  return (
    <div className="w-full py-4">
      {clientSecret ? (
        <div className="flex flex-col items-center justify-center w-full px-2 rounded-lg">
          <Elements 
            stripe={stripePromise} 
            options={{ 
              clientSecret,
              appearance: {
                theme: 'stripe',
                variables: {
                  colorPrimary: '#16a34a', // green-600
                  colorBackground: '#ffffff',
                  colorText: '#1f2937', // gray-800
                  colorDanger: '#ef4444', // red-500
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  borderRadius: '0.375rem', // rounded-md
                },
              },
            }}
          >
            <StripeCheckoutForm 
              amount={props.amount}
              clientSecret={clientSecret}
              onSuccess={(paymentId) => {
                // Pass both paymentId and additional details to parent component
                if (props.onSuccess) {
                  props.onSuccess(paymentId, {
                    invoiceId: paymentDetails.invoiceId,
                    invoiceNumber: paymentDetails.invoiceNumber,
                    invoiceUrl: paymentDetails.invoiceUrl
                  });
                }
                
                // Log invoice URL for user reference
                if (paymentDetails.invoiceUrl) {
                  console.log(`Payment successful. View your invoice at: ${paymentDetails.invoiceUrl}`);
                }
              }}
              onError={props.onError}
              customerInfo={props.customerInfo}
              eventInfo={props.eventInfo}
            />
          </Elements>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      ) : (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
          <span className="ml-2 text-gray-600">Initializing payment...</span>
        </div>
      )}
    </div>
  );
};

export default StripePayment;
