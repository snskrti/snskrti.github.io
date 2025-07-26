import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Plus, Minus, ShoppingCart, User, Mail, Utensils, Leaf } from 'lucide-react';
import { Footer } from '../../components/shared/Footer';
import { SEOHead } from '../../components/SEO/SEOHead';
import { durgaPujaMeals2025, MEMBER_DISCOUNT_PERCENTAGE, getPriceByDay } from '../../utils/mealData';
import { MealReservation, MenuItem } from '../../types/mealReservation';

function MealReservation2025() {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<{[itemId: string]: number}>({});
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    isMember: false
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    calculateTotal();
    validateForm();
  }, [selectedItems, customerInfo]);

  const calculateTotal = useCallback(() => {
    let total = 0;
    
    durgaPujaMeals2025.forEach(day => {
      [...day.vegItems, ...day.nonVegItems].forEach(item => {
        const quantity = selectedItems[item.id] || 0;
        total += item.price * quantity;
      });
    });

    const discount = customerInfo.isMember ? (total * MEMBER_DISCOUNT_PERCENTAGE / 100) : 0;
    const final = total - discount;

    setTotalAmount(total);
    setDiscountAmount(discount);
    setFinalAmount(final);
  }, [selectedItems, customerInfo.isMember]);

  const validateForm = useCallback(() => {
    const hasSelectedItems = Object.values(selectedItems).some(qty => qty > 0);
    const hasValidCustomerInfo = customerInfo.name.trim() !== '' && 
                                customerInfo.email.trim() !== '' && 
                                customerInfo.email.includes('@');
    
    setIsFormValid(hasSelectedItems && hasValidCustomerInfo);
  }, [selectedItems, customerInfo.name, customerInfo.email]);

  const updateQuantity = (itemId: string, change: number) => {
    setSelectedItems(prev => {
      const currentQty = prev[itemId] || 0;
      const newQty = Math.max(0, currentQty + change);
      return {
        ...prev,
        [itemId]: newQty
      };
    });
  };

  const getSelectedItemsCount = () => {
    return Object.values(selectedItems).reduce((sum, qty) => sum + qty, 0);
  };

  const handleProceedToPayment = () => {
    if (!isFormValid) return;

    const reservationData: MealReservation = {
      selectedItems,
      customerInfo,
      totalAmount,
      discountAmount,
      finalAmount
    };

    navigate('/events/durga-puja-2025/meal-payment', { state: reservationData });
  };

  const renderMenuItem = (item: MenuItem, isVeg: boolean) => {
    const quantity = selectedItems[item.id] || 0;
    
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
              <div className="inline-flex items-center px-3 py-2 bg-orange-600 text-white rounded-lg text-xs font-medium">
                Buy Fresh Food on Spot - No Pre-booking Required
              </div>
            </div>
          </div>
        </div>
      );
    }
    
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
            <div className="text-right">
              <div className="text-lg font-bold text-orange-600">€{item.price.toFixed(2)}</div>
              {quantity > 0 && (
                <div className="text-sm text-gray-500">
                  €{(item.price * quantity).toFixed(2)} total
                </div>
              )}
            </div>
          </div>
          
          <h4 className="font-semibold text-gray-800 text-sm mb-2">{item.name}</h4>
          <p className="text-xs text-gray-600 mb-4 leading-relaxed">{item.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                disabled={quantity === 0}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="w-8 text-center font-semibold text-sm">{quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="w-8 h-8 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-600 flex items-center justify-center transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            {quantity > 0 && (
              <div className="text-xs font-medium text-orange-600">
                {quantity} thali{quantity > 1 ? 's' : ''}
              </div>
            )}
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
            Members enjoy a 20% discount on all meals!
          </p>
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
                {day.nonVegItems.length > 0 && (
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

                  <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                    <input
                      type="checkbox"
                      id="isMember"
                      checked={customerInfo.isMember}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, isMember: e.target.checked }))}
                      className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label htmlFor="isMember" className="ml-3 text-xs font-medium text-gray-700">
                      I am a Sanskriti Hamburg member
                      <span className="block text-xs text-orange-600 font-semibold">Get 20% discount!</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Order Summary</h3>
                
                <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Total Thalis:</span>
                    <span className="font-semibold">{getSelectedItemsCount()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>€{totalAmount.toFixed(2)}</span>
                  </div>
                  {customerInfo.isMember && discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Member Discount (20%):</span>
                      <span>-€{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <hr className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-orange-600">€{finalAmount.toFixed(2)}</span>
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
            <li>• Members receive a 20% discount on all meals</li>
            <li>• You will receive a confirmation email after payment</li>
            <li>• Event venue details will be shared closer to the date</li>
            <li>• For questions, contact us at admin@sanskriti-hamburg.de</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MealReservation2025;
