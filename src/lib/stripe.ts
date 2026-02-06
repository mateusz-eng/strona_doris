import Stripe from 'stripe';

const key = import.meta.env.STRIPE_SECRET_KEY;
if (!key) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

export const stripe = new Stripe(key);
