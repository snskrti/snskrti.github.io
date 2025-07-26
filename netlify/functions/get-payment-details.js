const Stripe = require('stripe');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { paymentIntentId } = event.queryStringParameters || {};

    if (!paymentIntentId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Payment Intent ID is required' }),
      };
    }

    // Retrieve payment intent details
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Return relevant payment details
    const paymentDetails = {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
      created: paymentIntent.created,
      metadata: paymentIntent.metadata,
      charges: paymentIntent.charges?.data?.map(charge => ({
        id: charge.id,
        amount: charge.amount,
        currency: charge.currency,
        status: charge.status,
        receipt_url: charge.receipt_url,
        billing_details: charge.billing_details,
      })) || [],
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(paymentDetails),
    };
  } catch (error) {
    console.error('Error retrieving payment details:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to retrieve payment details' }),
    };
  }
};
