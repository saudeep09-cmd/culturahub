import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Heart, Globe, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cultural-blue-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cultural-red-500 to-cultural-gold-500 rounded-xl flex items-center justify-center">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-serif font-bold">CulturaHub</span>
                <p className="text-sm text-cultural-blue-300">Cultural Discovery Platform</p>
              </div>
            </div>
            <p className="text-cultural-blue-300 mb-4 max-w-md">
              Discover, explore, and connect with cultural experiences around the world. 
              From art exhibitions to historical timelines, we bring culture to your fingertips.
            </p>
            <div className="flex space-x-4">
              <Globe className="w-5 h-5 text-cultural-blue-400" />
              <Mail className="w-5 h-5 text-cultural-blue-400" />
              <Heart className="w-5 h-5 text-cultural-red-400" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/events" className="text-cultural-blue-300 hover:text-white transition-colors">Event Explorer</Link></li>
              <li><Link to="/audio" className="text-cultural-blue-300 hover:text-white transition-colors">Audio Zone</Link></li>
              <li><Link to="/timeline" className="text-cultural-blue-300 hover:text-white transition-colors">Cultural Timeline</Link></li>
              <li><Link to="/submit" className="text-cultural-blue-300 hover:text-white transition-colors">Submit Content</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif font-semibold text-white mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-cultural-blue-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-cultural-blue-300 hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="text-cultural-blue-300 hover:text-white transition-colors">Newsletter</a></li>
              <li><a href="#" className="text-cultural-blue-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cultural-blue-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-cultural-blue-400 text-sm">
              © 2024 CulturaHub. Made with <Heart className="w-4 h-4 inline text-cultural-red-400" /> for cultural communities.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-cultural-blue-400 hover:text-white text-sm transition-colors">Privacy</a>
              <a href="#" className="text-cultural-blue-400 hover:text-white text-sm transition-colors">Terms</a>
              <a href="#" className="text-cultural-blue-400 hover:text-white text-sm transition-colors">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}