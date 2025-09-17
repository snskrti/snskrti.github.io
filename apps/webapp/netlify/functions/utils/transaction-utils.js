/**
 * Utility functions for handling Firestore transactions and preventing duplicate records
 */

/**
 * Creates a reservation document using Firestore transaction to prevent duplicates
 * @param {FirebaseFirestore.Firestore} db - Firestore database instance
 * @param {string} paymentIntentId - Stripe payment intent ID
 * @param {Object} reservationData - The reservation data to save
 * @returns {Promise<string>} - The document ID
 */
async function createReservationWithTransaction(db, paymentIntentId, reservationData) {
  // Reference to a potential lock document
  const lockRef = db.collection('transactionLocks').doc(paymentIntentId);
  
  try {
    // Attempt to create a lock
    await db.runTransaction(async (transaction) => {
      // Check if a reservation already exists
      const reservationsQuery = db.collection('durga_puja_2025-mealReservations')
        .where('paymentIntentId', '==', paymentIntentId);
      
      const reservationSnapshot = await transaction.get(reservationsQuery);
      
      if (!reservationSnapshot.empty) {
        // Reservation already exists, return early
        return reservationSnapshot.docs[0].id;
      }
      
      // Check if there's a lock
      const lockDoc = await transaction.get(lockRef);
      
      if (lockDoc.exists) {
        // Lock exists and is valid, another process is handling this
        const lockData = lockDoc.data();
        
        if (lockData.expiresAt > Date.now()) {
          throw new Error('Transaction is locked by another process');
        }
      }
      
      // Create or update the lock
      transaction.set(lockRef, {
        createdAt: Date.now(),
        expiresAt: Date.now() + 30000, // 30 seconds lock
        status: 'processing'
      });
      
      // Now add the actual reservation
      const newReservationRef = db.collection('durga_puja_2025-mealReservations').doc();
      transaction.set(newReservationRef, reservationData);
      
      return newReservationRef.id;
    });
    
    // After transaction completes, cleanup the lock
    await lockRef.delete();
    
    return true;
  } catch (error) {
    console.error('Transaction failed:', error);
    
    // Still try to clean up the lock
    try {
      await lockRef.delete();
    } catch (cleanupError) {
      console.error('Failed to clean up lock:', cleanupError);
    }
    
    throw error;
  }
}

module.exports = {
  createReservationWithTransaction
};
