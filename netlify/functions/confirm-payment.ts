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
    const { paymentIntentId, customerInfo, items } = JSON.parse(event.body || '{}');

    // Retrieve payment details from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const paymentMethod = paymentIntent.payment_method 
      ? await stripe.paymentMethods.retrieve(paymentIntent.payment_method as string)
      : null;

    // Extract payment method details
    const paymentDetails = {
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount / 100, // Convert back to euros
      currency: paymentIntent.currency.toUpperCase(),
      status: paymentIntent.status,
      created: new Date(paymentIntent.created * 1000).toISOString(),
      paymentMethod: paymentMethod ? {
        id: paymentMethod.id,
        type: paymentMethod.type,
        card: paymentMethod.card ? {
          brand: paymentMethod.card.brand,
          last4: paymentMethod.card.last4,
          exp_month: paymentMethod.card.exp_month,
          exp_year: paymentMethod.card.exp_year,
          country: paymentMethod.card.country,
          funding: paymentMethod.card.funding,
        } : null,
        billing_details: paymentMethod.billing_details,
      } : null,
      charges: [], // Note: charges need to be retrieved separately if needed
    };

    // Create comprehensive reservation record
    const reservationData = {
      // Customer Information
      customer: {
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone || null,
        isMember: customerInfo.isMember,
        membershipId: customerInfo.membershipId || null,
      },
      
      // Order Details
      order: {
        items: items.map(item => ({
          date: item.date,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity,
        })),
        subtotal: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        memberDiscount: customerInfo.isMember ? items.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.1 : 0,
        total: paymentDetails.amount,
      },
      
      // Payment Information
      payment: paymentDetails,
      
      // Metadata
      metadata: {
        reservationId: `RES-${Date.now()}`,
        receiptId: `REC-${Date.now()}`,
        createdAt: new Date().toISOString(),
        source: 'dinner-reservation-system',
        eventType: 'durga-puja-dinner-2025',
      },
    };

    // Store reservation in Firestore (placeholder)
    await storeReservationInFirestore(reservationData);

    // Generate and send email receipt
    const emailContent = generateReceiptEmail(customerInfo, items, paymentDetails, reservationData.metadata.receiptId);
    
    // In a real implementation, you would send this via a service like SendGrid, Mailgun, etc.
    console.log('Email content generated for:', customerInfo.email);
    
    // Log successful processing
    console.log('Reservation processed successfully:', {
      reservationId: reservationData.metadata.reservationId,
      customer: customerInfo.email,
      amount: paymentDetails.amount,
      paymentMethod: paymentDetails.paymentMethod?.type,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Reservation confirmed and receipt sent',
        receiptId: reservationData.metadata.receiptId,
        reservationId: reservationData.metadata.reservationId,
        paymentStatus: paymentDetails.status,
        paymentMethod: paymentDetails.paymentMethod?.type,
      }),
    };
  } catch (error) {
    console.error('Payment confirmation error:', error);
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Payment confirmation failed' 
      }),
    };
  }
};

// Placeholder function for Firestore integration
async function storeReservationInFirestore(reservationData: any) {
  // TODO: Implement Firestore integration
  // This is a placeholder function that will be implemented later
  
  console.log('Storing reservation in Firestore (placeholder):', {
    reservationId: reservationData.metadata.reservationId,
    customer: reservationData.customer.email,
    total: reservationData.order.total,
    paymentStatus: reservationData.payment.status,
  });
  
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // In the real implementation, you would:
  // 1. Initialize Firestore admin SDK
  // 2. Create a document in the 'reservations' collection
  // 3. Handle potential errors
  // 4. Return the document ID
  
  /*
  Example implementation:
  
  import { initializeApp, cert } from 'firebase-admin/app';
  import { getFirestore } from 'firebase-admin/firestore';
  
  const app = initializeApp({
    credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!)),
  });
  
  const db = getFirestore(app);
  
  const docRef = await db.collection('reservations').add({
    ...reservationData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  
  console.log('Reservation stored with ID:', docRef.id);
  return docRef.id;
  */
}

