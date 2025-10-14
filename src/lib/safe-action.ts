import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from "next-safe-action";
import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

/**
 * Base action client with CSRF protection
 * Use this for public actions (no auth required)
 */
export const actionClient = createSafeActionClient({
  // Automatically handles CSRF protection
  handleServerError(e) {
    // Log error for monitoring (could integrate Sentry here)
    console.error("Action error:", e);

    // Return safe error messages to client
    if (e.message === "UNAUTHORIZED") {
      return "You must be logged in to perform this action";
    }

    if (e.message === "FORBIDDEN") {
      return "You don't have permission to perform this action";
    }

    // Don't leak sensitive error info to client
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  defaultValidationErrorsShape: "flattened",
});

/**
 * Authenticated action client
 * Use this for actions that require authentication
 *
 * Context includes:
 * - user: Authenticated Supabase user
 * - supabase: Supabase client instance
 */
export const authActionClient = actionClient.use(async ({ next }) => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("UNAUTHORIZED");
  }

  // Type-safe context
  return next({
    ctx: {
      user: user as User,
      supabase,
      userId: user.id,
    }
  });
});

// Type helper for authenticated actions
export type AuthActionContext = {
  user: User;
  supabase: Awaited<ReturnType<typeof createClient>>;
  userId: string;
};
