import { NextRequest, NextResponse } from "next/server";
import { ajAuth } from "@/lib/arcjet";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    // Arcjet protection: rate limiting + bot detection
    const decision = await ajAuth.protect(req, {
      email: (await req.json()).email, // Track by email too
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return NextResponse.json(
          {
            error: "Too many login attempts. Please try again later.",
            resetAt: decision.reason.resetTime,
          },
          { status: 429 }
        );
      }

      if (decision.reason.isBot()) {
        return NextResponse.json(
          { error: "Bot detected" },
          { status: 403 }
        );
      }

      return NextResponse.json(
        { error: "Request blocked" },
        { status: 403 }
      );
    }

    const { email, password } = await req.json();

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
