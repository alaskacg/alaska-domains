-- Create purchases table to track domain sales
CREATE TABLE public.purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain_name TEXT NOT NULL,
  domain_price NUMERIC NOT NULL,
  buyer_email TEXT NOT NULL,
  buyer_name TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  stripe_session_id TEXT UNIQUE NOT NULL,
  stripe_payment_intent_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own purchases
CREATE POLICY "Users can view their own purchases"
  ON public.purchases
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow anyone to view completed purchases (for admin purposes)
CREATE POLICY "Anyone can view completed purchases"
  ON public.purchases
  FOR SELECT
  TO authenticated
  USING (status = 'completed');

-- Create domains table to track availability
CREATE TABLE public.domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  price NUMERIC NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'sold', 'reserved')),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.domains ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view available domains
CREATE POLICY "Everyone can view domains"
  ON public.domains
  FOR SELECT
  USING (true);

-- Only admins can update domain status (will be done via edge function)
CREATE POLICY "Service role can update domains"
  ON public.domains
  FOR UPDATE
  USING (true);

-- Insert existing domains
INSERT INTO public.domains (name, price, category, status) VALUES
  ('alaskatourism.com', 50000, 'Tourism & Travel', 'available'),
  ('alaskawildlife.com', 45000, 'Tourism & Travel', 'available'),
  ('visitalaska.com', 48000, 'Tourism & Travel', 'available'),
  ('alaskaadventure.com', 42000, 'Tourism & Travel', 'available'),
  ('alaskafishing.com', 38000, 'Recreation & Sports', 'available'),
  ('alaskahunting.com', 35000, 'Recreation & Sports', 'available'),
  ('alaskarealestate.com', 55000, 'Real Estate & Property', 'available'),
  ('alaskahomes.com', 52000, 'Real Estate & Property', 'available'),
  ('alaskaproperties.com', 48000, 'Real Estate & Property', 'available'),
  ('alaskaoil.com', 60000, 'Energy & Resources', 'available'),
  ('alaskagas.com', 58000, 'Energy & Resources', 'available'),
  ('alaskaenergy.com', 55000, 'Energy & Resources', 'available'),
  ('alaskagold.com', 65000, 'Energy & Resources', 'available'),
  ('alaskarestaurants.com', 32000, 'Food & Dining', 'available'),
  ('alaskaseafood.com', 45000, 'Food & Dining', 'available'),
  ('alaskabrewery.com', 28000, 'Food & Dining', 'available'),
  ('alaskacoffee.com', 25000, 'Food & Dining', 'available'),
  ('alaskahotels.com', 50000, 'Hospitality', 'available'),
  ('alaskalodges.com', 42000, 'Hospitality', 'available'),
  ('alaskacruises.com', 58000, 'Tourism & Travel', 'available'),
  ('alaskaairlines.com', 75000, 'Transportation', 'available'),
  ('alaskainsurance.com', 38000, 'Financial Services', 'available'),
  ('alaskabanking.com', 42000, 'Financial Services', 'available'),
  ('alaskahealthcare.com', 45000, 'Healthcare & Medical', 'available'),
  ('alaskamedical.com', 40000, 'Healthcare & Medical', 'available'),
  ('alaskadental.com', 32000, 'Healthcare & Medical', 'available'),
  ('alaskaeducation.com', 35000, 'Education', 'available'),
  ('alaskaschools.com', 38000, 'Education', 'available'),
  ('alaskaart.com', 28000, 'Arts & Culture', 'available'),
  ('alaskamusic.com', 25000, 'Arts & Culture', 'available'),
  ('alaskafashion.com', 22000, 'Retail & Commerce', 'available'),
  ('alaskashopping.com', 30000, 'Retail & Commerce', 'available'),
  ('alaskatechnology.com', 35000, 'Technology', 'available'),
  ('alaskatech.com', 38000, 'Technology', 'available'),
  ('alaskasports.com', 40000, 'Recreation & Sports', 'available'),
  ('alaskagolf.com', 32000, 'Recreation & Sports', 'available'),
  ('alaskaskiing.com', 35000, 'Recreation & Sports', 'available'),
  ('alaskaoutdoors.com', 38000, 'Recreation & Sports', 'available');

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_purchases_updated_at
  BEFORE UPDATE ON public.purchases
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_domains_updated_at
  BEFORE UPDATE ON public.domains
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();