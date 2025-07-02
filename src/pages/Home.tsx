import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Headphones, Clock, PlusCircle, Sparkles, Globe, Users, Calendar } from 'lucide-react';
import AskCultura from '../components/AskCultura';

const features = [
  {
    icon: MapPin,
    title: 'Event Explorer',
    description: 'Discover art exhibitions, museums, and cultural events on an interactive map with real-time updates.',
    link: '/events',
    color: 'from-cultural-red-400 to-cultural-red-600'
  },
  {
    icon: Headphones,
    title: 'Audio Zone',
    description: 'Listen to curated podcasts about art, culture, and history from leading cultural institutions.',
    link: '/audio',
    color: 'from-cultural-gold-400 to-cultural-gold-600'
  },
  {
    icon: Clock,
    title: 'Cultural Timeline',
    description: 'Explore historical events and cultural movements through interactive timelines and stories.',
    link: '/timeline',
    color: 'from-cultural-blue-400 to-cultural-blue-600'
  },
  {
    icon: PlusCircle,
    title: 'Creator Submission',
    description: 'Artists and historians can submit their events, talks, and cultural content to our platform.',
    link: '/submit',
    color: 'from-cultural-beige-400 to-cultural-beige-600'
  }
];

const stats = [
  { icon: Globe, number: '500+', label: 'Cultural Events' },
  { icon: Users, number: '10K+', label: 'Community Members' },
  { icon: Calendar, number: '50+', label: 'Cities Covered' },
  { icon: Sparkles, number: '1K+', label: 'Cultural Facts' }
];

export default function Home() {
  return (
    <div className="animate-fade-in">
      <AskCultura />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero-pattern">
        <div className="absolute inset-0 bg-gradient-to-br from-cultural-red-50/80 via-cultural-beige-50/80 to-cultural-blue-50/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-cultural-blue-900 mb-6 animate-slide-up">
              Discover Culture
              <span className="block bg-gradient-to-r from-cultural-red-600 to-cultural-gold-600 bg-clip-text text-transparent">
                In Real-Time
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-cultural-blue-700 mb-8 max-w-4xl mx-auto animate-slide-up leading-relaxed">
              Explore art exhibitions, listen to cultural podcasts, dive into historical timelines, 
              and connect with a vibrant community of culture enthusiasts worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link to="/events" className="btn-primary text-lg px-8 py-4 font-serif">
                Start Exploring
                <MapPin className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/audio" className="btn-secondary text-lg px-8 py-4 font-serif">
                Listen Now
                <Headphones className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cultural-red-500 to-cultural-gold-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-serif font-bold text-cultural-blue-900 mb-1">{stat.number}</div>
                <div className="text-cultural-blue-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 cultural-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-cultural-blue-900 mb-4">
              Your Cultural Journey Awaits
            </h2>
            <p className="text-xl text-cultural-blue-700 max-w-3xl mx-auto">
              Immerse yourself in a world of art, history, and culture with our comprehensive platform 
              designed for curious minds and cultural enthusiasts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="card group hover:scale-105 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-cultural-blue-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-cultural-blue-700 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex items-center text-cultural-red-600 font-medium group-hover:text-cultural-red-700">
                  Explore Now
                  <Sparkles className="ml-2 w-4 h-4 group-hover:animate-pulse" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cultural-blue-900 to-cultural-red-900 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Join the Cultural Revolution
          </h2>
          <p className="text-xl text-cultural-beige-200 mb-8 leading-relaxed">
            Connect with fellow culture enthusiasts, discover hidden gems, and contribute to a growing 
            community of art and history lovers from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/events" 
              className="bg-white text-cultural-blue-900 px-8 py-4 rounded-lg font-serif font-semibold text-lg hover:bg-cultural-beige-100 transition-colors transform hover:scale-105 shadow-lg"
            >
              Start Discovering
            </Link>
            <Link 
              to="/submit" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-serif font-semibold text-lg hover:bg-white hover:text-cultural-blue-900 transition-colors transform hover:scale-105"
            >
              Share Your Culture
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}