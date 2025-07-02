import React, { useState } from 'react'
import { X, Clock, Plus, Trash2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

interface TimelineFormProps {
  onClose: () => void
  onTimelineCreated: () => void
}

export default function TimelineForm({ onClose, onTimelineCreated }: TimelineFormProps) {
  const [formData, setFormData] = useState({
    year: '',
    title: '',
    description: '',
    details: '',
    category: '',
    image_url: '',
    location: '',
    key_figures: ['']
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()

  const categories = ['Art Movement', 'Historical Event', 'Cultural Shift', 'Innovation']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setError('')

    try {
      const { error } = await supabase
        .from('timeline_events')
        .insert({
          ...formData,
          key_figures: formData.key_figures.filter(figure => figure.trim() !== ''),
          created_by: user.id
        })

      if (error) throw error

      onTimelineCreated()
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addKeyFigure = () => {
    setFormData(prev => ({
      ...prev,
      key_figures: [...prev.key_figures, '']
    }))
  }

  const updateKeyFigure = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      key_figures: prev.key_figures.map((figure, i) => i === index ? value : figure)
    }))
  }

  const removeKeyFigure = (index: number) => {
    setFormData(prev => ({
      ...prev,
      key_figures: prev.key_figures.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif font-bold text-cultural-blue-900">Add Timeline Event</h2>
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
                  <Clock className="w-4 h-4 inline mr-1" />
                  Year/Period *
                </label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
                  placeholder="e.g., 1400-1600, 1920s, 1969"
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
                Event Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
                placeholder="Enter event title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-cultural-blue-700 mb-2">
                Brief Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={2}
                className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
                placeholder="Brief summary of the event"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-cultural-blue-700 mb-2">
                Detailed Description
              </label>
              <textarea
                value={formData.details}
                onChange={(e) => handleInputChange('details', e.target.value)}
                rows={4}
                className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
                placeholder="Detailed information about the event"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-cultural-blue-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
                placeholder="Geographic location or region"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-cultural-blue-700 mb-2">
                Key Figures
              </label>
              <div className="space-y-2">
                {formData.key_figures.map((figure, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={figure}
                      onChange={(e) => updateKeyFigure(index, e.target.value)}
                      className="flex-1 p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
                      placeholder="Enter name of key figure"
                    />
                    {formData.key_figures.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeKeyFigure(index)}
                        className="p-3 text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addKeyFigure}
                  className="flex items-center space-x-2 text-cultural-blue-600 hover:text-cultural-blue-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Key Figure</span>
                </button>
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
                {loading ? 'Creating...' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}