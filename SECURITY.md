# Security Recommendations for NextShip

This document contains security recommendations and best practices for maintaining and extending NextShip. These suggestions will help you implement additional security features as your SaaS grows.

## Current Security Implementation

NextShip already includes:
- ✅ Arcjet rate limiting and bot protection
- ✅ Secure headers (HSTS, X-Frame-Options)
- ✅ Input validation with Zod schemas
- ✅ Environment variable validation
- ✅ SQL injection protection with Drizzle ORM
- ✅ Webhook signature verification (Stripe/LemonSqueezy)

## Future Security Enhancements

### 1. Content Security Policy (CSP)

**Why**: Prevents XSS attacks by controlling which resources can be loaded.

**Implementation in `middleware.ts`**:
```typescript
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add CSP header
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' data:; " +
    "connect-src 'self' https://api.stripe.com; " +
    "frame-src https://js.stripe.com https://hooks.stripe.com;"
  );

  return response;
}
```

**Note**: Adjust directives based on your third-party services.

### 2. CSRF Protection

**Why**: Prevents Cross-Site Request Forgery attacks on form submissions.

**Recommended approach**: Double Submit Cookie pattern

**Implementation**:
1. Install package: `pnpm add csrf-csrf`
2. Create CSRF token generator in `src/lib/csrf.ts`
3. Add CSRF middleware to verify tokens on POST/PUT/DELETE requests
4. Include CSRF token in all forms

