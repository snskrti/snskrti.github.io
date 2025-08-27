import React, { useEffect } from 'react';
import { Calendar, MapPin, Heart, TicketX, Leaf, Utensils } from 'lucide-react';
import { Footer } from '../../components/shared/Footer';
import { SEOHead } from '../../components/SEO/SEOHead';
import { getEventDate } from '../../utils/eventUtils';
import { durgaPujaMeals2025 } from '../../utils/mealData';
import { durgaPujaSchedule2025 } from '../../utils/eventScheduleData';

function DurgaPuja2025Schedule() {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Add scroll animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
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
        <section className="animate-on-scroll opacity-0">
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
                
                {/* Food Menu for Day 1 */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center mb-4">
                    <Heart className="w-6 h-6 text-amber-600 mr-3" />
                    <h3 className="text-xl font-semibold text-amber-800">Food Menu</h3>
                  </div>
                  
                  {durgaPujaMeals2025[0].vegItems.map((item) => (
                    <div key={item.id} className="mb-6">
                      <h4 className="text-base font-medium text-green-700 flex items-center mb-2">
                        <Leaf className="w-4 h-4 mr-2" />
                        {item.name}
                      </h4>
                      <div className="text-gray-700">
                        {item.description.split(',').map((menuItem, index) => (
                          <div key={index} className="py-1 border-b border-gray-100 last:border-b-0">
                            {menuItem.trim()}
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
                        {item.description.split(',').map((menuItem, index) => (
                          <div key={index} className="py-1 border-b border-gray-100 last:border-b-0">
                            {menuItem.trim()}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
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
                
                {/* Food Menu for Day 2 */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center mb-4">
                    <Heart className="w-6 h-6 text-amber-600 mr-3" />
                    <h3 className="text-xl font-semibold text-amber-800">Food Menu</h3>
                  </div>
                  
                  {durgaPujaMeals2025[1].vegItems.map((item) => (
                    <div key={item.id} className="mb-6">
                      <h4 className="text-base font-medium text-green-700 flex items-center mb-2">
                        <Leaf className="w-4 h-4 mr-2" />
                        {item.name}
                      </h4>
                      <div className="text-gray-700">
                        {item.description.split(',').map((menuItem, index) => (
                          <div key={index} className="py-1 border-b border-gray-100 last:border-b-0">
                            {menuItem.trim()}
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
                        {item.description.split(',').map((menuItem, index) => (
                          <div key={index} className="py-1 border-b border-gray-100 last:border-b-0">
                            {menuItem.trim()}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
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
                
                {/* Food Menu for Day 3 */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center mb-4">
                    <Heart className="w-6 h-6 text-amber-600 mr-3" />
                    <h3 className="text-xl font-semibold text-amber-800">Food Menu</h3>
                  </div>
                  
                  {durgaPujaMeals2025[2].vegItems.map((item) => (
                    <div key={item.id} className="mb-6">
                      <h4 className="text-base font-medium text-green-700 flex items-center mb-2">
                        <Leaf className="w-4 h-4 mr-2" />
                        {item.name}
                      </h4>
                      <div className="text-gray-700">
                        {item.description.split(',').map((menuItem, index) => (
                          <div key={index} className="py-1 border-b border-gray-100 last:border-b-0">
                            {menuItem.trim()}
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
                        {item.description.split(',').map((menuItem, index) => (
                          <div key={index} className="py-1 border-b border-gray-100 last:border-b-0">
                            {menuItem.trim()}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
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
                
                {/* Food Menu for Day 4 */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center mb-4">
                    <Heart className="w-6 h-6 text-amber-600 mr-3" />
                    <h3 className="text-xl font-semibold text-amber-800">Food Menu</h3>
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
                        <h4 className="font-semibold text-gray-800 text-lg mb-2">{item.name}</h4>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {item.description}
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
                      <p className="font-medium text-yellow-700">Food registration will be opened soon</p>
                    </div>
                    <p className="text-yellow-600 mt-1 text-center">We'll notify all members when the meal registration system is available.</p>
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
