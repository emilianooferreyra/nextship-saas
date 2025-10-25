import { loadStripe, type Stripe } from "@stripe/stripe-js";
import StripeServer from "stripe";

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      console.warn("Stripe publishable key not configured");
      return Promise.resolve(null);
    }
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};

// Server-side Stripe instance (lazy initialization)
let stripeInstance: StripeServer | null = null;

export const getStripeServer = () => {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      console.warn("Stripe secret key not configured");
      return null;
    }
    stripeInstance = new StripeServer(key, {
      apiVersion: "2025-09-30.clover",
      typescript: true,
    });
  }
  return stripeInstance;
};

// Backwards compatibility - will be null if not configured
export const stripe = getStripeServer();
