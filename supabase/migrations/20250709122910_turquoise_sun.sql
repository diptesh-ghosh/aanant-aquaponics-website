/*
  # Create courses and enrollments tables

  1. New Tables
    - `courses`
      - `id` (uuid, primary key)
      - `title` (text)
      - `subtitle` (text)
      - `description` (text)
      - `price` (integer)
      - `original_price` (integer)
      - `curriculum` (jsonb)
      - `duration` (text)
      - `level` (text)
      - `stripe_price_id` (text)
      - `image` (text)
      - `features` (text[])
      - `outcomes` (text[])
      - `modules` (integer)
      - `videos` (integer)
      - `downloads` (integer)
      - `certificate` (boolean)
      - `support` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    - `course_bundles`
      - `id` (uuid, primary key)
      - `bundle_name` (text)
      - `description` (text)
      - `courses_included` (text[])
      - `original_price` (integer)
      - `discounted_price` (integer)
      - `stripe_price_id` (text)
      - `image` (text)
      - `features` (text[])
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    - `enrollments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles.id)
      - `course_id` (uuid, references courses.id)
      - `enrollment_date` (timestamptz)
      - `progress` (integer)
      - `completion_date` (timestamptz)
      - `certificates` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  2. Security
    - Enable RLS on all tables
    - Add policies for public access to read-only data
    - Add policies for user enrollments
    - Add policies for admin access
*/

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER NOT NULL,
  curriculum JSONB DEFAULT '{}',
  duration TEXT,
  level TEXT,
  stripe_price_id TEXT,
  image TEXT,
  features TEXT[] DEFAULT '{}',
  outcomes TEXT[] DEFAULT '{}',
  modules INTEGER DEFAULT 0,
  videos INTEGER DEFAULT 0,
  downloads INTEGER DEFAULT 0,
  certificate BOOLEAN DEFAULT false,
  support TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create course_bundles table
CREATE TABLE IF NOT EXISTS course_bundles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bundle_name TEXT NOT NULL,
  description TEXT NOT NULL,
  courses_included TEXT[] NOT NULL,
  original_price INTEGER NOT NULL,
  discounted_price INTEGER NOT NULL,
  stripe_price_id TEXT,
  image TEXT,
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrollment_date TIMESTAMPTZ DEFAULT now(),
  progress INTEGER DEFAULT 0,
  completion_date TIMESTAMPTZ,
  certificates JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Create triggers for updated_at
CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON courses
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_course_bundles_updated_at
BEFORE UPDATE ON course_bundles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_enrollments_updated_at
BEFORE UPDATE ON enrollments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_bundles ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Create policies for courses
CREATE POLICY "Anyone can view courses"
  ON courses
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can insert courses"
  ON courses
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can update courses"
  ON courses
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Create policies for course_bundles
CREATE POLICY "Anyone can view course_bundles"
  ON course_bundles
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can insert course_bundles"
  ON course_bundles
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can update course_bundles"
  ON course_bundles
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Create policies for enrollments
CREATE POLICY "Users can view own enrollments"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own enrollments"
  ON enrollments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own enrollments"
  ON enrollments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all enrollments"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can update all enrollments"
  ON enrollments
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));