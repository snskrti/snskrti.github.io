import React from 'react';
import { Calendar, Utensils, ArrowRight } from 'lucide-react';

export const DinnerReservationBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 rounded-lg shadow-lg mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Utensils className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Durga Puja Dinner Reservations</h3>
            <p className="text-white/90">September 28 - October 1, 2025</p>
            <p className="text-sm text-white/80">Experience authentic Bengali cuisine • Member discounts available</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-white/80">Starting from</p>
            <p className="text-2xl font-bold">€18.00</p>
          </div>
          <button
            onClick={() => window.location.href = '/events/durga-puja-2025/dinner-reservations'}
            className="bg-white text-amber-600 px-6 py-3 rounded-full hover:bg-gray-100 transition-colors flex items-center space-x-2 font-semibold"
          >
            <Calendar className="w-5 h-5" />
            <span>Book Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
