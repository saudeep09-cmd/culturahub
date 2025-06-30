import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-mint-500 to-lavender-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CH</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-mint-600 to-lavender-600 bg-clip-text text-transparent">
                CulturaHub
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/events" className="text-gray-700 hover:text-mint-600 transition-colors">
                Events
              </Link>
              <Link to="/trails" className="text-gray-700 hover:text-mint-600 transition-colors">
                Trails
              </Link>
              <Link to="/grants" className="text-gray-700 hover:text-mint-600 transition-colors">
                Grants
              </Link>
              <Link to="/pricing" className="text-gray-700 hover:text-mint-600 transition-colors">
                Pricing
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                    {user.plan === 'pro' && (
                      <Crown className="w-4 h-4 text-peach-500" />
                    )}
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        to="/pricing"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Crown className="w-4 h-4" />
                        <span>Upgrade to Pro</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="btn-primary"
                >
                  Sign In
                </button>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <Link to="/events" className="text-gray-700 hover:text-mint-600 transition-colors">
                  Events
                </Link>
                <Link to="/trails" className="text-gray-700 hover:text-mint-600 transition-colors">
                  Trails
                </Link>
                <Link to="/grants" className="text-gray-700 hover:text-mint-600 transition-colors">
                  Grants
                </Link>
                <Link to="/pricing" className="text-gray-700 hover:text-mint-600 transition-colors">
                  Pricing
                </Link>
                {!user && (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="btn-primary w-full"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}