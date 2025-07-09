/*
  # Create admin-only tables

  1. New Tables
    - `admin_analytics`
      - `id` (uuid, primary key)
      - `metric_name` (text)
      - `value` (jsonb)
      - `timestamp` (timestamptz)
    - `user_management`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles.id)
      - `role` (text)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    - `content_moderation`
      - `id` (uuid, primary key)
      - `item_type` (text)
      - `item_id` (uuid)
      - `status` (text)
      - `moderator_id` (uuid, references profiles.id)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    - `inventory_management`
      - `id` (uuid, primary key)
      - `product_type` (text)
      - `product_id` (uuid)
      - `stock_level` (integer)
      - `last_updated` (timestamptz)
    - `financial_reports`
      - `id` (uuid, primary key)
      - `report_type` (text)
      - `data` (jsonb)
      - `generated_at` (timestamptz)
    - `system_logs`
      - `id` (uuid, primary key)
      - `log_level` (text)
      - `message` (text)
      - `timestamp` (timestamptz)
  2. Security
    - Enable RLS on all tables
    - Add policies for admin-only access
*/

-- Create admin_analytics table
CREATE TABLE IF NOT EXISTS admin_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name TEXT NOT NULL,
  value JSONB NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT now()
);

-- Create user_management table
CREATE TABLE IF NOT EXISTS user_management (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create content_moderation table
CREATE TABLE IF NOT EXISTS content_moderation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_type TEXT NOT NULL,
  item_id UUID NOT NULL,
  status TEXT NOT NULL,
  moderator_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create inventory_management table
CREATE TABLE IF NOT EXISTS inventory_management (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_type TEXT NOT NULL,
  product_id UUID NOT NULL,
  stock_level INTEGER NOT NULL,
  last_updated TIMESTAMPTZ DEFAULT now()
);

-- Create financial_reports table
CREATE TABLE IF NOT EXISTS financial_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_type TEXT NOT NULL,
  data JSONB NOT NULL,
  generated_at TIMESTAMPTZ DEFAULT now()
);

-- Create system_logs table
CREATE TABLE IF NOT EXISTS system_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  log_level TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT now()
);

-- Create triggers for updated_at
CREATE TRIGGER update_user_management_updated_at
BEFORE UPDATE ON user_management
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_content_moderation_updated_at
BEFORE UPDATE ON content_moderation
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Enable Row Level Security
ALTER TABLE admin_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_management ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_moderation ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_management ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;

-- Create admin-only policies for all tables
CREATE POLICY "Admin can access admin_analytics"
  ON admin_analytics
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can access user_management"
  ON user_management
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can access content_moderation"
  ON content_moderation
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can access inventory_management"
  ON inventory_management
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can access financial_reports"
  ON financial_reports
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can access system_logs"
  ON system_logs
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));