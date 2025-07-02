import React, { useState } from 'react';
import { MapPin, Calendar, Clock, ExternalLink, Filter, Search, Star } from 'lucide-react';

const mockEvents = [
  {
    id: 1,
    title: 'Renaissance Masters Exhibition',
    location: 'Metropolitan Museum of Art, New York',
    date: '2024-02-15',
    time: '10:00 AM - 6:00 PM',
    category: 'Exhibition',
    description: 'Explore masterpieces from Leonardo da Vinci, Michelangelo, and Raphael in this comprehensive exhibition.',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    coordinates: { lat: 40.7794, lng: -73.9632 },
    price: '$25',
    rating: 4.8
  },
  {
    id: 2,
    title: 'Jazz History Walking Tour',
    location: 'French Quarter, New Orleans',
    date: '2024-02-20',
    time: '2:00 PM - 4:00 PM',
    category: 'Heritage Walk',
    description: 'Discover the birthplace of jazz through historic venues and legendary performance spaces.',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    coordinates: { lat: 29.9584, lng: -90.0644 },
    price: 'Free',
    rating: 4.9
  },
  {
    id: 3,
    title: 'Contemporary Art Symposium',
    location: 'Tate Modern, London',
    date: '2024-02-25',
    time: '9:00 AM - 5:00 PM',
    category: 'Conference',
    description: 'Leading artists and critics discuss the future of contemporary art and digital media.',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    coordinates: { lat: 51.5076, lng: -0.0994 },
    price: '$45',
    rating: 4.7
  },
  {
    id: 4,
    title: 'Ancient Civilizations Workshop',
    location: 'British Museum, London',
    date: '2024-03-01',
    time: '11:00 AM - 3:00 PM',
    category: 'Workshop',
    description: 'Hands-on exploration of ancient artifacts and archaeological discoveries.',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    coordinates: { lat: 51.5194, lng: -0.1270 },
    price: '$35',
    rating: 4.6
  }
];

const categories = ['All', 'Exhibition', 'Heritage Walk', 'Conference', 'Workshop'];
const cities = ['All Cities', 'New York', 'New Orleans', 'London', 'Paris', 'Rome'];

export default function EventExplorer() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(mockEvents[0]);

  const filteredEvents = mockEvents.filter(event => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesCity = selectedCity === 'All Cities' || event.location.includes(selectedCity);
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesCity && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-cultural-blue-900 mb-4">Event Explorer</h1>
        <p className="text-xl text-cultural-blue-700">Discover cultural events, exhibitions, and experiences around the world.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Map Section */}
        <div className="order-2 lg:order-1">
          <div className="card h-[600px] p-0 overflow-hidden">
            <div className="bg-gradient-to-br from-cultural-beige-100 to-cultural-blue-100 h-full flex items-center justify-center relative">
              {/* Google Maps Embed Placeholder */}
              <div className="absolute inset-4 bg-white rounded-lg shadow-inner flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-cultural-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-serif font-semibold text-cultural-blue-900 mb-2">Interactive Cultural Map</h3>
                  <p className="text-cultural-blue-600 mb-4">Explore events on Google Maps</p>
                  <div className="text-sm text-cultural-blue-500">
                    {filteredEvents.length} events found
                  </div>
                </div>
              </div>
              
              {/* Event Pins Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {filteredEvents.slice(0, 4).map((event, index) => (
                  <div
                    key={event.id}
                    className={`absolute w-4 h-4 bg-cultural-red-500 rounded-full border-2 border-white shadow-lg animate-pulse ${
                      index === 0 ? 'top-1/4 left-1/3' :
                      index === 1 ? 'top-1/2 right-1/4' :
                      index === 2 ? 'bottom-1/3 left-1/2' :
                      'top-3/4 right-1/3'
                    }`}
                    title={event.title}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="order-1 lg:order-2">
          {/* Filters */}
          <div className="card mb-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cultural-blue-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-cultural-blue-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-cultural-blue-700 mb-2">City</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
                  >
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className={`card cursor-pointer transition-all duration-200 ${
                  selectedEvent?.id === event.id ? 'ring-2 ring-cultural-red-500 bg-cultural-red-50' : ''
                }`}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex space-x-4">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-serif font-semibold text-cultural-blue-900 text-lg line-clamp-1">
                        {event.title}
                      </h3>
                      <span className="bg-cultural-gold-100 text-cultural-gold-800 px-2 py-1 rounded-full text-xs font-medium">
                        {event.category}
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-sm text-cultural-blue-600 mb-2">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-cultural-gold-500 fill-current" />
                          <span className="text-sm font-medium text-cultural-blue-900 ml-1">{event.rating}</span>
                        </div>
                        <span className="text-lg font-bold text-cultural-red-600">{event.price}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-cultural-blue-400" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Event Details */}
      {selectedEvent && (
        <div className="mt-8 card">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-cultural-blue-900 mb-4">
                {selectedEvent.title}
              </h2>
              <p className="text-cultural-blue-700 mb-6 leading-relaxed">
                {selectedEvent.description}
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-cultural-blue-600">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="flex items-center text-cultural-blue-600">
                  <Calendar className="w-5 h-5 mr-3" />
                  <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-cultural-blue-600">
                  <Clock className="w-5 h-5 mr-3" />
                  <span>{selectedEvent.time}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-cultural-red-600">{selectedEvent.price}</span>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-cultural-gold-500 fill-current" />
                    <span className="font-medium text-cultural-blue-900 ml-1">{selectedEvent.rating}</span>
                  </div>
                </div>
                <button className="btn-primary flex items-center space-x-2">
                  <span>Book Now</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}