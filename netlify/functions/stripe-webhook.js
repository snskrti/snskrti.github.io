const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const admin = require('firebase-admin');

// Initialize Firebase Admin if not already initialized
let firebaseApp;
const initializeFirebase = () => {
  if (!admin.apps.length) {
    try {
      // Parse the service account JSON from environment variable
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      
      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    } catch (error) {
      console.error('Error initializing Firebase:', error);
      // Use application default credentials as fallback
      firebaseApp = admin.initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID
      });
    }
  } else {
    firebaseApp = admin.app();
  }
  
  return firebaseApp;
};

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Get the signature from headers
  const stripeSignature = event.headers['stripe-signature'];

  if (!stripeSignature) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Missing Stripe signature' }),
    };
  }

  try {
    // Verify and construct the event
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      stripeSignature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle different event types
    switch (stripeEvent.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = stripeEvent.data.object;
        console.log(`PaymentIntent ${paymentIntent.id} succeeded`);
        
        // Payment is successful, but reservation data is handled by the frontend
        // through the save-meal-reservation endpoint
        console.log(`Payment for ${paymentIntent.metadata.event || 'event'} by ${paymentIntent.metadata.customerName || 'customer'}`);
        break;
        
      case 'charge.succeeded':
        const charge = stripeEvent.data.object;
        console.log(`Charge ${charge.id} succeeded`);
        break;
        
      case 'invoice.paid':
        const invoice = stripeEvent.data.object;
        console.log(`Invoice ${invoice.id} was paid`);
        break;
        
      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error('Webhook error:', error);
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: `Webhook Error: ${error.message}` }),
    };
  }
};
