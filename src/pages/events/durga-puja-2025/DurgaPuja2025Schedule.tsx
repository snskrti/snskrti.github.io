import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Calendar, MapPin, Heart, TicketX, Leaf, Utensils } from 'lucide-react';
import { Footer } from '../../../components/shared/Footer';
import { SEOHead } from '../../../components/SEO/SEOHead';
import { getEventDate } from '../../../utils/eventUtils';
import { durgaPujaMeals2025, FOOD_ITEMS } from '../../../utils/mealData';
import { durgaPujaSchedule2025 } from '../../../utils/eventScheduleData';
import { FoodMenuItem } from '../../../types/mealReservation';

function DurgaPuja2025Schedule() {
  const [isContentVisible, setIsContentVisible] = useState(true); // Start with visible content by default

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Make content visible immediately to prevent blank screens on mobile
    setIsContentVisible(true);
    
    // Fallback animation approach that works on both desktop and mobile
    const animateElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        element.classList.add('animate-fade-in');
      });
    };
    
    // Small delay to ensure DOM is ready
    setTimeout(animateElements, 100);
    
    // Add a fallback in case JavaScript fails to execute properly on mobile
    const fallbackTimer = setTimeout(() => {
      const mainContent = document.querySelector('section.animate-on-scroll');
      if (mainContent && mainContent.classList.contains('opacity-0')) {
        mainContent.classList.remove('opacity-0');
        mainContent.classList.add('animate-fade-in');
      }
    }, 1000);
    
    return () => {
      clearTimeout(fallbackTimer);
    };
  }, []);

  const eventDate = getEventDate('/events/durga-puja-2025');
  
  return (
    <div className="min-h-screen bg-inherit">
      <SEOHead
        title="Food & Schedule - Durga Puja 2025 | Sanskriti Hamburg"
        description="Detailed schedule and food menu for all four days of Durga Puja 2025 celebration in Hamburg. View program timings and authentic Bengali cuisine for each day."
        keywords="Durga Puja 2025, Hamburg, Bengali festival, schedule, food menu, Durga Puja Hamburg, Bengali cuisine, Maa Durga, cultural performances, puja timings, Sanskriti Hamburg"
        url="/events/durga-puja-2025/schedule"
        type="event"
        image="/images/logo.png"
        eventStartDate="2025-09-28T00:00"
        eventEndDate="2025-10-01T00:00"
        eventLocation="Nienhöfener Str. 18, 25421 Pinneberg"
        eventType="Cultural Festival"
        performer="Sanskriti e.V."
      />

      {/* Hero Section */}
      <div className="relative h-48 sm:h-64 md:h-80">
        <img
          src="/images/ma-durga-face-right.jpg"
          alt="Durga Puja Celebration"
          className="w-full h-full object-cover blur-sm opacity-90"
          loading="eager"
          width="1200"
          height="800"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex items-center justify-center space-x-2 mb-2 sm:mb-4">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              <p className="text-lg sm:text-xl font-light">Durga Puja 2025</p>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Program Schedule</h1>

          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-2 sm:px-4 py-8 sm:py-12">
        {/* Main Content Section */}
        <section className={`animate-on-scroll ${isContentVisible ? 'animate-fade-in' : ''}`}>
          <div className="bg-gradient-to-r from-orange-50 to-amber-100 p-4 sm:p-8 md:p-10 rounded-lg shadow-lg max-w-5xl mx-auto">
            
            {/* Program Schedule Section - Second Half */}
            <div>
              <div className="relative mb-6 sm:mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-amber-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-gradient-to-r from-orange-50 to-amber-100 px-3 sm:px-4 text-xl sm:text-2xl font-bold text-amber-700">
                    Program Schedule
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-4 sm:mb-8">
                {/* Day 1 Schedule Card */}
                <div className="flex flex-col">
                  <h3 className="text-lg sm:text-xl font-semibold text-amber-800 mb-3 sm:mb-4 border-b border-amber-200 pb-2">
                    Day 1: Shashti (Sunday, September 28)
                  </h3>
                  <div className="bg-white rounded-lg shadow p-3 sm:p-6 flex-1">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 mr-2 sm:mr-3" />
                      <h3 className="text-lg sm:text-xl font-semibold text-amber-800">Schedule</h3>
                    </div>
                    <ul className="space-y-3 sm:space-y-4">
                      {durgaPujaSchedule2025[0].scheduleItems.map((item) => (
                        <li key={item.id} className="flex">
                          <span className="text-amber-700 font-semibold w-20 sm:w-24 text-sm sm:text-base">{item.time}</span>
                          <div>
                            <span className="font-medium text-gray-800 text-sm sm:text-base">{item.title}</span>
                            <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Day 2 Schedule Card */}
                <div className="flex flex-col">
                  <h3 className="text-lg sm:text-xl font-semibold text-amber-800 mb-3 sm:mb-4 border-b border-amber-200 pb-2">
                    Day 2: Saptami (Monday, September 29)
                  </h3>
                  <div className="bg-white rounded-lg shadow p-3 sm:p-6 flex-1">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 mr-2 sm:mr-3" />
                      <h3 className="text-lg sm:text-xl font-semibold text-amber-800">Schedule</h3>
                    </div>
                    <ul className="space-y-3 sm:space-y-4">
                      {durgaPujaSchedule2025[1].scheduleItems.map((item) => (
                        <li key={item.id} className="flex">
                          <span className="text-amber-700 font-semibold w-20 sm:w-24 text-sm sm:text-base">{item.time}</span>
                          <div>
                            <span className="font-medium text-gray-800 text-sm sm:text-base">{item.title}</span>
                            <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                {/* Day 3 Schedule Card */}
                <div className="flex flex-col">
                  <h3 className="text-lg sm:text-xl font-semibold text-amber-800 mb-3 sm:mb-4 border-b border-amber-200 pb-2">
                    Day 3: Ashtami (Tuesday, September 30)
                  </h3>
                  <div className="bg-white rounded-lg shadow p-3 sm:p-6 flex-1">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 mr-2 sm:mr-3" />
                      <h3 className="text-lg sm:text-xl font-semibold text-amber-800">Schedule</h3>
                    </div>
                    <ul className="space-y-3 sm:space-y-4">
                      {/* Add Bhog timing */}
                      <li className="flex">
                        <span className="text-amber-700 font-semibold w-20 sm:w-24 text-sm sm:text-base">11:30 AM</span>
                        <div>
                          <span className="font-medium text-gray-800 text-sm sm:text-base">Ashtami Bhog</span>
                          <p className="text-xs sm:text-sm text-gray-600">Traditional prasad distribution (included with your food coupon)</p>
                        </div>
                      </li>
                      {durgaPujaSchedule2025[2].scheduleItems.map((item) => (
                        <li key={item.id} className="flex">
                          <span className="text-amber-700 font-semibold w-20 sm:w-24 text-sm sm:text-base">{item.time}</span>
                          <div>
                            <span className="font-medium text-gray-800 text-sm sm:text-base">{item.title}</span>
                            <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Day 4 Schedule Card */}
                <div className="flex flex-col">
                  <h3 className="text-lg sm:text-xl font-semibold text-amber-800 mb-3 sm:mb-4 border-b border-amber-200 pb-2">
                    Day 4: Navami & Dashami (Wednesday, October 1)
                  </h3>
                  <div className="bg-white rounded-lg shadow p-3 sm:p-6 flex-1">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 mr-2 sm:mr-3" />
                      <h3 className="text-lg sm:text-xl font-semibold text-amber-800">Schedule</h3>
                    </div>
                    <ul className="space-y-3 sm:space-y-4">
                      {durgaPujaSchedule2025[3].scheduleItems.map((item) => (
                        <li key={item.id} className="flex">
                          <span className="text-amber-700 font-semibold w-20 sm:w-24 text-sm sm:text-base">{item.time}</span>
                          <div>
                            <span className="font-medium text-gray-800 text-sm sm:text-base">{item.title}</span>
                            <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default DurgaPuja2025Schedule;
