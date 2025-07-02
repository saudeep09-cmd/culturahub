import React, { useState } from 'react';
import { Clock, Calendar, BookOpen, ArrowRight, Filter } from 'lucide-react';

const timelineEvents = [
  {
    id: 1,
    year: '1400-1600',
    title: 'Renaissance Period',
    description: 'A cultural movement that profoundly affected European intellectual life, marking the transition from medieval to modern times.',
    details: 'The Renaissance saw the emergence of humanism, scientific revolution, and artistic innovation. Key figures include Leonardo da Vinci, Michelangelo, and Galileo.',
    category: 'Art Movement',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    keyFigures: ['Leonardo da Vinci', 'Michelangelo', 'Raphael'],
    location: 'Italy, Europe'
  },
  {
    id: 2,
    year: '1600-1750',
    title: 'Baroque Era',
    description: 'A period of artistic style that used exaggerated motion and clear detail to produce drama and grandeur.',
    details: 'Baroque art and architecture emphasized contrast, movement, and emotional intensity. It originated in Rome and spread throughout Europe.',
    category: 'Art Movement',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    keyFigures: ['Caravaggio', 'Bernini', 'Bach'],
    location: 'Europe'
  },
  {
    id: 3,
    year: '1860-1886',
    title: 'Impressionism',
    description: 'A 19th-century art movement characterized by small, thin brush strokes and emphasis on light and its changing qualities.',
    details: 'Impressionist painters often painted outdoors to capture natural light and color. They focused on everyday subjects and moments.',
    category: 'Art Movement',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    keyFigures: ['Claude Monet', 'Pierre-Auguste Renoir', 'Edgar Degas'],
    location: 'France'
  },
  {
    id: 4,
    year: '1907-1914',
    title: 'Cubism',
    description: 'An avant-garde art movement that revolutionized European painting and sculpture.',
    details: 'Cubism presented subjects from multiple viewpoints to represent them in a greater context, breaking objects into geometric forms.',
    category: 'Art Movement',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    keyFigures: ['Pablo Picasso', 'Georges Braque'],
    location: 'France, Spain'
  },
  {
    id: 5,
    year: '1960s',
    title: 'Pop Art Movement',
    description: 'An art movement that emerged in the 1950s and flourished in the 1960s, drawing inspiration from popular culture.',
    details: 'Pop Art challenged traditional fine art by including imagery from popular culture such as advertising, comic books, and mundane objects.',
    category: 'Art Movement',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
    keyFigures: ['Andy Warhol', 'Roy Lichtenstein', 'Jasper Johns'],
    location: 'United States, United Kingdom'
  }
];

const categories = ['All', 'Art Movement', 'Historical Event', 'Cultural Shift', 'Innovation'];

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState(timelineEvents[0]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents = timelineEvents.filter(event => 
    selectedCategory === 'All' || event.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-cultural-blue-900 mb-4">Cultural Timeline</h1>
        <p className="text-xl text-cultural-blue-700">Journey through the most significant moments in art, culture, and human history.</p>
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
                  selectedEvent.id === event.id ? 'bg-cultural-red-50 p-4 rounded-lg' : ''
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
                <div className="mt-2">
                  <span className="bg-cultural-beige-100 text-cultural-beige-800 px-2 py-1 rounded-full text-xs">
                    {event.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Details */}
        <div className="lg:col-span-2">
          {selectedEvent && (
            <div className="card">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
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
                    {selectedEvent.details}
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-cultural-blue-900 mb-2">Key Figures</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.keyFigures.map((figure, index) => (
                          <span
                            key={index}
                            className="bg-cultural-red-100 text-cultural-red-800 px-3 py-1 rounded-full text-sm"
                          >
                            {figure}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-cultural-blue-900 mb-2">Location</h4>
                      <p className="text-cultural-blue-700">{selectedEvent.location}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-cultural-blue-900 mb-2">Category</h4>
                      <span className="bg-cultural-gold-100 text-cultural-gold-800 px-3 py-1 rounded-full text-sm">
                        {selectedEvent.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-cultural-beige-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-cultural-blue-600" />
                    <span className="text-cultural-blue-700">Learn more about this period</span>
                  </div>
                  <button className="btn-primary flex items-center space-x-2">
                    <span>Explore Further</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Interactive Timeline Embed */}
          <div className="mt-8 card">
            <h3 className="text-2xl font-serif font-semibold text-cultural-blue-900 mb-6">Interactive Timeline</h3>
            <div className="bg-cultural-beige-50 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <Clock className="w-16 h-16 text-cultural-blue-400 mx-auto mb-4" />
                <h4 className="text-xl font-serif font-semibold text-cultural-blue-900 mb-2">TimelineJS Integration</h4>
                <p className="text-cultural-blue-600 mb-4">Interactive timeline powered by TimelineJS</p>
                <button className="btn-secondary">Load Interactive Timeline</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}