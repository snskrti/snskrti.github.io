import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import SitAndDraw2025 from './pages/events/SitAndDraw2025';
import Diwali2025 from './pages/events/Diwali2025';
import MealReservation2025 from './pages/events/durga-puja-2025/MealReservation2025';
import MealPayment2025 from './pages/events/durga-puja-2025/MealPayment2025';
// Import the shared payment confirmation component
import SharedPaymentConfirmation from './components/shared/payment/PaymentConfirmation';
import DurgaPuja2025FoodMenu from './pages/events/durga-puja-2025/DurgaPuja2025FoodMenu';
import Mahalaya2025 from './pages/events/durga-puja-2025/Mahalaya2025';
function App() {
    return (_jsx(HelmetProvider, { children: _jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/sponsors-partners", element: _jsx(SponsorsPartners, {}) }), _jsx(Route, { path: "/events/holi-2025", element: _jsx(Holi2025, {}) }), _jsx(Route, { path: "/events/mahalaya-2025", element: _jsx(Mahalaya2025, {}) }), _jsx(Route, { path: "/events/sit-and-draw-2025", element: _jsx(SitAndDraw2025, {}) }), _jsx(Route, { path: "/events/durga-puja-2025", element: _jsx(DurgaPuja2025, {}) }), _jsx(Route, { path: "/events/durga-puja-2025/schedule", element: _jsx(DurgaPuja2025Schedule, {}) }), _jsx(Route, { path: "/events/durga-puja-2025/food-menu", element: _jsx(DurgaPuja2025FoodMenu, {}) }), _jsx(Route, { path: "/events/durga-puja-2025/meal-reservation", element: _jsx(MealReservation2025, {}) }), _jsx(Route, { path: "/events/durga-puja-2025/meal-payment", element: _jsx(MealPayment2025, {}) }), _jsx(Route, { path: "/events/diwali-2025", element: _jsx(Diwali2025, {}) }), _jsx(Route, { path: "/membership/request", element: _jsx(MembershipRequest, {}) }), _jsx(Route, { path: "/donations", element: _jsx(DonationsPage, {}) }), _jsx(Route, { path: "/dummy", element: _jsx(DummyPage, {}) }), _jsx(Route, { path: "/payment-confirmation", element: _jsx(SharedPaymentConfirmation, {}) }), _jsx(Route, { path: "*", element: _jsx(PageNotFound, {}) })] }) }) }));
}
export default App;
