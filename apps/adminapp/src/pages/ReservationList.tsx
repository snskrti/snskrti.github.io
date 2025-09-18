import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/clientApp';
import { MealReservation } from 'types/src/mealReservation';
import ReservationSummary from '../components/ReservationSummary';

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

// Helper function to highlight search text
const highlightSearchText = (text: string, searchQuery: string): JSX.Element => {
  if (!searchQuery) return <>{text}</>;
  
  const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
  return (
    <>
      {parts.map((part, index) => 
        part.toLowerCase() === searchQuery.toLowerCase() 
          ? <span key={index} className="bg-yellow-200">{part}</span> 
          : part
      )}
    </>
  );
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
  const [filteredReservations, setFilteredReservations] = useState<MealReservation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState('');

  // Debounce search query to avoid too many re-renders
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

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

  // Filter reservations based on search query
  useEffect(() => {
    if (!debouncedSearchQuery) {
      setFilteredReservations(reservations);
      return;
    }

    const query = debouncedSearchQuery.toLowerCase();
    const filtered = reservations.filter(reservation => {
      const name = reservation.customerInfo.name.toLowerCase();
      const email = reservation.customerInfo.email.toLowerCase();
      return name.includes(query) || email.includes(query);
    });

    setFilteredReservations(filtered);
  }, [debouncedSearchQuery, reservations]);

  // Convert reservation data to CSV format
  const convertToCSV = () => {
    // Define all the headers for the CSV
    const headers = [
      'Customer Name', 'Email', 'Total Amount',
      // Day 1 Veg
      `Day 1 - ${DAY_MAPPING['1']} - Veg - Adult`, 
      `Day 1 - ${DAY_MAPPING['1']} - Veg - Child`, 
      `Day 1 - ${DAY_MAPPING['1']} - Veg - Infant`,
      // Day 1 Non-Veg
      `Day 1 - ${DAY_MAPPING['1']} - Non-Veg - Adult`, 
      `Day 1 - ${DAY_MAPPING['1']} - Non-Veg - Child`, 
      `Day 1 - ${DAY_MAPPING['1']} - Non-Veg - Infant`,
      // Day 2 Veg
      `Day 2 - ${DAY_MAPPING['2']} - Veg - Adult`, 
      `Day 2 - ${DAY_MAPPING['2']} - Veg - Child`, 
      `Day 2 - ${DAY_MAPPING['2']} - Veg - Infant`,
      // Day 2 Non-Veg
      `Day 2 - ${DAY_MAPPING['2']} - Non-Veg - Adult`, 
      `Day 2 - ${DAY_MAPPING['2']} - Non-Veg - Child`, 
      `Day 2 - ${DAY_MAPPING['2']} - Non-Veg - Infant`,
      // Day 3 Veg
      `Day 3 - ${DAY_MAPPING['3']} - Veg - Adult`, 
      `Day 3 - ${DAY_MAPPING['3']} - Veg - Child`, 
      `Day 3 - ${DAY_MAPPING['3']} - Veg - Infant`,
      // Day 3 Non-Veg
      `Day 3 - ${DAY_MAPPING['3']} - Non-Veg - Adult`, 
      `Day 3 - ${DAY_MAPPING['3']} - Non-Veg - Child`, 
      `Day 3 - ${DAY_MAPPING['3']} - Non-Veg - Infant`,
      // Additional columns
      'Payment Status', 'Created At'
    ];

    // Function to escape CSV values (handles commas, quotes, etc.)
    const escapeCSV = (value: any) => {
      if (value === null || value === undefined) return '';
      const stringValue = String(value);
      // If the value contains commas, quotes, or newlines, wrap it in quotes and escape any existing quotes
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    };

    // Create rows from the filtered reservations
    const rows = filteredReservations.map(reservation => {
      const mealsByDay = organizeMealsByDay(reservation.selectedItems);
      
      return [
        escapeCSV(reservation.customerInfo.name),
        escapeCSV(reservation.customerInfo.email),
        escapeCSV(`€${reservation.totalAmount}`),
        
        // Day 1 Veg
        escapeCSV(mealsByDay['1'].veg.adult || '-'),
        escapeCSV(mealsByDay['1'].veg.child || '-'),
        escapeCSV(mealsByDay['1'].veg.infant || '-'),
        
        // Day 1 Non-Veg
        escapeCSV(mealsByDay['1'].nonveg.adult || '-'),
        escapeCSV(mealsByDay['1'].nonveg.child || '-'),
        escapeCSV(mealsByDay['1'].nonveg.infant || '-'),
        
        // Day 2 Veg
        escapeCSV(mealsByDay['2'].veg.adult || '-'),
        escapeCSV(mealsByDay['2'].veg.child || '-'),
        escapeCSV(mealsByDay['2'].veg.infant || '-'),
        
        // Day 2 Non-Veg
        escapeCSV(mealsByDay['2'].nonveg.adult || '-'),
        escapeCSV(mealsByDay['2'].nonveg.child || '-'),
        escapeCSV(mealsByDay['2'].nonveg.infant || '-'),
        
        // Day 3 Veg
        escapeCSV(mealsByDay['3'].veg.adult || '-'),
        escapeCSV(mealsByDay['3'].veg.child || '-'),
        escapeCSV(mealsByDay['3'].veg.infant || '-'),
        
        // Day 3 Non-Veg
        escapeCSV(mealsByDay['3'].nonveg.adult || '-'),
        escapeCSV(mealsByDay['3'].nonveg.child || '-'),
        escapeCSV(mealsByDay['3'].nonveg.infant || '-'),
        
        escapeCSV(reservation.paymentStatus || 'N/A'),
        escapeCSV(reservation.createdAt 
          ? new Date(reservation.createdAt.seconds * 1000).toLocaleString() 
          : 'N/A')
      ].join(',');
    });

    // Combine headers and rows
    return [headers.join(','), ...rows].join('\n');
  };

  // Function to download CSV
  const downloadCSV = () => {
    try {
      setExporting(true);
      
      // Generate CSV content
      const csv = convertToCSV();
      
      // Add BOM for Excel compatibility in UTF-8
      const csvContent = "\uFEFF" + csv; 
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      
      // Create download link
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      
      // Set filename with current date
      const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      const time = new Date().toTimeString().split(' ')[0].replace(/:/g, '-');
      link.setAttribute('download', `durga-puja-meal-reservations-${date}-${time}.csv`);
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Release object URL
      setTimeout(() => {
        URL.revokeObjectURL(url);
        setExporting(false);
      }, 100);
    } catch (err) {
      console.error('Error exporting CSV:', err);
      setError('Failed to export CSV. Please try again.');
      setExporting(false);
    }
  };

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
          className={`${exporting ? 'bg-green-500' : 'bg-green-600 hover:bg-green-700'} text-white font-semibold py-2 px-4 rounded flex items-center`}
          onClick={downloadCSV}
          disabled={filteredReservations.length === 0 || exporting}
        >
          {exporting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Exporting...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export to CSV
            </>
          )}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError('')}>
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </span>
        </div>
      )}
      
      {/* Search input */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setSearchQuery('')}
            >
              ✕
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="mt-2 text-sm text-gray-600">
            Showing {filteredReservations.length} of {reservations.length} reservations
          </p>
        )}
      </div>
      
      {reservations.length === 0 ? (
        <p className="text-gray-500">No reservations found.</p>
      ) : filteredReservations.length === 0 ? (
        <p className="text-gray-500">No reservations match your search criteria.</p>
      ) : (
        <>
          <ReservationSummary reservations={filteredReservations} />
          
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
              {filteredReservations.map((reservation, index) => {
                const mealsByDay = organizeMealsByDay(reservation.selectedItems);
                
                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-2 px-4 border-b border-r">
                      {highlightSearchText(reservation.customerInfo.name, debouncedSearchQuery)}
                    </td>
                    <td className="py-2 px-4 border-b border-r">
                      {highlightSearchText(reservation.customerInfo.email, debouncedSearchQuery)}
                    </td>
                    <td className="py-2 px-4 border-b border-r">€{reservation.totalAmount}</td>
                    
                    {/* Day 1 Veg */}
                    <td className={`py-2 px-2 border-b border-r text-center ${mealsByDay['1'].veg.adult ? 'bg-green-100 font-medium text-green-800' : ''}`}>
                      {mealsByDay['1'].veg.adult || '-'}
                    </td>
                    <td className={`py-2 px-2 border-b border-r text-center ${mealsByDay['1'].veg.child ? 'bg-green-100 font-medium text-green-800' : ''}`}>
                      {mealsByDay['1'].veg.child || '-'}
                    </td>
                    <td className={`py-2 px-2 border-b border-r text-center ${mealsByDay['1'].veg.infant ? 'bg-green-100 font-medium text-green-800' : ''}`}>
                      {mealsByDay['1'].veg.infant || '-'}
                    </td>
                    
                    {/* Day 1 Non-Veg */}
                    <td className={`py-2 px-2 border-b border-r text-center ${mealsByDay['1'].nonveg.adult ? 'bg-green-100 font-medium text-green-800' : ''}`}>
                      {mealsByDay['1'].nonveg.adult || '-'}
                    </td>
                    <td className={`py-2 px-2 border-b border-r text-center ${mealsByDay['1'].nonveg.child ? 'bg-green-100 font-medium text-green-800' : ''}`}>
                      {mealsByDay['1'].nonveg.child || '-'}
                    </td>
                    <td className={`py-2 px-2 border-b border-r text-center ${mealsByDay['1'].nonveg.infant ? 'bg-green-100 font-medium text-green-800' : ''}`}>
                      {mealsByDay['1'].nonveg.infant || '-'}
                    </td>
                    
                    {/* Day 2 Veg */}
                    <td className={`py-2 px-2 border-b border-r text-center ${mealsByDay['2'].veg.adult ? 'bg-green-100 font-medium text-green-800' : ''}`}>
                      {mealsByDay['2'].veg.adult || '-'}
                    </td>
                    <td className={`py-2 px-2 border-b border-r text-center ${mealsByDay['2'].veg.child ? 'bg-green-100 font-medium text-green-800' : ''}`}>
                      {mealsByDay['2'].veg.child || '-'}
                    </td>
                    <td className={`py-2 px-2 border-b border-r text-center ${mealsByDay['2'].veg.infant ? 'bg-green-100 font-medium text-green-800' : ''}`}>
                      {mealsByDay['2'].veg.infant || '-'}
                    </td>
                    
                    {/* Day 2 Non-Veg */}
                    <td className={`py-2 px-2 border-b border-r text-center ${mealsByDay['2'].nonveg.adult ? 'bg-green-100 font-medium text-green-800' : ''}`}>
                      {mealsByDay['2'].nonveg.adult || '-'}
                    </td>
                    <td className={`py-2 px-2 border-b border-r text-center ${mealsByDay['2'].nonveg.child ? 'bg-green-100 font-medium text-green-800' : ''}`}>
                      {mealsByDay['2'].nonveg.child || '-'}
                    </td>
                    <td className={`py-2 px-2 border-b border-r text-center ${mealsByDay['2'].nonveg.infant ? 'bg-green-100 font-medium text-green-800' : ''}`}>
                      {mealsByDay['2'].nonveg.infant || '-'}
                    </td>
                    
                    {/* Day 3 Veg */}
                    <td className={`py-2 px-2 border-b border-r text-center ${mealsByDay['3'].veg.adult ? 'bg-green-100 font-medium text-green-800' : ''}`}>
                      {mealsByDay['3'].veg.adult || '-'}
                    </td>
                    <td className={`py-2 px-2 border-b border-r text-center ${mealsByDay['3'].veg.child ? 'bg-green-100 font-medium text-green-800' : ''}`}>
                      {mealsByDay['3'].veg.child || '-'}
                    </td>
                    <td className={`py-2 px-2 border-b border-r text-center ${mealsByDay['3'].veg.infant ? 'bg-green-100 font-medium text-green-800' : ''}`}>
                      {mealsByDay['3'].veg.infant || '-'}
                    </td>
                    
                    {/* Day 3 Non-Veg */}
                    <td className={`py-2 px-2 border-b border-r text-center ${mealsByDay['3'].nonveg.adult ? 'bg-green-100 font-medium text-green-800' : ''}`}>
                      {mealsByDay['3'].nonveg.adult || '-'}
                    </td>
                    <td className={`py-2 px-2 border-b border-r text-center ${mealsByDay['3'].nonveg.child ? 'bg-green-100 font-medium text-green-800' : ''}`}>
                      {mealsByDay['3'].nonveg.child || '-'}
                    </td>
                    <td className={`py-2 px-2 border-b border-r text-center ${mealsByDay['3'].nonveg.infant ? 'bg-green-100 font-medium text-green-800' : ''}`}>
                      {mealsByDay['3'].nonveg.infant || '-'}
                    </td>
                    
                    <td className={`py-2 px-4 border-b border-r ${
                      reservation.paymentStatus === 'succeeded' 
                        ? 'bg-green-100 text-green-800 font-medium' 
                        : reservation.paymentStatus === 'failed'
                          ? 'bg-red-100 text-red-800 font-medium'
                          : reservation.paymentStatus === 'processing'
                            ? 'bg-yellow-100 text-yellow-800 font-medium'
                            : ''
                    }`}>
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