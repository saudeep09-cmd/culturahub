import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Palette, User, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import AuthModal from './AuthModal'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const location = useLocation()
  const { user, signOut } = useAuth()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Events Map', href: '/events' },
    { name: 'Audio Library', href: '/audio' },
    { name: 'Timeline', href: '/timeline' },
    { name: 'Grants', href: '/grants' },
  ]

  const handleSignOut = async () => {
    try {
      await signOut()
      setShowUserMenu(false)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <>
      <header className="bg-white/90 backdrop-blur-md border-b border-cultural-beige-200 fixed top-0 left-0 right-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-cultural-red-500 to-cultural-gold-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Palette className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-serif font-bold bg-gradient-to-r from-cultural-red-600 to-cultural-blue-800 bg-clip-text text-transparent">
                  CulturaHub
                </span>
                <p className="text-xs text-cultural-blue-600 font-medium">Cultural Discovery</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-cultural-red-600 ${
                    location.pathname === item.href
                      ? 'text-cultural-red-600 border-b-2 border-cultural-red-600 pb-1'
                      : 'text-cultural-blue-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 bg-cultural-blue-100 text-cultural-blue-800 px-4 py-2 rounded-lg hover:bg-cultural-blue-200 transition-colors duration-200"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">{user.email}</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-cultural-beige-200 py-2">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-cultural-blue-700 hover:bg-cultural-blue-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-cultural-blue-700 hover:bg-cultural-blue-50"
                      >
                        <LogOut className="w-4 h-4 inline mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-cultural-red-500 text-white px-4 py-2 rounded-lg hover:bg-cultural-red-600 transition-colors duration-200"
                >
                  Sign In
                </button>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-cultural-beige-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-cultural-beige-200 animate-slide-up">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-cultural-blue-700 hover:text-cultural-red-600 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {!user && (
                  <button
                    onClick={() => {
                      setShowAuthModal(true)
                      setIsMenuOpen(false)
                    }}
                    className="bg-cultural-red-500 text-white px-4 py-2 rounded-lg hover:bg-cultural-red-600 transition-colors duration-200 w-fit"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  )
}