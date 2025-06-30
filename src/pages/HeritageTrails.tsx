import React, { useState } from 'react';
import { Map, MapPin, Clock, Star, Play, Bookmark, Users } from 'lucide-react';

const mockTrails = [
  {
    id: 1,
    title: 'Historic Downtown Walking Tour',
    description: 'Explore the rich history of downtown through beautifully preserved architecture and landmarks.',
    image: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    duration: '2.5 hours',
    distance: '3.2 km',
    difficulty: 'Easy',
    rating: 4.8,
    reviews: 142,
    stops: 12,
    city: 'Boston',
    category: 'Architecture'
  },
  {
    id: 2,
    title: 'Immigrant Stories Trail',
    description: 'Follow the footsteps of generations of immigrants who shaped our city\'s cultural landscape.',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    duration: '3 hours',
    distance: '4.1 km',
    difficulty: 'Moderate',
    rating: 4.9,
    reviews: 98,
    stops: 8,
    city: 'New York',
    category: 'Cultural History'
  },
  {
    id: 3,
    title: 'Art Deco Discovery',
    description: 'Marvel at the stunning Art Deco buildings that define the city\'s architectural character.',
    image: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    duration: '2 hours',
    distance: '2.8 km',
    difficulty: 'Easy',
    rating: 4.7,
    reviews: 76,
    stops: 10,
    city: 'Miami',
    category: 'Architecture'
  },
  {
    id: 4,
    title: 'Revolutionary War Sites',
    description: 'Visit pivotal locations where American independence was fought for and won.',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    duration: '4 hours',
    distance: '5.5 km',
    difficulty: 'Moderate',
    rating: 4.9,
    reviews: 203,
    stops: 15,
    city: 'Philadelphia',
    category: 'American History'
  }
];

const categories = ['All', 'Architecture', 'Cultural History', 'American History', 'Local Stories'];
const cities = ['All Cities', 'Boston', 'New York', 'Miami', 'Philadelphia', 'San Francisco'];

export default function HeritageTrails() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedTrail, setSelectedTrail] = useState(null);

  const filteredTrails = mockTrails.filter(trail => {
    const matchesCategory = selectedCategory === 'All' || trail.category === selectedCategory;
    const matchesCity = selectedCity === 'All Cities' || trail.city === selectedCity;
    return matchesCategory && matchesCity;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-mint-600 bg-mint-100';
      case 'Moderate': return 'text-peach-600 bg-peach-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Heritage Trails</h1>
        <p className="text-gray-600">Discover the stories behind the places that shaped our communities through interactive walking tours.</p>
      </div>

      {/* Interactive Map Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Interactive Map</h2>
          <button className="btn-primary flex items-center space-x-2">
            <Map className="w-4 h-4" />
            <span>View Full Map</span>
          </button>
        </div>
        <div className="bg-gradient-to-br from-mint-100 to-lavender-100 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <Map className="w-16 h-16 text-mint-500 mx-auto mb-4" />
            <p className="text-gray-600">Interactive map with trail locations and points of interest</p>
            <p className="text-sm text-gray-500 mt-2">Click trails below to view on map</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </div>

      {/* Trails Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredTrails.map((trail) => (
          <div key={trail.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={trail.image}
                alt={trail.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-lavender-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {trail.category}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                  <Bookmark className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{trail.title}</h3>
              <p className="text-gray-600 mb-4">{trail.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{trail.duration}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{trail.distance}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{trail.stops} stops</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(trail.difficulty)}`}>
                    {trail.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-peach-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900 ml-1">{trail.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({trail.reviews} reviews)</span>
                </div>
                <span className="text-sm text-gray-500">{trail.city}</span>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  className="flex-1 btn-primary flex items-center justify-center space-x-2"
                  onClick={() => setSelectedTrail(trail)}
                >
                  <Play className="w-4 h-4" />
                  <span>Start Trail</span>
                </button>
                <button className="btn-secondary">
                  Preview
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTrails.length === 0 && (
        <div className="text-center py-12">
          <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No trails found</h3>
          <p className="text-gray-600">Try adjusting your filters to find trails in your area.</p>
        </div>
      )}

      {/* Trail Detail Modal */}
      {selectedTrail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedTrail.image}
                alt={selectedTrail.title}
                className="w-full h-64 object-cover rounded-t-xl"
              />
              <button
                onClick={() => setSelectedTrail(null)}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedTrail.title}</h2>
              <p className="text-gray-600 mb-6">{selectedTrail.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-6 h-6 text-mint-500 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-900">{selectedTrail.duration}</div>
                  <div className="text-xs text-gray-600">Duration</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-6 h-6 text-lavender-500 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-900">{selectedTrail.distance}</div>
                  <div className="text-xs text-gray-600">Distance</div>
                </div>
              </div>
              
              <button className="w-full btn-primary text-lg py-4">
                Start This Trail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}