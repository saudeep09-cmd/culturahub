import React, { useState, useEffect } from 'react'
import { Play, Pause, Headphones, ExternalLink, Star, Plus } from 'lucide-react'
import { supabase, Podcast } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import PodcastForm from '../components/PodcastForm'

export default function AudioLibrary() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null)
  const [showPodcastForm, setShowPodcastForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    fetchPodcasts()
  }, [])

  const fetchPodcasts = async () => {
    try {
      const { data, error } = await supabase
        .from('podcasts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPodcasts(data || [])
      if (data && data.length > 0) {
        setSelectedPodcast(data[0])
      }
    } catch (error) {
      console.error('Error fetching podcasts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePodcastCreated = () => {
    fetchPodcasts()
    setShowPodcastForm(false)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-cultural-beige-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-cultural-beige-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
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
            <h1 className="text-4xl font-serif font-bold text-cultural-blue-900 mb-4">Audio Library</h1>
            <p className="text-xl text-cultural-blue-700">Immerse yourself in cultural podcasts, lectures, and audio experiences.</p>
          </div>
          {user && (
            <button
              onClick={() => setShowPodcastForm(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Podcast</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Podcast List */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-serif font-semibold text-cultural-blue-900 mb-6">Featured Podcasts</h2>
          <div className="space-y-4">
            {podcasts.map((podcast) => (
              <div
                key={podcast.id}
                className={`card cursor-pointer transition-all duration-200 ${
                  selectedPodcast?.id === podcast.id ? 'ring-2 ring-cultural-red-500 bg-cultural-red-50' : ''
                }`}
                onClick={() => setSelectedPodcast(podcast)}
              >
                <div className="flex space-x-4">
                  {podcast.image_url && (
                    <img
                      src={podcast.image_url}
                      alt={podcast.title}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-semibold text-cultural-blue-900 text-lg line-clamp-1 mb-1">
                      {podcast.title}
                    </h3>
                    <p className="text-sm text-cultural-blue-600 line-clamp-2 mb-2">
                      {podcast.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-cultural-blue-500">
                      {podcast.category && (
                        <span className="bg-cultural-gold-100 text-cultural-gold-800 px-2 py-1 rounded-full">
                          {podcast.category}
                        </span>
                      )}
                      {podcast.rating && (
                        <div className="flex items-center space-x-2">
                          <Star className="w-3 h-3 text-cultural-gold-500 fill-current" />
                          <span>{podcast.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {podcasts.length === 0 && (
            <div className="text-center py-12">
              <Headphones className="w-16 h-16 text-cultural-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold text-cultural-blue-900 mb-2">No podcasts yet</h3>
              <p className="text-cultural-blue-600">Be the first to add a cultural podcast!</p>
            </div>
          )}
        </div>

        {/* Main Player */}
        <div className="lg:col-span-2">
          {selectedPodcast ? (
            <div className="card">
              <div className="mb-6">
                <div className="flex items-start space-x-6">
                  {selectedPodcast.image_url && (
                    <img
                      src={selectedPodcast.image_url}
                      alt={selectedPodcast.title}
                      className="w-32 h-32 object-cover rounded-xl shadow-lg"
                    />
                  )}
                  <div className="flex-1">
                    <h2 className="text-3xl font-serif font-bold text-cultural-blue-900 mb-3">
                      {selectedPodcast.title}
                    </h2>
                    <p className="text-cultural-blue-700 mb-4 leading-relaxed">
                      {selectedPodcast.description}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cultural-red-600">{selectedPodcast.episodes || 0}</div>
                        <div className="text-sm text-cultural-blue-600">Episodes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cultural-gold-600">{selectedPodcast.rating || 'N/A'}</div>
                        <div className="text-sm text-cultural-blue-600">Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cultural-blue-600">{selectedPodcast.duration || 'N/A'}</div>
                        <div className="text-sm text-cultural-blue-600">Duration</div>
                      </div>
                    </div>
                    
                    {selectedPodcast.embed_url && (
                      <div className="flex items-center space-x-4">
                        <a
                          href={selectedPodcast.embed_url.replace('/embed/', '/').replace('?utm_source=generator', '')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary flex items-center space-x-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Open in Spotify</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Spotify Embed */}
              {selectedPodcast.embed_url && (
                <div className="bg-cultural-beige-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Headphones className="w-5 h-5 text-cultural-green-600" />
                    <span className="font-medium text-cultural-blue-900">Now Playing</span>
                  </div>
                  <iframe
                    src={selectedPodcast.embed_url}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-lg"
                  ></iframe>
                </div>
              )}
            </div>
          ) : (
            <div className="card text-center py-12">
              <Headphones className="w-16 h-16 text-cultural-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold text-cultural-blue-900 mb-2">Select a Podcast</h3>
              <p className="text-cultural-blue-600">Choose a podcast from the list to start listening.</p>
            </div>
          )}
        </div>
      </div>

      {/* Podcast Form Modal */}
      {showPodcastForm && (
        <PodcastForm
          onClose={() => setShowPodcastForm(false)}
          onPodcastCreated={handlePodcastCreated}
        />
      )}
    </div>
  )
}