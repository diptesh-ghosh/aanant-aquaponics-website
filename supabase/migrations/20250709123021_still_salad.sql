/*
  # Create services and bookings tables

  1. New Tables
    - `services`
      - `id` (uuid, primary key)
      - `service_name` (text)
      - `description` (text)
      - `price` (integer)
      - `duration` (text)
      - `stripe_price_id` (text)
      - `features` (text[])
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    - `service_bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles.id)
      - `service_id` (uuid, references services.id)
      - `booking_date` (timestamptz)
      - `status` (text)
      - `payment_status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    - `visit_locations`
      - `id` (uuid, primary key)
      - `location_name` (text)
      - `price` (integer)
      - `duration` (text)
      - `availability` (jsonb)
      - `stripe_price_id` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    - `visit_bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles.id)
      - `location_id` (uuid, references visit_locations.id)
      - `date` (timestamptz)
      - `status` (text)
      - `group_size` (integer)
      - `payment_status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    - `visit_schedules`
      - `id` (uuid, primary key)
      - `location_id` (uuid, references visit_locations.id)
      - `available_dates` (jsonb)
      - `time_slots` (jsonb)
      - `capacity` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  2. Security
    - Enable RLS on all tables
    - Add policies for public access to read-only data
    - Add policies for user bookings
    - Add policies for admin access
*/

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  duration TEXT NOT NULL,
  stripe_price_id TEXT,
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create service_bookings table
CREATE TABLE IF NOT EXISTS service_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  booking_date TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create visit_locations table
CREATE TABLE IF NOT EXISTS visit_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_name TEXT NOT NULL,
  price INTEGER NOT NULL,
  duration TEXT NOT NULL,
  availability JSONB DEFAULT '{}',
  stripe_price_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create visit_bookings table
CREATE TABLE IF NOT EXISTS visit_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  location_id UUID NOT NULL REFERENCES visit_locations(id) ON DELETE CASCADE,
  date TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  group_size INTEGER NOT NULL DEFAULT 1,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create visit_schedules table
CREATE TABLE IF NOT EXISTS visit_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES visit_locations(id) ON DELETE CASCADE,
  available_dates JSONB DEFAULT '{}',
  time_slots JSONB DEFAULT '{}',
  capacity INTEGER NOT NULL DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create triggers for updated_at
CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON services
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_service_bookings_updated_at
BEFORE UPDATE ON service_bookings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_visit_locations_updated_at
BEFORE UPDATE ON visit_locations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_visit_bookings_updated_at
BEFORE UPDATE ON visit_bookings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_visit_schedules_updated_at
BEFORE UPDATE ON visit_schedules
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE visit_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE visit_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE visit_schedules ENABLE ROW LEVEL SECURITY;

-- Create policies for services
CREATE POLICY "Anyone can view services"
  ON services
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can insert services"
  ON services
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can update services"
  ON services
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can delete services"
  ON services
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Create policies for service_bookings
CREATE POLICY "Users can view own service_bookings"
  ON service_bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own service_bookings"
  ON service_bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own service_bookings"
  ON service_bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all service_bookings"
  ON service_bookings
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can update all service_bookings"
  ON service_bookings
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Create policies for visit_locations
CREATE POLICY "Anyone can view visit_locations"
  ON visit_locations
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can insert visit_locations"
  ON visit_locations
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can update visit_locations"
  ON visit_locations
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can delete visit_locations"
  ON visit_locations
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Create policies for visit_bookings
CREATE POLICY "Users can view own visit_bookings"
  ON visit_bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own visit_bookings"
  ON visit_bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own visit_bookings"
  ON visit_bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all visit_bookings"
  ON visit_bookings
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can update all visit_bookings"
  ON visit_bookings
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Create policies for visit_schedules
CREATE POLICY "Anyone can view visit_schedules"
  ON visit_schedules
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can insert visit_schedules"
  ON visit_schedules
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can update visit_schedules"
  ON visit_schedules
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can delete visit_schedules"
  ON visit_schedules
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));