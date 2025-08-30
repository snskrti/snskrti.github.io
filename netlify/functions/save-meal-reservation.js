const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
let firebaseApp;
const initializeFirebase = () => {
  if (!admin.apps.length) {
    try {
      console.log('Initializing Firebase Admin SDK');
      
      // Parse the service account JSON from environment variable
      if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        
        firebaseApp = admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
        });
        console.log('Firebase initialized with service account credentials');
      } else if (process.env.FIREBASE_PROJECT_ID) {
        // Use application default credentials as fallback
        firebaseApp = admin.initializeApp({
          projectId: process.env.FIREBASE_PROJECT_ID
        });
        console.log('Firebase initialized with project ID:', process.env.FIREBASE_PROJECT_ID);
      } else {
        throw new Error('No Firebase credentials available');
      }
    } catch (error) {
      console.error('Failed to initialize Firebase:', error);
      throw error; // Re-throw to handle in the main function
    }
  } else {
    firebaseApp = admin.app();
    console.log('Using existing Firebase app');
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

    // Add logging to see what data we're receiving
    console.log('Received data to save reservation:', { 
      paymentIntentId, 
      eventType,
      reservationDataKeys: reservationData ? Object.keys(reservationData) : 'null' 
    });

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
    try {
      initializeFirebase();
      console.log('Firebase initialized successfully');
    } catch (firebaseError) {
      console.error('Firebase initialization failed:', firebaseError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Failed to initialize Firebase',
          details: firebaseError.message 
        }),
      };
    }
    
    // Get Firestore instance
    const db = admin.firestore();
    
    // Define collection name
    const COLLECTION_NAME = 'durga_puja_2025-mealReservations';
    
    // Check if a reservation with this payment intent already exists
    try {
      console.log(`Checking for existing reservation with paymentIntentId: ${paymentIntentId}`);
      const existingReservations = await db.collection(COLLECTION_NAME)
        .where('paymentIntentId', '==', paymentIntentId)
        .get();
      
      // If it exists, return the existing document
      if (!existingReservations.empty) {
        const existingDoc = existingReservations.docs[0];
        console.log(`Reservation with paymentIntentId ${paymentIntentId} already exists, skipping save. ID: ${existingDoc.id}`);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Reservation already exists',
            id: existingDoc.id,
            exists: true
          })
        };
      }
      
      console.log('No existing reservation found, proceeding to save');
    } catch (queryError) {
      console.error('Error querying for existing reservations:', queryError);
      // Continue with save attempt even if query fails
    }
    
    // Save to the durga_puja_2025-mealReservations collection if it doesn't exist
    try {
      console.log('Saving new reservation to Firestore');
      const docRef = await db.collection('durga_puja_2025-mealReservations').add(reservationToSave);
      console.log(`Reservation saved successfully with ID: ${docRef.id}`);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Reservation saved successfully',
          id: docRef.id
        }),
      };
    } catch (saveError) {
      console.error('Error saving to Firestore:', saveError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Failed to save reservation to Firestore',
          details: saveError.message 
        }),
      };
    }
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
