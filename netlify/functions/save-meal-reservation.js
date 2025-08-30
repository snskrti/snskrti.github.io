const admin = require('firebase-admin');

// For local development, try to load environment variables from .env.development
if (process.env.NODE_ENV === 'development') {
  try {
    require('dotenv').config({ path: '.env.development' });
    console.log('Loaded environment variables from .env.development');
  } catch (error) {
    console.warn('Failed to load dotenv, continuing without it:', error.message);
  }
}

// Initialize Firebase Admin SDK
let firebaseApp;
const initializeFirebase = () => {
  if (!admin.apps.length) {
    try {
      console.log('Initializing Firebase Admin SDK');
      
      // Parse the service account JSON from environment variable
      if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        try {
          console.log('FIREBASE_SERVICE_ACCOUNT environment variable is present');
          
          // Check if the variable looks like a JSON string
          const serviceAccountVar = process.env.FIREBASE_SERVICE_ACCOUNT.trim();
          if (!serviceAccountVar.startsWith('{') || !serviceAccountVar.endsWith('}')) {
            console.error('FIREBASE_SERVICE_ACCOUNT does not appear to be a valid JSON string');
            throw new Error('FIREBASE_SERVICE_ACCOUNT must be a valid JSON string containing service account credentials');
          }
          
          try {
            const serviceAccount = JSON.parse(serviceAccountVar);
            
            // Validate that the service account has the required fields
            if (!serviceAccount.project_id || !serviceAccount.private_key || !serviceAccount.client_email) {
              console.error('Service account JSON is missing required fields');
              throw new Error('Service account JSON must include project_id, private_key, and client_email');
            }
            
            // Log only non-sensitive fields for debugging
            console.log('Service account project_id:', serviceAccount.project_id);
            console.log('Service account client_email is present:', !!serviceAccount.client_email);
            console.log('Service account private_key is present:', !!serviceAccount.private_key);
            
            firebaseApp = admin.initializeApp({
              credential: admin.credential.cert(serviceAccount)
            });
            console.log('Firebase initialized with service account credentials');
          } catch (jsonError) {
            console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT as JSON:', jsonError.message);
            throw new Error(`Invalid FIREBASE_SERVICE_ACCOUNT format: ${jsonError.message}`);
          }
        } catch (parseError) {
          console.error('Error setting up Firebase with service account:', parseError.message);
          throw new Error(`Failed to set up Firebase with service account: ${parseError.message}`);
        }
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
    const { paymentIntentId, reservationData } = JSON.parse(event.body);

    // Add logging to see what data we're receiving
    console.log('Received data to save reservation:', { 
      paymentIntentId, 
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
      eventType: reservationData.eventType || 'Durga Puja 2025',
      source: 'netlify-function'
    };

    // Initialize Firebase
    try {
      // Check if environment variables are set (without logging sensitive values)
      const hasFbServiceAccount = !!process.env.FIREBASE_SERVICE_ACCOUNT;
      console.log('Environment variables check:', {
        hasFIREBASE_SERVICE_ACCOUNT: hasFbServiceAccount,
        hasFIREBASE_PROJECT_ID: !!process.env.FIREBASE_PROJECT_ID,
        FIREBASE_SERVICE_ACCOUNT_starts_with: hasFbServiceAccount ? 
          `${process.env.FIREBASE_SERVICE_ACCOUNT.substring(0, 20)}...` : 'N/A',
        FIREBASE_SERVICE_ACCOUNT_length: hasFbServiceAccount ? 
          process.env.FIREBASE_SERVICE_ACCOUNT.length : 0
      });
      
      if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
        console.warn('FIREBASE_SERVICE_ACCOUNT environment variable is not set. This is required for proper Firebase initialization.');
      }
      
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
        console.log(`Reservation with paymentIntentId ${paymentIntentId} already exists. ID: ${existingDoc.id}`);
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Duplicate reservation',
            message: 'A reservation with this payment ID already exists',
            id: existingDoc.id
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
