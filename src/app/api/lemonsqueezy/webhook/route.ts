// app/api/webhook/route.ts

import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { handleWebhook } from "@/utils/lemon";

export async function POST(request: NextRequest) {
  // Webhooks are protected by HMAC signature verification
  // No need for additional Arcjet protection
  const body = await request.text();
  const signature = request.headers.get("x-signature");
  const payload = JSON.parse(body);

  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Webhook secret is not defined" },
      { status: 500 }
    );
  }
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(JSON.stringify(payload)).digest("hex");

  if (signature !== digest) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  await handleWebhook(payload);
  return NextResponse.json({ success: true });
}
