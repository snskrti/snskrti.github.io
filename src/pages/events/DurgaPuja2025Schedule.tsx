import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Calendar, MapPin, Heart, TicketX, Leaf, Utensils } from 'lucide-react';
import { Footer } from '../../components/shared/Footer';
import { SEOHead } from '../../components/SEO/SEOHead';
import { getEventDate } from '../../utils/eventUtils';
import { durgaPujaMeals2025, FOOD_ITEMS } from '../../utils/mealData';
import { durgaPujaSchedule2025 } from '../../utils/eventScheduleData';
import { FoodMenuItem } from '../../types/mealReservation';

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
        title="Schedule & Food Menu - Durga Puja 2025 | Sanskriti Hamburg"
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
      <div className="relative h-64 md:h-80">
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
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="w-5 h-5" />
              <p className="text-xl font-light">Durga Puja 2025</p>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Schedule & Food Menu</h1>
            
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Schedule and Food Menu Section */}
        <section className={`animate-on-scroll ${isContentVisible ? 'animate-fade-in' : ''}`}>
          <div className="bg-gradient-to-r from-orange-50 to-amber-100 p-10 rounded-lg shadow-lg max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-amber-800 mb-6 text-center">Program Schedule & Food Menu</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-10"></div>
            
            {/* Day 1 - Shashti */}
            <div className="mb-12">
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-amber-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-gradient-to-r from-orange-50 to-amber-100 px-4 text-2xl font-bold text-amber-700">
                    Day 1: Shashti (Sunday, September 28)
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Schedule for Day 1 */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-6 h-6 text-amber-600 mr-3" />
                    <h3 className="text-xl font-semibold text-amber-800">Schedule</h3>
                  </div>
                  <ul className="space-y-4">
                    {durgaPujaSchedule2025[0].scheduleItems.map((item) => (
                      <li key={item.id} className="flex">
                        <span className="text-amber-700 font-semibold w-24">{item.time}</span>
                        <div>
                          <span className="font-medium text-gray-800">{item.title}</span>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Dinner Menu for Day 1 */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center mb-4">
                    <Heart className="w-6 h-6 text-amber-600 mr-3" />
                    <h3 className="text-xl font-semibold text-amber-800">Dinner Menu</h3>
                  </div>
                  
                  {durgaPujaMeals2025[0].vegItems.map((item) => (
                    <div key={item.id} className="mb-6">
                      <h4 className="text-base font-medium text-green-700 flex items-center mb-2">
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
                  
                  {durgaPujaMeals2025[0].nonVegItems.map((item) => (
                    <div key={item.id}>
                      <h4 className="text-base font-medium text-red-700 flex items-center mb-2">
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
                  
                  <div className="bg-amber-50 p-3 rounded-md mt-6 border border-amber-200">
                    <p className="text-amber-700 text-sm font-medium">
                      <span className="font-bold">Please Note:</span> Snacks will be available for purchase in the early evening hours. 
                      We request guests to carry cash for buying snacks at the venue.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Day 2 - Saptami */}
            <div className="mb-12">
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-amber-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-gradient-to-r from-orange-50 to-amber-100 px-4 text-2xl font-bold text-amber-700">
                    Day 2: Saptami (Monday, September 29)
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Schedule for Day 2 */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-6 h-6 text-amber-600 mr-3" />
                    <h3 className="text-xl font-semibold text-amber-800">Schedule</h3>
                  </div>
                  <ul className="space-y-4">
                    {durgaPujaSchedule2025[1].scheduleItems.map((item) => (
                      <li key={item.id} className="flex">
                        <span className="text-amber-700 font-semibold w-24">{item.time}</span>
                        <div>
                          <span className="font-medium text-gray-800">{item.title}</span>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Dinner Menu for Day 2 */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center mb-4">
                    <Heart className="w-6 h-6 text-amber-600 mr-3" />
                    <h3 className="text-xl font-semibold text-amber-800">Dinner Menu</h3>
                  </div>
                  
                  {durgaPujaMeals2025[1].vegItems.map((item) => (
                    <div key={item.id} className="mb-6">
                      <h4 className="text-base font-medium text-green-700 flex items-center mb-2">
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
                  
                  {durgaPujaMeals2025[1].nonVegItems.map((item) => (
                    <div key={item.id}>
                      <h4 className="text-base font-medium text-red-700 flex items-center mb-2">
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
                  
                  <div className="bg-amber-50 p-3 rounded-md mt-6 border border-amber-200">
                    <p className="text-amber-700 text-sm font-medium">
                      <span className="font-bold">Please Note:</span> Snacks will be available for purchase in the early evening hours. 
                      We request guests to carry cash for buying snacks at the venue.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Day 3 - Ashtami */}
            <div className="mb-12">
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-amber-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-gradient-to-r from-orange-50 to-amber-100 px-4 text-2xl font-bold text-amber-700">
                    Day 3: Ashtami (Tuesday, September 30)
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Schedule for Day 3 */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-6 h-6 text-amber-600 mr-3" />
                    <h3 className="text-xl font-semibold text-amber-800">Schedule</h3>
                  </div>
                  <ul className="space-y-4">
                    {durgaPujaSchedule2025[2].scheduleItems.map((item) => (
                      <li key={item.id} className="flex">
                        <span className="text-amber-700 font-semibold w-24">{item.time}</span>
                        <div>
                          <span className="font-medium text-gray-800">{item.title}</span>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Dinner Menu for Day 3 */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center mb-4">
                    <Heart className="w-6 h-6 text-amber-600 mr-3" />
                    <h3 className="text-xl font-semibold text-amber-800">Dinner Menu</h3>
                  </div>
                  
                  {durgaPujaMeals2025[2].vegItems.map((item) => (
                    <div key={item.id} className="mb-6">
                      <h4 className="text-base font-medium text-green-700 flex items-center mb-2">
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
                  
                  {durgaPujaMeals2025[2].nonVegItems && durgaPujaMeals2025[2].nonVegItems.map((item) => (
                    <div key={item.id}>
                      <h4 className="text-base font-medium text-red-700 flex items-center mb-2">
                        <Utensils className="w-4 h-4 mr-2" />
                        {item.name}
                      </h4>
                      <div className="text-gray-700">
                        {/* No non-veg items for Day 3 */}
                      </div>
                    </div>
                  ))}
                  
                  <div className="bg-amber-50 p-3 rounded-md mt-6 border border-amber-200">
                    <p className="text-amber-700 text-sm font-medium">
                      <span className="font-bold">Please Note:</span> Snacks will be available for purchase in the early evening hours. 
                      We request guests to carry cash for buying snacks at the venue.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Day 4 - Navami & Dashami */}
            <div>
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-amber-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-gradient-to-r from-orange-50 to-amber-100 px-4 text-2xl font-bold text-amber-700">
                    Day 4: Navami & Dashami (Wednesday, October 1)
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Schedule for Day 4 */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-6 h-6 text-amber-600 mr-3" />
                    <h3 className="text-xl font-semibold text-amber-800">Schedule</h3>
                  </div>
                  <ul className="space-y-4">
                    {durgaPujaSchedule2025[3].scheduleItems.map((item) => (
                      <li key={item.id} className="flex">
                        <span className="text-amber-700 font-semibold w-24">{item.time}</span>
                        <div>
                          <span className="font-medium text-gray-800">{item.title}</span>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Dinner Menu for Day 4 */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center mb-4">
                    <Heart className="w-6 h-6 text-amber-600 mr-3" />
                    <h3 className="text-xl font-semibold text-amber-800">Dinner Menu</h3>
                  </div>
                  
                  {durgaPujaMeals2025[3].vegItems.map((item) => (
                    <div key={item.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-5 border border-orange-200">
                      <div className="text-center">
                        <div className="inline-flex items-center space-x-2 mb-3 px-3 py-2 bg-orange-100 rounded-full">
                          <Utensils className="w-4 h-4 text-orange-600" />
                          <span className="text-xs font-medium text-orange-700">
                            Anandamela Style
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-800 text-lg mb-2">{FOOD_ITEMS.day4Items[0].title}</h4>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {FOOD_ITEMS.day4Items[0].description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              
              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-md max-w-lg mx-auto">
                <div className="flex items-center justify-center">
                <TicketX className="h-5 w-5 text-yellow-600 mr-2" />
                <p className="font-medium text-yellow-700">Register for food now!</p>
                </div>
              <p className="text-yellow-600 mt-1 text-center">Please fill out our meal registration form to reserve your food for the event.</p>
              <p className="text-yellow-600 mt-1 text-center font-medium">Limited tickets available on a first-come, first-served basis!</p>
              <div className="mt-4 text-center">
                <a 
                href="https://forms.fillout.com/t/grq8oAVDuFus" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                Register for Food
                </a>
              </div>
              </div>
              
              <p className="text-sm text-gray-600 mt-4">
                Reserve your meals in advance for Days 1-3. For Day 4, food will be available at various stalls on the spot.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default DurgaPuja2025Schedule;
