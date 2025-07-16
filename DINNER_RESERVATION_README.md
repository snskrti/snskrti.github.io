# Dinner Reservation System - Sanskriti e.V.

## Overview

This is a complete dinner reservation checkout flow for Sanskriti e.V.'s Durga Puja celebration (September 28 - October 1, 2025). The system allows guests to:

- Browse dinner options for each date with different menus and pricing
- Select multiple dates and quantities
- Apply member discounts (10% off)
- Enter personal information
- Complete secure payment via Stripe
- Receive payment confirmation and email receipt

## Features

### Frontend Features

- **Date Selection**: Choose from 4 different dinner dates (Sep 28 - Oct 1)
- **Menu Display**: Each date has a unique menu with authentic Bengali dishes
- **Dynamic Pricing**: Different prices for each date, with member discounts
- **Shopping Cart**: Add/remove items, adjust quantities
- **Member Benefits**: 10% discount for Sanskriti e.V. members
- **Secure Checkout**: Stripe Elements integration
- **Receipt Generation**: Payment confirmation and email receipt

### Backend Features (Netlify Functions)

- **Payment Processing**: Stripe Payment Intents API
- **Order Management**: Handle reservations and confirmations
- **Email Notifications**: Receipt generation and sending
- **CORS Support**: Proper cross-origin resource sharing

## Technical Stack

### Frontend

- **React 18** with TypeScript
- **@stripe/react-stripe-js** for payment processing
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Router** for navigation

### Backend

- **Netlify Functions** (serverless)
- **Stripe API** for payment processing
- **Node.js** runtime

## Setup Instructions

### 1. Install Dependencies

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js stripe @netlify/functions
```

### 2. Environment Variables

Create a `.env` file in your project root:

```env
# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# React App Environment Variables
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

### 3. Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Get your test API keys from the Stripe dashboard
3. Replace the placeholder keys in your `.env` file
4. For production, use live keys

### 4. Netlify Configuration

The `netlify.toml` file is already configured to:

- Build the React app
- Deploy Netlify Functions
- Handle routing

### 5. Deploy to Netlify

1. Connect your repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy the application

## File Structure

```
src/
├── components/
│   └── DinnerReservation/
│       ├── DinnerCheckout.tsx          # Payment form and checkout
│       └── DinnerReservationBanner.tsx # Homepage banner
├── pages/
│   └── events/
│       └── DinnerReservation.tsx       # Main reservation page
├── types/
│   └── dinnerReservation.ts           # TypeScript interfaces
└── ...

netlify/
└── functions/
    ├── create-payment-intent.js       # Creates Stripe payment intent
    └── confirm-payment.js             # Handles payment confirmation
```

## Usage Flow

### 1. Menu Selection

- Users browse 4 different dinner dates
- Each date has unique menu and pricing
- Users can add items to cart with quantities

### 2. Member Discount

- Toggle for Sanskriti e.V. members
- Automatically applies 10% discount
- Prices update in real-time

### 3. Checkout Process

- Enter customer information (name, email, phone)
- Review order summary
- Enter payment details via Stripe Elements
- Process secure payment

### 4. Confirmation

- Payment success page
- Email receipt sent automatically
- Unique receipt ID generated

## Dinner Options

### September 28 - Traditional Bengali Feast (€25.00 / €22.50 members)

- Shorshe Ilish (Hilsa in Mustard)
- Chingri Malai Curry (Prawns in Coconut)
- Begun Bhaja (Fried Eggplant)
- Dal with Ghee, Steamed Rice
- Mishti Doi, Rasgulla

### September 29 - Durga Puja Special (€20.00 / €18.00 members)

- Khichuri (Mixed Rice and Lentils)
- Labra (Mixed Vegetable Curry)
- Tomato Chatni, Papad
- Payesh, Sandesh, Narkel Naru

### September 30 - Vegetarian Delights (€22.00 / €19.80 members)

- Aloo Posto (Potatoes with Poppy Seeds)
- Shukto (Bitter Gourd Curry)
- Dhokar Dalna (Lentil Cake Curry)
- Bhapa Chingri, Jeera Rice
- Aam Doi, Pantua

### October 1 - Grand Finale Buffet (€30.00 / €27.00 members)

- Mutton Curry, Fish Curry, Chicken Kosha
- Mixed Vegetables, Pulao Rice
- Luchi, Chutney Selection
- Assorted Sweets

## Security Features

- **Stripe Integration**: Industry-standard payment processing
- **No Card Storage**: Card details never touch your servers
- **HTTPS Only**: All communications encrypted
- **Environment Variables**: Sensitive keys stored securely
- **CORS Protection**: Proper cross-origin handling

## Customization

### Adding New Dates

Edit `src/types/dinnerReservation.ts` to add new dinner options:

```typescript
export const dinnerOptions: DinnerOption[] = [
  {
    date: "2025-10-02",
    title: "New Dinner Option",
    description: "Description here",
    menu: ["Item 1", "Item 2"],
    price: 25.0,
    memberPrice: 22.5,
    availableSlots: 50,
  },
  // ... existing options
];
```

### Modifying Pricing

- Regular prices in `price` field
- Member prices in `memberPrice` field
- Discount calculation is automatic (10%)

### Email Templates

Modify the email template in `netlify/functions/confirm-payment.js`:

```javascript
function generateReceiptEmail(customerInfo, items) {
  // Customize email content here
}
```

## Testing

### Test Card Numbers (Stripe)

- **Successful payment**: 4242 4242 4242 4242
- **Declined payment**: 4000 0000 0000 0002
- **Requires authentication**: 4000 0025 0000 3155

Use any future expiry date and any 3-digit CVC.

## Deployment Notes

### Environment Variables in Netlify

1. Go to Site Settings → Environment Variables
2. Add all required variables
3. Redeploy the site

### Custom Domain

If using a custom domain, update the CORS headers in the Netlify Functions if needed.

## Support

For issues or questions:

- Check Stripe documentation: https://stripe.com/docs
- Check Netlify Functions docs: https://docs.netlify.com/functions/
- Contact: admin@sanskriti-hamburg.de

## License

This project is proprietary to Sanskriti e.V. Hamburg.
