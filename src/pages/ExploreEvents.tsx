import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Filter, Search, Heart, Share2 } from 'lucide-react';

const mockEvents = [
  {
    id: 1,
    title: 'Summer Art Festival',
    date: '2024-07-15',
    time: '10:00 AM',
    location: 'Central Park, New York',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    category: 'Art',
    price: 'Free',
    description: 'Join us for a vibrant celebration of local and international artists showcasing their work in the heart of the city.'
  },
  {
    id: 2,
    title: 'Jazz Under the Stars',
    date: '2024-07-20',
    time: '7:00 PM',
    location: 'Riverside Amphitheater, Chicago',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    category: 'Music',
    price: '$25',
    description: 'Experience smooth jazz performances by renowned musicians in a magical outdoor setting.'
  },
  {
    id: 3,
    title: 'Cultural Heritage Fair',
    date: '2024-07-25',
    time: '11:00 AM',
    location: 'Heritage Square, Boston',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    category: 'Heritage',
    price: '$15',
    description: 'Discover diverse cultural traditions through food, crafts, and performances from around the world.'
  },
  {
    id: 4,
    title: 'Street Photography Workshop',
    date: '2024-07-28',
    time: '2:00 PM',
    location: 'Arts District, Los Angeles',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    category: 'Workshop',
    price: '$45',
    description: 'Learn the art of street photography from professional photographers while exploring the city.'
  }
];

const categories = ['All', 'Art', 'Music', 'Heritage', 'Workshop', 'Theater', 'Dance'];
const cities = ['All Cities', 'New York', 'Chicago', 'Boston', 'Los Angeles', 'San Francisco'];

export default function ExploreEvents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedDate, setSelectedDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesCity = selectedCity === 'All Cities' || event.location.includes(selectedCity);
    const matchesDate = !selectedDate || event.date === selectedDate;
    
    return matchesSearch && matchesCategory && matchesCity && matchesDate;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Cultural Events</h1>
        <p className="text-gray-600">Discover amazing cultural events happening in your area and beyond.</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-mint-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {event.category}
                </span>
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
                <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                  <Share2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-mint-600">{event.price}</span>
                <button className="btn-primary">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
}