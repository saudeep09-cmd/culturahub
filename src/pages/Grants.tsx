import React, { useState, useEffect } from 'react'
import { Search, Filter, DollarSign, Calendar, MapPin, ExternalLink, Plus } from 'lucide-react'
import { supabase, Grant } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import GrantForm from '../components/GrantForm'

export default function Grants() {
  const [grants, setGrants] = useState<Grant[]>([])
  const [filteredGrants, setFilteredGrants] = useState<Grant[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [showGrantForm, setShowGrantForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const categories = ['All', 'Visual Arts', 'Community Arts', 'Heritage', 'Digital Arts', 'Public Art']
  const regions = ['All', 'United States', 'California', 'Global', 'International', 'Europe']

  useEffect(() => {
    fetchGrants()
  }, [])

  useEffect(() => {
    filterGrants()
  }, [grants, searchTerm, selectedCategory, selectedRegion])

  const fetchGrants = async () => {
    try {
      const { data, error } = await supabase
        .from('grants')
        .select('*')
        .order('deadline', { ascending: true })

      if (error) throw error
      setGrants(data || [])
    } catch (error) {
      console.error('Error fetching grants:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterGrants = () => {
    let filtered = grants

    if (searchTerm) {
      filtered = filtered.filter(grant =>
        grant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grant.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grant.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(grant => grant.category === selectedCategory)
    }

    if (selectedRegion !== 'All') {
      filtered = filtered.filter(grant => grant.region === selectedRegion)
    }

    setFilteredGrants(filtered)
  }

  const handleGrantCreated = () => {
    fetchGrants()
    setShowGrantForm(false)
  }

  const getDaysLeft = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-cultural-beige-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-cultural-beige-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            <div className="h-32 bg-cultural-beige-200 rounded-lg"></div>
            <div className="h-32 bg-cultural-beige-200 rounded-lg"></div>
            <div className="h-32 bg-cultural-beige-200 rounded-lg"></div>
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
            <h1 className="text-4xl font-serif font-bold text-cultural-blue-900 mb-4">Grants & Residencies</h1>
            <p className="text-xl text-cultural-blue-700">Discover funding opportunities for artists, cultural projects, and creative endeavors.</p>
          </div>
          {user && (
            <button
              onClick={() => setShowGrantForm(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Grant</span>
            </button>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cultural-blue-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search grants and residencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-3 border border-cultural-beige-300 rounded-lg hover:bg-cultural-beige-50 transition-colors">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
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
            <label className="block text-sm font-medium text-cultural-blue-700 mb-2">Region</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full p-3 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent"
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grants List */}
      <div className="space-y-6">
        {filteredGrants.map((grant) => (
          <div key={grant.id} className="card hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-2xl font-serif font-semibold text-cultural-blue-900 mb-2">{grant.title}</h3>
                {grant.organization && (
                  <p className="text-cultural-blue-600 mb-2 font-medium">{grant.organization}</p>
                )}
                {grant.description && (
                  <p className="text-cultural-blue-700 mb-4 leading-relaxed">{grant.description}</p>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {grant.amount && (
                    <div className="flex items-center text-sm text-cultural-blue-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span className="font-medium">{grant.amount}</span>
                    </div>
                  )}
                  {grant.deadline && (
                    <div className="flex items-center text-sm text-cultural-blue-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Deadline: {new Date(grant.deadline).toLocaleDateString()}</span>
                    </div>
                  )}
                  {grant.region && (
                    <div className="flex items-center text-sm text-cultural-blue-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{grant.region}</span>
                    </div>
                  )}
                </div>
                
                {grant.eligibility && (
                  <div className="mb-4">
                    <p className="text-sm text-cultural-blue-600">
                      <span className="font-medium">Eligibility:</span> {grant.eligibility}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col items-end space-y-2 ml-4">
                {grant.category && (
                  <span className="bg-cultural-gold-100 text-cultural-gold-800 px-3 py-1 rounded-full text-sm font-medium">
                    {grant.category}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-cultural-beige-200">
              <div className="text-sm text-cultural-blue-500">
                {grant.deadline && (
                  <>
                    {getDaysLeft(grant.deadline) > 0 ? (
                      <span className="text-cultural-green-600 font-medium">
                        {getDaysLeft(grant.deadline)} days left
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">Deadline passed</span>
                    )}
                  </>
                )}
              </div>
              {grant.website_url && (
                <a
                  href={grant.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center space-x-2"
                >
                  <span>Learn More</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredGrants.length === 0 && (
        <div className="text-center py-12">
          <DollarSign className="w-16 h-16 text-cultural-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-serif font-semibold text-cultural-blue-900 mb-2">No grants found</h3>
          <p className="text-cultural-blue-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}

      {/* Grant Form Modal */}
      {showGrantForm && (
        <GrantForm
          onClose={() => setShowGrantForm(false)}
          onGrantCreated={handleGrantCreated}
        />
      )}
    </div>
  )
}