import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SponsorsPartners from './pages/SponsorsPartners';
import DurgaPuja2025 from './pages/events/durga-puja-2025/DurgaPuja2025';
import DurgaPuja2025Schedule from './pages/events/durga-puja-2025/DurgaPuja2025Schedule';
import HomePage from './pages/HomePage';
import DonationsPage from './pages/DonationsPage';
import PageNotFound from './pages/PageNotFound';
import Holi2025 from './pages/events/Holi2025';
import { MembershipRequest } from './pages/MembershipRequest';
import { DummyPage } from './pages/DummyPage';
import Rakhi2025 from './pages/events/Rakhi2025';
import SitAndDraw2025 from './pages/events/SitAndDraw2025';
import Diwali2025 from './pages/events/Diwali2025';
import MealReservation2025 from './pages/events/durga-puja-2025/MealReservation2025';
import MealPayment2025 from './pages/events/durga-puja-2025/MealPayment2025';
import PaymentConfirmation from './pages/events/durga-puja-2025/PaymentConfirmation';
// Import the shared payment confirmation component
import SharedPaymentConfirmation from './components/shared/payment/PaymentConfirmation';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sponsors-partners" element={<SponsorsPartners />} />
          <Route path="/events/holi-2025" element={<Holi2025 />} />
          <Route path="/events/rakhi-2025" element={<Rakhi2025 />} />
          <Route path="/events/sit-and-draw-2025" element={<SitAndDraw2025 />} />
          <Route path="/events/durga-puja-2025" element={<DurgaPuja2025 />} />
          <Route path="/events/durga-puja-2025/schedule" element={<DurgaPuja2025Schedule />} />
          <Route path="/events/durga-puja-2025/meal-reservation" element={<MealReservation2025 />} />
          <Route path="/events/durga-puja-2025/meal-payment" element={<MealPayment2025 />} />
          <Route path="/events/durga-puja-2025/payment-confirmation" element={<PaymentConfirmation />} />
          <Route path="/events/diwali-2025" element={<Diwali2025 />} />
          <Route path="/membership/request" element={<MembershipRequest />} />
          <Route path="/donations" element={<DonationsPage />} />
          <Route path="/dummy" element={<DummyPage />} />
          {/* Generic payment confirmation route that can be used by any event */}
          <Route path="/payment-confirmation" element={<SharedPaymentConfirmation />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;