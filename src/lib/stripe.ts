import Stripe from 'stripe';

let _stripe: Stripe | undefined;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = import.meta.env.STRIPE_SECRET_KEY ?? process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('Missing STRIPE_SECRET_KEY environment variable');
    }
    _stripe = new Stripe(key);
  }
  return _stripe;
}
