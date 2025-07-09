/*
  # Create e-commerce tables

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `price` (integer)
      - `original_price` (integer)
      - `description` (text)
      - `category` (text)
      - `stock` (integer)
      - `stripe_price_id` (text)
      - `images` (text[])
      - `features` (text[])
      - `specifications` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    - `fresh_produce`
      - `id` (uuid, primary key)
      - `item_name` (text)
      - `price` (integer)
      - `original_price` (integer)
      - `unit` (text)
      - `availability` (text)
      - `harvest_date` (date)
      - `expiry_date` (date)
      - `stripe_price_id` (text)
      - `category` (text)
      - `image` (text)
      - `description` (text)
      - `nutritional_info` (jsonb)
      - `stock` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    - `cart_items`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles.id)
      - `product_id` (uuid, nullable)
      - `produce_id` (uuid, nullable)
      - `quantity` (integer)
      - `created_at` (timestamptz)
    - `orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles.id)
      - `items` (jsonb)
      - `total` (integer)
      - `status` (text)
      - `delivery_date` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    - `delivery_zones`
      - `id` (uuid, primary key)
      - `pincode` (text)
      - `area_name` (text)
      - `delivery_day` (text)
      - `charges` (integer)
      - `active` (boolean)
  2. Security
    - Enable RLS on all tables
    - Add policies for public access to read-only data
    - Add policies for user cart and orders
    - Add policies for admin access
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  stripe_price_id TEXT,
  images TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  specifications JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create fresh_produce table
CREATE TABLE IF NOT EXISTS fresh_produce (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_name TEXT NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER NOT NULL,
  unit TEXT NOT NULL,
  availability TEXT NOT NULL,
  harvest_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  stripe_price_id TEXT,
  category TEXT NOT NULL,
  image TEXT,
  description TEXT NOT NULL,
  nutritional_info JSONB DEFAULT '{}',
  stock INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  produce_id UUID REFERENCES fresh_produce(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  CHECK (product_id IS NOT NULL OR produce_id IS NOT NULL)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  items JSONB NOT NULL,
  total INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  delivery_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create delivery_zones table
CREATE TABLE IF NOT EXISTS delivery_zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pincode TEXT NOT NULL,
  area_name TEXT NOT NULL,
  delivery_day TEXT NOT NULL,
  charges INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true
);

-- Create triggers for updated_at
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_fresh_produce_updated_at
BEFORE UPDATE ON fresh_produce
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE fresh_produce ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_zones ENABLE ROW LEVEL SECURITY;

-- Create policies for products
CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Create policies for fresh_produce
CREATE POLICY "Anyone can view fresh_produce"
  ON fresh_produce
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can insert fresh_produce"
  ON fresh_produce
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can update fresh_produce"
  ON fresh_produce
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can delete fresh_produce"
  ON fresh_produce
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Create policies for cart_items
CREATE POLICY "Users can view own cart_items"
  ON cart_items
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart_items"
  ON cart_items
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart_items"
  ON cart_items
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart_items"
  ON cart_items
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for orders
CREATE POLICY "Users can view own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can view all orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can update all orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Create policies for delivery_zones
CREATE POLICY "Anyone can view delivery_zones"
  ON delivery_zones
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can insert delivery_zones"
  ON delivery_zones
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can update delivery_zones"
  ON delivery_zones
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin can delete delivery_zones"
  ON delivery_zones
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));