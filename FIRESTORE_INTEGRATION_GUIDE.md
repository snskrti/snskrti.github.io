# Firestore Integration Guide for Dinner Reservations

## Overview

This guide explains how to integrate Google Firestore with the dinner reservation system to store payment details and reservation information.

## Current Implementation

The payment confirmation function (`confirm-payment.js`) already includes:

- ✅ Complete payment method recording
- ✅ Comprehensive reservation data structure
- ✅ Placeholder function for Firestore integration
- ✅ Enhanced email receipts with payment details

## Payment Method Details Recorded

### Customer Information

```javascript
customer: {
  name: string,
  email: string,
  phone: string | null,
  isMember: boolean,
  membershipId: string | null,
}
```

### Payment Details

```javascript
payment: {
  paymentIntentId: string,
  amount: number,
  currency: string,
  status: string,
  created: string (ISO date),
  paymentMethod: {
    id: string,
    type: string,
    card: {
      brand: string,
      last4: string,
      exp_month: number,
      exp_year: number,
      country: string,
      funding: string,
    },
    billing_details: object,
  }
}
```

### Order Information

```javascript
order: {
  items: [{
    date: string,
    title: string,
    price: number,
    quantity: number,
    total: number,
  }],
  subtotal: number,
  memberDiscount: number,
  total: number,
}
```

### Metadata

```javascript
metadata: {
  reservationId: string,
  receiptId: string,
  createdAt: string (ISO date),
  source: 'dinner-reservation-system',
  eventType: 'durga-puja-dinner-2025',
}
```

## Firestore Setup Steps

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Enable Firestore Database
4. Set up authentication and security rules

### 2. Install Firebase Admin SDK

```bash
npm install firebase-admin
```

### 3. Generate Service Account Key

1. Go to Project Settings → Service Accounts
2. Generate new private key
3. Download the JSON file
4. Add to environment variables

### 4. Environment Variables

Add to `.env` and Netlify environment:

```env
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account"...}
```

## Implementation Code

### Replace the placeholder function in `confirm-payment.js`:

```javascript
const admin = require("firebase-admin");

// Initialize Firebase Admin (do this once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    ),
  });
}

const db = admin.firestore();

async function storeReservationInFirestore(reservationData) {
  try {
    // Create reservation document
    const docRef = await db.collection("reservations").add({
      ...reservationData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log("Reservation stored with ID:", docRef.id);

    // Also store in payment history for analytics
    await db.collection("payments").add({
      reservationId: reservationData.metadata.reservationId,
      paymentIntentId: reservationData.payment.paymentIntentId,
      amount: reservationData.payment.amount,
      currency: reservationData.payment.currency,
      status: reservationData.payment.status,
      paymentMethod: reservationData.payment.paymentMethod,
      customerEmail: reservationData.customer.email,
      eventType: reservationData.metadata.eventType,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error storing reservation:", error);
    throw error;
  }
}
```

## Firestore Security Rules

```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only allow server-side writes to reservations
    match /reservations/{document} {
      allow read, write: if false; // Server-side only
    }

    match /payments/{document} {
      allow read, write: if false; // Server-side only
    }

    // Allow admins to read reservation data
    match /reservations/{document} {
      allow read: if request.auth != null &&
                     request.auth.token.admin == true;
    }
  }
}
```

## Data Structure in Firestore

### Collections

#### `reservations` Collection

- Document ID: Auto-generated
- Contains: Complete reservation data
- Used for: Order management, customer service

#### `payments` Collection

- Document ID: Auto-generated
- Contains: Payment-specific data
- Used for: Financial reporting, analytics

#### `customers` Collection (Optional)

- Document ID: Email address
- Contains: Customer profile data
- Used for: Customer management, marketing

## Admin Dashboard Queries

### Get all reservations for a specific date

```javascript
const reservations = await db
  .collection("reservations")
  .where("order.items", "array-contains-any", [{ date: "2025-09-28" }])
  .get();
```

### Get payment analytics

```javascript
const payments = await db
  .collection("payments")
  .where("eventType", "==", "durga-puja-dinner-2025")
  .where("status", "==", "succeeded")
  .get();
```

### Get member vs non-member statistics

```javascript
const memberPayments = await db
  .collection("reservations")
  .where("customer.isMember", "==", true)
  .get();
```

## Error Handling

```javascript
async function storeReservationInFirestore(reservationData) {
  const maxRetries = 3;
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      const docRef = await db.collection("reservations").add({
        ...reservationData,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return docRef.id;
    } catch (error) {
      retryCount++;
      console.error(`Attempt ${retryCount} failed:`, error);

      if (retryCount >= maxRetries) {
        // Send alert to admin
        throw new Error("Failed to store reservation after multiple attempts");
      }

      // Wait before retry
      await new Promise((resolve) => setTimeout(resolve, 1000 * retryCount));
    }
  }
}
```

## Testing

### Test Firestore Connection

```javascript
// Add to confirm-payment.js for testing
async function testFirestoreConnection() {
  try {
    const testDoc = await db.collection("test").add({
      message: "Firestore connection successful",
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log("Test document created:", testDoc.id);

    // Clean up
    await db.collection("test").doc(testDoc.id).delete();
    return true;
  } catch (error) {
    console.error("Firestore connection failed:", error);
    return false;
  }
}
```

## Migration Strategy

1. **Phase 1**: Test with placeholder function (current)
2. **Phase 2**: Set up Firebase project and test connection
3. **Phase 3**: Implement Firestore storage alongside logging
4. **Phase 4**: Full migration with error handling
5. **Phase 5**: Build admin dashboard for data management

## Benefits of Firestore Integration

### For Business

- **Real-time analytics** on reservations and payments
- **Customer insights** and booking patterns
- **Inventory management** for available slots
- **Revenue tracking** and financial reporting

### For Operations

- **Automated confirmations** and reminders
- **Customer service** tools with booking history
- **Backup and recovery** of reservation data
- **Compliance** with data retention policies

### For Development

- **Scalable architecture** for future events
- **Real-time updates** for admin dashboard
- **Structured data** for reporting and analytics
- **Integration** with other Google services

## Security Considerations

1. **Service Account Security**: Store credentials securely
2. **Data Encryption**: Firestore encrypts data at rest
3. **Access Control**: Use security rules and IAM
4. **Audit Logging**: Enable Firebase audit logs
5. **Data Retention**: Set up automatic cleanup rules

## Next Steps

1. Set up Firebase project
2. Configure environment variables
3. Test connection with placeholder data
4. Implement full integration
5. Build admin dashboard for reservation management

This implementation will provide a robust, scalable solution for storing and managing dinner reservation data with comprehensive payment method tracking.
