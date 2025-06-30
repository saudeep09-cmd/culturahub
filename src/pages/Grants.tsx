import React, { useState } from 'react';
import { Search, Filter, DollarSign, Calendar, MapPin, ExternalLink, Bookmark, Star } from 'lucide-react';

const mockGrants = [
  {
    id: 1,
    title: 'National Endowment for the Arts - Individual Artists',
    organization: 'National Endowment for the Arts',
    amount: '$25,000',
    deadline: '2024-09-15',
    location: 'United States',
    category: 'Visual Arts',
    description: 'Fellowship grants for individual artists to support the creation of new work and career development.',
    eligibility: 'Professional artists with demonstrated excellence in their field',
    website: 'https://www.arts.gov',
    featured: true
  },
  {
    id: 2,
    title: 'Community Arts Development Grant',
    organization: 'Arts Council',
    amount: '$5,000 - $15,000',
    deadline: '2024-08-30',
    location: 'California',
    category: 'Community Arts',
    description: 'Supporting community-based arts programs that engage diverse populations and strengthen local cultural activities.',
    eligibility: 'Non-profit organizations and community groups',
    website: 'https://www.artscouncil.ca.gov',
    featured: false
  },
  {
    id: 3,
    title: 'Cultural Heritage Preservation Fund',
    organization: 'Heritage Foundation',
    amount: '$50,000',
    deadline: '2024-10-01',
    location: 'Global',
    category: 'Heritage',
    description: 'Grants for projects focused on preserving and documenting cultural heritage sites and traditions.',
    eligibility: 'Museums, cultural institutions, and heritage organizations',
    website: 'https://www.heritagefund.org',
    featured: true
  },
  {
    id: 4,
    title: 'Emerging Artist Residency Program',
    organization: 'Creative Arts Center',
    amount: '$3,000 + Housing',
    deadline: '2024-07-20',
    location: 'Vermont',
    category: 'Residency',
    description: 'Three-month residency program for emerging artists with studio space, housing, and mentorship.',
    eligibility: 'Artists under 35 with less than 5 years professional experience',
    website: 'https://www.creativeartscenter.org',
    featured: false
  },
  {
    id: 5,
    title: 'Digital Arts Innovation Grant',
    organization: 'Technology Arts Foundation',
    amount: '$10,000 - $30,000',
    deadline: '2024-11-15',
    location: 'International',
    category: 'Digital Arts',
    description: 'Supporting innovative projects that merge technology with traditional art forms.',
    eligibility: 'Artists and collectives working with digital media',
    website: 'https://www.techarts.org',
    featured: false
  },
  {
    id: 6,
    title: 'Public Art Commission',
    organization: 'City Arts Department',
    amount: '$75,000',
    deadline: '2024-08-15',
    location: 'Seattle',
    category: 'Public Art',
    description: 'Commission for large-scale public art installation in downtown area.',
    eligibility: 'Professional artists with experience in public art projects',
    website: 'https://www.seattle.gov/arts',
    featured: true
  }
];

const categories = ['All', 'Visual Arts', 'Community Arts', 'Heritage', 'Residency', 'Digital Arts', 'Public Art'];
const locations = ['All Locations', 'United States', 'California', 'Global', 'Vermont', 'International', 'Seattle'];

export default function Grants() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [showFilters, setShowFilters] = useState(false);
  const [bookmarkedGrants, setBookmarkedGrants] = useState(new Set());

  const filteredGrants = mockGrants.filter(grant => {
    const matchesSearch = grant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grant.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || grant.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All Locations' || grant.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const toggleBookmark = (grantId) => {
    const newBookmarked = new Set(bookmarkedGrants);
    if (newBookmarked.has(grantId)) {
      newBookmarked.delete(grantId);
    } else {
      newBookmarked.add(grantId);
    }
    setBookmarkedGrants(newBookmarked);
  };

  const sortedGrants = [...filteredGrants].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(a.deadline) - new Date(b.deadline);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Grants & Residencies</h1>
        <p className="text-gray-600">Discover funding opportunities for artists, cultural projects, and creative endeavors.</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search grants and residencies..."
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Featured Grants */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Opportunities</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedGrants.filter(grant => grant.featured).map((grant) => (
            <div key={grant.id} className="bg-gradient-to-br from-mint-50 to-lavender-50 border-2 border-mint-200 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-peach-500 fill-current" />
                  <span className="text-sm font-medium text-peach-600">Featured</span>
                </div>
                <button
                  onClick={() => toggleBookmark(grant.id)}
                  className={`p-2 rounded-full transition-colors ${
                    bookmarkedGrants.has(grant.id) 
                      ? 'bg-mint-100 text-mint-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{grant.title}</h3>
              <p className="text-gray-600 mb-4">{grant.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span className="font-medium">{grant.amount}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Deadline: {new Date(grant.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{grant.location}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="bg-lavender-100 text-lavender-800 px-3 py-1 rounded-full text-sm font-medium">
                  {grant.category}
                </span>
                <a
                  href={grant.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center space-x-2"
                >
                  <span>Apply Now</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Grants */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">All Opportunities</h2>
        <div className="space-y-4">
          {sortedGrants.map((grant) => (
            <div key={grant.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{grant.title}</h3>
                    {grant.featured && (
                      <Star className="w-5 h-5 text-peach-500 fill-current" />
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{grant.organization}</p>
                  <p className="text-gray-600 mb-4">{grant.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span className="font-medium">{grant.amount}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Deadline: {new Date(grant.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{grant.location}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Eligibility:</span> {grant.eligibility}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2 ml-4">
                  <button
                    onClick={() => toggleBookmark(grant.id)}
                    className={`p-2 rounded-full transition-colors ${
                      bookmarkedGrants.has(grant.id) 
                        ? 'bg-mint-100 text-mint-600' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {grant.category}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  {Math.ceil((new Date(grant.deadline) - new Date()) / (1000 * 60 * 60 * 24))} days left
                </div>
                <a
                  href={grant.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center space-x-2"
                >
                  <span>Learn More</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredGrants.length === 0 && (
        <div className="text-center py-12">
          <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No grants found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
}