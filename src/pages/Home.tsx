import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Map, DollarSign, Headphones, Clock, Mail, ArrowRight, Star, Users, Trophy } from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Explore Events',
    description: 'Discover cultural events in your city with smart filtering by date, location, and interests.',
    link: '/events',
    color: 'from-mint-400 to-mint-600'
  },
  {
    icon: Map,
    title: 'Heritage Trails',
    description: 'Interactive maps with cultural landmarks, stories, and guided walking tours.',
    link: '/trails',
    color: 'from-lavender-400 to-lavender-600'
  },
  {
    icon: DollarSign,
    title: 'Grants & Residencies',
    description: 'Searchable database of funding opportunities for artists and cultural projects.',
    link: '/grants',
    color: 'from-peach-400 to-peach-600'
  },
  {
    icon: Headphones,
    title: 'Audio Guide Creator',
    description: 'Create immersive audio experiences for locations, museums, and cultural sites.',
    link: '/audio-guide',
    color: 'from-sky-400 to-sky-600'
  },
  {
    icon: Clock,
    title: 'Create Timelines',
    description: 'Build interactive timelines to showcase cultural history and significant events.',
    link: '/timelines',
    color: 'from-mint-400 to-lavender-500'
  },
  {
    icon: Mail,
    title: 'Daily Culture Capsules',
    description: 'Subscribe to daily cultural insights, facts, and discoveries delivered to your inbox.',
    link: '/culture-capsules',
    color: 'from-peach-400 to-sky-500'
  }
];

const stats = [
  { icon: Users, number: '50K+', label: 'Active Users' },
  { icon: Calendar, number: '10K+', label: 'Events Hosted' },
  { icon: Map, number: '500+', label: 'Heritage Trails' },
  { icon: Trophy, number: '1K+', label: 'Grants Found' }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Cultural Curator',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    text: 'CulturaHub transformed how we connect with our community. The audio guide creator helped us make our museum truly interactive.'
  },
  {
    name: 'Marcus Johnson',
    role: 'Event Organizer',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    text: 'The event discovery features are incredible. We\'ve seen a 300% increase in attendance since joining CulturaHub.'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Heritage Researcher',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    text: 'Creating heritage trails has never been easier. The platform\'s intuitive design helped us share our city\'s rich history.'
  }
];

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-mint-100 via-lavender-100 to-peach-100 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
              Your Cultural Journey
              <span className="block bg-gradient-to-r from-mint-600 to-lavender-600 bg-clip-text text-transparent">
                Starts Here
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-slide-up">
              Discover, create, and share cultural experiences with CulturaHub. From local events to heritage trails, 
              we connect communities through the power of culture and storytelling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link to="/events" className="btn-primary text-lg px-8 py-4">
                Start Exploring
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/pricing" className="btn-secondary text-lg px-8 py-4">
                View Pricing
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
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-mint-500 to-lavender-500 rounded-lg mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Cultural Exploration
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools designed to help you discover, create, and share cultural experiences 
              that bring communities together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="feature-card group"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center text-mint-600 font-medium group-hover:text-mint-700">
                  Learn More
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by Cultural Communities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how CulturaHub is transforming cultural experiences around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-peach-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-mint-600 to-lavender-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Cultural Journey?
          </h2>
          <p className="text-xl text-mint-100 mb-8">
            Join thousands of cultural enthusiasts and creators who are already using CulturaHub 
            to discover and share amazing experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/events" 
              className="bg-white text-mint-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors transform hover:scale-105 shadow-lg"
            >
              Get Started Free
            </Link>
            <Link 
              to="/pricing" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-mint-600 transition-colors transform hover:scale-105"
            >
              View Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}