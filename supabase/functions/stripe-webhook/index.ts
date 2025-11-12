import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const signature = req.headers.get('stripe-signature');
  const STRIPE_WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET');

  if (!signature || !STRIPE_WEBHOOK_SECRET) {
    console.error('Missing signature or webhook secret');
    return new Response(
      JSON.stringify({ error: 'Webhook configuration error' }),
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    const body = await req.text();
    
    // Verify webhook signature
    const event = await verifyStripeWebhook(body, signature, STRIPE_WEBHOOK_SECRET);

    console.log('Webhook event type:', event.type);

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        },
      }
    );

    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const domainName = session.metadata.domain_name;

      console.log('Processing completed checkout for domain:', domainName);

      // Update purchase record
      const { error: updatePurchaseError } = await supabaseClient
        .from('purchases')
        .update({
          status: 'completed',
          stripe_payment_intent_id: session.payment_intent,
        })
        .eq('stripe_session_id', session.id);

      if (updatePurchaseError) {
        console.error('Error updating purchase:', updatePurchaseError);
      }

      // Mark domain as sold
      const { error: updateDomainError } = await supabaseClient
        .from('domains')
        .update({ status: 'sold' })
        .eq('name', domainName);

      if (updateDomainError) {
        console.error('Error updating domain status:', updateDomainError);
      } else {
        console.log('Domain marked as sold:', domainName);
      }
    }

    // Handle payment_intent.payment_failed event
    if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object;
      
      const { error } = await supabaseClient
        .from('purchases')
        .update({ status: 'failed' })
        .eq('stripe_payment_intent_id', paymentIntent.id);

      if (error) {
        console.error('Error updating failed payment:', error);
      }
    }

    return new Response(
      JSON.stringify({ received: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Webhook error:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});

async function verifyStripeWebhook(payload: string, signature: string, secret: string) {
  const encoder = new TextEncoder();
  const parts = signature.split(',');
  const timestamp = parts.find(part => part.startsWith('t='))?.split('=')[1];
  const expectedSignature = parts.find(part => part.startsWith('v1='))?.split('=')[1];

  if (!timestamp || !expectedSignature) {
    throw new Error('Invalid signature format');
  }

  const signedPayload = `${timestamp}.${payload}`;
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature_bytes = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(signedPayload)
  );

  const signature_hex = Array.from(new Uint8Array(signature_bytes))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  if (signature_hex !== expectedSignature) {
    throw new Error('Invalid signature');
  }

  return JSON.parse(payload);
}
