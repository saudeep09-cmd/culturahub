import React from 'react';
import { Calendar, MapPin, ExternalLink, Clock } from 'lucide-react';
import { EventbriteEvent } from '../services/api';

interface LiveEventCardProps {
  event: EventbriteEvent;
}

export default function LiveEventCard({ event }: LiveEventCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getEventImage = () => {
    if (event.logo?.url) {
      return event.logo.url;
    }
    // Fallback to a cultural event image
    return 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1';
  };

  const getTicketPrice = () => {
    if (event.ticket_availability?.minimum_ticket_price?.display) {
      return event.ticket_availability.minimum_ticket_price.display;
    }
    return 'Free';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={getEventImage()}
          alt={event.name.text}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1';
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-mint-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Live Event
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-gray-600" />
          </a>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {event.name.text}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {event.description?.text || 'Join this exciting cultural event!'}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(event.start.local)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{formatTime(event.start.local)}</span>
          </div>
          {event.venue && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="line-clamp-1">
                {event.venue.name}, {event.venue.address?.localized_area_display}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-mint-600">
            {getTicketPrice()}
          </span>
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center space-x-2"
          >
            <span>View Event</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}