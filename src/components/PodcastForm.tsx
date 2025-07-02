import React, { useState } from 'react'
import { X, Headphones, Star } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

interface PodcastFormProps {
  onClose: () => void
  onPodcastCreated: () => void
}

export default function PodcastForm({ onClose, onPodcastCreated }: PodcastFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    embed_url: '',
    category: '',
    rating: '',
    episodes: '',
    duration: '',
    image_url: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()

  const categories = ['Art History', 'Contemporary Art', 'Art Interviews', 'Art Education', 'History', 'Culture']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setError('')

    try {
      const { error } = await supabase
        .from('podcasts')
        .insert({
          ...formData,
          rating: formData.rating ? parseFloat(formData.rating) : null,
          episodes: formData.episodes ? parseInt(formData.episodes) : null,
          created_by: user.id
        })

      if (error) throw error

      onPodcastCreated()
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif font-bold text-cultural-blue-900">Add Podcast</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-cultural-beige-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-cultural-blue-700 mb-2">
                  Podcast Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
                  placeholder="Enter podcast title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cultural-blue-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-cultural-blue-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
                placeholder="Describe the podcast"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-cultural-blue-700 mb-2">
                <Headphones className="w-4 h-4 inline mr-1" />
                Spotify Embed URL
              </label>
              <input
                type="url"
                value={formData.embed_url}
                onChange={(e) => handleInputChange('embed_url', e.target.value)}
                className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
                placeholder="https://open.spotify.com/embed/show/..."
              />
              <p className="text-xs text-cultural-blue-500 mt-1">
                Get the embed URL from Spotify by clicking Share → Embed
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-cultural-blue-700 mb-2">
                  <Star className="w-4 h-4 inline mr-1" />
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => handleInputChange('rating', e.target.value)}
                  className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
                  placeholder="4.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cultural-blue-700 mb-2">
                  Episodes
                </label>
                <input
                  type="number"
                  value={formData.episodes}
                  onChange={(e) => handleInputChange('episodes', e.target.value)}
                  className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
                  placeholder="156"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cultural-blue-700 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
                  placeholder="45 min avg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-cultural-blue-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => handleInputChange('image_url', e.target.value)}
                className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
                placeholder="https://..."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-cultural-beige-300 rounded-lg text-cultural-blue-700 hover:bg-cultural-beige-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding...' : 'Add Podcast'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}