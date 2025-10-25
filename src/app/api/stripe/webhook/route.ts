import { NextRequest, NextResponse } from "next/server";
import { getStripeServer } from "@/utils/stripe";

export async function POST(req: NextRequest) {
  const stripe = getStripeServer();

  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 503 }
    );
  }

  // Webhooks are protected by Stripe signature verification
  // No need for additional Arcjet protection
  const buf = await req.text();
  const sig = req.headers.get("stripe-signature") as string;

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook secret not configured" },
      { status: 500 }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "customer.subscription.created":
      // Handle subscription created
      break;
    case "customer.subscription.updated":
      // Handle subscription updated
      break;
    case "customer.subscription.deleted":
      // Handle subscription cancelled
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
