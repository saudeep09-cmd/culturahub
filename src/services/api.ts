// API service for external integrations
const EVENTBRITE_API_KEY = import.meta.env.VITE_EVENTBRITE_API_KEY;

export interface EventbriteEvent {
  id: string;
  name: {
    text: string;
  };
  description: {
    text: string;
  };
  start: {
    local: string;
  };
  end: {
    local: string;
  };
  url: string;
  logo?: {
    url: string;
  };
  venue?: {
    name: string;
    address: {
      localized_area_display: string;
    };
  };
  ticket_availability?: {
    minimum_ticket_price?: {
      display: string;
    };
  };
  category_id: string;
}

export interface WikipediaArticle {
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
  };
}

export interface SpotifyShow {
  id: string;
  name: string;
  description: string;
  images: Array<{
    url: string;
  }>;
  external_urls: {
    spotify: string;
  };
  publisher: string;
}

// Eventbrite API
export const fetchEventbriteEvents = async (
  query: string = 'art',
  location: string = 'India',
  categories: string = '103' // Arts category
): Promise<EventbriteEvent[]> => {
  try {
    const url = `https://www.eventbriteapi.com/v3/events/search/?q=${encodeURIComponent(query)}&location.address=${encodeURIComponent(location)}&categories=${categories}&expand=venue,ticket_availability&sort_by=date`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${EVENTBRITE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Eventbrite API error: ${response.status}`);
    }

    const data = await response.json();
    return data.events || [];
  } catch (error) {
    console.error('Error fetching Eventbrite events:', error);
    return [];
  }
};

// Wikipedia API
export const fetchWikipediaArticle = async (title: string): Promise<WikipediaArticle | null> => {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|pageimages&exintro=true&titles=${encodeURIComponent(title)}&origin=*&piprop=thumbnail&pithumbsize=300`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    const pages = data.query?.pages;
    if (!pages) return null;
    
    const pageId = Object.keys(pages)[0];
    const page = pages[pageId];
    
    if (page.missing) return null;
    
    return {
      title: page.title,
      extract: page.extract,
      thumbnail: page.thumbnail,
    };
  } catch (error) {
    console.error('Error fetching Wikipedia article:', error);
    return null;
  }
};

// Spotify API (requires token management)
export const getSpotifyToken = async (): Promise<string | null> => {
  try {
    // Note: In production, this should be done on the backend
    // For demo purposes, we'll use a mock token or handle it differently
    console.log('Spotify token would be fetched here');
    return null;
  } catch (error) {
    console.error('Error getting Spotify token:', error);
    return null;
  }
};

export const fetchSpotifyShows = async (query: string = 'art history'): Promise<SpotifyShow[]> => {
  try {
    // For now, return mock data since Spotify requires backend token management
    // In production, this would go through your backend
    return [];
  } catch (error) {
    console.error('Error fetching Spotify shows:', error);
    return [];
  }
};

// Cultural topics for Wikipedia integration
export const culturalTopics = [
  'Renaissance',
  'Baroque Art',
  'Impressionism',
  'Jazz Music',
  'Classical Music',
  'Modern Art',
  'Street Art',
  'Cultural Heritage',
  'Folk Music',
  'Traditional Dance',
  'Architecture History',
  'Museum Studies',
  'Art History',
  'Cultural Anthropology',
  'World Heritage Sites'
];

// Get random cultural fact from Wikipedia
export const getRandomCulturalFact = async (): Promise<WikipediaArticle | null> => {
  const randomTopic = culturalTopics[Math.floor(Math.random() * culturalTopics.length)];
  return await fetchWikipediaArticle(randomTopic);
};