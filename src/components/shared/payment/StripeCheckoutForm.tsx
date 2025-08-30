import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Lock, CheckCircle } from 'lucide-react';

export interface StripeCheckoutFormProps {
  amount: number;
  customerInfo: {
    name: string;
    email: string;
    isMember: boolean;
  };
  clientSecret?: string;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: string) => void;
  eventInfo?: {
    eventName: string;
    eventPath: string;
    returnToEventText?: string;
  };
}

const StripeCheckoutForm: React.FC<StripeCheckoutFormProps> = ({ 
  amount, 
  customerInfo, 
  clientSecret,
  onSuccess, 
  onError,
  eventInfo
}) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Pre-populate billing details from customer info
  const [name, setName] = useState(customerInfo.name);
  const [email, setEmail] = useState(customerInfo.email);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!clientSecret) {
      setPaymentError('Payment not initialized properly');
      if (onError) onError('Payment not initialized properly');
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      // Use confirmPayment with the clientSecret and Elements instance
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to include the return_url with event info as query parameters
          return_url: eventInfo 
            ? `${window.location.origin}/payment-confirmation?eventName=${encodeURIComponent(eventInfo.eventName)}&eventPath=${encodeURIComponent(eventInfo.eventPath)}${eventInfo.returnToEventText ? `&returnToEventText=${encodeURIComponent(eventInfo.returnToEventText)}` : ''}`
            : `${window.location.origin}/payment-confirmation`,
          payment_method_data: {
            billing_details: {
              name,
              email,
            },
          },
        },
        redirect: 'if_required',
      });

      if (result.error) {
        setPaymentError(result.error.message || 'Payment failed');
        if (onError) onError(result.error.message || 'Payment failed');
      } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        setPaymentSuccess(true);
        if (onSuccess) onSuccess(result.paymentIntent.id);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setPaymentError(errorMessage);
      if (onError) onError(errorMessage);
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
          Your payment has been confirmed. You will receive a receipt email shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Billing Information</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Payment Details</h3>
        <div className="bg-white p-4 rounded border">
          <PaymentElement 
            options={{
              layout: {
                type: 'tabs',
                defaultCollapsed: false,
              },
            }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Select your preferred payment method
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
            Pay €{(amount || 0).toFixed(2)}
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Your payment is secured by Stripe. We do not store your card information.
      </p>
    </form>
  );
};

export default StripeCheckoutForm;
