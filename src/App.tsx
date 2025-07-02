import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import EventsMap from './pages/EventsMap'
import AudioLibrary from './pages/AudioLibrary'
import Timeline from './pages/Timeline'
import Grants from './pages/Grants'
import Dashboard from './pages/Dashboard'
import AskCultura from './components/AskCultura'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen cultural-gradient">
          <Header />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<EventsMap />} />
              <Route path="/audio" element={<AudioLibrary />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/grants" element={<Grants />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
          <AskCultura />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App