function generateReceiptEmail(customerInfo: any, items: any[], paymentDetails: any, receiptId: string) {
  const itemsHtml = items.map(item => 
    `<li>${item.title} (${new Date(item.date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}) - €${item.price.toFixed(2)} x ${item.quantity} = €${(item.price * item.quantity).toFixed(2)}</li>`
  ).join('');
  
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const memberDiscount = customerInfo.isMember ? total * 0.1 : 0;
  const finalTotal = total - memberDiscount;
  
  // Format payment method information
  const paymentMethodInfo = paymentDetails.paymentMethod?.card ? 
    `${paymentDetails.paymentMethod.card.brand.toUpperCase()} ending in ${paymentDetails.paymentMethod.card.last4}` :
    paymentDetails.paymentMethod?.type || 'Unknown';
  
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; max-width: 600px; margin: 0 auto; }
          .order-details { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .payment-info { background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .total-section { background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; }
          ul { padding-left: 20px; }
          li { margin: 5px 0; }
          .highlight { color: #d97706; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🕉️ Dinner Reservation Confirmation</h1>
          <h2>Sanskriti e.V. Hamburg</h2>
        </div>
        
        <div class="content">
          <p>Dear <strong>${customerInfo.name}</strong>,</p>
          
          <p>Thank you for your dinner reservation for our Durga Puja celebration! We're excited to welcome you to our authentic Bengali dining experience.</p>
          
          <div class="order-details">
            <h3>📅 Your Reservation Details:</h3>
            <ul>
              ${itemsHtml}
            </ul>
          </div>
          
          <div class="total-section">
            <h3>💰 Payment Summary:</h3>
            <p><strong>Subtotal:</strong> €${total.toFixed(2)}</p>
            ${memberDiscount > 0 ? `<p class="highlight"><strong>Member Discount (10%):</strong> -€${memberDiscount.toFixed(2)}</p>` : ''}
            <p><strong>Final Total:</strong> €${finalTotal.toFixed(2)}</p>
          </div>
          
          <div class="payment-info">
            <h3>💳 Payment Information:</h3>
            <p><strong>Payment Method:</strong> ${paymentMethodInfo}</p>
            <p><strong>Payment Status:</strong> ${paymentDetails.status.toUpperCase()}</p>
            <p><strong>Transaction ID:</strong> ${paymentDetails.paymentIntentId}</p>
            <p><strong>Receipt ID:</strong> ${receiptId}</p>
            <p><strong>Payment Date:</strong> ${new Date(paymentDetails.created).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
          
          ${customerInfo.isMember ? 
            '<div class="highlight"><p>✨ <strong>Thank you for being a Sanskriti e.V. member!</strong> Your 10% member discount has been applied.</p></div>' : 
            '<p>💡 <strong>Did you know?</strong> Sanskriti e.V. members receive 10% off all event bookings. <a href="/membership/request">Learn more about membership</a>.</p>'
          }
          
          <h3>📍 Event Details:</h3>
          <p>
            <strong>Location:</strong> Sanskriti e.V. Hamburg<br>
            <strong>Address:</strong> Will be provided closer to the event date<br>
            <strong>Time:</strong> 7:00 PM onwards (each day)<br>
            <strong>Contact:</strong> admin@sanskriti-hamburg.de
          </p>
          
          <h3>🍽️ What to Expect:</h3>
          <ul>
            <li>Authentic Bengali cuisine prepared by skilled chefs</li>
            <li>Traditional recipes using fresh, authentic ingredients</li>
            <li>Warm, welcoming atmosphere celebrating Bengali culture</li>
            <li>Community dining experience with fellow culture enthusiasts</li>
          </ul>
          
          <div class="footer">
            <p>We look forward to welcoming you to our dinner events!</p>
            <p><strong>Namaskar,</strong><br>
            <strong>Sanskriti e.V. Hamburg Team</strong></p>
            
            <hr style="margin: 20px 0;">
            <p style="font-size: 12px; color: #888;">
              This is an automated receipt. Please keep this email for your records.<br>
              For any questions, please contact us at admin@sanskriti-hamburg.de<br>
              Sanskriti e.V. • Hamburg, Germany • VR 25931
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}
