import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

// Allowed origins for CORS - restrict to project domains
const ALLOWED_ORIGINS = [
  'https://alaska-domains.lovable.app',
  'https://id-preview--93848e93-c3a6-4d24-bc5e-2551f5360898.lovable.app',
];

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get('origin') || '';
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  // Clean up old entries periodically
  if (rateLimitMap.size > 1000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.resetTime < now) {
        rateLimitMap.delete(key);
      }
    }
  }
  
  if (!record || record.resetTime < now) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  record.count++;
  return true;
}

function validateEmail(email: string): boolean {
  if (!email) return true; // Email is optional
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

function validateDomainName(name: string): boolean {
  if (!name || typeof name !== 'string') return false;
  // Domain name validation: alphanumeric, hyphens, dots, reasonable length
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9.-]{1,253}[a-zA-Z0-9]$/;
  return domainRegex.test(name) && name.length <= 255;
}

function validatePrice(price: unknown): boolean {
  if (typeof price !== 'number') return false;
  return price > 0 && price <= 100000000 && Number.isFinite(price);
}

function validateBuyerName(name: string): boolean {
  if (!name) return true; // Buyer name is optional
  return typeof name === 'string' && name.length <= 200;
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  
  // Log request origin for monitoring
  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                   req.headers.get('x-real-ip') || 
                   'unknown';
  console.log('Request from origin:', req.headers.get('origin'), 'IP:', clientIp);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting check
  if (!checkRateLimit(clientIp)) {
    console.warn('Rate limit exceeded for IP:', clientIp);
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please try again in 1 minute.' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 429,
      }
    );
  }

  try {
    // Use service role for atomic reservation updates
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        },
      }
    );

    const requestBody = await req.json();
    const { domainName, domainPrice, buyerEmail, buyerName } = requestBody;

    console.log('Creating checkout session for:', { domainName, domainPrice, buyerEmail: buyerEmail ? '[redacted]' : '' });

    // Input validation
    if (!domainName || domainPrice === undefined) {
      throw new Error('Missing required fields: domainName and domainPrice');
    }

    if (!validateDomainName(domainName)) {
      throw new Error('Invalid domain name format');
    }

    if (!validatePrice(domainPrice)) {
      throw new Error('Invalid price: must be a positive number under $100,000,000');
    }

    if (!validateEmail(buyerEmail)) {
      throw new Error('Invalid email format');
    }

    if (!validateBuyerName(buyerName)) {
      throw new Error('Invalid buyer name: must be under 200 characters');
    }

    // First, expire any stale reservations
    await supabaseClient.rpc('expire_domain_reservations');

    // Atomic check-and-reserve: Only proceed if domain is available
    const { data: reservedDomain, error: reserveError } = await supabaseClient
      .from('domains')
      .update({ 
        status: 'reserved',
        reserved_at: new Date().toISOString(),
        reserved_by: `checkout_${Date.now()}_${clientIp.replace(/[^a-zA-Z0-9]/g, '')}`.substring(0, 100)
      })
      .eq('name', domainName)
      .eq('status', 'available')
      .select()
      .single();

    if (reserveError || !reservedDomain) {
      console.log('Domain reservation failed:', domainName, reserveError?.message);
      throw new Error('Domain is no longer available or was just reserved by another buyer');
    }

    console.log('Domain reserved successfully:', domainName);

    const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
    if (!STRIPE_SECRET_KEY) {
      // Release reservation if Stripe is not configured
      await supabaseClient
        .from('domains')
        .update({ status: 'available', reserved_at: null, reserved_by: null })
        .eq('name', domainName);
      throw new Error('Payment system not configured');
    }

    // Create Stripe checkout session
    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'mode': 'payment',
        'success_url': `${req.headers.get('origin')}/success?domain=${encodeURIComponent(domainName)}`,
        'cancel_url': `${req.headers.get('origin')}/cancel`,
        'line_items[0][price_data][currency]': 'usd',
        'line_items[0][price_data][product_data][name]': domainName,
        'line_items[0][price_data][product_data][description]': `Premium domain purchase - ${domainName}. All sales final. Domain transferred via secure escrow. Subject to ICANN regulations. Taxes not included.`,
        'line_items[0][price_data][unit_amount]': Math.round(domainPrice * 100).toString(),
        'line_items[0][quantity]': '1',
        'customer_email': buyerEmail || '',
        'metadata[domain_name]': domainName,
        'metadata[domain_price]': domainPrice.toString(),
        'metadata[buyer_name]': buyerName || '',
        'expires_at': Math.floor(Date.now() / 1000 + 900).toString(), // 15 min expiry to match reservation
      }).toString(),
    });

    if (!stripeResponse.ok) {
      const error = await stripeResponse.text();
      console.error('Stripe error:', error);
      // Release reservation on Stripe failure
      await supabaseClient
        .from('domains')
        .update({ status: 'available', reserved_at: null, reserved_by: null })
        .eq('name', domainName);
      throw new Error('Failed to create checkout session');
    }

    const session = await stripeResponse.json();

    // Update reservation with session ID for tracking
    await supabaseClient
      .from('domains')
      .update({ reserved_by: session.id })
      .eq('name', domainName);

    // Create purchase record
    const { error: purchaseError } = await supabaseClient
      .from('purchases')
      .insert({
        domain_name: domainName,
        domain_price: domainPrice,
        buyer_email: buyerEmail || '',
        buyer_name: buyerName || '',
        stripe_session_id: session.id,
        status: 'pending',
      });

    if (purchaseError) {
      console.error('Error creating purchase record:', purchaseError);
    }

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
