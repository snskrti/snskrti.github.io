const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  // Enable CORS
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
    const { paymentIntentId } = JSON.parse(event.body);

    if (!paymentIntentId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Payment Intent ID is required' }),
      };
    }

    // Retrieve payment intent details
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ['invoice', 'customer']
    });

    // Try to find the invoice by metadata if it exists
    let invoice;
    if (paymentIntent.metadata && paymentIntent.metadata.invoiceId) {
      try {
        invoice = await stripe.invoices.retrieve(paymentIntent.metadata.invoiceId);
      } catch (err) {
        console.log('Invoice not found in metadata:', err);
      }
    }

    // Get customer info
    const customerName = paymentIntent.metadata?.customerName || 
                         paymentIntent.customer?.name || 
                         'Customer';
                         
    const customerEmail = paymentIntent.metadata?.customerEmail || 
                          paymentIntent.customer?.email || 
                          '';

    // Return relevant payment details
    const paymentDetails = {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
      created: paymentIntent.created,
      customerName,
      customerEmail,
      // Invoice details if available
      invoiceId: invoice?.id || paymentIntent.metadata?.invoiceId,
      invoiceNumber: invoice?.number || paymentIntent.metadata?.invoiceNumber,
      invoiceUrl: invoice?.hosted_invoice_url || paymentIntent.metadata?.invoiceUrl,
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
      body: JSON.stringify({ 
        error: 'Failed to retrieve payment details',
        details: error.message 
      }),
    };
  }
};
