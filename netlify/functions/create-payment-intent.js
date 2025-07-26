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
    const { amount, currency = 'eur', customerInfo, reservationData } = JSON.parse(event.body);

    if (!amount || amount <= 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid amount' }),
      };
    }

    if (!customerInfo || !customerInfo.email || !customerInfo.name) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Customer information required' }),
      };
    }

    // Create or retrieve customer
    let customer;
    const existingCustomers = await stripe.customers.list({
      email: customerInfo.email,
      limit: 1
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: customerInfo.email,
        name: customerInfo.name,
        metadata: {
          isMember: customerInfo.isMember.toString(),
          event: 'Durga Puja 2025'
        }
      });
    }

    // Create line items from reservation data
    const lineItems = [];
    const isMember = customerInfo.isMember;
    const memberDiscountAmount = reservationData.discountAmount || 0;
    
    if (reservationData && reservationData.selectedItems) {
      Object.entries(reservationData.selectedItems).forEach(([itemId, quantity]) => {
        if (quantity > 0) {
          // Parse item details
          const isVeg = itemId.includes('veg-') && !itemId.includes('nonveg');
          const dayNumber = itemId.match(/day(\d+)/)?.[1];
          const thaliType = isVeg ? 'Vegetarian Thali' : 'Non-Vegetarian Thali';
          
          // Get date and price based on day number
          let dateDisplay = '';
          let unitPrice = 0;
          switch(dayNumber) {
            case '1': 
              dateDisplay = 'September 28, 2025 (Shashti)'; 
              unitPrice = isVeg ? 10.00 : 14.00;
              break;
            case '2': 
              dateDisplay = 'September 29, 2025 (Saptami)'; 
              unitPrice = isVeg ? 12.00 : 16.00;
              break;
            case '3': 
              dateDisplay = 'September 30, 2025 (Ashtami)'; 
              unitPrice = isVeg ? 14.00 : 18.00;
              break;
            default: 
              dateDisplay = 'TBD';
              unitPrice = isVeg ? 12.00 : 16.00;
          }

          lineItems.push({
            description: `${thaliType} - ${dateDisplay}`,
            quantity: quantity,
            unitPrice: unitPrice,
          });
        }
      });
    }

    // Create invoice
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      auto_advance: false, // Don't auto-finalize
      collection_method: 'send_invoice',
      days_until_due: 1,
      metadata: {
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        isMember: customerInfo.isMember.toString(),
        event: 'Durga Puja 2025 - Meal Reservation',
        memberDiscount: reservationData.discountAmount?.toString() || '0',
        originalTotal: reservationData.totalAmount?.toString() || amount.toString(),
      },
      description: `Durga Puja 2025 Meal Reservation for ${customerInfo.name}`,
    });

    // Add line items to the invoice
    for (const item of lineItems) {
      await stripe.invoiceItems.create({
        customer: customer.id,
        invoice: invoice.id,
        description: `${item.quantity}x ${item.description}`,
        amount: Math.round(item.unitPrice * item.quantity * 100), // Total amount in cents (unit price * quantity)
        currency: 'eur',
      });
    }

    // Add member discount as a negative line item if applicable
    if (isMember && memberDiscountAmount > 0) {
      await stripe.invoiceItems.create({
        customer: customer.id,
        invoice: invoice.id,
        description: 'Member Discount (20%)',
        amount: -Math.round(memberDiscountAmount * 100), // Negative amount in cents
        currency: 'eur',
      });
    }

    // Finalize the invoice
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    // Create payment intent from the invoice
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      customer: customer.id,
      metadata: {
        invoiceId: finalizedInvoice.id,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        isMember: customerInfo.isMember.toString(),
        event: 'Durga Puja 2025 - Meal Reservation',
      },
      // Remove receipt_email to prevent generic receipt, we'll send detailed invoice instead
      description: `Durga Puja 2025 Meal Reservation - See detailed invoice ${finalizedInvoice.number}`,
      statement_descriptor_suffix: 'DURGA PUJA', // Limited to 22 characters for card payments
      shipping: {
        address: {
          line1: 'Event Venue TBD',
          city: 'Hamburg',
          country: 'DE',
        },
        name: customerInfo.name,
      },
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        invoiceId: finalizedInvoice.id,
        invoiceNumber: finalizedInvoice.number,
        invoiceUrl: finalizedInvoice.hosted_invoice_url,
      }),
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to create payment intent',
        details: error.message 
      }),
    };
  }
};
