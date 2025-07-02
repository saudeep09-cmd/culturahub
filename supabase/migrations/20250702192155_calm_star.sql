/*
  # CulturaHub Database Schema

  1. New Tables
    - `cultural_events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `date` (date)
      - `time` (time)
      - `location` (text)
      - `latitude` (decimal)
      - `longitude` (decimal)
      - `category` (text)
      - `price` (text)
      - `image_url` (text)
      - `website_url` (text)
      - `created_by` (uuid, references auth.users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `podcasts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `embed_url` (text)
      - `category` (text)
      - `rating` (decimal)
      - `episodes` (integer)
      - `duration` (text)
      - `image_url` (text)
      - `created_by` (uuid, references auth.users)
      - `created_at` (timestamp)

    - `timeline_events`
      - `id` (uuid, primary key)
      - `year` (text)
      - `title` (text)
      - `description` (text)
      - `details` (text)
      - `category` (text)
      - `image_url` (text)
      - `key_figures` (text[])
      - `location` (text)
      - `created_by` (uuid, references auth.users)
      - `created_at` (timestamp)

    - `grants`
      - `id` (uuid, primary key)
      - `title` (text)
      - `organization` (text)
      - `description` (text)
      - `amount` (text)
      - `deadline` (date)
      - `region` (text)
      - `category` (text)
      - `eligibility` (text)
      - `website_url` (text)
      - `created_by` (uuid, references auth.users)
      - `created_at` (timestamp)

    - `user_favorites`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `item_type` (text) -- 'event', 'podcast', 'timeline', 'grant'
      - `item_id` (uuid)
      - `created_at` (timestamp)

    - `chat_queries`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `query` (text)
      - `response` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read/write their own data
    - Add policies for public read access where appropriate
*/

-- Cultural Events Table
CREATE TABLE IF NOT EXISTS cultural_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  date date,
  time time,
  location text,
  latitude decimal,
  longitude decimal,
  category text,
  price text DEFAULT 'Free',
  image_url text,
  website_url text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Podcasts Table
CREATE TABLE IF NOT EXISTS podcasts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  embed_url text,
  category text,
  rating decimal DEFAULT 0,
  episodes integer DEFAULT 0,
  duration text,
  image_url text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Timeline Events Table
CREATE TABLE IF NOT EXISTS timeline_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  year text NOT NULL,
  title text NOT NULL,
  description text,
  details text,
  category text,
  image_url text,
  key_figures text[],
  location text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Grants Table
CREATE TABLE IF NOT EXISTS grants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  organization text,
  description text,
  amount text,
  deadline date,
  region text,
  category text,
  eligibility text,
  website_url text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- User Favorites Table
CREATE TABLE IF NOT EXISTS user_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  item_type text NOT NULL,
  item_id uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, item_type, item_id)
);

-- Chat Queries Table
CREATE TABLE IF NOT EXISTS chat_queries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  query text NOT NULL,
  response text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE cultural_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_queries ENABLE ROW LEVEL SECURITY;

-- Policies for cultural_events
CREATE POLICY "Anyone can view cultural events"
  ON cultural_events
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create events"
  ON cultural_events
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own events"
  ON cultural_events
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Policies for podcasts
CREATE POLICY "Anyone can view podcasts"
  ON podcasts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create podcasts"
  ON podcasts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Policies for timeline_events
CREATE POLICY "Anyone can view timeline events"
  ON timeline_events
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create timeline events"
  ON timeline_events
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Policies for grants
CREATE POLICY "Anyone can view grants"
  ON grants
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create grants"
  ON grants
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Policies for user_favorites
CREATE POLICY "Users can view their own favorites"
  ON user_favorites
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own favorites"
  ON user_favorites
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for chat_queries
CREATE POLICY "Users can view their own chat queries"
  ON chat_queries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create chat queries"
  ON chat_queries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Insert sample data
INSERT INTO cultural_events (title, description, date, time, location, latitude, longitude, category, price, image_url) VALUES
('Renaissance Masters Exhibition', 'Explore masterpieces from Leonardo da Vinci, Michelangelo, and Raphael in this comprehensive exhibition.', '2024-03-15', '10:00', 'Metropolitan Museum of Art, New York', 40.7794, -73.9632, 'Exhibition', '$25', 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'),
('Jazz History Walking Tour', 'Discover the birthplace of jazz through historic venues and legendary performance spaces.', '2024-03-20', '14:00', 'French Quarter, New Orleans', 29.9584, -90.0644, 'Heritage Walk', 'Free', 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1'),
('Contemporary Art Symposium', 'Leading artists and critics discuss the future of contemporary art and digital media.', '2024-03-25', '09:00', 'Tate Modern, London', 51.5076, -0.0994, 'Conference', '$45', 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1');

INSERT INTO podcasts (title, description, embed_url, category, rating, episodes, duration, image_url) VALUES
('Art History Babes', 'Two art history graduate students discuss famous artworks, movements, and the stories behind them.', 'https://open.spotify.com/embed/show/7gozmLqbcbr6PScMjc0Zl4?utm_source=generator', 'Art History', 4.8, 156, '45 min avg', 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1'),
('A Piece of Work', 'WNYC Studios explores art and culture through intimate conversations with artists and curators.', 'https://open.spotify.com/embed/show/2Shpxw7dPoxRJCdfFXTWLE?utm_source=generator', 'Contemporary Art', 4.9, 89, '35 min avg', 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1'),
('The Modern Art Notes Podcast', 'Tyler Green interviews artists, museum directors, and art world figures about contemporary art.', 'https://open.spotify.com/embed/show/6kAsbP8pxwaU2kPibKTuHE?utm_source=generator', 'Art Interviews', 4.7, 234, '60 min avg', 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1');

INSERT INTO timeline_events (year, title, description, details, category, image_url, key_figures, location) VALUES
('1400-1600', 'Renaissance Period', 'A cultural movement that profoundly affected European intellectual life, marking the transition from medieval to modern times.', 'The Renaissance saw the emergence of humanism, scientific revolution, and artistic innovation. Key figures include Leonardo da Vinci, Michelangelo, and Galileo.', 'Art Movement', 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1', ARRAY['Leonardo da Vinci', 'Michelangelo', 'Raphael'], 'Italy, Europe'),
('1860-1886', 'Impressionism', 'A 19th-century art movement characterized by small, thin brush strokes and emphasis on light and its changing qualities.', 'Impressionist painters often painted outdoors to capture natural light and color. They focused on everyday subjects and moments.', 'Art Movement', 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1', ARRAY['Claude Monet', 'Pierre-Auguste Renoir', 'Edgar Degas'], 'France'),
('1960s', 'Pop Art Movement', 'An art movement that emerged in the 1950s and flourished in the 1960s, drawing inspiration from popular culture.', 'Pop Art challenged traditional fine art by including imagery from popular culture such as advertising, comic books, and mundane objects.', 'Art Movement', 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1', ARRAY['Andy Warhol', 'Roy Lichtenstein', 'Jasper Johns'], 'United States, United Kingdom');

INSERT INTO grants (title, organization, description, amount, deadline, region, category, eligibility, website_url) VALUES
('National Endowment for the Arts - Individual Artists', 'National Endowment for the Arts', 'Fellowship grants for individual artists to support the creation of new work and career development.', '$25,000', '2024-09-15', 'United States', 'Visual Arts', 'Professional artists with demonstrated excellence in their field', 'https://www.arts.gov'),
('Community Arts Development Grant', 'Arts Council', 'Supporting community-based arts programs that engage diverse populations and strengthen local cultural activities.', '$5,000 - $15,000', '2024-08-30', 'California', 'Community Arts', 'Non-profit organizations and community groups', 'https://www.artscouncil.ca.gov'),
('Cultural Heritage Preservation Fund', 'Heritage Foundation', 'Grants for projects focused on preserving and documenting cultural heritage sites and traditions.', '$50,000', '2024-10-01', 'Global', 'Heritage', 'Museums, cultural institutions, and heritage organizations', 'https://www.heritagefund.org');