**Resources**:
- [OWASP CSRF Guide](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [csrf-csrf package](https://github.com/psiinon/csrf-csrf)

### 3. Rate Limiting Best Practices

**Current**: Arcjet provides basic rate limiting.

**Recommendations**:
- Configure different limits for different routes:
  - Login: 5 attempts per 15 minutes
  - API endpoints: 100 requests per minute
  - Webhook endpoints: 1000 requests per minute
- Implement exponential backoff for failed attempts
- Add IP-based blocking for suspicious activity

**Example Arcjet configuration**:
```typescript
const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    rateLimit({
      mode: "LIVE",
      match: "/api/auth/login",
      max: 5,
      window: "15m",
    }),
    rateLimit({
      mode: "LIVE",
      match: "/api/*",
      max: 100,
      window: "1m",
    }),
  ],
});
```

### 4. Environment Variable Security

**Current**: Basic validation exists.

**Checklist**:
- [ ] Never commit `.env` files to git (already in `.gitignore`)
- [ ] Use different API keys for development/staging/production
- [ ] Rotate API keys regularly (every 90 days)
- [ ] Use secrets management (Vercel Secrets, AWS Secrets Manager, etc.)
- [ ] Validate all environment variables on startup with Zod
- [ ] Never log environment variables in production
- [ ] Use `NEXT_PUBLIC_` prefix only for client-safe variables

### 5. Row Level Security (RLS) in Supabase

**Why**: Ensures users can only access their own data at the database level.

**Implementation steps**:
1. Enable RLS on all tables in Supabase dashboard
2. Create policies for each table:
   ```sql
   -- Example: Users can only read their own data
   CREATE POLICY "Users can view own data" ON users
     FOR SELECT USING (auth.uid() = id);

   -- Example: Users can only update their own data
   CREATE POLICY "Users can update own data" ON users
     FOR UPDATE USING (auth.uid() = id);
   ```
3. Test policies thoroughly before deploying to production

**Resources**:
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)

### 6. Webhook Security

**Current**: Signature verification implemented for Stripe and LemonSqueezy.

**Best practices**:
- ✅ Always verify webhook signatures (already implemented)
- ✅ Use HTTPS endpoints only
- [ ] Implement idempotency keys to prevent duplicate processing
- [ ] Add webhook event logging for audit trail
- [ ] Set up monitoring/alerts for failed webhook deliveries
- [ ] Use separate webhook secrets for dev/staging/production

### 7. Dependency Security

**Recommendations**:
- Run `pnpm audit` regularly to check for vulnerabilities
- Set up Dependabot or Renovate for automatic dependency updates
- Review security advisories for critical packages (Next.js, React, Supabase, Stripe)
- Pin exact versions in production for critical dependencies
- Use `pnpm audit --fix` to automatically fix vulnerabilities when possible

**Commands**:
```bash
# Check for vulnerabilities
pnpm audit

# Fix vulnerabilities automatically
pnpm audit --fix

# Update all dependencies
pnpm update
```

### 8. Authentication Security

**Current**: Email/password authentication with Supabase.

**Future enhancements**:
- [ ] Implement email verification before account activation
- [ ] Add password strength requirements (min 12 chars, uppercase, lowercase, numbers, symbols)
- [ ] Implement account lockout after N failed login attempts
- [ ] Add 2FA/MFA support with TOTP or SMS
- [ ] Implement password reset with time-limited tokens
- [ ] Add session management (view active sessions, revoke sessions)
- [ ] Log all authentication events for security audit

### 9. Security Headers

**Current**: HSTS and X-Frame-Options implemented.

**Additional headers to consider**:
```typescript
// Add these to middleware.ts
response.headers.set('X-Content-Type-Options', 'nosniff');
response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
```

### 10. Security Monitoring

**Recommended tools**:
- **Sentry**: Error tracking and performance monitoring
- **LogRocket**: Session replay and error tracking
- **Arcjet Analytics**: Rate limiting and bot protection insights
- **Vercel Analytics**: Performance and Web Vitals tracking

**What to monitor**:
- Failed login attempts
- Rate limit violations
- Webhook failures
- API errors (4xx, 5xx)
- Unusual traffic patterns
- Database query performance

### 11. Secure Coding Practices

**Input Validation**:
- Always validate user input with Zod schemas (already implemented)
- Sanitize HTML inputs to prevent XSS
- Validate file uploads (type, size, content)
- Never trust client-side validation alone

**Output Encoding**:
- Use React's built-in XSS protection (already happens automatically)
- Be careful with `dangerouslySetInnerHTML` (only use for trusted content)
- Sanitize data before rendering in HTML

**SQL Injection Prevention**:
- Always use Drizzle ORM parameterized queries (already implemented)
- Never concatenate user input into SQL queries
- Use prepared statements for complex queries

### 12. Incident Response Plan

**If a security incident occurs**:

1. **Immediately**:
   - Identify and contain the breach
   - Revoke compromised API keys/tokens
   - Enable maintenance mode if necessary

2. **Within 24 hours**:
   - Assess the scope of the breach
   - Notify affected users if data was compromised
   - Document the incident timeline

3. **Within 72 hours**:
   - Implement fixes to prevent recurrence
   - Review and update security measures
   - Conduct post-mortem analysis

4. **Follow-up**:
   - Publish transparency report (if appropriate)
   - Update security documentation
   - Train team on lessons learned

### 13. Compliance Considerations

Depending on your users and jurisdiction, you may need to comply with:

- **GDPR** (EU): Right to access, right to deletion, data portability
- **CCPA** (California): Similar to GDPR but California-specific
- **HIPAA** (Healthcare): If handling health data
- **PCI DSS** (Payments): If storing credit card data (use Stripe instead!)
- **SOC 2**: For enterprise customers

**Resources**:
- [GDPR Compliance Checklist](https://gdpr.eu/checklist/)
- [Stripe Security Best Practices](https://stripe.com/docs/security/best-practices)

## Security Checklist for Production

Before deploying to production, verify:

- [ ] All environment variables are set in production
- [ ] HTTPS is enforced (Vercel does this automatically)
- [ ] Rate limiting is enabled and configured
- [ ] Database RLS policies are enabled
- [ ] Webhook signature verification is working
- [ ] Security headers are set in middleware
- [ ] Error messages don't leak sensitive information
- [ ] Logging doesn't include sensitive data (passwords, tokens, etc.)
- [ ] Dependencies are up to date and audited
- [ ] Backups are configured and tested
- [ ] Monitoring and alerting are set up

## Reporting Security Vulnerabilities

If you discover a security vulnerability in NextShip:

1. **Do NOT** open a public GitHub issue
2. Email security concerns to the maintainers
3. Include details: affected versions, reproduction steps, potential impact
4. Allow time for a fix before public disclosure

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/security)
- [Supabase Security Guide](https://supabase.com/docs/guides/security)
- [Stripe Security Best Practices](https://stripe.com/docs/security/best-practices)
- [Web Security Academy](https://portswigger.net/web-security)

---

**Last Updated**: 2025-10-25

**Note**: This is a living document. Update it as you implement new security features or discover new best practices.
