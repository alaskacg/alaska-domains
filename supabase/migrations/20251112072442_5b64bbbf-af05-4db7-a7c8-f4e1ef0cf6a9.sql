-- Remove the insecure policy that exposes buyer information to all users
DROP POLICY IF EXISTS "Anyone can view completed purchases" ON public.purchases;

-- Keep only the secure policy that allows users to view their own purchases
-- This policy already exists: "Users can view their own purchases"