/*
  # Create gallery and projects tables

  1. New Tables
    - `gallery_images`
      - `id` (uuid, primary key)
      - `image_url` (text)
      - `caption` (text)
      - `category` (text)
      - `upload_date` (timestamptz)
      - `location` (text)
      - `project_id` (uuid, references projects.id, nullable)
    - `harvest_documentation`
      - `id` (uuid, primary key)
      - `location` (text)
      - `date` (date)
      - `yield_data` (jsonb)
      - `images` (text[])
    - `projects`
      - `id` (uuid, primary key)
      - `location` (text)
      - `capacity` (text)
      - `specifications` (jsonb)
      - `achievements` (jsonb)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    - `project_images`
      - `id` (uuid, primary key)
      - `project_id` (uuid, references projects.id)
      - `image_url` (text)
      - `description` (text)
      - `category` (text)
  2. Security
    - Enable RLS on all tables
    - Add policies for public access to read-only data
    - Add policies for admin access
*/

-- Create projects table first (since it's referenced by gallery_images)
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location TEXT NOT NULL,
  capacity TEXT NOT NULL,
  specifications JSONB DEFAULT '{}',
  achievements JSONB DEFAULT '{}',
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT,
  category TEXT,
  upload_date TIMESTAMPTZ DEFAULT now(),
  location TEXT,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL
);

-- Create harvest_documentation table
CREATE TABLE IF NOT EXISTS harvest_documentation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location TEXT NOT NULL,
  date DATE NOT NULL,
  yield_data JSONB DEFAULT '{}',
  images TEXT[] DEFAULT '{}'
);

-- Create project_images table
CREATE TABLE IF NOT EXISTS project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  description TEXT,
  category TEXT
);

-- Create trigger for updated_at
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Enable Row Level Security
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE harvest_documentation ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;

-- Create policies for gallery_images
CREATE POLICY "Anyone can view gallery_images"
  ON gallery_images
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can insert gallery_images"
  ON gallery_images
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can update gallery_images"
  ON gallery_images
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can delete gallery_images"
  ON gallery_images
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Create policies for harvest_documentation
CREATE POLICY "Anyone can view harvest_documentation"
  ON harvest_documentation
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can insert harvest_documentation"
  ON harvest_documentation
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can update harvest_documentation"
  ON harvest_documentation
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can delete harvest_documentation"
  ON harvest_documentation
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Create policies for projects
CREATE POLICY "Anyone can view projects"
  ON projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can insert projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can update projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can delete projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Create policies for project_images
CREATE POLICY "Anyone can view project_images"
  ON project_images
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can insert project_images"
  ON project_images
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can update project_images"
  ON project_images
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can delete project_images"
  ON project_images
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));