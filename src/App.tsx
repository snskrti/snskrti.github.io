import React, { useEffect } from 'react';
import { Facebook, Instagram, Youtube, Mail, Home, Calendar, Users } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SponsorsPartners from './pages/SponsorsPartners';
import DurgaPujo from './pages/DurgaPujo';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sponsors-partners" element={<SponsorsPartners />} />
        <Route path="/durga-pujo-2025" element={<DurgaPujo />} />
      </Routes>
    </Router>
  );
}

export default App;