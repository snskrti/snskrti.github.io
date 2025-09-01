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
    const { amount, currency = 'eur', customerInfo, reservationData, description = 'Food - Durga Puja 2025(Sanskriti eV)' } = JSON.parse(event.body);

    console.log("reservation data: " + JSON.stringify(reservationData));

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
    
    // Track Anandamela attendees separately
    const anandamelaAttendees = {
      adult: 0,
      child: 0,
      infant: 0,
      total: 0
    };
    
    if (reservationData && reservationData.selectedItems) {
      Object.entries(reservationData.selectedItems).forEach(([itemId, itemDetails]) => {
        if (itemDetails.quantity === 0) return;
        
        // Handle Anandamela attendance separately
        if (itemId.includes('anandamela')) {
          const ageGroup = itemId.split('-')[1] || 'adult';
          anandamelaAttendees[ageGroup] += itemDetails.quantity;
          anandamelaAttendees.total += itemDetails.quantity;
          return; // Skip adding to line items as these are free
        }
        
        // Parse item details
        const isVeg = itemId.includes('veg-') && !itemId.includes('nonveg');
        const dayNumber = itemId.match(/day(\d+)/)?.[1];
        const thaliType = isVeg ? 'Vegetarian Thali' : 'Non-Vegetarian Thali';
        
        // Get the age group
        const ageGroup = itemDetails.ageGroup || 'adult';
        let ageGroupDisplay = 'Adult (12+ years)';
        if (ageGroup === 'child') ageGroupDisplay = 'Child (8-12 years)';
        if (ageGroup === 'infant') ageGroupDisplay = 'Infant (0-8 years)';
        
        // Get date based on day number
        let dateDisplay = '';
        let unitPrice = 0;
        switch(dayNumber) {
          case '1': 
            dateDisplay = 'September 28, 2025 (Shashti)'; 
            break;
          case '2': 
            dateDisplay = 'September 29, 2025 (Saptami)'; 
            break;
          case '3': 
            dateDisplay = 'September 30, 2025 (Ashtami)'; 
            break;
          default: 
            dateDisplay = 'TBD';
        }
        
        // Set the price
        unitPrice = itemDetails.price;

        lineItems.push({
          description: `${thaliType} - ${dateDisplay} - ${ageGroupDisplay}`,
          quantity: itemDetails.quantity,
          unitPrice: unitPrice,
        });
      });
    }
    
    // Add Anandamela attendance as a free item if there are attendees
    if (anandamelaAttendees.total > 0) {
      const attendeeDetails = [];
      if (anandamelaAttendees.adult > 0) attendeeDetails.push(`${anandamelaAttendees.adult} Adult`);
      if (anandamelaAttendees.child > 0) attendeeDetails.push(`${anandamelaAttendees.child} Child`);
      if (anandamelaAttendees.infant > 0) attendeeDetails.push(`${anandamelaAttendees.infant} Infant`);
      
      lineItems.push({
        description: `Anandamela Attendance - October 1, 2025 (Navami) - ${attendeeDetails.join(', ')}`,
        quantity: 1,
        unitPrice: 0,
      });
    }

    // Create invoice - use collection_method: 'charge_automatically' instead of 'send_invoice'
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      auto_advance: false, // Don't auto-finalize
      collection_method: 'charge_automatically', // This allows automatic payment
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
        description: 'Member Discount (5%)',
        amount: -Math.round(memberDiscountAmount * 100), // Negative amount in cents
        currency: 'eur',
      });
    }

    // Set payment_settings on the invoice to enable automatic payment methods
    await stripe.invoices.update(invoice.id, {
      payment_settings: {
        payment_method_options: {
          card: {
            request_three_d_secure: 'automatic'
          }
        }
      },
      description: description || `Durga Puja 2025 Meal Reservation for ${customerInfo.name}`,
      metadata: {
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        isMember: customerInfo.isMember.toString(),
        event: 'Durga Puja 2025 - Meal Reservation',
        reservationDetails: 'Food reservation for Durga Puja 2025'
      }
    });

    // Finalize the invoice - this automatically creates a PaymentIntent
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);
    
    // Retrieve the invoice with expanded confirmation_secret to get PaymentIntent details
    const retrievedInvoice = await stripe.invoices.retrieve(finalizedInvoice.id, {
      expand: ['payment_intent', 'confirmation_secret']
    });
    
    // Get the PaymentIntent client_secret from the invoice
    const paymentIntentClientSecret = retrievedInvoice.confirmation_secret?.client_secret;
    const paymentIntentId = retrievedInvoice.payment_intent?.id;
    
    if (!paymentIntentClientSecret || !paymentIntentId) {
      console.error('Missing payment information:', {
        hasClientSecret: !!paymentIntentClientSecret,
        hasPaymentIntentId: !!paymentIntentId,
        invoiceId: finalizedInvoice.id
      });
      throw new Error('Could not retrieve complete payment information from the finalized invoice');
    }
    
    console.log(`Invoice ${finalizedInvoice.id} finalized with payment intent ${paymentIntentId}`);
    
    // Try to directly pay the invoice if the customer already has a payment method
    try {
      const paymentMethods = await stripe.customers.listPaymentMethods(
        customer.id,
        {limit: 5}
      );
      
      if (paymentMethods.data.length > 0) {
        // Try to pay with the most recently added payment method
        await stripe.invoices.pay(finalizedInvoice.id, {
          payment_method: paymentMethods.data[0].id,
          off_session: true
        });
        console.log(`Successfully paid invoice ${finalizedInvoice.id} with existing payment method`);
      } else {
        console.log('No existing payment method found. Invoice will be paid through frontend payment flow');
      }
    } catch (payError) {
      // This is expected to fail if the customer doesn't have a payment method
      // The actual payment will happen through the frontend Stripe Elements
      console.log('Invoice will be paid through frontend payment flow:', payError.message);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        clientSecret: paymentIntentClientSecret,
        paymentIntentId: paymentIntentId,
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
