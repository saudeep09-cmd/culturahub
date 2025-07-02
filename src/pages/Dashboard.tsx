import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import { Calendar, Headphones, Clock, DollarSign, Heart, User } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Dashboard() {
  const { user, loading } = useAuth()
  const [stats, setStats] = useState({
    events: 0,
    podcasts: 0,
    timeline_events: 0,
    grants: 0,
    favorites: 0
  })
  const [recentActivity, setRecentActivity] = useState([])

  useEffect(() => {
    if (user) {
      fetchUserStats()
      fetchRecentActivity()
    }
  }, [user])

  const fetchUserStats = async () => {
    if (!user) return

    try {
      const [eventsRes, podcastsRes, timelineRes, grantsRes, favoritesRes] = await Promise.all([
        supabase.from('cultural_events').select('id', { count: 'exact' }).eq('created_by', user.id),
        supabase.from('podcasts').select('id', { count: 'exact' }).eq('created_by', user.id),
        supabase.from('timeline_events').select('id', { count: 'exact' }).eq('created_by', user.id),
        supabase.from('grants').select('id', { count: 'exact' }).eq('created_by', user.id),
        supabase.from('user_favorites').select('id', { count: 'exact' }).eq('user_id', user.id)
      ])

      setStats({
        events: eventsRes.count || 0,
        podcasts: podcastsRes.count || 0,
        timeline_events: timelineRes.count || 0,
        grants: grantsRes.count || 0,
        favorites: favoritesRes.count || 0
      })
    } catch (error) {
      console.error('Error fetching user stats:', error)
    }
  }

  const fetchRecentActivity = async () => {
    if (!user) return

    try {
      // Fetch recent items created by user
      const [events, podcasts, timeline, grants] = await Promise.all([
        supabase.from('cultural_events').select('id, title, created_at').eq('created_by', user.id).order('created_at', { ascending: false }).limit(3),
        supabase.from('podcasts').select('id, title, created_at').eq('created_by', user.id).order('created_at', { ascending: false }).limit(3),
        supabase.from('timeline_events').select('id, title, created_at').eq('created_by', user.id).order('created_at', { ascending: false }).limit(3),
        supabase.from('grants').select('id, title, created_at').eq('created_by', user.id).order('created_at', { ascending: false }).limit(3)
      ])

      const activity = [
        ...(events.data || []).map(item => ({ ...item, type: 'event' })),
        ...(podcasts.data || []).map(item => ({ ...item, type: 'podcast' })),
        ...(timeline.data || []).map(item => ({ ...item, type: 'timeline' })),
        ...(grants.data || []).map(item => ({ ...item, type: 'grant' }))
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5)

      setRecentActivity(activity)
    } catch (error) {
      console.error('Error fetching recent activity:', error)
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-cultural-beige-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="h-24 bg-cultural-beige-200 rounded-lg"></div>
            <div className="h-24 bg-cultural-beige-200 rounded-lg"></div>
            <div className="h-24 bg-cultural-beige-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'event': return Calendar
      case 'podcast': return Headphones
      case 'timeline': return Clock
      case 'grant': return DollarSign
      default: return Calendar
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'event': return 'text-cultural-red-600'
      case 'podcast': return 'text-cultural-gold-600'
      case 'timeline': return 'text-cultural-blue-600'
      case 'grant': return 'text-cultural-green-600'
      default: return 'text-cultural-blue-600'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-cultural-red-500 to-cultural-gold-500 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-cultural-blue-900">Welcome back!</h1>
            <p className="text-cultural-blue-700">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        <div className="card text-center">
          <Calendar className="w-8 h-8 text-cultural-red-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-cultural-blue-900">{stats.events}</div>
          <div className="text-sm text-cultural-blue-600">Events Created</div>
        </div>
        
        <div className="card text-center">
          <Headphones className="w-8 h-8 text-cultural-gold-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-cultural-blue-900">{stats.podcasts}</div>
          <div className="text-sm text-cultural-blue-600">Podcasts Added</div>
        </div>
        
        <div className="card text-center">
          <Clock className="w-8 h-8 text-cultural-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-cultural-blue-900">{stats.timeline_events}</div>
          <div className="text-sm text-cultural-blue-600">Timeline Events</div>
        </div>
        
        <div className="card text-center">
          <DollarSign className="w-8 h-8 text-cultural-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-cultural-blue-900">{stats.grants}</div>
          <div className="text-sm text-cultural-blue-600">Grants Added</div>
        </div>
        
        <div className="card text-center">
          <Heart className="w-8 h-8 text-cultural-red-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-cultural-blue-900">{stats.favorites}</div>
          <div className="text-sm text-cultural-blue-600">Favorites</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-2xl font-serif font-bold text-cultural-blue-900 mb-6">Recent Activity</h2>
        
        {recentActivity.length > 0 ? (
          <div className="space-y-4">
            {recentActivity.map((item: any) => {
              const Icon = getActivityIcon(item.type)
              return (
                <div key={`${item.type}-${item.id}`} className="flex items-center space-x-4 p-4 bg-cultural-beige-50 rounded-lg">
                  <Icon className={`w-6 h-6 ${getActivityColor(item.type)}`} />
                  <div className="flex-1">
                    <h3 className="font-semibold text-cultural-blue-900">{item.title}</h3>
                    <p className="text-sm text-cultural-blue-600 capitalize">
                      {item.type} • {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-cultural-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-serif font-semibold text-cultural-blue-900 mb-2">No activity yet</h3>
            <p className="text-cultural-blue-600 mb-4">Start by creating your first cultural content!</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/events" className="btn-secondary">Add Event</a>
              <a href="/audio" className="btn-secondary">Add Podcast</a>
              <a href="/timeline" className="btn-secondary">Add Timeline</a>
              <a href="/grants" className="btn-secondary">Add Grant</a>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <a href="/events" className="card hover:shadow-xl transition-shadow text-center">
          <Calendar className="w-12 h-12 text-cultural-red-600 mx-auto mb-4" />
          <h3 className="text-lg font-serif font-semibold text-cultural-blue-900 mb-2">Add Event</h3>
          <p className="text-cultural-blue-600 text-sm">Share a cultural event with the community</p>
        </a>
        
        <a href="/audio" className="card hover:shadow-xl transition-shadow text-center">
          <Headphones className="w-12 h-12 text-cultural-gold-600 mx-auto mb-4" />
          <h3 className="text-lg font-serif font-semibold text-cultural-blue-900 mb-2">Add Podcast</h3>
          <p className="text-cultural-blue-600 text-sm">Contribute to our audio library</p>
        </a>
        
        <a href="/timeline" className="card hover:shadow-xl transition-shadow text-center">
          <Clock className="w-12 h-12 text-cultural-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-serif font-semibold text-cultural-blue-900 mb-2">Add Timeline</h3>
          <p className="text-cultural-blue-600 text-sm">Document historical events</p>
        </a>
        
        <a href="/grants" className="card hover:shadow-xl transition-shadow text-center">
          <DollarSign className="w-12 h-12 text-cultural-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-serif font-semibold text-cultural-blue-900 mb-2">Add Grant</h3>
          <p className="text-cultural-blue-600 text-sm">Share funding opportunities</p>
        </a>
      </div>
    </div>
  )
}