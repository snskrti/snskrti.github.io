import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Plus, Minus, ShoppingCart, User, Mail, Utensils, Leaf, Users, EuroIcon } from 'lucide-react';
import { Footer } from '../../../components/shared/Footer';
import { SEOHead } from '../../../components/SEO/SEOHead';
import { durgaPujaMeals2025, getPriceByDay, AGE_GROUPS } from '../../../utils/mealData';
import { MealReservation, MenuItem, SelectedItemWithAge } from '../../../types/mealReservation';

function MealReservation2025() {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<Record<string, SelectedItemWithAge>>({});
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    isMember: false
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    calculateTotal();
    validateForm();
  }, [selectedItems, customerInfo]);

  const calculateTotal = useCallback(() => {
    let total = 0;
    
    Object.entries(selectedItems).forEach(([compositeKey, itemDetails]) => {
      // Skip Anandamela items as they're free and just for headcount
      if (compositeKey.includes('anandamela')) {
        return;
      }
      
      try {
        // Parse item details from the composite key
        const parts = compositeKey.split('-');
        const itemId = parts[0] + (parts.length > 2 ? `-${parts[1]}` : '');
        const ageGroup = parts[parts.length - 1] as keyof typeof AGE_GROUPS;
        
        // Ensure we have a valid age group
        if (!AGE_GROUPS[ageGroup]) {
          return;
        }
        
        // Parse day number from item ID
        const isVeg = itemId.includes('veg-');
        const dayNumber = itemId.match(/day(\d+)/)?.[1] || '1';
        
        // Get the price based on day, type, age group, and membership status
        const price = getPriceByDay(
          dayNumber, 
          isVeg && !itemId.includes('nonveg'), 
          ageGroup,
          customerInfo.isMember
        );
        
        // Make sure price is a valid number
        if (isNaN(price)) {
          return;
        }
        
        const itemTotal = price * itemDetails.quantity;
        total += itemTotal;
      } catch (error) {
        // Error handling for price calculation
      }
    });

    // Set the total amount
    setTotalAmount(total);
  }, [selectedItems, customerInfo.isMember]);

  const validateForm = useCallback(() => {
    // Check if any items are selected (either meals or Anandamela attendees)
    const hasSelectedItems = Object.entries(selectedItems).some(([_, item]) => item.quantity > 0);
    
    // For Anandamela-only registration, we still need customer info
    const anandamelaOnly = Object.entries(selectedItems).every(([compositeKey, item]) => 
      compositeKey.includes('anandamela') || item.quantity === 0
    );
    
    const hasAnandamelaAttendees = Object.entries(selectedItems)
      .filter(([compositeKey]) => compositeKey.includes('anandamela'))
      .some(([_, item]) => item.quantity > 0);
      
    const hasValidCustomerInfo = customerInfo.name.trim() !== '' && 
                                customerInfo.email.trim() !== '' && 
                                customerInfo.email.includes('@');
    
    // Allow proceeding even with 0-value reservations as long as items are selected
    setIsFormValid(hasSelectedItems && hasValidCustomerInfo);
  }, [selectedItems, customerInfo.name, customerInfo.email]);

  const updateQuantity = (itemId: string, change: number, ageGroup: keyof typeof AGE_GROUPS) => {
    setSelectedItems(prev => {
      try {
        // Create a composite key that combines itemId and ageGroup
        const compositeKey = `${itemId}-${ageGroup}`;
        
        const currentItem = prev[compositeKey] || { quantity: 0, ageGroup, price: 0 };
        
        // Calculate the new quantity
        const newQuantity = Math.max(0, currentItem.quantity + change);
        
        if (newQuantity === 0) {
          // Remove the item completely if quantity is 0
          const newItems = { ...prev };
          delete newItems[compositeKey];
          return newItems;
        }
        
        // Get the price based on the item ID and age group
        let price = 0;
        if (!itemId.includes('anandamela')) {
          // Parse day number from item ID
          const isVeg = itemId.includes('veg-') && !itemId.includes('nonveg');
          const dayNumber = itemId.match(/day(\d+)/)?.[1] || '1';
          
          // Get the price based on day, type, and age group
          price = getPriceByDay(
            dayNumber, 
            isVeg, 
            ageGroup,
            customerInfo.isMember
          );
        }
        
        // Update or add the item with the composite key
        return {
          ...prev,
          [compositeKey]: {
            quantity: newQuantity,
            ageGroup,
            price
          }
        };
      } catch (error) {
        // Error handling for quantity updates
        return prev;
      }
    });
  };

  const getSelectedItemsCount = (): number => {
    try {
      return Object.values(selectedItems).reduce((sum, item) => {
        if (typeof item.quantity === 'number') {
          return sum + item.quantity;
        }
        return sum;
      }, 0);
    } catch (error) {
      // Error handling for item count calculation
      return 0;
    }
  };

  const handleProceedToPayment = () => {
    if (!isFormValid) return;

    // Organize selected items by day for the new structure
    const daySelections: Record<string, SelectedItemWithAge[]> = {};
    
    Object.entries(selectedItems).forEach(([compositeKey, itemDetails]) => {
      if (!compositeKey.includes('anandamela')) {
        try {
          // Parse item details to get the day number
          const parts = compositeKey.split('-');
          const itemId = parts[0] + (parts.length > 2 ? `-${parts[1]}` : '');
          const dayNumber = itemId.match(/day(\d+)/)?.[1] || '1';
          
          // Initialize the day array if it doesn't exist
          if (!daySelections[dayNumber]) {
            daySelections[dayNumber] = [];
          }
          
          // Add the item to the day's selections
          daySelections[dayNumber].push({
            ...itemDetails
          });
        } catch (error) {
          // Error handling for item organization
        }
      }
    });

    const reservationData: MealReservation = {
      selectedItems,
      daySelections,
      customerInfo,
      totalAmount
    };

    navigate('/events/durga-puja-2025/meal-payment', { state: reservationData });
  };

  const renderMenuItem = (item: MenuItem, isVeg: boolean) => {
    // Special handling for Anandamela
    if (item.id === 'anandamela-info') {
      return (
        <div key={item.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-sm border border-orange-200 overflow-hidden">
          <div className="p-5">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 mb-3 px-3 py-2 bg-orange-100 rounded-full">
                <Utensils className="w-4 h-4 text-orange-600" />
                <span className="text-xs font-medium text-orange-700">
                  Anandamela Style
                </span>
              </div>
              <h4 className="font-semibold text-gray-800 text-sm mb-2">{item.name}</h4>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">{item.description}</p>
              
              <div className="mb-4 bg-white p-4 rounded-lg border border-orange-100">
                <p className="text-sm font-medium text-gray-700 mb-2">How many people will attend Anandamela?</p>
                <p className="text-xs text-gray-500 mb-3">Free attendance - Please indicate expected attendees to help us plan</p>
                <div className="flex justify-center space-x-4">
                                      {Object.entries(AGE_GROUPS).map(([ageKey, ageInfo]) => {
                    const ageGroupKey = ageKey as keyof typeof AGE_GROUPS;
                    const anandamelaKey = `anandamela-${ageGroupKey}`;
                    const compositeKey = `${anandamelaKey}-${ageGroupKey}`;
                    const selectedItem = selectedItems[compositeKey];
                    const quantity = selectedItem ? selectedItem.quantity : 0;
                    
                    return (
                      <div key={ageKey} className="inline-block">
                        <div className="text-xs mb-1 font-medium text-gray-600">{ageInfo.name}</div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(anandamelaKey, -1, ageGroupKey)}
                            disabled={quantity === 0}
                            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-3 h-3 text-gray-600" />
                          </button>
                          <span className="w-7 text-center font-semibold text-sm">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(anandamelaKey, 1, ageGroupKey)}
                            className="w-7 h-7 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-600 flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 mb-3">
                <p className="text-xs text-yellow-800">
                  <span className="font-semibold block mb-1">⚠️ Important Notice</span>
                  If you're attending only Anandamela (Day 4) and not reserving meals for other days,
                  please purchase an <a href="https://www.desipass.com/events/events-details?eventId=01K206DZB1DAGBX15RZV6SAH52" target="_blank" rel="noopener noreferrer" className="underline font-medium">entry-only ticket for Navami & Dashami</a>.
                  <span className="block mt-1">Food payments will be accepted directly at the venue.</span>
                </p>
                </div>
              
            </div>
          </div>
        </div>
      );
    }

    // Parse item details from the ID to get day number
    const dayNumber = item.id.match(/day(\d+)/)?.[1] || '1';
    
    return (
      <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 overflow-hidden">
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2 mb-2">
              {isVeg ? (
                <Leaf className="w-4 h-4 text-green-600" />
              ) : (
                <Utensils className="w-4 h-4 text-red-600" />
              )}
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                isVeg ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
              </span>
            </div>
          </div>
          
          <h4 className="font-semibold text-gray-800 text-sm mb-2">{item.name}</h4>
          <p className="text-xs text-gray-600 mb-4 leading-relaxed">{item.description}</p>
          
          {/* Age Group Tabs */}
          <div className="mb-4 border-b border-gray-200">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
              {Object.entries(AGE_GROUPS).map(([ageKey, ageInfo]) => {
                const ageGroupKey = ageKey as keyof typeof AGE_GROUPS;
                const price = getPriceByDay(dayNumber, isVeg, ageGroupKey, customerInfo.isMember);
                const compositeKey = `${item.id}-${ageGroupKey}`;
                const selectedItem = selectedItems[compositeKey];
                const isSelected = selectedItem && selectedItem.quantity > 0;
                
                return (
                  <li key={ageKey} className="mr-2">
                    <div className={`inline-block p-3 rounded-t-lg border-b-2 ${
                      isSelected 
                        ? 'text-orange-600 border-orange-600' 
                        : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                    }`}>
                      <div className="flex flex-col items-center">
                        <span>{ageInfo.name}</span>
                        <span className="text-xs text-gray-500">{ageInfo.description}</span>
                        <span className={`font-bold mt-1 ${price > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                          {price > 0 ? `€${price.toFixed(2)}` : 'Free'}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          
          {/* Quantity Selection for Each Age Group */}
          <div className="space-y-3">
            {Object.entries(AGE_GROUPS).map(([ageKey, ageInfo]) => {
              const ageGroupKey = ageKey as keyof typeof AGE_GROUPS;
              const compositeKey = `${item.id}-${ageGroupKey}`;
              const selectedItem = selectedItems[compositeKey];
              const quantity = selectedItem ? selectedItem.quantity : 0;
              const price = getPriceByDay(dayNumber, isVeg, ageGroupKey, customerInfo.isMember);
              
              return (
                <div key={ageKey} className={`p-2 rounded-lg ${quantity > 0 ? 'bg-orange-50' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium">{ageInfo.name}</span>
                      <span className="text-xs text-gray-500 block">{price > 0 ? `€${price.toFixed(2)}` : 'Free'}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1, ageGroupKey)}
                        disabled={quantity === 0}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="w-8 text-center font-semibold text-sm">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1, ageGroupKey)}
                        className="w-8 h-8 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-600 flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {quantity > 0 && (
                    <div className="text-xs text-right mt-1 text-orange-600 font-medium">
                      Subtotal: €{(price * quantity).toFixed(2)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-25 via-amber-25 to-yellow-25">
      <SEOHead 
        title="Meal Reservation - Durga Puja 2025 | Sanskriti Hamburg"
        description="Reserve your meals for Durga Puja 2025 celebration in Hamburg. Authentic Bengali cuisine available for the four-day festival."
        keywords="Durga Puja 2025, Bengali food, meal reservation, Hamburg, Sanskriti, Bengali cuisine"
        url="/events/durga-puja-2025/meal-reservation"
        type="event"
        eventStartDate="2025-09-28"
        eventEndDate="2025-10-01"
        eventType="Food Reservation"
        eventLocation="Hamburg, Germany"
      />

      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Durga Puja 2025 - Meal Reservation
          </h1>
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>September 28 - October 1, 2025</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Hamburg</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Reserve your authentic Bengali thalis for the four-day Durga Puja celebration.
          </p>
        </div>

        {/* Age Group Information */}
        <div className="max-w-4xl mx-auto mb-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <Users className="w-5 h-5 text-orange-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Age-Based Pricing</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {Object.entries(AGE_GROUPS).map(([key, info]) => (
              <div key={key} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-1">{info.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{info.description}</p>
                <div className="space-y-1 text-sm">
                  <p className={key === 'infant' ? 'text-green-600 font-semibold' : ''}>
                    {key === 'infant' ? 'Free admission' : ''}
                    {key === 'child' ? 'Reduced price' : ''}
                    {key === 'adult' ? 'Full price' : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu for each day */}
        <div className="max-w-4xl mx-auto space-y-6 mb-8">
          {durgaPujaMeals2025.map((day, dayIndex) => (
            <div key={dayIndex} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {day.day}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date(day.date).toLocaleDateString('en-GB', { 
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long'
                  })}
                </p>
              </div>
              
              <div className={`grid gap-4 ${day.day.includes('Day 4') ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
                {/* Vegetarian Menu */}
                <div>
                  {day.vegItems.map(item => renderMenuItem(item, true))}
                </div>

                {/* Non-Vegetarian Menu */}
                {day.nonVegItems && day.nonVegItems.length > 0 && (
                  <div>
                    {day.nonVegItems.map(item => renderMenuItem(item, false))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Customer Information & Order Summary */}
        {getSelectedItemsCount() > 0 && (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Complete Your Order
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Customer Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Your Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      <User className="w-3 h-3 inline mr-1" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      <Mail className="w-3 h-3 inline mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  {/* <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                    <input
                      type="checkbox"
                      id="isMember"
                      checked={customerInfo.isMember}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, isMember: e.target.checked }))}
                      className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label htmlFor="isMember" className="ml-3 text-xs font-medium text-gray-700">
                      I declare that I and every adult in this reservation is a registered member of Sanskriti e.V.
                    </label>
                  </div> */}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Order Summary</h3>
                
                <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Total Items:</span>
                    <span className="font-semibold">{getSelectedItemsCount()}</span>
                  </div>
                  
                  {/* Detailed breakdown of selected items */}
                  <div className="border-t border-b border-gray-200 py-3 space-y-2">
                    {/* Anandamela attendance - show first if selected */}
                    {Object.entries(selectedItems)
                      .filter(([compositeKey]) => compositeKey.includes('anandamela'))
                      .some(([_, itemDetails]) => itemDetails.quantity > 0) && (
                        <div className="bg-orange-50 p-3 rounded-lg mb-2 border border-orange-100">
                          <div className="font-medium text-sm text-orange-800 mb-1">Anandamela Attendance</div>
                          <div className="text-xs text-orange-700 flex justify-between">
                            <span>Expected Attendees:</span>
                            <span className="font-medium">
                              {Object.entries(selectedItems)
                                .filter(([compositeKey]) => compositeKey.includes('anandamela'))
                                .reduce((sum, [_, itemDetails]) => sum + itemDetails.quantity, 0)}
                            </span>
                          </div>
                          {Object.entries(selectedItems)
                            .filter(([compositeKey]) => compositeKey.includes('anandamela'))
                            .map(([compositeKey, itemDetails]) => {
                              if (itemDetails.quantity === 0) return null;
                              // Extract age group from composite key
                              const ageGroupKey = compositeKey.split('-')[2] as keyof typeof AGE_GROUPS;
                              const ageGroupInfo = AGE_GROUPS[ageGroupKey];
                              
                              return (
                                <div key={compositeKey} className="text-xs text-orange-600 flex justify-between">
                                  <span>{ageGroupInfo.name}:</span>
                                  <span>{itemDetails.quantity}</span>
                                </div>
                              );
                            })}
                          <div className="text-xs mt-2 text-orange-600 italic">
                            Free registration - Pay for food at stalls
                          </div>
                        </div>
                      )
                    }
                    
                    {/* Meal items with pricing */}
                    {Object.entries(selectedItems)
                      .filter(([compositeKey]) => !compositeKey.includes('anandamela'))
                      .map(([compositeKey, itemDetails]) => {
                        if (itemDetails.quantity === 0) return null;
                        
                        // Parse item details from composite key
                        const [itemId, ageGroupKey] = compositeKey.split('-');
                        const isVeg = itemId.includes('veg-');
                        const dayNumber = itemId.match(/day(\d+)/)?.[1] || '1';
                        const dayIndex = parseInt(dayNumber) - 1;
                        const itemType = isVeg && !itemId.includes('nonveg') ? 'vegItems' : 'nonVegItems';
                        const day = durgaPujaMeals2025[dayIndex];
                        const items = itemType === 'vegItems' ? day.vegItems : day.nonVegItems || [];
                        const item = items.find(i => i.id === itemId);
                        
                        if (!item) return null;
                        
                        const ageGroupInfo = AGE_GROUPS[ageGroupKey as keyof typeof AGE_GROUPS];
                        const price = getPriceByDay(dayNumber, isVeg && !itemId.includes('nonveg'), ageGroupKey as keyof typeof AGE_GROUPS, customerInfo.isMember);
                        
                        return (
                          <div key={compositeKey} className="text-xs bg-white p-2 rounded">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">{item.name}</span>
                              <span className="text-gray-600">{day.day}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                {ageGroupInfo.name} • {itemDetails.quantity} × {price > 0 ? `€${price.toFixed(2)}` : 'Free'}
                              </span>
                              <span className="font-medium">{price > 0 ? `€${(price * itemDetails.quantity).toFixed(2)}` : 'Free'}</span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>€{totalAmount.toFixed(2)}</span>
                  </div>
                  {/* Member pricing message - shown instead of discount */}
                  {customerInfo.isMember && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Member Pricing:</span>
                      <span>Applied</span>
                    </div>
                  )}
                  <hr className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-orange-600">€{totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleProceedToPayment}
                  disabled={!isFormValid}
                  className="w-full mt-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Proceed to Payment
                </button>
                
                {!isFormValid && (
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Please select meals and fill in your information to continue
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="max-w-4xl mx-auto bg-blue-50 rounded-xl p-4 mb-8 border border-blue-100">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Important Information</h3>
          <ul className="space-y-1 text-xs text-blue-800">
            <li>• Meal reservations are required in advance for Days 1-3</li>
            <li>• Day 4 features Anandamela style food stalls - buy on spot</li>
            <li>• Children 0-8 years eat for free, 8-12 years at reduced price</li>
            <li>• You will receive a confirmation email after payment</li>
            <li>• For questions, contact us at admin@sanskriti-hamburg.de</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MealReservation2025;
