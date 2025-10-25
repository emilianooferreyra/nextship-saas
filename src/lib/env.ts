import { z } from "zod";

const envSchema = z.object({
  // Next.js
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .regex(/^https?:\/\/.+/)
    .min(1),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),

  // Database
  DATABASE_URL: z
    .string()
    .regex(/^https?:\/\/.+/)
    .optional(),

  // Stripe
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith("pk_").optional(),
  STRIPE_SECRET_KEY: z.string().startsWith("sk_").optional(),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_").optional(),

  // LemonSqueezy
  LEMONSQUEEZY_API_KEY: z.string().optional(),
  LEMONSQUEEZY_STORE_ID: z.string().optional(),
  LEMONSQUEEZY_WEBHOOK_SECRET: z.string().optional(),

  // Mailgun
  MAILGUN_API_KEY: z.string().optional(),
  MAILGUN_DOMAIN: z.string().optional(),

  // Arcjet
  ARCJET_KEY: z.string().startsWith("ajkey_").optional(),

  // URLs
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .regex(/^https?:\/\/.+/)
    .default("http://localhost:3000"),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Validates environment variables at startup
 * Throws an error if validation fails
 */
export function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:");
    console.error(JSON.stringify(parsed.error.issues, null, 2));
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
}

/**
 * Use this to access validated environment variables
 * Only call after validateEnv() has been called
 */
export const env = validateEnv();
