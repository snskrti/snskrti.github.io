import React, { useEffect } from 'react';
import { Facebook, Instagram, Youtube, Mail, Home, Calendar, Users } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SponsorsPartners from './pages/SponsorsPartners';
import DurgaPuja2025 from './pages/DurgaPuja2025';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sponsors-partners" element={<SponsorsPartners />} />
        <Route path="/events/durga-puja-2025" element={<DurgaPuja2025 />} />
      </Routes>
    </Router>
  );
}

export default App;