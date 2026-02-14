import Stripe from "stripe"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

function getStripeClient(): Stripe {
  if (!stripeSecretKey) {
    throw new Error("STRIPE_SECRET_KEY is not set")
  }
  return new Stripe(stripeSecretKey, {
    apiVersion: "2025-08-27.basil",
    appInfo: {
      name: "Mckay's App Template",
      version: "0.1.0"
    }
  })
}

let _stripe: Stripe | null = null

/** Lazy Stripe client: only throws when actually used, so the app can run without Stripe keys (e.g. marketing pages). */
export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    if (!_stripe) _stripe = getStripeClient()
    return (_stripe as unknown as Record<string | symbol, unknown>)[prop]
  }
})
