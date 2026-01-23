-- Add reservation columns for race condition prevention
ALTER TABLE public.domains 
ADD COLUMN IF NOT EXISTS reserved_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS reserved_by TEXT;

-- Create function to expire stale reservations (15 minute timeout)
CREATE OR REPLACE FUNCTION public.expire_domain_reservations()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.domains
  SET status = 'available',
      reserved_at = NULL,
      reserved_by = NULL
  WHERE status = 'reserved'
    AND reserved_at < NOW() - INTERVAL '15 minutes';
END;
$$;

-- RLS Policy: Only service role can INSERT purchases (via edge functions)
-- The edge function uses SUPABASE_ANON_KEY but RLS bypass happens via service role in webhook
-- Since edge functions use anon key for checkout, we need to allow inserts with basic validation
CREATE POLICY "Edge functions can insert purchases" 
ON public.purchases 
FOR INSERT 
TO anon
WITH CHECK (
  stripe_session_id IS NOT NULL 
  AND domain_name IS NOT NULL 
  AND domain_price > 0
);

-- RLS Policy: Only service role can UPDATE purchases (via webhook with service role)
-- Note: Service role bypasses RLS, but this adds defense-in-depth for authenticated users
CREATE POLICY "Only service role can update purchases" 
ON public.purchases 
FOR UPDATE 
USING (false)
WITH CHECK (false);

-- RLS Policy: Prevent any deletion of purchases (audit trail)
CREATE POLICY "No one can delete purchases" 
ON public.purchases 
FOR DELETE 
USING (false);