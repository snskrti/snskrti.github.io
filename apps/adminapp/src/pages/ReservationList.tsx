// src/pages/ReservationList.tsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/clientApp';
import { MealReservation } from 'types/src/mealReservation';
import ReservationSummary from '../components/ReservationSummary';
import DebugDataView from '../components/DebugDataView';

// Day mapping constants
const DAY_MAPPING: Record<string, string> = {
  '1': 'Sep 28',
  '2': 'Sep 29',
  '3': 'Sep 30'
};

// Helper function to parse item ID
const parseItemId = (itemId: string) => {
  // First, try to parse in the expected format: "veg-1-adult"
  const parts = itemId.split('-');
  if (parts.length >= 3) {
    const result = {
      mealType: parts[0], // 'veg' or 'nonveg'
      day: parts[1],      // '1', '2', or '3'
      ageGroup: parts[2]  // 'adult', 'child', or 'infant'
    };
    return result;
  }
  
  // Try to parse as JSON if it's a JSON string
  try {
    const parsedJson = JSON.parse(itemId);
    if (parsedJson && parsedJson.mealType && parsedJson.day && parsedJson.ageGroup) {
      const dayValue = parsedJson.day.toString().replace(/^day/i, '');
      const result = {
        mealType: parsedJson.mealType,
        day: dayValue,
        ageGroup: parsedJson.ageGroup
      };
      return result;
    }
  } catch (e) {
    // Not a valid JSON string, continue with other parsing attempts
  }
  
  // Try to extract patterns if the itemId is in a different format
  const mealTypeMatch = itemId.match(/(veg|nonveg)/i);
  const dayMatch = itemId.match(/day(\d+)|(\d+)/i);
  const ageGroupMatch = itemId.match(/(adult|child|infant)/i);
  
  if (mealTypeMatch && dayMatch && ageGroupMatch) {
    const mealType = mealTypeMatch[0].toLowerCase() === 'nonveg' ? 'nonveg' : 'veg';
    // Extract the day number, removing any 'day' prefix
    const day = (dayMatch[1] || dayMatch[2]).toString();
    const ageGroup = ageGroupMatch[0].toLowerCase();
    
    const result = { mealType, day, ageGroup: ageGroup as 'adult' | 'child' | 'infant' };
    return result;
  }
  
  return null;
};

// Function to organize meal data by day
const organizeMealsByDay = (selectedItems: Record<string, any>) => {
  const mealsByDay: Record<string, Record<string, Record<string, number>>> = {
    '1': { veg: { adult: 0, child: 0, infant: 0 }, nonveg: { adult: 0, child: 0, infant: 0 } },
    '2': { veg: { adult: 0, child: 0, infant: 0 }, nonveg: { adult: 0, child: 0, infant: 0 } },
    '3': { veg: { adult: 0, child: 0, infant: 0 }, nonveg: { adult: 0, child: 0, infant: 0 } }
  };

  // If selectedItems is empty or undefined, return default structure
  if (!selectedItems || Object.keys(selectedItems).length === 0) {
    return mealsByDay;
  }

  Object.entries(selectedItems).forEach(([itemId, details]) => {
    const parsedItem = parseItemId(itemId);
    if (!parsedItem) {
      return; // Skip this item
    }
    
    // Clean up the day value (remove any 'day' prefix)
    const dayValue = parsedItem.day.toString().replace(/^day/i, '');
    
    const { mealType, ageGroup } = parsedItem;
    
    // Check if this is a valid day, meal type, and age group
    if (dayValue in mealsByDay && 
        (mealType === 'veg' || mealType === 'nonveg') && 
        (ageGroup === 'adult' || ageGroup === 'child' || ageGroup === 'infant')) {
      
      // Get the quantity from the details
      const quantity = details.quantity || 0;
      mealsByDay[dayValue][mealType][ageGroup] += quantity;
    }
  });

  return mealsByDay;
};

