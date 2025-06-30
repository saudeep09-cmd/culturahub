import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-mint-500 to-lavender-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CH</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-mint-600 to-lavender-600 bg-clip-text text-transparent">
                CulturaHub
              </span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Your gateway to cultural exploration, connecting communities through events, heritage trails, and immersive experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-mint-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-mint-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-mint-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-mint-500 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link to="/events" className="text-gray-600 hover:text-mint-600 transition-colors">Explore Events</Link></li>
              <li><Link to="/trails" className="text-gray-600 hover:text-mint-600 transition-colors">Heritage Trails</Link></li>
              <li><Link to="/grants" className="text-gray-600 hover:text-mint-600 transition-colors">Grants & Residencies</Link></li>
              <li><Link to="/audio-guide" className="text-gray-600 hover:text-mint-600 transition-colors">Audio Guide Creator</Link></li>
              <li><Link to="/timelines" className="text-gray-600 hover:text-mint-600 transition-colors">Create Timelines</Link></li>
              <li><Link to="/culture-capsules" className="text-gray-600 hover:text-mint-600 transition-colors">Culture Capsules</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-mint-600 transition-colors">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-mint-600 transition-colors">Blog</a></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-mint-600 transition-colors">Pricing</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-mint-600 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-mint-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-mint-600 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 mt-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 CulturaHub. All rights reserved. Made with ❤️ for cultural communities.
          </p>
        </div>
      </div>
    </footer>
  );
}