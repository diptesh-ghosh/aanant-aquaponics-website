/*
  # Create success stories tables

  1. New Tables
    - `success_stories`
      - `id` (uuid, primary key)
      - `user_name` (text)
      - `location` (text)
      - `occupation` (text)
      - `story` (text)
      - `before_aqi` (integer)
      - `after_aqi` (integer)
      - `monthly_income` (integer)
      - `timeframe` (text)
      - `testimonial` (text)
      - `image` (text)
      - `featured` (boolean)
      - `approved` (boolean)
      - `created_at` (timestamptz)
    - `story_categories`
      - `id` (uuid, primary key)
      - `category_name` (text)
      - `description` (text)
  2. Security
    - Enable RLS on all tables
    - Add policies for public access to read-only data
    - Add policies for user story submissions
    - Add policies for admin access
*/

-- Create success_stories table
CREATE TABLE IF NOT EXISTS success_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name TEXT NOT NULL,
  location TEXT NOT NULL,
  occupation TEXT,
  story TEXT NOT NULL,
  before_aqi INTEGER NOT NULL,
  after_aqi INTEGER NOT NULL,
  monthly_income INTEGER NOT NULL,
  timeframe TEXT NOT NULL,
  testimonial TEXT NOT NULL,
  image TEXT,
  featured BOOLEAN DEFAULT false,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create story_categories table
CREATE TABLE IF NOT EXISTS story_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_name TEXT NOT NULL,
  description TEXT
);

-- Enable Row Level Security
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for success_stories
CREATE POLICY "Anyone can view approved success_stories"
  ON success_stories
  FOR SELECT
  TO anon, authenticated
  USING (approved = true);

CREATE POLICY "Authenticated users can insert success_stories"
  ON success_stories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can view all success_stories"
  ON success_stories
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can update success_stories"
  ON success_stories
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can delete success_stories"
  ON success_stories
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Create policies for story_categories
CREATE POLICY "Anyone can view story_categories"
  ON story_categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can insert story_categories"
  ON story_categories
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can update story_categories"
  ON story_categories
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can delete story_categories"
  ON story_categories
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));