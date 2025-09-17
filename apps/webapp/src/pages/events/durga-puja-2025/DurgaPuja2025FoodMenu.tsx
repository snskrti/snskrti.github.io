import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Calendar, MapPin, Heart, TicketX, Leaf, Utensils } from 'lucide-react';
import { Footer } from '../../../components/shared/Footer';
import { SEOHead } from '../../../components/SEO/SEOHead';
import { getEventDate } from '../../../utils/eventUtils';
import { durgaPujaMeals2025, FOOD_ITEMS } from '../../../utils/mealData';
import { FoodMenuItem } from 'types';

function DurgaPuja2025FoodMenu() {
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
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Sanskritir Pritibhoj</h1>
            
          </div>
        </div>
      </div>

      {/* Schedule Notice Banner */}
      <div className="bg-gradient-to-r from-amber-200 to-orange-200 py-4 border-y-2 border-amber-300 shadow-inner">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center">
            <p className="text-amber-900 font-semibold flex items-center justify-center mb-2 sm:mb-0">
              <Calendar className="w-5 h-5 mr-2 text-amber-700" />
              Plan your plate and your day!
            </p>
            <a 
              href="/events/durga-puja-2025/schedule" 
              className="sm:ml-3 inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-1.5 px-4 rounded-md text-sm transition-colors shadow-md hover:shadow-lg"
            >
              View Event Schedule
            </a>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-2 sm:px-4 py-8 sm:py-12">
        {/* Main Content Section */}
        <section className={`animate-on-scroll ${isContentVisible ? 'animate-fade-in' : ''}`}>
          <div className="bg-gradient-to-r from-orange-50 to-amber-100 p-4 sm:p-8 md:p-10 rounded-lg shadow-lg max-w-5xl mx-auto">
            
            {/* Food Menu Section - First Half */}
            <div className="mb-10 sm:mb-16">
              <div className="relative mb-6 sm:mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-amber-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-gradient-to-r from-orange-50 to-amber-100 px-3 sm:px-4 text-xl sm:text-2xl font-bold text-amber-700">
                    Food Menu
                  </span>
                </div>
              </div>
              
              {/* General Notice About Snacks */}
              <div className="bg-amber-50 p-3 sm:p-4 rounded-md mb-6 sm:mb-8 border border-amber-300">
                <p className="text-amber-800 font-medium text-center">
                  <span className="font-bold">Please Note:</span> Snacks will be available for purchase in the early evening hours on all days. 
                  We request guests to carry cash for buying snacks at the venue.
                </p>
              </div>
              
              {/* Day 1 Food Menu Card */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-amber-800 mb-3 sm:mb-4 border-b border-amber-200 pb-2">
                  Day 1: Shashti (Sunday, September 28)
                </h3>
                <div className="bg-white rounded-lg shadow p-3 sm:p-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 mr-2 sm:mr-3" />
                    <h3 className="text-lg sm:text-xl font-semibold text-amber-800">Dinner Menu</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Vegetarian Menu */}
                    {durgaPujaMeals2025[0].vegItems.map((item) => (
                      <div key={item.id} className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-100">
                        <h4 className="text-base font-medium text-green-700 flex items-center mb-2 sm:mb-3">
                          <Leaf className="w-4 h-4 mr-2" />
                          {item.name}
                        </h4>
                        <div className="text-gray-700">
                          {FOOD_ITEMS.day1VegItems.map((menuItem, index) => (
                            <div key={index} className="py-1 border-b border-gray-100 last:border-b-0">
                              <div className="font-medium">{menuItem.title}</div>
                              <div className="text-sm text-gray-600 italic pl-2">
                                {menuItem.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    {/* Non-Vegetarian Menu */}
                    {durgaPujaMeals2025[0].nonVegItems.map((item) => (
                      <div key={item.id} className="bg-red-50 rounded-lg p-3 sm:p-4 border border-red-100">
                        <h4 className="text-base font-medium text-red-700 flex items-center mb-2 sm:mb-3">
                          <Utensils className="w-4 h-4 mr-2" />
                          {item.name}
                        </h4>
                        <div className="text-gray-700">
                          {FOOD_ITEMS.day1NonVegItems.map((menuItem, index) => (
                            <div key={index} className="py-1 border-b border-gray-100 last:border-b-0">
                              <div className="font-medium">{menuItem.title}</div>
                              <div className="text-sm text-gray-600 italic pl-2">
                                {menuItem.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Day 2 Food Menu Card */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-amber-800 mb-3 sm:mb-4 border-b border-amber-200 pb-2">
                  Day 2: Saptami (Monday, September 29)
                </h3>
                <div className="bg-white rounded-lg shadow p-3 sm:p-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 mr-2 sm:mr-3" />
                    <h3 className="text-lg sm:text-xl font-semibold text-amber-800">Dinner Menu</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Vegetarian Menu */}
                    {durgaPujaMeals2025[1].vegItems.map((item) => (
                      <div key={item.id} className="bg-green-50 rounded-lg p-4 border border-green-100">
                        <h4 className="text-base font-medium text-green-700 flex items-center mb-3">
                          <Leaf className="w-4 h-4 mr-2" />
                          {item.name}
                        </h4>
                        <div className="text-gray-700">
                          {FOOD_ITEMS.day2VegItems.map((menuItem, index) => (
                            <div key={index} className="py-1 border-b border-gray-100 last:border-b-0">
                              <div className="font-medium">{menuItem.title}</div>
                              <div className="text-sm text-gray-600 italic pl-2">
                                {menuItem.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    {/* Non-Vegetarian Menu */}
                    {durgaPujaMeals2025[1].nonVegItems.map((item) => (
                      <div key={item.id} className="bg-red-50 rounded-lg p-4 border border-red-100">
                        <h4 className="text-base font-medium text-red-700 flex items-center mb-3">
                          <Utensils className="w-4 h-4 mr-2" />
                          {item.name}
                        </h4>
                        <div className="text-gray-700">
                          {FOOD_ITEMS.day2NonVegItems.map((menuItem, index) => (
                            <div key={index} className="py-1 border-b border-gray-100 last:border-b-0">
                              <div className="font-medium">{menuItem.title}</div>
                              <div className="text-sm text-gray-600 italic pl-2">
                                {menuItem.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Day 3 Food Menu Card */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-amber-800 mb-3 sm:mb-4 border-b border-amber-200 pb-2">
                  Day 3: Ashtami (Tuesday, September 30)
                </h3>
                <div className="bg-white rounded-lg shadow p-3 sm:p-6">
                  {/* Special Ashtami Bhog Notice */}
                  <div className="mb-3 sm:mb-4 bg-amber-50 p-2 sm:p-3 rounded-md border border-amber-200">
                    <p className="text-amber-800 text-xs sm:text-sm font-medium">
                      <span className="font-bold">Special for Ashtami:</span> Traditional Bhog will be served in the morning. Bhog is included in your food coupon for this day.
                    </p>
                  </div>
                  
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 mr-2 sm:mr-3" />
                    <h3 className="text-lg sm:text-xl font-semibold text-amber-800">Dinner Menu</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6">
                    {/* Vegetarian Menu */}
                    {durgaPujaMeals2025[2].vegItems.map((item) => (
                      <div key={item.id} className="bg-green-50 rounded-lg p-4 border border-green-100">
                        <h4 className="text-base font-medium text-green-700 flex items-center mb-3">
                          <Leaf className="w-4 h-4 mr-2" />
                          {item.name}
                        </h4>
                        <div className="text-gray-700">
                          {FOOD_ITEMS.day3VegItems.map((menuItem, index) => (
                            <div key={index} className="py-1 border-b border-gray-100 last:border-b-0">
                              <div className="font-medium">{menuItem.title}</div>
                              <div className="text-sm text-gray-600 italic pl-2">
                                {menuItem.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Day 4 Food Menu Card */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-amber-800 mb-3 sm:mb-4 border-b border-amber-200 pb-2">
                  Day 4: Navami & Dashami (Wednesday, October 1)
                </h3>
                <div className="bg-white rounded-lg shadow p-3 sm:p-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 mr-2 sm:mr-3" />
                    <h3 className="text-lg sm:text-xl font-semibold text-amber-800">Dinner Menu</h3>
                  </div>
                  
                  {durgaPujaMeals2025[3].vegItems.map((item) => (
                    <div key={item.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-3 sm:p-5 py-10 sm:py-20 border border-orange-200">
                      <div className="text-center">
                        <div className="inline-flex items-center space-x-2 mb-2 sm:mb-3 px-2 sm:px-3 py-1 sm:py-2 bg-orange-100 rounded-full">
                          <Utensils className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
                          <span className="text-xs font-medium text-orange-700">
                            Anandamela Style
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-800 text-base sm:text-lg mt-4 sm:mt-6 mb-1 sm:mb-2">{FOOD_ITEMS.day4Items[0].title}</h4>
                        <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                          {FOOD_ITEMS.day4Items[0].description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 sm:mt-10 text-center">
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 sm:p-4 rounded-md max-w-full sm:max-w-lg mx-auto">
                  <div className="flex items-center justify-center">
                    <TicketX className="h-4 h-4 sm:h-5 sm:w-5 text-yellow-600 mr-2" />
                    <p className="font-medium text-yellow-700 text-sm sm:text-base">Register for food now!</p>
                  </div>
                  <p className="text-yellow-600 mt-1 text-center text-xs sm:text-sm">Please fill out our meal registration form to reserve your food for the event.</p>
                  <p className="text-yellow-600 mt-1 text-center font-medium text-xs sm:text-sm">Limited tickets available on a first-come, first-served basis!</p>
                  <div className="mt-3 sm:mt-4 text-center">
                    <a 
                      href="/events/durga-puja-2025/meal-reservation" 
                      className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-md transition-colors text-sm sm:text-base"
                    >
                      Secure Your Dining Experience
                    </a>
                  </div>
                </div>
                
                <p className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-4">
                  Reserve your meals in advance for Days 1-3. For Day 4, food will be available at various stalls on the spot.
                </p>
              </div>
            </div>
            
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default DurgaPuja2025FoodMenu;
