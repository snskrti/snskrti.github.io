import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SponsorsPartners from './pages/SponsorsPartners';
import DurgaPuja2025 from './pages/DurgaPuja2025';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import Holi2025 from './pages/Holi2025';
import { MembershipRequest } from './pages/MembershipRequest';
import { DummyPage } from './pages/DummyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sponsors-partners" element={<SponsorsPartners />} />
        <Route path="/events/durga-puja-2025" element={<DurgaPuja2025 />} />
        <Route path="/events/holi-2025" element={<Holi2025 />} />
        <Route path="/membership/request" element={<MembershipRequest />} />
        <Route path="/dummy" element={<DummyPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;