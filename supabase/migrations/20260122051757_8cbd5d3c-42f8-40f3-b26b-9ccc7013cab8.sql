-- Fix #1: Add price validation constraint on domains table
-- Using a CHECK constraint to ensure prices are within reasonable range
ALTER TABLE public.domains
ADD CONSTRAINT domain_price_positive CHECK (price > 0);

ALTER TABLE public.domains
ADD CONSTRAINT domain_price_max CHECK (price <= 100000000);

-- Update price column to have precision constraints
ALTER TABLE public.domains
ALTER COLUMN price TYPE NUMERIC(12, 2);

-- Fix #3: Secure the purchases table - remove any public access
-- First, ensure RLS is enabled (it already is, but being explicit)
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- The existing policy "Users can view their own purchases" is fine for regular users
-- Edge functions using service role will bypass RLS for inserts/updates

-- No additional SELECT policies needed since:
-- - Regular users: Can see their own purchases via existing policy
-- - Admins: Will use edge function with service role
-- - Anonymous: Cannot view any purchases (protected by RLS)