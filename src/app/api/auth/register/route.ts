import { NextRequest, NextResponse } from "next/server";
import { ajAuth, emailValidation } from "@/lib/arcjet";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Arcjet protection: rate limiting + bot detection + email validation
    const decision = await ajAuth.protect(req, {
      email,
      requested: 1, // For token bucket
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return NextResponse.json(
          {
            error: "Too many registration attempts. Please try again later.",
            resetAt: decision.reason.resetTime,
          },
          { status: 429 }
        );
      }

      if (decision.reason.isBot()) {
        return NextResponse.json({ error: "Bot detected" }, { status: 403 });
      }

      return NextResponse.json({ error: "Request blocked" }, { status: 403 });
    }

    // Validate email with Arcjet
    const emailDecision = await emailValidation(req, { email });

    if (emailDecision.isDenied()) {
      const reason = emailDecision.reason;

      if (reason.emailTypes.includes("DISPOSABLE")) {
        return NextResponse.json(
          { error: "Disposable email addresses are not allowed" },
          { status: 400 }
        );
      }

      if (reason.emailTypes.includes("NO_MX_RECORDS")) {
        return NextResponse.json(
          { error: "Invalid email domain" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
