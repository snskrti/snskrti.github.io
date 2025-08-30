import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from './clientApp';
import { MealReservation } from '../types/mealReservation';

/**
 * Save a meal reservation to Firestore
 * @param paymentIntentId The Stripe payment intent ID
 * @param reservationData The reservation data to save
 * @returns The Firestore document ID of the saved reservation
 */
export const saveMealReservationToFirestore = async (paymentIntentId: string, reservationData: any): Promise<string> => {
  console.log('💾 Starting to save reservation to Firestore');
  
  try {
    // First check if a reservation with this payment intent already exists
    const reservationsRef = collection(db, 'durga_puja_2025-mealReservations');
    const q = query(reservationsRef, where('paymentIntentId', '==', paymentIntentId));
    console.log('🔍 Checking if reservation already exists in Firestore');
    
    const existingReservations = await getDocs(q);
    
    if (!existingReservations.empty) {
      console.log(`✅ Reservation with paymentIntentId ${paymentIntentId} already exists in Firestore (${existingReservations.docs[0].id})`);
      return existingReservations.docs[0].id;
    }
    
    console.log('🆕 No existing reservation found, creating new document');
    
    // Create the reservation document with the proper type
    const reservationToSave: MealReservation = {
      ...reservationData,
      paymentIntentId,
      paymentStatus: 'succeeded',
      createdAt: serverTimestamp(),
      eventType: "Durga Puja 2025"
    };
    
    // Log the keys being saved
    console.log('📋 Saving reservation with keys:', Object.keys(reservationToSave));
    
    // Save to Firestore
    const docRef = await addDoc(collection(db, 'durga_puja_2025-mealReservations'), reservationToSave);
    console.log('✅ Reservation saved to Firestore with ID:', docRef.id);
    
    return docRef.id;
  } catch (error) {
    console.error('❌ Error saving reservation to Firestore:', error);
    throw error;
  }
};

/**
 * Check if a reservation exists with the given payment intent ID
 * @param paymentIntentId The Stripe payment intent ID to check
 * @returns Boolean indicating if the reservation exists
 */
export const checkReservationExists = async (paymentIntentId: string): Promise<boolean> => {
  try {
    const reservationsRef = collection(db, 'durga_puja_2025-mealReservations');
    const q = query(reservationsRef, where('paymentIntentId', '==', paymentIntentId));
    const existingReservations = await getDocs(q);
    
    return !existingReservations.empty;
  } catch (error) {
    console.error('Error checking if reservation exists:', error);
    return false;
  }
};
