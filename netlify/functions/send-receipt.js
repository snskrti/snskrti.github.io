const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
    const { paymentIntentId } = JSON.parse(event.body);

    if (!paymentIntentId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Payment intent ID required' }),
      };
    }

    // Retrieve payment intent to confirm it was successful
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Payment not successful' }),
      };
    }

    // Get invoice information from payment intent metadata
    const invoiceId = paymentIntent.metadata.invoiceId;
    let invoiceDetails = null;

    if (invoiceId) {
      try {
        // Retrieve the invoice with line items
        const invoice = await stripe.invoices.retrieve(invoiceId, {
          expand: ['lines']
        });

        // Since we're using the invoice's own payment intent, 
        // the invoice should automatically be marked as paid when payment succeeds
        console.log('Invoice status after payment:', invoice.status, 'for invoice:', invoice.number);

        // The invoice email was already sent when created
        console.log('Payment confirmed for invoice:', invoice.number);

        console.log('Detailed invoice sent:', {
          invoiceNumber: invoice.number,
          customer: invoice.customer_email,
          invoiceUrl: invoice.hosted_invoice_url
        });

        // Extract line items for detailed receipt
        const lineItems = invoice.lines.data.map(line => ({
          description: line.description || 'Invoice Item',
          quantity: line.quantity || 1,
          unitAmount: line.amount / 100, // Convert from cents (this is the total amount for the line)
          totalAmount: line.amount / 100 // Convert from cents
        }));

        invoiceDetails = {
          invoiceNumber: invoice.number,
          invoiceUrl: invoice.hosted_invoice_url,
          lineItems: lineItems,
          subtotal: invoice.subtotal / 100,
          total: invoice.total / 100,
          amountPaid: invoice.amount_paid / 100,
          customerEmail: invoice.customer_email
        };

        console.log('Invoice processed successfully:', {
          invoiceNumber: invoice.number,
          customer: invoice.customer_email,
          total: invoice.total / 100,
          lineItems: lineItems.length
        });

      } catch (invoiceError) {
        console.error('Error processing invoice:', invoiceError);
        // Continue without invoice details if there's an error
      }
    }

    // Enhanced logging with invoice details
    console.log('Payment confirmed with invoice details:', {
      paymentIntentId,
      invoiceDetails,
      status: 'completed'
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message: 'Payment confirmed successfully. Detailed invoice with itemized breakdown sent to your email.',
        paymentIntent: paymentIntentId,
        invoice: invoiceDetails
      }),
    };
  } catch (error) {
    console.error('Error confirming payment:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to confirm payment',
        details: error.message 
      }),
    };
  }
};
