import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_live_51Sa49S2OuXdsEk61uiFJYFAwecGziydOVZHFAdxQaEtVoUPD17bi9P58E8KD3pU1OHByS2YA4sVCBb5Nu8KFdo9H00YrgzjniG';

export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

// Stripe price IDs for domain products
export const DOMAIN_PRICES: Record<string, { priceId: string; productId: string }> = {
  'alaskasguide.com': { priceId: 'price_1T2So32OuXdsEk61q8hMSkcG', productId: 'prod_U0TlxGQk4vrBWi' },
  'akminingcompany.com': { priceId: 'price_1T2SmC2OuXdsEk61Sbr1g98J', productId: 'prod_U0TjjY74iflalf' },
  'akexploratory.com': { priceId: 'price_1T2Ska2OuXdsEk611GbbqXkQ', productId: 'prod_U0Th08siH9QglP' },
  'alaskadigs.com': { priceId: 'price_1T2Sig2OuXdsEk61fOQgyJd5', productId: 'prod_U0TgbMyBPnEkBZ' },
  'amblermines.com': { priceId: 'price_1T2ShQ2OuXdsEk61V485Vq1Y', productId: 'prod_U0TeQgGIajIEUO' },
  'alaskamininggroup.com': { priceId: 'price_1T2Sfb2OuXdsEk61oC2rbYXN', productId: 'prod_U0TcygxQXoy6ct' },
  'akmines.com': { priceId: 'price_1T2Se62OuXdsEk61NeEPXTFG', productId: 'prod_U0TbLcqFBWIZSP' },
  'greatstatefoundation.com': { priceId: 'price_1T2Sd12OuXdsEk6135jPrDY7', productId: 'prod_U0Tad7YC5Y5iNn' },
  'alaskagoldgroup.com': { priceId: 'price_1T2Sbb2OuXdsEk616fhJUJlw', productId: 'prod_U0TY8SK5OHtwUi' },
  'alcanminingcompany.com': { priceId: 'price_1T2SaI2OuXdsEk61S2HYjiqo', productId: 'prod_U0TXhf5SDNhbof' },
  'bethelminingcompany.com': { priceId: 'price_1T2SZF2OuXdsEk61TFKBxurp', productId: 'prod_U0TWZgHwzf4nYf' },
  'alaskaoilandgascompany.com': { priceId: 'price_1T2SWv2OuXdsEk61KTks59ez', productId: 'prod_U0TTX0cMRn0p2D' },
  'alaskaoilcompany.com': { priceId: 'price_1T2SUp2OuXdsEk61mrQ8WW7x', productId: 'prod_U0TRxm9RWJ6OCe' },
};

// Classified listing product
export const CLASSIFIED_LISTING_PRICE = {
  priceId: 'price_1T2L7K2OuXdsEk61B2khAo0m',
  productId: 'prod_U0LoYLMoo70kYZ',
};

export async function redirectToCheckout(domainName: string) {
  const stripe = await stripePromise;
  if (!stripe) throw new Error('Stripe failed to load');

  const domainKey = domainName.toLowerCase();
  const product = DOMAIN_PRICES[domainKey];
  if (!product) throw new Error(`No Stripe product found for ${domainName}`);

  const { error } = await (stripe as any).redirectToCheckout({
    lineItems: [{ price: product.priceId, quantity: 1 }],
    mode: 'payment',
    successUrl: `${window.location.origin}/success?domain=${encodeURIComponent(domainName)}`,
    cancelUrl: `${window.location.origin}/cancel?domain=${encodeURIComponent(domainName)}`,
  });

  if (error) throw error;
}
