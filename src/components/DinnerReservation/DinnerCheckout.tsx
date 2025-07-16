import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ArrowLeft, CreditCard, User, Mail, Phone, Check, AlertCircle } from 'lucide-react';
import { CartItem, CustomerInfo } from '../../types/dinnerReservation';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '');

interface DinnerCheckoutProps {
  items: CartItem[];
  customerInfo: CustomerInfo;
  onBack: () => void;
  onCustomerInfoChange: (info: CustomerInfo) => void;
}

export const DinnerCheckout: React.FC<DinnerCheckoutProps> = ({ 
  items, 
  customerInfo, 
  onBack, 
  onCustomerInfoChange 
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Elements stripe={stripePromise}>
        <CheckoutForm 
          items={items} 
          customerInfo={customerInfo} 
          onBack={onBack}
          onCustomerInfoChange={onCustomerInfoChange}
        />
      </Elements>
    </div>
  );
};

const CheckoutForm: React.FC<DinnerCheckoutProps> = ({ 
  items, 
  customerInfo, 
  onBack, 
  onCustomerInfoChange 
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receiptId, setReceiptId] = useState<string | null>(null);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const memberDiscount = customerInfo.isMember ? subtotal * 0.1 : 0;
  const total = subtotal - memberDiscount;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          currency: 'EUR',
          customerInfo,
          items,
        }),
      });

      const { clientSecret, error: paymentError } = await response.json();

      if (paymentError) {
        throw new Error(paymentError);
      }

      // Confirm payment
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: customerInfo.name,
              email: customerInfo.email,
              phone: customerInfo.phone,
            },
          },
        }
      );

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (paymentIntent.status === 'succeeded') {
        // Confirm payment and send receipt
        const confirmResponse = await fetch('/api/confirm-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            customerInfo,
            items,
          }),
        });

        const { receiptId: newReceiptId } = await confirmResponse.json();
        setReceiptId(newReceiptId);
        setPaymentSuccess(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (field: keyof CustomerInfo, value: string | boolean) => {
    onCustomerInfoChange({
      ...customerInfo,
      [field]: value,
    });
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for your dinner reservation. Your payment has been processed successfully.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Receipt ID:</p>
            <p className="font-mono text-lg font-semibold">{receiptId}</p>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <p>✓ Confirmation email sent to {customerInfo.email}</p>
            <p>✓ Reservation confirmed for selected dates</p>
            <p>✓ Receipt will be available in your email</p>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full mt-6 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Menu Selection</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customer Information */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <User className="w-6 h-6 mr-2" />
            Customer Information
          </h2>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={customerInfo.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={customerInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isMember"
                checked={customerInfo.isMember}
                onChange={(e) => handleInputChange('isMember', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <label htmlFor="isMember" className="text-sm font-medium text-gray-700">
                I am a Sanskriti e.V. member
              </label>
            </div>

            {customerInfo.isMember && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Membership ID
                </label>
                <input
                  type="text"
                  value={customerInfo.membershipId}
                  onChange={(e) => handleInputChange('membershipId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your membership ID"
                />
              </div>
            )}
          </form>
        </div>

        {/* Order Summary and Payment */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.date} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(item.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">€{item.price.toFixed(2)} × {item.quantity}</p>
                    <p className="text-sm text-gray-600">€{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span>Subtotal:</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              {memberDiscount > 0 && (
                <div className="flex justify-between items-center mb-2 text-green-600">
                  <span>Member Discount (10%):</span>
                  <span>-€{memberDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-xl font-bold border-t pt-2">
                <span>Total:</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <CreditCard className="w-6 h-6 mr-2" />
              Payment Information
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Information
                </label>
                <div className="p-3 border border-gray-300 rounded-lg">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#424770',
                          '::placeholder': {
                            color: '#aab7c4',
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-red-700">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={!stripe || isProcessing || !customerInfo.name || !customerInfo.email}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? 'Processing...' : `Pay €${total.toFixed(2)}`}
              </button>
            </form>

            <div className="mt-4 text-xs text-gray-500 text-center">
              <p>Your payment is secured by Stripe. We don't store your card information.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
