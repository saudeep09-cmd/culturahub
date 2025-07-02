import React, { useState, useEffect } from 'react'
import { Clock, Calendar, BookOpen, Filter, Plus } from 'lucide-react'
import { supabase, TimelineEvent } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import TimelineForm from '../components/TimelineForm'

export default function Timeline() {
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showTimelineForm, setShowTimelineForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const categories = ['All', 'Art Movement', 'Historical Event', 'Cultural Shift', 'Innovation']

  useEffect(() => {
    fetchTimelineEvents()
  }, [])

  const fetchTimelineEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('timeline_events')
        .select('*')
        .order('year', { ascending: true })

      if (error) throw error
      setTimelineEvents(data || [])
      if (data && data.length > 0) {
        setSelectedEvent(data[0])
      }
    } catch (error) {
      console.error('Error fetching timeline events:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredEvents = timelineEvents.filter(event => 
    selectedCategory === 'All' || event.category === selectedCategory
  )

  const handleTimelineCreated = () => {
    fetchTimelineEvents()
    setShowTimelineForm(false)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-cultural-beige-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-cultural-beige-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <div className="h-20 bg-cultural-beige-200 rounded-lg"></div>
              <div className="h-20 bg-cultural-beige-200 rounded-lg"></div>
              <div className="h-20 bg-cultural-beige-200 rounded-lg"></div>
            </div>
            <div className="lg:col-span-2 h-96 bg-cultural-beige-200 rounded-xl"></div>
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
            <h1 className="text-4xl font-serif font-bold text-cultural-blue-900 mb-4">Cultural Timeline</h1>
            <p className="text-xl text-cultural-blue-700">Journey through the most significant moments in art, culture, and human history.</p>
          </div>
          {user && (
            <button
              onClick={() => setShowTimelineForm(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter */}
      <div className="card mb-8">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-cultural-blue-600" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <span className="text-cultural-blue-600">{filteredEvents.length} events</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-serif font-semibold text-cultural-blue-900 mb-6">Historical Timeline</h2>
          <div className="space-y-6">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className={`timeline-item cursor-pointer transition-all duration-200 ${
                  selectedEvent?.id === event.id ? 'bg-cultural-red-50 p-4 rounded-lg' : ''
                }`}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Calendar className="w-5 h-5 text-cultural-gold-600" />
                  <span className="font-bold text-cultural-gold-700">{event.year}</span>
                </div>
                <h3 className="font-serif font-semibold text-cultural-blue-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-cultural-blue-600 line-clamp-2">
                  {event.description}
                </p>
                {event.category && (
                  <div className="mt-2">
                    <span className="bg-cultural-beige-100 text-cultural-beige-800 px-2 py-1 rounded-full text-xs">
                      {event.category}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-cultural-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold text-cultural-blue-900 mb-2">No events found</h3>
              <p className="text-cultural-blue-600">Try adjusting your filter or add a new event.</p>
            </div>
          )}
        </div>

        {/* Event Details */}
        <div className="lg:col-span-2">
          {selectedEvent ? (
            <div className="card">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  {selectedEvent.image_url && (
                    <img
                      src={selectedEvent.image_url}
                      alt={selectedEvent.title}
                      className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="w-6 h-6 text-cultural-gold-600" />
                    <span className="text-2xl font-bold text-cultural-gold-700">{selectedEvent.year}</span>
                  </div>
                  
                  <h2 className="text-3xl font-serif font-bold text-cultural-blue-900 mb-4">
                    {selectedEvent.title}
                  </h2>
                  
                  <p className="text-cultural-blue-700 mb-6 leading-relaxed">
                    {selectedEvent.details || selectedEvent.description}
                  </p>
                  
                  <div className="space-y-4">
                    {selectedEvent.key_figures && selectedEvent.key_figures.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-cultural-blue-900 mb-2">Key Figures</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedEvent.key_figures.map((figure, index) => (
                            <span
                              key={index}
                              className="bg-cultural-red-100 text-cultural-red-800 px-3 py-1 rounded-full text-sm"
                            >
                              {figure}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedEvent.location && (
                      <div>
                        <h4 className="font-semibold text-cultural-blue-900 mb-2">Location</h4>
                        <p className="text-cultural-blue-700">{selectedEvent.location}</p>
                      </div>
                    )}
                    
                    {selectedEvent.category && (
                      <div>
                        <h4 className="font-semibold text-cultural-blue-900 mb-2">Category</h4>
                        <span className="bg-cultural-gold-100 text-cultural-gold-800 px-3 py-1 rounded-full text-sm">
                          {selectedEvent.category}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card text-center py-12">
              <Clock className="w-16 h-16 text-cultural-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold text-cultural-blue-900 mb-2">Select an Event</h3>
              <p className="text-cultural-blue-600">Choose an event from the timeline to learn more.</p>
            </div>
          )}
        </div>
      </div>

      {/* Timeline Form Modal */}
      {showTimelineForm && (
        <TimelineForm
          onClose={() => setShowTimelineForm(false)}
          onTimelineCreated={handleTimelineCreated}
        />
      )}
    </div>
  )
}