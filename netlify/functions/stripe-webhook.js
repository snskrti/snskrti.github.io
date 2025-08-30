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

// Save reservation data to Firestore
const saveMealReservation = async (paymentIntent) => {
  try {
    // Extract reservation data from payment intent metadata
    const reservationData = paymentIntent.metadata.reservation ? 
      JSON.parse(paymentIntent.metadata.reservation) : null;
    
    if (!reservationData) {
      console.log('No reservation data found in payment intent metadata');
      return;
    }

    // Initialize Firebase and get Firestore instance
    initializeFirebase();
    const db = admin.firestore();
    
    // Check if a reservation with this payment intent already exists
    const existingReservations = await db.collection('mealReservations')
      .where('paymentIntentId', '==', paymentIntent.id)
      .get();
    
    // If it exists, return early
    if (!existingReservations.empty) {
      console.log(`Reservation with paymentIntentId ${paymentIntent.id} already exists, skipping save`);
      return existingReservations.docs[0].id;
    }
    
    // Add payment information to the reservation data
    const reservationToSave = {
      ...reservationData,
      paymentIntentId: paymentIntent.id,
      paymentStatus: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      eventType: paymentIntent.metadata.event || 'Durga Puja 2025',
      source: 'webhook'
    };
    
    // Save to Firestore
    const docRef = await db.collection('mealReservations').add(reservationToSave);
    console.log(`Meal reservation saved to Firestore with ID: ${docRef.id}`);
    
    return docRef.id;
  } catch (error) {
    console.error('Error saving meal reservation:', error);
    throw error;
  }
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
        
        // Save meal reservation if this payment is for a meal reservation
        if (paymentIntent.metadata.reservation) {
          await saveMealReservation(paymentIntent);
        }
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
