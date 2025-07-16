import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export const handler: Handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Request body is required' })
      };
    }

    const { amount, currency = 'EUR', customerInfo, items } = JSON.parse(event.body);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      receipt_email: customerInfo.email,
      metadata: {
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      isMember: customerInfo.isMember.toString(),
      membershipId: customerInfo.membershipId || '',
      items: JSON.stringify(items),
      },
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      }),
    };
  } catch (error) {
    console.error('Payment intent creation error:', error);
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Payment intent creation failed' 
      }),
    };
  }
};