const ReservationList: React.FC = () => {
  const [reservations, setReservations] = useState<MealReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const reservationsCollection = collection(db, 'durga_puja_2025-mealReservations');
        const reservationsSnapshot = await getDocs(reservationsCollection);
        const reservationsList = reservationsSnapshot.docs.map(doc => {
          const data = doc.data() as MealReservation;
          return data;
        });
        setReservations(reservationsList);
      } catch (err) {
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Durga Puja 2025 - Meal Reservations</h1>
        <button 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
          onClick={() => setShowDebug(!showDebug)}
        >
          {showDebug ? 'Hide Debug Info' : 'Show Debug Info'}
        </button>
      </div>
      
      {showDebug && <DebugDataView reservations={reservations} />}
      
      {reservations.length === 0 ? (
        <p className="text-gray-500">No reservations found.</p>
      ) : (
        <>
          <ReservationSummary reservations={reservations} />
          
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b border-r">Customer Name</th>
                <th className="py-2 px-4 border-b border-r">Email</th>
                <th className="py-2 px-4 border-b border-r">Total Amount</th>
                
                {/* Day 1 */}
                <th className="py-2 px-4 border-b border-r text-center" colSpan={6}>
                  Day 1 - {DAY_MAPPING['1']}
                </th>
                
                {/* Day 2 */}
                <th className="py-2 px-4 border-b border-r text-center" colSpan={6}>
                  Day 2 - {DAY_MAPPING['2']}
                </th>
                
                {/* Day 3 */}
                <th className="py-2 px-4 border-b border-r text-center" colSpan={6}>
                  Day 3 - {DAY_MAPPING['3']}
                </th>
                
                <th className="py-2 px-4 border-b border-r">Payment Status</th>
                <th className="py-2 px-4 border-b">Created At</th>
              </tr>
              <tr className="bg-gray-50">
                <th className="py-2 px-4 border-b border-r"></th>
                <th className="py-2 px-4 border-b border-r"></th>
                <th className="py-2 px-4 border-b border-r"></th>
                
                {/* Day 1 Details */}
                <th className="py-2 px-4 border-b border-r text-center" colSpan={3}>Veg</th>
                <th className="py-2 px-4 border-b border-r text-center" colSpan={3}>Non-Veg</th>
                
                {/* Day 2 Details */}
                <th className="py-2 px-4 border-b border-r text-center" colSpan={3}>Veg</th>
                <th className="py-2 px-4 border-b border-r text-center" colSpan={3}>Non-Veg</th>
                
                {/* Day 3 Details */}
                <th className="py-2 px-4 border-b border-r text-center" colSpan={3}>Veg</th>
                <th className="py-2 px-4 border-b border-r text-center" colSpan={3}>Non-Veg</th>
                
                <th className="py-2 px-4 border-b border-r"></th>
                <th className="py-2 px-4 border-b"></th>
              </tr>
              <tr className="bg-gray-50">
                <th className="py-2 px-4 border-b border-r"></th>
                <th className="py-2 px-4 border-b border-r"></th>
                <th className="py-2 px-4 border-b border-r"></th>
                
                {/* Day 1 Veg */}
                <th className="py-2 px-2 border-b border-r text-center">Adult</th>
                <th className="py-2 px-2 border-b border-r text-center">Child</th>
                <th className="py-2 px-2 border-b border-r text-center">Infant</th>
                
                {/* Day 1 Non-Veg */}
                <th className="py-2 px-2 border-b border-r text-center">Adult</th>
                <th className="py-2 px-2 border-b border-r text-center">Child</th>
                <th className="py-2 px-2 border-b border-r text-center">Infant</th>
                
                {/* Day 2 Veg */}
                <th className="py-2 px-2 border-b border-r text-center">Adult</th>
                <th className="py-2 px-2 border-b border-r text-center">Child</th>
                <th className="py-2 px-2 border-b border-r text-center">Infant</th>
                
                {/* Day 2 Non-Veg */}
                <th className="py-2 px-2 border-b border-r text-center">Adult</th>
                <th className="py-2 px-2 border-b border-r text-center">Child</th>
                <th className="py-2 px-2 border-b border-r text-center">Infant</th>
                
                {/* Day 3 Veg */}
                <th className="py-2 px-2 border-b border-r text-center">Adult</th>
                <th className="py-2 px-2 border-b border-r text-center">Child</th>
                <th className="py-2 px-2 border-b border-r text-center">Infant</th>
                
                {/* Day 3 Non-Veg */}
                <th className="py-2 px-2 border-b border-r text-center">Adult</th>
                <th className="py-2 px-2 border-b border-r text-center">Child</th>
                <th className="py-2 px-2 border-b border-r text-center">Infant</th>
                
                <th className="py-2 px-4 border-b border-r"></th>
                <th className="py-2 px-4 border-b border-r"></th>
                <th className="py-2 px-4 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation, index) => {
                const mealsByDay = organizeMealsByDay(reservation.selectedItems);
                
                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-2 px-4 border-b border-r">{reservation.customerInfo.name}</td>
                    <td className="py-2 px-4 border-b border-r">{reservation.customerInfo.email}</td>
                    <td className="py-2 px-4 border-b border-r">${reservation.totalAmount}</td>
                    
                    {/* Day 1 Veg */}
                    <td className="py-2 px-2 border-b border-r text-center">{mealsByDay['1'].veg.adult || '-'}</td>
                    <td className="py-2 px-2 border-b border-r text-center">{mealsByDay['1'].veg.child || '-'}</td>
                    <td className="py-2 px-2 border-b border-r text-center">{mealsByDay['1'].veg.infant || '-'}</td>
                    
                    {/* Day 1 Non-Veg */}
                    <td className="py-2 px-2 border-b border-r text-center">{mealsByDay['1'].nonveg.adult || '-'}</td>
                    <td className="py-2 px-2 border-b border-r text-center">{mealsByDay['1'].nonveg.child || '-'}</td>
                    <td className="py-2 px-2 border-b border-r text-center">{mealsByDay['1'].nonveg.infant || '-'}</td>
                    
                    {/* Day 2 Veg */}
                    <td className="py-2 px-2 border-b border-r text-center">{mealsByDay['2'].veg.adult || '-'}</td>
                    <td className="py-2 px-2 border-b border-r text-center">{mealsByDay['2'].veg.child || '-'}</td>
                    <td className="py-2 px-2 border-b border-r text-center">{mealsByDay['2'].veg.infant || '-'}</td>
                    
                    {/* Day 2 Non-Veg */}
                    <td className="py-2 px-2 border-b border-r text-center">{mealsByDay['2'].nonveg.adult || '-'}</td>
                    <td className="py-2 px-2 border-b border-r text-center">{mealsByDay['2'].nonveg.child || '-'}</td>
                    <td className="py-2 px-2 border-b border-r text-center">{mealsByDay['2'].nonveg.infant || '-'}</td>
                    
                    {/* Day 3 Veg */}
                    <td className="py-2 px-2 border-b border-r text-center">{mealsByDay['3'].veg.adult || '-'}</td>
                    <td className="py-2 px-2 border-b border-r text-center">{mealsByDay['3'].veg.child || '-'}</td>
                    <td className="py-2 px-2 border-b border-r text-center">{mealsByDay['3'].veg.infant || '-'}</td>
                    
                    {/* Day 3 Non-Veg */}
                    <td className="py-2 px-2 border-b border-r text-center">{mealsByDay['3'].nonveg.adult || '-'}</td>
                    <td className="py-2 px-2 border-b border-r text-center">{mealsByDay['3'].nonveg.child || '-'}</td>
                    <td className="py-2 px-2 border-b border-r text-center">{mealsByDay['3'].nonveg.infant || '-'}</td>
                    
                    <td className="py-2 px-4 border-b border-r">
                      {reservation.paymentStatus || 'N/A'}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {reservation.createdAt 
                        ? new Date(reservation.createdAt.seconds * 1000).toLocaleString() 
                        : 'N/A'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ReservationList;