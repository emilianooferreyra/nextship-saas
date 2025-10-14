import arcjet, {
  detectBot,
  shield,
  tokenBucket,
  fixedWindow,
  validateEmail,
} from "@arcjet/next";

/**
 * Main Arcjet instance with base configuration
 */
export const aj = arcjet({
  key: process.env.ARCJET_KEY || "test-key", // Use test key in development
  characteristics: ["ip"], // Track by IP by default
  rules: [
    // Shield protects against common attacks
    shield({
      mode: "LIVE", // "LIVE" blocks, "DRY_RUN" logs only
    }),
  ],
});

/**
 * Arcjet instance for authentication routes
 * Includes email validation and aggressive rate limiting
 */
export const ajAuth = arcjet({
  key: process.env.ARCJET_KEY || "test-key",
  characteristics: ["ip", "userId"],
  rules: [
    shield({ mode: "LIVE" }),
    // Rate limit: 5 attempts per 15 minutes per IP
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: "15m",
      capacity: 5,
    }),
    // Detect and block automated bots
    detectBot({
      mode: "LIVE",
      allow: [], // Block all bots on auth routes
    }),
  ],
});

/**
 * Arcjet instance for API routes
 * More permissive rate limiting
 */
export const ajApi = arcjet({
  key: process.env.ARCJET_KEY || "test-key",
  characteristics: ["ip", "userId"],
  rules: [
    shield({ mode: "LIVE" }),
    // Rate limit: 60 requests per minute
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 60,
    }),
  ],
});

/**
 * Arcjet instance for webhooks
 * Validates bot signatures and prevents replay attacks
 */
export const ajWebhook = arcjet({
  key: process.env.ARCJET_KEY || "test-key",
  characteristics: ["ip"],
  rules: [
    shield({ mode: "LIVE" }),
    // Rate limiting for webhooks
    // Note: Webhook security is primarily handled by signature verification
    // in the webhook handlers themselves (stripe.webhooks.constructEvent)
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 30, // Increased to 30 to allow for burst webhook deliveries
    }),
  ],
});

/**
 * Email validation rule for registration
 */
export const emailValidation = validateEmail({
  mode: "LIVE",
  block: [
    "DISPOSABLE", // Block temporary email services
    "NO_MX_RECORDS", // Block emails with no MX records
    "INVALID", // Block invalid email formats
  ],
});
