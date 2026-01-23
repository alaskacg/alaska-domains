-- Restrict expire_domain_reservations() to service_role only
-- This prevents anonymous or authenticated users from calling this function directly

-- Revoke execute from all public roles
REVOKE EXECUTE ON FUNCTION public.expire_domain_reservations() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.expire_domain_reservations() FROM anon;
REVOKE EXECUTE ON FUNCTION public.expire_domain_reservations() FROM authenticated;

-- Only service_role (used by edge functions) can call this function
GRANT EXECUTE ON FUNCTION public.expire_domain_reservations() TO service_role;