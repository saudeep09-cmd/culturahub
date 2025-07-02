import React, { useState, useEffect } from 'react'
import { MapPin, Calendar, Clock, Filter, Search, Plus, Heart } from 'lucide-react'
import { supabase, CulturalEvent } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import EventForm from '../components/EventForm'

export default function EventsMap() {
  const [events, setEvents] = useState<CulturalEvent[]>([])
  const [filteredEvents, setFilteredEvents] = useState<CulturalEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<CulturalEvent | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCity, setSelectedCity] = useState('All')
  const [showEventForm, setShowEventForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const categories = ['All', 'Exhibition', 'Heritage Walk', 'Conference', 'Workshop', 'Performance']
  const cities = ['All', 'New York', 'New Orleans', 'London', 'Paris', 'Rome']

  useEffect(() => {
    fetchEvents()
  }, [])

  useEffect(() => {
    filterEvents()
  }, [events, searchTerm, selectedCategory, selectedCity])

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('cultural_events')
        .select('*')
        .order('date', { ascending: true })

      if (error) throw error
      setEvents(data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterEvents = () => {
    let filtered = events

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(event => event.category === selectedCategory)
    }

    if (selectedCity !== 'All') {
      filtered = filtered.filter(event => event.location?.includes(selectedCity))
    }

    setFilteredEvents(filtered)
    if (filtered.length > 0 && !selectedEvent) {
      setSelectedEvent(filtered[0])
    }
  }

  const handleEventCreated = () => {
    fetchEvents()
    setShowEventForm(false)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-cultural-beige-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-cultural-beige-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-cultural-beige-200 rounded-xl"></div>
            <div className="space-y-4">
              <div className="h-20 bg-cultural-beige-200 rounded-lg"></div>
              <div className="h-20 bg-cultural-beige-200 rounded-lg"></div>
              <div className="h-20 bg-cultural-beige-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-serif font-bold text-cultural-blue-900 mb-4">Cultural Events Map</h1>
            <p className="text-xl text-cultural-blue-700">Discover cultural events, exhibitions, and experiences around the world.</p>
          </div>
          {user && (
            <button
              onClick={() => setShowEventForm(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Map Section */}
        <div className="order-2 lg:order-1">
          <div className="card h-[600px] p-0 overflow-hidden">
            <div className="bg-gradient-to-br from-cultural-beige-100 to-cultural-blue-100 h-full flex items-center justify-center relative">
              {/* Google Maps Integration Placeholder */}
              <div className="absolute inset-4 bg-white rounded-lg shadow-inner flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-cultural-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-serif font-semibold text-cultural-blue-900 mb-2">Interactive Cultural Map</h3>
                  <p className="text-cultural-blue-600 mb-4">Google Maps integration with event pins</p>
                  <div className="text-sm text-cultural-blue-500">
                    {filteredEvents.length} events found
                  </div>
                </div>
              </div>
              
              {/* Event Pins Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {filteredEvents.slice(0, 6).map((event, index) => (
                  <div
                    key={event.id}
                    className={`absolute w-4 h-4 bg-cultural-red-500 rounded-full border-2 border-white shadow-lg animate-pulse ${
                      index === 0 ? 'top-1/4 left-1/3' :
                      index === 1 ? 'top-1/2 right-1/4' :
                      index === 2 ? 'bottom-1/3 left-1/2' :
                      index === 3 ? 'top-3/4 right-1/3' :
                      index === 4 ? 'top-1/6 right-1/2' :
                      'bottom-1/4 left-1/4'
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
                  {event.image_url && (
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-serif font-semibold text-cultural-blue-900 text-lg line-clamp-1">
                        {event.title}
                      </h3>
                      {event.category && (
                        <span className="bg-cultural-gold-100 text-cultural-gold-800 px-2 py-1 rounded-full text-xs font-medium">
                          {event.category}
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-1 text-sm text-cultural-blue-600 mb-2">
                      {event.location && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-4">
                        {event.date && (
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                        )}
                        {event.time && (
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{event.time}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-cultural-red-600">{event.price || 'Free'}</span>
                      <button className="text-cultural-blue-400 hover:text-cultural-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-cultural-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold text-cultural-blue-900 mb-2">No events found</h3>
              <p className="text-cultural-blue-600">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Selected Event Details */}
      {selectedEvent && (
        <div className="mt-8 card">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              {selectedEvent.image_url && (
                <img
                  src={selectedEvent.image_url}
                  alt={selectedEvent.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-cultural-blue-900 mb-4">
                {selectedEvent.title}
              </h2>
              {selectedEvent.description && (
                <p className="text-cultural-blue-700 mb-6 leading-relaxed">
                  {selectedEvent.description}
                </p>
              )}
              
              <div className="space-y-3 mb-6">
                {selectedEvent.location && (
                  <div className="flex items-center text-cultural-blue-600">
                    <MapPin className="w-5 h-5 mr-3" />
                    <span>{selectedEvent.location}</span>
                  </div>
                )}
                {selectedEvent.date && (
                  <div className="flex items-center text-cultural-blue-600">
                    <Calendar className="w-5 h-5 mr-3" />
                    <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                  </div>
                )}
                {selectedEvent.time && (
                  <div className="flex items-center text-cultural-blue-600">
                    <Clock className="w-5 h-5 mr-3" />
                    <span>{selectedEvent.time}</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-cultural-red-600">{selectedEvent.price || 'Free'}</span>
                {selectedEvent.website_url && (
                  <a
                    href={selectedEvent.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Learn More
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Form Modal */}
      {showEventForm && (
        <EventForm
          onClose={() => setShowEventForm(false)}
          onEventCreated={handleEventCreated}
        />
      )}
    </div>
  )
}