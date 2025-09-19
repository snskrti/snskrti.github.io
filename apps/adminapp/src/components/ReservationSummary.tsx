// src/components/ReservationSummary.tsx
import React from 'react';
import { MealReservation } from 'types/src/mealReservation';

// Day mapping constants
const DAY_MAPPING: Record<string, string> = {
  '1': 'Sep 28',
  '2': 'Sep 29',
  '3': 'Sep 30'
};

// Helper function to parse item ID
const parseItemId = (itemId: string) => {
  // Handle case where the itemId is formatted as: "veg-1-adult"
  const parts = itemId.split('-');
  if (parts.length >= 3) {
    const result = {
      mealType: parts[0], // 'veg' or 'nonveg'
      day: parts[1],      // '1', '2', or '3'
      ageGroup: parts[2]  // 'adult', 'child', or 'infant'
    };
    return result;
  }
  
  // Handle case where the itemId might be a JSON string
  try {
    const parsedJson = JSON.parse(itemId);
    if (parsedJson && parsedJson.mealType && parsedJson.day && parsedJson.ageGroup) {
      return {
        mealType: parsedJson.mealType,
        day: parsedJson.day.toString().replace('day', ''), // Remove 'day' prefix if present
        ageGroup: parsedJson.ageGroup
      };
    }
  } catch (e) {
    // Not a valid JSON string, continue with other parsing attempts
  }
  
  // Try to parse directly from the itemId string with regex
  const mealTypeMatch = itemId.match(/(veg|nonveg)/i);
  const dayMatch = itemId.match(/day(\d+)|(\d+)/i);
  const ageGroupMatch = itemId.match(/(adult|child|infant)/i);
  
  if (mealTypeMatch && dayMatch && ageGroupMatch) {
    const mealType = mealTypeMatch[0].toLowerCase() === 'nonveg' ? 'nonveg' : 'veg';
    // Extract the day number, removing any 'day' prefix
    const day = (dayMatch[1] || dayMatch[2]).toString();
    const ageGroup = ageGroupMatch[0].toLowerCase();
    
    const result = { 
      mealType, 
      day, 
      ageGroup: ageGroup as 'adult' | 'child' | 'infant' 
    };
    return result;
  }
  
  // Could not parse the item ID
  return null;
};

type SummaryData = {
  '1': { 
    veg: { adult: number; child: number; infant: number; }; 
    nonveg: { adult: number; child: number; infant: number; }; 
  };
  '2': { 
    veg: { adult: number; child: number; infant: number; }; 
    nonveg: { adult: number; child: number; infant: number; }; 
  };
  '3': { 
    veg: { adult: number; child: number; infant: number; }; 
    nonveg: { adult: number; child: number; infant: number; }; 
  };
};

type DayTotals = {
  '1': { veg: number; nonveg: number; total: number; };
  '2': { veg: number; nonveg: number; total: number; };
  '3': { veg: number; nonveg: number; total: number; };
};

// Function to organize meal data by day
const organizeMealsByDay = (reservations: MealReservation[]): SummaryData => {
  const summary: SummaryData = {
    '1': { veg: { adult: 0, child: 0, infant: 0 }, nonveg: { adult: 0, child: 0, infant: 0 } },
    '2': { veg: { adult: 0, child: 0, infant: 0 }, nonveg: { adult: 0, child: 0, infant: 0 } },
    '3': { veg: { adult: 0, child: 0, infant: 0 }, nonveg: { adult: 0, child: 0, infant: 0 } }
  };

  reservations.forEach(reservation => {
    // Check if selectedItems exists and is an object
    if (!reservation.selectedItems || typeof reservation.selectedItems !== 'object') {
      return; // Skip this reservation
    }
    
    Object.entries(reservation.selectedItems).forEach(([itemId, details]) => {
      const parsedItem = parseItemId(itemId);
      if (!parsedItem) {
        return; // Skip this item
      }
      
      // Clean up the day value (remove any 'day' prefix)
      const dayValue = parsedItem.day.toString().replace(/^day/i, '');
      
      if (dayValue === '1' || dayValue === '2' || dayValue === '3') {
        const { mealType, ageGroup } = parsedItem;
        
        // Validate meal type and age group
        if ((mealType === 'veg' || mealType === 'nonveg') && 
            (ageGroup === 'adult' || ageGroup === 'child' || ageGroup === 'infant')) {
          
          // Get quantity with default of 0 if not available
          const quantity = details?.quantity || 0;
          summary[dayValue as '1' | '2' | '3'][mealType as 'veg' | 'nonveg'][ageGroup as 'adult' | 'child' | 'infant'] += quantity;
        }
      }
    });
  });

  return summary;
};

interface ReservationSummaryProps {
  reservations: MealReservation[];
}

const ReservationSummary: React.FC<ReservationSummaryProps> = ({ reservations }) => {
  const summary = organizeMealsByDay(reservations);
  
  // Calculate totals
  const dayTotals: DayTotals = {
    '1': { veg: 0, nonveg: 0, total: 0 },
    '2': { veg: 0, nonveg: 0, total: 0 },
    '3': { veg: 0, nonveg: 0, total: 0 }
  };
  
  // Calculate totals for each day and meal type
  (Object.keys(summary) as Array<keyof SummaryData>).forEach(day => {
    Object.entries(summary[day]).forEach(([mealType, ageGroups]) => {
      Object.values(ageGroups).forEach(count => {
        dayTotals[day][mealType as 'veg' | 'nonveg'] += count;
        dayTotals[day].total += count;
      });
    });
  });
  
  return (
    <div className="p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Reservation Summary</h2>
      
      <div className="bg-indigo-50 p-4 rounded-lg text-center mb-4">
        <p className="text-xl font-bold">Total Bookings: {reservations.length}</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4 mb-4">
        {(Object.keys(summary) as Array<keyof SummaryData>).map(day => (
          <div key={day} className="border rounded-lg p-4 bg-orange-50 shadow-md">
            <h3 className="text-lg font-semibold mb-2">Day {day} - {DAY_MAPPING[day]}</h3>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <h4 className="font-medium">Vegetarian</h4>
                <ul className="list-inside">
                  <li>Adult: {summary[day].veg.adult}</li>
                  <li>Child: {summary[day].veg.child}</li>
                  <li>Infant: {summary[day].veg.infant}</li>
                  <li className="font-semibold">Total Veg: {dayTotals[day].veg}</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium">Non-Vegetarian</h4>
                <ul className="list-inside">
                  <li>Adult: {summary[day].nonveg.adult}</li>
                  <li>Child: {summary[day].nonveg.child}</li>
                  <li>Infant: {summary[day].nonveg.infant}</li>
                  <li className="font-semibold">Total Non-Veg: {dayTotals[day].nonveg}</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-2 pt-2 border-t">
              <p className="font-bold">Day Total: {dayTotals[day].total} meals</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationSummary;