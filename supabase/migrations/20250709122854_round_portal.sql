/*
  # Create homepage tables

  1. New Tables
    - `aqi_readings`
      - `id` (uuid, primary key)
      - `current_aqi` (integer)
      - `pm25` (float)
      - `pm10` (float)
      - `timestamp` (timestamptz)
      - `location` (text)
    - `harvest_stats`
      - `id` (uuid, primary key)
      - `total_plants` (integer)
      - `fish_production` (float)
      - `monthly_revenue` (integer)
      - `updated_at` (timestamptz)
    - `testimonials`
      - `id` (uuid, primary key)
      - `name` (text)
      - `content` (text)
      - `rating` (integer)
      - `featured` (boolean)
      - `avatar_url` (text)
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `message` (text)
      - `created_at` (timestamptz)
  2. Security
    - Enable RLS on all tables
    - Add policies for public access to read-only data
    - Add policies for contact form submissions
    - Add policies for admin access
*/

-- Create aqi_readings table
CREATE TABLE IF NOT EXISTS aqi_readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  current_aqi INTEGER NOT NULL,
  pm25 FLOAT NOT NULL,
  pm10 FLOAT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT now(),
  location TEXT NOT NULL
);

-- Create harvest_stats table
CREATE TABLE IF NOT EXISTS harvest_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  total_plants INTEGER NOT NULL,
  fish_production FLOAT NOT NULL,
  monthly_revenue INTEGER NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  featured BOOLEAN DEFAULT false,
  avatar_url TEXT
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE aqi_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE harvest_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for aqi_readings
CREATE POLICY "Anyone can view aqi_readings"
  ON aqi_readings
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can insert aqi_readings"
  ON aqi_readings
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can update aqi_readings"
  ON aqi_readings
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Create policies for harvest_stats
CREATE POLICY "Anyone can view harvest_stats"
  ON harvest_stats
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can insert harvest_stats"
  ON harvest_stats
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can update harvest_stats"
  ON harvest_stats
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Create policies for testimonials
CREATE POLICY "Anyone can view testimonials"
  ON testimonials
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can insert testimonials"
  ON testimonials
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can update testimonials"
  ON testimonials
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Create policies for contact_submissions
CREATE POLICY "Authenticated users can submit contact forms"
  ON contact_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can view contact_submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));