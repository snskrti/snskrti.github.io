// src/components/DebugDataView.tsx
import React, { useState } from 'react';
import { MealReservation } from 'types/src/mealReservation';

interface DebugDataViewProps {
  reservations: MealReservation[];
}

const DebugDataView: React.FC<DebugDataViewProps> = ({ reservations }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<MealReservation | null>(null);

  // Helper function to check the structure of the selectedItems
  const analyzeSelectedItems = (selectedItems: any) => {
    if (!selectedItems) return 'No selected items';
    
    const itemKeys = Object.keys(selectedItems);
    if (itemKeys.length === 0) return 'Empty selected items object';
    
    const firstKey = itemKeys[0];
    const firstItem = selectedItems[firstKey];
    
    return {
      totalItems: itemKeys.length,
      sampleKey: firstKey,
      sampleItem: firstItem,
      allKeys: itemKeys,
    };
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow mb-6 border border-gray-300">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Debug Data View</h2>
        <button 
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Reservations Count: {reservations.length}</h3>
            <div className="bg-white p-2 rounded overflow-auto max-h-60">
              <pre className="text-xs">
                {JSON.stringify({ 
                  count: reservations.length,
                  hasSampleData: reservations.length > 0
                }, null, 2)}
              </pre>
            </div>
          </div>

          {reservations.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">First Reservation Structure</h3>
              <div className="bg-white p-2 rounded overflow-auto max-h-60">
                <pre className="text-xs">
                  {JSON.stringify({
                    customerName: reservations[0].customerInfo?.name,
                    customerEmail: reservations[0].customerInfo?.email,
                    totalAmount: reservations[0].totalAmount,
                    selectedItemsStructure: analyzeSelectedItems(reservations[0].selectedItems)
                  }, null, 2)}
                </pre>
              </div>
              
              <div className="mt-4">
                <h4 className="text-md font-semibold mb-2">Reservation Selection</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {reservations.slice(0, 9).map((reservation, index) => (
                    <button
                      key={index}
                      className={`p-2 rounded ${selectedReservation === reservation ? 'bg-blue-200' : 'bg-gray-200'}`}
                      onClick={() => setSelectedReservation(reservation)}
                    >
                      Reservation {index + 1}: {reservation.customerInfo?.name || 'Unknown'}
                    </button>
                  ))}
                </div>
              </div>
              
              {selectedReservation && (
                <div className="mt-4">
                  <h4 className="text-md font-semibold mb-2">Selected Reservation Details</h4>
                  <div className="bg-white p-2 rounded overflow-auto max-h-96">
                    <pre className="text-xs">
                      {JSON.stringify(selectedReservation, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DebugDataView;