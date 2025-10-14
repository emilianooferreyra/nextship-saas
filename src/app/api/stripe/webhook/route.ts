import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/utils/stripe";

export async function POST(req: NextRequest) {
  // Webhooks are protected by Stripe signature verification
  // No need for additional Arcjet protection
  const buf = await req.text();
  const sig = req.headers.get("stripe-signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
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
