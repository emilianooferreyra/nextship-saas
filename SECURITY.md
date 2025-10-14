# Security Configuration

This boilerplate includes comprehensive security measures to protect your SaaS application.

## 🛡️ Security Features

### 1. Rate Limiting (Arcjet)
- **Authentication routes**: 5 attempts per 15 minutes
- **API routes**: 60 requests per minute
- **Webhooks**: 10 requests per minute

### 2. Bot Protection
- Automated bot detection on auth routes
- Allowed bots for webhooks (Stripe, etc.)
- Real-time blocking of malicious bots

### 3. Email Validation
- Blocks disposable email addresses
- Validates MX records
- Prevents invalid email formats

### 4. Attack Detection (Shield)
- SQL injection protection
- XSS attack prevention
- Path traversal blocking
- Command injection detection

### 5. CSRF Protection
- Implemented via `next-safe-action`
- Automatic token validation
- Safe server actions

### 6. Environment Validation
- Schema validation with Zod
- Startup validation
- Type-safe environment variables

### 7. Security Headers
- HSTS (Strict-Transport-Security)
- X-Frame-Options (clickjacking protection)
- X-Content-Type-Options (MIME sniffing protection)
- Referrer-Policy

## 📝 Setup Instructions

### 1. Get your Arcjet API Key

Sign up at [https://app.arcjet.com](https://app.arcjet.com) and get your API key.

### 2. Add to `.env`

```bash
ARCJET_KEY=ajkey_your_key_here
```

### 3. Configure Rules

Edit `/src/lib/arcjet.ts` to customize rules:

```typescript
// Adjust rate limits
tokenBucket({
  refillRate: 10, // tokens per interval
  interval: "1h",
  capacity: 10,
})

// Customize bot detection
detectBot({
  mode: "LIVE",
  allow: ["GOOGLE_BOT", "FACEBOOK_BOT"],
})
```

## 🚀 Usage Examples

### Protected API Route

```typescript
import { ajApi } from "@/lib/arcjet";

export async function GET(req: NextRequest) {
  const decision = await ajApi.protect(req);

  if (decision.isDenied()) {
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      { status: 429 }
    );
  }

  // Your logic here
}
```

### Safe Server Action

```typescript
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";

export const updateProfile = authActionClient
  .schema(z.object({ name: z.string() }))
  .action(async ({ parsedInput, ctx }) => {
    // ctx.user is automatically available
    // CSRF protection is automatic
    const { name } = parsedInput;
    // Update profile logic
  });
```

## 🔍 Monitoring

### View Security Events

Arcjet provides a dashboard at [https://app.arcjet.com](https://app.arcjet.com) where you can:
- Monitor blocked requests
- Analyze attack patterns
- Configure alerts
- View analytics

### Local Logs

All security events are logged to console:

```typescript
console.warn("Arcjet blocked request:", {
  ip: decision.ip,
  reason: decision.reason,
  path: request.nextUrl.pathname,
});
```

## ⚙️ Configuration

### Test Mode vs Live Mode

```typescript
// Test mode - logs but doesn't block
shield({ mode: "DRY_RUN" })

// Live mode - actively blocks
shield({ mode: "LIVE" })
```

### IP Allowlist

```typescript
import { allow } from "@arcjet/next";

export const ajWithAllowlist = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    allow({
      mode: "LIVE",
      type: "IP",
      list: ["192.168.1.1", "10.0.0.0/8"],
    }),
  ],
});
```

## 🚨 Security Checklist

- [ ] Set `ARCJET_KEY` in production
- [ ] Enable all security headers
- [ ] Configure rate limits for your use case
- [ ] Set up monitoring alerts
- [ ] Review and update allowed bots
- [ ] Test CSRF protection
- [ ] Validate all environment variables
- [ ] Enable logging for security events
- [ ] Set up IP allowlist if needed
- [ ] Configure email validation rules

## 📚 Resources

- [Arcjet Documentation](https://docs.arcjet.com)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

## 🐛 Reporting Security Issues

If you discover a security vulnerability, please email security@yourdomain.com instead of using the issue tracker.
