import { type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "@/i18n";
import { updateSession } from "@/lib/supabase/middleware";

// Crear middleware de next-intl para rutas localizadas
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
  localeDetection: true, // Enable automatic locale detection from Accept-Language header
});

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip i18n for API, auth, and dashboard routes
  const isNonLocalizedPath =
    pathname.startsWith("/api") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/dashboard");

  if (isNonLocalizedPath) {
    // For non-localized routes, just apply Supabase session management
    return await updateSession(request);
  }

  // For localized routes, apply i18n routing first
  const response = intlMiddleware(request);

  // Then apply Supabase session management
  return await updateSession(request, response);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
