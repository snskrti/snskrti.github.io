import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Euro, Check, ShoppingCart } from 'lucide-react';
import { Footer } from '../../components/shared/Footer';
import { SEOHead } from '../../components/SEO/SEOHead';
import { dinnerOptions, CartItem, CustomerInfo } from '../../types/dinnerReservation';
import { DinnerCheckout } from '../../components/DinnerReservation/DinnerCheckout';

export const DinnerReservation: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    isMember: false,
    membershipId: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addToCart = (date: string, title: string, price: number, memberPrice: number) => {
    const actualPrice = customerInfo.isMember ? memberPrice : price;
    const existingItem = selectedItems.find(item => item.date === date);
    
    if (existingItem) {
      setSelectedItems(prev => 
        prev.map(item => 
          item.date === date 
            ? { ...item, quantity: item.quantity + 1, price: actualPrice }
            : item
        )
      );
    } else {
      setSelectedItems(prev => [
        ...prev,
        { date, title, price: actualPrice, quantity: 1 }
      ]);
    }
  };

  const removeFromCart = (date: string) => {
    setSelectedItems(prev => prev.filter(item => item.date !== date));
  };

  const updateQuantity = (date: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(date);
      return;
    }
    
    setSelectedItems(prev => 
      prev.map(item => 
        item.date === date 
          ? { ...item, quantity }
          : item
      )
    );
  };

  const calculateTotal = () => {
    const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const memberDiscount = customerInfo.isMember ? subtotal * 0.1 : 0;
    const total = subtotal - memberDiscount;
    
    return { subtotal, memberDiscount, total };
  };

  const { subtotal, memberDiscount, total } = calculateTotal();

  if (showCheckout) {
    return (
      <DinnerCheckout
        items={selectedItems}
        customerInfo={customerInfo}
        onBack={() => setShowCheckout(false)}
        onCustomerInfoChange={setCustomerInfo}
      />
    );
  }

  return (
    <div className="min-h-screen bg-inherit">
      <SEOHead
        title="Dinner Reservations 2025 - Durga Puja Special | Sanskriti Hamburg"
        description="Book your dinner reservations for Durga Puja celebration 2025. Experience authentic Bengali cuisine from Sep 28 - Oct 1. Special member pricing available."
        keywords="dinner reservation, Bengali food, Durga Puja 2025, Hamburg, traditional cuisine, Sanskriti Hamburg, authentic dishes"
        url="/events/durga-puja-2025/dinner-reservations"
        type="website"
        image="/images/bengali-feast.jpg"
      />

      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-amber-900 to-orange-800">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-white text-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Durga Puja Dinner Reservations</h1>
            <p className="text-xl md:text-2xl">September 28 - October 1, 2025</p>
            <p className="text-lg mt-2">Experience Authentic Bengali Cuisine</p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Introduction */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">A Culinary Journey Through Bengal</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join us for an unforgettable dining experience during our Durga Puja celebrations. 
            Each day features a carefully curated menu showcasing the rich culinary heritage of Bengal, 
            prepared by our skilled chefs using traditional recipes and authentic ingredients.
          </p>
        </section>

        {/* Dinner Options */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Dining Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dinnerOptions.map((option) => {
              const existingItem = selectedItems.find(item => item.date === option.date);
              const displayPrice = customerInfo.isMember ? option.memberPrice : option.price;
              
              return (
                <div key={option.date} className="bg-white rounded-lg shadow-lg overflow-hidden border">
                  <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                    <div className="text-center">
                      <Calendar className="w-12 h-12 text-amber-600 mx-auto mb-2" />
                      <p className="text-lg font-semibold text-amber-800">
                        {new Date(option.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                    <p className="text-gray-600 mb-4">{option.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Menu:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {option.menu.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-gray-600">
                          <Euro className="w-4 h-4 mr-1" />
                          <span className="font-semibold text-lg">{displayPrice.toFixed(2)}</span>
                        </div>
                        {customerInfo.isMember && (
                          <div className="text-sm text-green-600">
                            <span className="line-through text-gray-400">€{option.price.toFixed(2)}</span>
                            <span className="ml-1 font-semibold">Member Price!</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-1" />
                        <span className="text-sm">{option.availableSlots} slots available</span>
                      </div>
                    </div>
                    
                    {existingItem ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(option.date, existingItem.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 bg-gray-100 rounded">{existingItem.quantity}</span>
                          <button
                            onClick={() => updateQuantity(option.date, existingItem.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(option.date)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(option.date, option.title, option.price, option.memberPrice)}
                        className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Member Toggle */}
        <section className="mb-16 bg-blue-50 rounded-lg p-6">
          <div className="flex items-center justify-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={customerInfo.isMember}
                onChange={(e) => {
                  setCustomerInfo(prev => ({ ...prev, isMember: e.target.checked }));
                  // Recalculate cart prices
                  setSelectedItems(prev => prev.map(item => {
                    const option = dinnerOptions.find(opt => opt.date === item.date);
                    if (option) {
                      return {
                        ...item,
                        price: e.target.checked ? option.memberPrice : option.price
                      };
                    }
                    return item;
                  }));
                }}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-lg font-semibold">I am a Sanskriti e.V. member</span>
            </label>
            <div className="text-sm text-gray-600">
              Members get 10% discount on all prices!
            </div>
          </div>
        </section>

        {/* Cart Summary */}
        {selectedItems.length > 0 && (
          <section className="mb-16">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-center">Your Reservation Summary</h3>
              
              <div className="space-y-4 mb-6">
                {selectedItems.map((item) => (
                  <div key={item.date} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(item.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">€{item.price.toFixed(2)} x {item.quantity}</p>
                      <p className="text-sm text-gray-600">€{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg">Subtotal:</span>
                  <span className="text-lg">€{subtotal.toFixed(2)}</span>
                </div>
                {memberDiscount > 0 && (
                  <div className="flex justify-between items-center mb-2 text-green-600">
                    <span>Member Discount (10%):</span>
                    <span>-€{memberDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-xl font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={() => setShowCheckout(true)}
                className="w-full mt-6 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
              >
                Proceed to Checkout
              </button>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};
