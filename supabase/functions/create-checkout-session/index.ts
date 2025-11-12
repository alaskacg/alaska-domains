import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        },
      }
    );

    const { domainName, domainPrice, buyerEmail, buyerName } = await req.json();

    console.log('Creating checkout session for:', { domainName, domainPrice, buyerEmail });

    // Validate inputs
    if (!domainName || !domainPrice) {
      throw new Error('Missing required fields: domainName and domainPrice');
    }

    // Check if domain is still available
    const { data: domain, error: domainError } = await supabaseClient
      .from('domains')
      .select('*')
      .eq('name', domainName)
      .single();

    if (domainError || !domain) {
      throw new Error('Domain not found');
    }

    if (domain.status !== 'available') {
      throw new Error('Domain is no longer available');
    }

    const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
    if (!STRIPE_SECRET_KEY) {
      throw new Error('Stripe secret key not configured');
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
        'success_url': `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
        'cancel_url': `${req.headers.get('origin')}/cancel`,
        'line_items[0][price_data][currency]': 'usd',
        'line_items[0][price_data][product_data][name]': domainName,
        'line_items[0][price_data][product_data][description]': `Premium domain purchase - ${domainName}. All sales final. Domain transferred via secure escrow. Subject to ICANN regulations. Taxes not included.`,
        'line_items[0][price_data][unit_amount]': (domainPrice * 100).toString(),
        'line_items[0][quantity]': '1',
        'customer_email': buyerEmail || '',
        'metadata[domain_name]': domainName,
        'metadata[domain_price]': domainPrice.toString(),
        'metadata[buyer_name]': buyerName || '',
      }).toString(),
    });

    if (!stripeResponse.ok) {
      const error = await stripeResponse.text();
      console.error('Stripe error:', error);
      throw new Error('Failed to create checkout session');
    }

    const session = await stripeResponse.json();

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
