import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SponsorsPartners from './pages/SponsorsPartners';
import DurgaPuja2025 from './pages/DurgaPuja2025';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sponsors-partners" element={<SponsorsPartners />} />
        <Route path="/events/durga-puja-2025" element={<DurgaPuja2025 />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;