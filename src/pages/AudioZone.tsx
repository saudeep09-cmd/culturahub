import React, { useState } from 'react';
import { Play, Pause, Headphones, ExternalLink, Star, Clock } from 'lucide-react';

const spotifyPodcasts = [
  {
    id: '1',
    title: 'Art History Babes',
    description: 'Two art history graduate students discuss famous artworks, movements, and the stories behind them.',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    embedUrl: 'https://open.spotify.com/embed/show/7gozmLqbcbr6PScMjc0Zl4?utm_source=generator',
    category: 'Art History',
    rating: 4.8,
    episodes: 156,
    duration: '45 min avg'
  },
  {
    id: '2',
    title: 'A Piece of Work',
    description: 'WNYC Studios explores art and culture through intimate conversations with artists and curators.',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    embedUrl: 'https://open.spotify.com/embed/show/2Shpxw7dPoxRJCdfFXTWLE?utm_source=generator',
    category: 'Contemporary Art',
    rating: 4.9,
    episodes: 89,
    duration: '35 min avg'
  },
  {
    id: '3',
    title: 'The Modern Art Notes Podcast',
    description: 'Tyler Green interviews artists, museum directors, and art world figures about contemporary art.',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    embedUrl: 'https://open.spotify.com/embed/show/6kAsbP8pxwaU2kPibKTuHE?utm_source=generator',
    category: 'Art Interviews',
    rating: 4.7,
    episodes: 234,
    duration: '60 min avg'
  },
  {
    id: '4',
    title: 'The Lonely Palette',
    description: 'Tamar Avishai makes art history accessible by diving deep into individual artworks.',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    embedUrl: 'https://open.spotify.com/embed/show/1VaHAKzZQdUhyNqzXDyTNu?utm_source=generator',
    category: 'Art Education',
    rating: 4.8,
    episodes: 67,
    duration: '30 min avg'
  },
  {
    id: '5',
    title: 'History Extra Podcast',
    description: 'BBC History Magazine brings you expert insights into historical events and cultural movements.',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    embedUrl: 'https://open.spotify.com/embed/show/4nOIBWLRNmkQk4VuDRoJJJ?utm_source=generator',
    category: 'History',
    rating: 4.6,
    episodes: 312,
    duration: '40 min avg'
  }
];

export default function AudioZone() {
  const [selectedPodcast, setSelectedPodcast] = useState(spotifyPodcasts[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-cultural-blue-900 mb-4">Audio Zone</h1>
        <p className="text-xl text-cultural-blue-700">Immerse yourself in cultural podcasts, lectures, and audio experiences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Podcast List */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-serif font-semibold text-cultural-blue-900 mb-6">Featured Podcasts</h2>
          <div className="space-y-4">
            {spotifyPodcasts.map((podcast) => (
              <div
                key={podcast.id}
                className={`card cursor-pointer transition-all duration-200 ${
                  selectedPodcast.id === podcast.id ? 'ring-2 ring-cultural-red-500 bg-cultural-red-50' : ''
                }`}
                onClick={() => setSelectedPodcast(podcast)}
              >
                <div className="flex space-x-4">
                  <img
                    src={podcast.image}
                    alt={podcast.title}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-semibold text-cultural-blue-900 text-lg line-clamp-1 mb-1">
                      {podcast.title}
                    </h3>
                    <p className="text-sm text-cultural-blue-600 line-clamp-2 mb-2">
                      {podcast.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-cultural-blue-500">
                      <span className="bg-cultural-gold-100 text-cultural-gold-800 px-2 py-1 rounded-full">
                        {podcast.category}
                      </span>
                      <div className="flex items-center space-x-2">
                        <Star className="w-3 h-3 text-cultural-gold-500 fill-current" />
                        <span>{podcast.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Player */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="mb-6">
              <div className="flex items-start space-x-6">
                <img
                  src={selectedPodcast.image}
                  alt={selectedPodcast.title}
                  className="w-32 h-32 object-cover rounded-xl shadow-lg"
                />
                <div className="flex-1">
                  <h2 className="text-3xl font-serif font-bold text-cultural-blue-900 mb-3">
                    {selectedPodcast.title}
                  </h2>
                  <p className="text-cultural-blue-700 mb-4 leading-relaxed">
                    {selectedPodcast.description}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cultural-red-600">{selectedPodcast.episodes}</div>
                      <div className="text-sm text-cultural-blue-600">Episodes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cultural-gold-600">{selectedPodcast.rating}</div>
                      <div className="text-sm text-cultural-blue-600">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cultural-blue-600">{selectedPodcast.duration}</div>
                      <div className="text-sm text-cultural-blue-600">Duration</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="btn-primary flex items-center space-x-2"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      <span>{isPlaying ? 'Pause' : 'Play'}</span>
                    </button>
                    <a
                      href={selectedPodcast.embedUrl.replace('/embed/', '/').replace('?utm_source=generator', '')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open in Spotify</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Spotify Embed */}
            <div className="bg-cultural-beige-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Headphones className="w-5 h-5 text-cultural-green-600" />
                <span className="font-medium text-cultural-blue-900">Now Playing</span>
              </div>
              <iframe
                src={selectedPodcast.embedUrl}
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>

          {/* Additional Recommendations */}
          <div className="mt-8">
            <h3 className="text-2xl font-serif font-semibold text-cultural-blue-900 mb-6">More Cultural Audio</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h4 className="font-serif font-semibold text-cultural-blue-900 mb-2">Museum Audio Tours</h4>
                <p className="text-cultural-blue-700 mb-4">Explore virtual audio tours from world-renowned museums.</p>
                <button className="btn-secondary">Browse Tours</button>
              </div>
              <div className="card">
                <h4 className="font-serif font-semibold text-cultural-blue-900 mb-2">Cultural Lectures</h4>
                <p className="text-cultural-blue-700 mb-4">Listen to recorded lectures from leading cultural institutions.</p>
                <button className="btn-secondary">View Lectures</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}