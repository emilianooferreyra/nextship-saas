import { loadStripe, type Stripe } from "@stripe/stripe-js";
import StripeServer from "stripe";

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

// Server-side Stripe instance
export const stripe = new StripeServer(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover", // Latest Stripe API version
  typescript: true,
});
