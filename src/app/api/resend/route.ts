import { NextRequest, NextResponse } from "next/server";

/**
 * Webhook endpoint for Resend email events
 * Configure webhooks at: https://resend.com/webhooks
 *
 * Note: This endpoint can be used to handle email events like:
 * - email.sent
 * - email.delivered
 * - email.delivery_delayed
 * - email.complained
 * - email.bounced
 * - email.opened
 * - email.clicked
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Verify webhook signature from Resend
    // Get your webhook signing secret from https://resend.com/webhooks
    const signature = req.headers.get("svix-signature");
    const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;

    if (webhookSecret && signature) {
      // Verify the signature (implement Svix verification if needed)
      // Resend uses Svix for webhook signatures
      // For now, we'll skip verification in development
      if (process.env.NODE_ENV === "production") {
        // TODO: Implement Svix signature verification
        // You can use the `svix` package for this
      }
    }

    // Handle different event types
    const { type, data } = body;

    switch (type) {
      case "email.bounced":
        console.log("Email bounced:", data);
        // Handle bounced email
        break;
      case "email.complained":
        console.log("Email complaint:", data);
        // Handle spam complaint
        break;
      case "email.delivered":
        console.log("Email delivered:", data);
        // Handle successful delivery
        break;
      default:
        console.log("Unhandled webhook event:", type);
    }

    return NextResponse.json({ received: true });
  } catch (e: any) {
    console.error("Webhook error:", e?.message);
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
