// src/pages/ReservationList.tsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/clientApp';
import { MealReservation } from 'types/src/mealReservation';

const ReservationList: React.FC = () => {
  const [reservations, setReservations] = useState<MealReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchReservations() {
      try {
        const reservationsCollection = collection(db, 'durga_puja_2025-mealReservations');
        const reservationsSnapshot = await getDocs(reservationsCollection);
        const reservationsList = reservationsSnapshot.docs.map(doc => doc.data() as MealReservation);
        setReservations(reservationsList);
      } catch (err) {
        console.error('Error fetching reservations:', err);
        setError('Failed to fetch reservations. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchReservations();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Durga Puja 2025 - Meal Reservations</h1>
      
      {reservations.length === 0 ? (
        <p className="text-gray-500">No reservations found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b border-r">Customer Name</th>
              <th className="py-2 px-4 border-b border-r">Email</th>
              <th className="py-2 px-4 border-b border-r">Member</th>
              <th className="py-2 px-4 border-b border-r">Selected Items</th>
              <th className="py-2 px-4 border-b border-r">Total Amount</th>
              <th className="py-2 px-4 border-b border-r">Payment Status</th>
              <th className="py-2 px-4 border-b border-r">Event Type</th>
              <th className="py-2 px-4 border-b">Created At</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-2 px-4 border-b border-r">{reservation.customerInfo.name}</td>
                <td className="py-2 px-4 border-b border-r">{reservation.customerInfo.email}</td>
                <td className="py-2 px-4 border-b border-r">{reservation.customerInfo.isMember ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4 border-b border-r">
                  <ul className="list-disc pl-5">
                    {Object.entries(reservation.selectedItems).map(([itemId, details]) => (
                      <li key={itemId}>
                        {itemId}: {details.quantity} x {details.ageGroup} (${details.price})
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="py-2 px-4 border-b border-r">${reservation.totalAmount}</td>
                <td className="py-2 px-4 border-b border-r">
                  {reservation.paymentStatus || 'N/A'}
                </td>
                <td className="py-2 px-4 border-b border-r">{reservation.eventType || 'N/A'}</td>
                <td className="py-2 px-4 border-b">
                  {reservation.createdAt 
                    ? new Date(reservation.createdAt.seconds * 1000).toLocaleString() 
                    : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReservationList;