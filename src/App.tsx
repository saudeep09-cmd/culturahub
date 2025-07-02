import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import EventExplorer from './pages/EventExplorer';
import AudioZone from './pages/AudioZone';
import Timeline from './pages/Timeline';
import CreatorSubmission from './pages/CreatorSubmission';

function App() {
  return (
    <Router>
      <div className="min-h-screen cultural-gradient">
        <Header />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventExplorer />} />
            <Route path="/audio" element={<AudioZone />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/submit" element={<CreatorSubmission />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;