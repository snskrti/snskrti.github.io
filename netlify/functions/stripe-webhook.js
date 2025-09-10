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
        
        // Update reservation status in Firestore
        try {
          // Initialize Firebase if needed
          initializeFirebase();
          const db = admin.firestore();
          
          // Define collection name
          const COLLECTION_NAME = 'durga_puja_2025-mealReservations';
          
          // Find the reservation with this payment intent
          const reservationsSnapshot = await db.collection(COLLECTION_NAME)
            .where('paymentIntentId', '==', paymentIntent.id)
            .get();
          
          if (!reservationsSnapshot.empty) {
            // Update the reservation with the new payment status
            const reservation = reservationsSnapshot.docs[0];
            await reservation.ref.update({
              paymentStatus: 'succeeded',
              paymentConfirmed: true,
              updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });
            console.log(`Updated reservation ${reservation.id} with successful payment status`);
          } else {
            console.log(`No reservation found for PaymentIntent ${paymentIntent.id}`);
          }
        } catch (error) {
          console.error('Error updating reservation payment status:', error);
        }
        
        // With our new approach, we don't need to manually mark invoices as paid
        // as they are automatically handled by Stripe when using the proper invoice payment flow
        // Just log the success and any metadata for reference
        console.log(`Payment for ${paymentIntent.metadata?.event || 'event'} by ${paymentIntent.metadata?.customerName || 'customer'}`);
        break;
        
      case 'payment_intent.payment_failed':
        const failedPayment = stripeEvent.data.object;
        console.log(`PaymentIntent ${failedPayment.id} failed`);
        
        // Update reservation status in Firestore for failed payment
        try {
          // Initialize Firebase if needed
          initializeFirebase();
          const db = admin.firestore();
          
          // Define collection name
          const COLLECTION_NAME = 'durga_puja_2025-mealReservations';
          
          // Find the reservation with this payment intent
          const reservationsSnapshot = await db.collection(COLLECTION_NAME)
            .where('paymentIntentId', '==', failedPayment.id)
            .get();
          
          if (!reservationsSnapshot.empty) {
            // Update the reservation with the failed payment status
            const reservation = reservationsSnapshot.docs[0];
            await reservation.ref.update({
              paymentStatus: 'failed',
              paymentConfirmed: false,
              paymentStatusMessage: failedPayment.last_payment_error?.message || 'Payment failed',
              updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });
            console.log(`Updated reservation ${reservation.id} with failed payment status`);
          } else {
            console.log(`No reservation found for PaymentIntent ${failedPayment.id}`);
          }
        } catch (error) {
          console.error('Error updating reservation payment status:', error);
        }
        break;
        
      case 'charge.succeeded':
        const charge = stripeEvent.data.object;
        console.log(`Charge ${charge.id} succeeded`);
        break;
        
      case 'invoice.paid':
        const invoice = stripeEvent.data.object;
        console.log(`Invoice ${invoice.id} was paid`);
        
        // This is now the primary event we should listen to for triggering confirmation steps
        // The invoice.paid event is more reliable than payment_intent.succeeded for confirming payments
        try {
          // Initialize Firebase if needed
          initializeFirebase();
          const db = admin.firestore();
          
          // Get the customer information from the invoice
          const customer = await stripe.customers.retrieve(invoice.customer);
          
          // Log details for debugging
          console.log(`Invoice paid for ${invoice.metadata?.customerName || customer.name || 'customer'}`);
          console.log(`Invoice metadata: ${JSON.stringify(invoice.metadata)}`);
          
          // Here we could update a reservation status in Firestore
          // This might be moved to the reservation-confirmation endpoint if you prefer to handle it there
        } catch (error) {
          console.error('Error processing paid invoice:', error);
        }
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
