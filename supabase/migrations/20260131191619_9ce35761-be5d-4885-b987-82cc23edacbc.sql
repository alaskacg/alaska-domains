-- Fix purchases table RLS policy conflict
-- The issue: Two RESTRICTIVE SELECT policies conflict:
-- 1. "Block anonymous purchase access" uses USING (false) which blocks ALL access
-- 2. "Users can view their own purchases" uses USING (auth.uid() = user_id)
-- When both are RESTRICTIVE, they must ALL pass, so nothing can be selected

-- Solution: Drop the overly restrictive policy and modify the user policy to be PERMISSIVE
-- This ensures authenticated users can view their own purchases, while anon users cannot

-- Drop the conflicting policy that blocks everyone
DROP POLICY IF EXISTS "Block anonymous purchase access" ON public.purchases;

-- Drop the existing user policy
DROP POLICY IF EXISTS "Users can view their own purchases" ON public.purchases;

-- Create a proper PERMISSIVE policy for authenticated users to view their own purchases
CREATE POLICY "Authenticated users can view their own purchases"
ON public.purchases
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Explicitly deny anonymous users from reading any purchases
-- This is achieved by not granting any SELECT policy to anon role
-- The default behavior with RLS enabled is deny-all, so anon users are blocked