import type { APIRoute } from 'astro';
import { getStripe } from '../../lib/stripe';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { priceId, trainingTitle, trainingSlug } = body;

    if (!priceId || typeof priceId !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing priceId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const siteUrl = import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321';

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card', 'p24', 'blik'],
      line_items: [{ price: priceId, quantity: 1 }],
      locale: 'pl',
      success_url: `${siteUrl}/dziekujemy?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/szkolenia/${trainingSlug}`,
      metadata: {
        trainingTitle: trainingTitle || '',
        trainingSlug: trainingSlug || '',
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Stripe checkout error:', message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
