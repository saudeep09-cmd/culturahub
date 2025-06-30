import { useState, useEffect } from 'react';
import { fetchEventbriteEvents, EventbriteEvent } from '../services/api';

export const useEventbriteEvents = (query: string = 'art', location: string = 'India') => {
  const [events, setEvents] = useState<EventbriteEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const eventData = await fetchEventbriteEvents(query, location);
        setEvents(eventData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load events');
        console.error('Error loading Eventbrite events:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [query, location]);

  return { events, loading, error, refetch: () => loadEvents() };
};