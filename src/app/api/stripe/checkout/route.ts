import { NextResponse } from "next/server";
import { stripe } from "@/utils/stripe";

export async function POST(req: Request) {
  const { priceId } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get("origin")}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/pricing`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.error("Error creating checkout session:", err);
    return NextResponse.json(
      { error: { message: err.message } },
      { status: 500 }
    );
  }
}
