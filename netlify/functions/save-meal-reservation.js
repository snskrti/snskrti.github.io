const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
let firebaseApp;
const initializeFirebase = () => {
  if (!firebaseApp) {
    // Check if we have environment variables or service account JSON
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      // Parse the service account JSON from environment variable
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      
      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    } else {
      // Use application default credentials (helpful for local development)
      firebaseApp = admin.initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID
      });
    }
  }
  
  return firebaseApp;
};

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight requests
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
    const { paymentIntentId, reservationData, event: eventType } = JSON.parse(event.body);

    if (!paymentIntentId || !reservationData) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Payment Intent ID and reservation data are required' }),
      };
    }

    // Add payment information and timestamp to the reservation
    const reservationToSave = {
      ...reservationData,
      paymentIntentId,
      paymentStatus: 'succeeded',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      eventType: eventType || 'Durga Puja 2025',
      source: 'netlify-function'
    };

    // Initialize Firebase
    initializeFirebase();
    
    // Get Firestore instance
    const db = admin.firestore();
    
    // Check if a reservation with this payment intent already exists
    const existingReservations = await db.collection('mealReservations')
      .where('paymentIntentId', '==', paymentIntentId)
      .get();
    
    // If it exists, return the existing document
    if (!existingReservations.empty) {
      const existingDoc = existingReservations.docs[0];
      console.log(`Reservation with paymentIntentId ${paymentIntentId} already exists, skipping save`);
      return {
        id: existingDoc.id,
        exists: true
      };
    }
    
    // Save to the mealReservations collection if it doesn't exist
    const docRef = await db.collection('mealReservations').add(reservationToSave);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Reservation saved successfully',
        id: docRef.id
      }),
    };
  } catch (error) {
    console.error('Error saving reservation:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to save reservation',
        details: error.message 
      }),
    };
  }
};
