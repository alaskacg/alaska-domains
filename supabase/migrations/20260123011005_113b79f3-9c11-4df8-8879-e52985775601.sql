-- Block anonymous users from viewing any purchases
-- This is a defense-in-depth measure - the Success page no longer queries the database

CREATE POLICY "Block anonymous purchase access"
  ON public.purchases
  FOR SELECT
  TO anon
  USING (false);