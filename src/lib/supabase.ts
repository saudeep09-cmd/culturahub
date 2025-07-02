import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface CulturalEvent {
  id: string
  title: string
  description?: string
  date?: string
  time?: string
  location?: string
  latitude?: number
  longitude?: number
  category?: string
  price?: string
  image_url?: string
  website_url?: string
  created_by?: string
  created_at?: string
  updated_at?: string
}

export interface Podcast {
  id: string
  title: string
  description?: string
  embed_url?: string
  category?: string
  rating?: number
  episodes?: number
  duration?: string
  image_url?: string
  created_by?: string
  created_at?: string
}

export interface TimelineEvent {
  id: string
  year: string
  title: string
  description?: string
  details?: string
  category?: string
  image_url?: string
  key_figures?: string[]
  location?: string
  created_by?: string
  created_at?: string
}

export interface Grant {
  id: string
  title: string
  organization?: string
  description?: string
  amount?: string
  deadline?: string
  region?: string
  category?: string
  eligibility?: string
  website_url?: string
  created_by?: string
  created_at?: string
}

export interface UserFavorite {
  id: string
  user_id: string
  item_type: 'event' | 'podcast' | 'timeline' | 'grant'
  item_id: string
  created_at?: string
}

export interface ChatQuery {
  id: string
  user_id?: string
  query: string
  response?: string
  created_at?: string
}