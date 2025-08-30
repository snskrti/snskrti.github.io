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
  try {
    // First check if a reservation with this payment intent already exists
    const reservationsRef = collection(db, 'durga_puja_2025-mealReservations');
    const q = query(reservationsRef, where('paymentIntentId', '==', paymentIntentId));
    
    const existingReservations = await getDocs(q);
    
    if (!existingReservations.empty) {
      return existingReservations.docs[0].id;
    }
    
    // Create the reservation document with the proper type
    const reservationToSave: MealReservation = {
      ...reservationData,
      paymentIntentId,
      paymentStatus: 'succeeded',
      createdAt: serverTimestamp(),
      eventType: "Durga Puja 2025"
    };
    
    // Save to Firestore
    const docRef = await addDoc(collection(db, 'durga_puja_2025-mealReservations'), reservationToSave);
    
    return docRef.id;
  } catch (error) {
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
    // Error handling for reservation check
    return false;
  }
};
