-- Fix RLS policies that use USING (true) for UPDATE/INSERT operations
-- These should only be accessible by service role, not any authenticated user

-- Drop the overly permissive domain update policy
DROP POLICY IF EXISTS "Service role can update domains" ON public.domains;

-- Create a proper policy that checks for service role
-- Service role bypasses RLS by default, so we need a policy for admin users
CREATE POLICY "Admins can update domains"
  ON public.domains FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- Drop the overly permissive purchase policies
DROP POLICY IF EXISTS "Service role can insert purchases" ON public.purchases;
DROP POLICY IF EXISTS "Service role can update purchases" ON public.purchases;

-- For purchases, we want:
-- 1. Edge functions (using service role) can insert/update - service role bypasses RLS
-- 2. No regular users should be able to insert/update purchases

-- Since service role already bypasses RLS, we don't need explicit policies for it
-- The removal of the permissive policies is sufficient to secure the tables