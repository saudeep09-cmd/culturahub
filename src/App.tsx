import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ExploreEvents from './pages/ExploreEvents';
import HeritageTrails from './pages/HeritageTrails';
import Grants from './pages/Grants';
import AudioGuide from './pages/AudioGuide';
import Timelines from './pages/Timelines';
import CultureCapsules from './pages/CultureCapsules';
import Pricing from './pages/Pricing';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen gradient-bg">
          <Header />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/events" element={<ExploreEvents />} />
              <Route path="/trails" element={<HeritageTrails />} />
              <Route path="/grants" element={<Grants />} />
              <Route path="/audio-guide" element={<AudioGuide />} />
              <Route path="/timelines" element={<Timelines />} />
              <Route path="/culture-capsules" element={<CultureCapsules />} />
              <Route path="/pricing" element={<Pricing />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;