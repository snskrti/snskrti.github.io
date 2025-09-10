const admin = require('firebase-admin');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
    console.log('Received data for reservation confirmation:', { 
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

    // Step 1: Initialize Firebase and save reservation data
    try {
      // Check if environment variables are set (without logging sensitive values)
      const hasFbServiceAccount = !!process.env.FIREBASE_SERVICE_ACCOUNT;
      console.log('Environment variables check:', {
        hasFIREBASE_SERVICE_ACCOUNT: hasFbServiceAccount,
        hasFIREBASE_PROJECT_ID: !!process.env.FIREBASE_PROJECT_ID,
        hasSTRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY
      });
      
      if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
        console.warn('FIREBASE_SERVICE_ACCOUNT environment variable is not set. This is required for proper Firebase initialization.');
      }
      
      if (!process.env.STRIPE_SECRET_KEY) {
        console.warn('STRIPE_SECRET_KEY environment variable is not set. This is required for Stripe API calls.');
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Stripe API key not configured' }),
        };
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
    
    // Step 2: Retrieve payment intent from Stripe to get invoice ID
    let paymentIntent;
    let invoice;
    let invoiceId;
    
    try {
      // First check if we were provided a payment intent ID directly
      if (paymentIntentId) {
        paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        
        console.log('Retrieved payment intent:', {
          id: paymentIntent.id,
          status: paymentIntent.status,
          amount: paymentIntent.amount,
          metadata: paymentIntent.metadata
        });
        
        // With our new approach, the payment intent should be directly linked to the invoice
        // Get the invoice ID from the payment intent
        if (paymentIntent.invoice) {
          invoiceId = typeof paymentIntent.invoice === 'string' 
            ? paymentIntent.invoice 
            : paymentIntent.invoice.id;
            
          console.log(`Found invoice ID ${invoiceId} directly attached to payment intent`);
        }
      }
      
      // If we have an invoice ID, retrieve the invoice details
      if (invoiceId) {
        invoice = await stripe.invoices.retrieve(invoiceId);
        console.log('Retrieved invoice:', {
          id: invoice.id,
          status: invoice.status,
          customerEmail: invoice.customer_email,
          total: invoice.total,
          paid: invoice.paid
        });
      } else {
        console.warn('No invoice ID found. This may indicate the payment was not made through an invoice.');
      }
    } catch (stripeError) {
      console.error('Error retrieving payment information from Stripe:', stripeError);
      // Continue with saving the reservation even if we can't get the payment intent
      // This ensures the reservation is saved even if there's an issue with Stripe
    }
    
    // Get Firestore instance
    const db = admin.firestore();
    
    // Define collection name
    const COLLECTION_NAME = 'durga_puja_2025-mealReservations';
    
    // Check if a reservation with this payment intent already exists
    let existingDocId;
    try {
      console.log(`Checking for existing reservation with paymentIntentId: ${paymentIntentId}`);
      const existingReservations = await db.collection(COLLECTION_NAME)
        .where('paymentIntentId', '==', paymentIntentId)
        .get();
      
      // If it exists, get the existing document ID
      if (!existingReservations.empty) {
        const existingDoc = existingReservations.docs[0];
        existingDocId = existingDoc.id;
        console.log(`Reservation with paymentIntentId ${paymentIntentId} already exists. ID: ${existingDocId}`);
      } else {
        console.log('No existing reservation found, proceeding to save');
      }
    } catch (queryError) {
      console.error('Error querying for existing reservations:', queryError);
      // Continue with save attempt even if query fails
    }

    // Add payment information and timestamp to the reservation
    const reservationToSave = {
      ...reservationData,
      paymentIntentId,
      paymentStatus: paymentIntent ? paymentIntent.status : 'unknown',
      invoiceId: invoiceId || null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      eventType: 'Durga Puja 2025'
    };
    
    // Check if the payment was actually successful
    const isPaymentSuccessful = paymentIntent && 
      (paymentIntent.status === 'succeeded' || paymentIntent.status === 'processing');
    
    if (!isPaymentSuccessful) {
      console.warn(`Payment is not successful. Status: ${paymentIntent ? paymentIntent.status : 'unknown'}`);
      
      // Still save the reservation but mark it as not confirmed
      reservationToSave.paymentConfirmed = false;
      reservationToSave.paymentStatusMessage = `Payment not confirmed. Status: ${paymentIntent ? paymentIntent.status : 'unknown'}`;
    } else {
      reservationToSave.paymentConfirmed = true;
    }
    
    // Step 3: Save to Firestore (or update if it exists)
    let docRef;
    try {
      console.log('Saving reservation to Firestore');
      
      if (existingDocId) {
        // Update existing document
        docRef = db.collection(COLLECTION_NAME).doc(existingDocId);
        await docRef.update({
          ...reservationToSave,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log(`Reservation updated successfully with ID: ${existingDocId}`);
      } else {
        // Create new document
        docRef = await db.collection(COLLECTION_NAME).add(reservationToSave);
        console.log(`Reservation saved successfully with ID: ${docRef.id}`);
      }
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
    
    // Step 4: If we have an invoice ID, check its status and update as needed
    let invoiceResult = null;
    if (invoiceId) {
      try {
        // We already retrieved the invoice above, so we don't need to retrieve it again
        if (!invoice) {
          invoice = await stripe.invoices.retrieve(invoiceId);
          console.log('Retrieved invoice:', {
            id: invoice.id,
            status: invoice.status,
            customerEmail: invoice.customer_email,
            total: invoice.total,
            paid: invoice.paid
          });
        }
        
        // With our streamlined approach, we don't need to manually mark invoices as paid
        // The invoice should be automatically paid when the payment intent succeeds
        
        // If the invoice isn't paid yet but the payment succeeded, it might be a timing issue
        // Just log this scenario but don't try to manually mark it as paid
        if (paymentIntent && paymentIntent.status === 'succeeded' && !invoice.paid) {
          console.log(`Note: PaymentIntent ${paymentIntentId} succeeded but invoice ${invoiceId} is not marked as paid yet. This is likely a timing issue and should resolve automatically.`);
        }
        
        // Don't send the invoice email to the customer - they'll already receive payment confirmation from Stripe
        // Just get the invoice information for our records
        console.log(`Using invoice ${invoiceId} information for our records without sending email to customer`);
        
        invoiceResult = {
          id: invoice.id,
          number: invoice.number,
          status: invoice.status,
          url: invoice.hosted_invoice_url
        };
        
        // Update the reservation with invoice information if it wasn't included before
        if (docRef && invoice.hosted_invoice_url) {
          await docRef.update({
            invoiceUrl: invoice.hosted_invoice_url,
            invoiceNumber: invoice.number,
            invoiceStatus: invoice.status,
            invoicePaid: invoice.paid
          });
          console.log('Updated reservation with invoice details');
        }
        
      } catch (invoiceError) {
        console.error('Error processing invoice:', invoiceError);
        // Continue with the function even if there's an issue with the invoice
        // The reservation has already been saved
      }
    } else {
        console.log('No invoice ID available, skipping invoice finalization and sending.');
    }
    
    // Return success response with reservation and invoice information
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Reservation saved successfully',
        paymentConfirmed: reservationToSave.paymentConfirmed,
        id: existingDocId || (docRef ? docRef.id : null),
        paymentIntent: {
          id: paymentIntent ? paymentIntent.id : paymentIntentId,
          status: paymentIntent ? paymentIntent.status : 'unknown'
        },
        invoice: invoiceResult
      }),
    };
    
  } catch (error) {
    console.error('Error processing reservation confirmation:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to process reservation confirmation',
        details: error.message 
      }),
    };
  }
};
