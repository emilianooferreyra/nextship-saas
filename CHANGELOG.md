# Changelog

All notable changes to NextShip will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2025-01-14

### Added

- ✨ **Resend integration** with React Email for modern email templates
- 📧 Professional email templates:
  - WelcomeEmail - Beautiful welcome emails for new users
  - ResetPasswordEmail - Secure password reset flow
  - NotificationEmail - Generic notification template
- ⚡ **Vitest testing setup** with complete Next.js 15 configuration
  - 11 passing tests covering core functionality
  - Test scripts: `pnpm test`, `pnpm test:ui`, `pnpm test:coverage`
- 📝 **TESTING.md** - Complete testing guide and best practices
- 🌐 Updated i18n files (EN, ES, PT) with Resend references
- 🔧 Email templates export from `/src/emails`

### Changed

- ⚡ **Migrated from Mailgun to Resend** for better developer experience
  - Simpler API
  - React Email component support
  - Better deliverability
- 🔄 Updated `.env.example` with `RESEND_API_KEY`
- 🔄 Updated config to use `config.resend` instead of `config.mailgun`
- 📦 Updated webhook endpoint from `/api/mailgun` to `/api/resend`
- 🎨 Updated TechStack component to show Resend

### Fixed

- 🐛 **Critical:** Fixed `cookies() called outside request scope` error
  - Removed problematic `export const supabase = createClient()` from `server.ts`
  - Build now completes successfully without errors
- 🐛 Fixed LoginForm component removing incompatible SEO wrapper
- 🐛 Updated login page metadata to use Next.js 15 Metadata API

### Removed

- ❌ **Mailgun integration** - Replaced with Resend
  - Removed `mailgun.js` and `form-data` dependencies
  - Removed `/src/lib/mailgun.ts`
- ❌ **Legacy components** - Cleaned up unused code:
  - `src/components/register-form.tsx` (duplicate)
  - `src/components/login-form.tsx` (old version with SEO)
  - `src/components/pricing.tsx` (unused pricing page)
  - `src/components/CheckoutButton.tsx` (only used by unused pricing)
  - `src/components/lemon-button.tsx` (unused LemonSqueezy button)
  - `src/components/dashboard-preview.tsx` (unused preview component)
- ❌ **Removed `/src/utils/seo.tsx`** - Incompatible with Next.js 15 App Router
  - Using Metadata API instead (`export const metadata`)

### Security

- 🔒 Improved email security with Resend's built-in verification
- 🔒 Webhook signature verification ready for Resend webhooks

## [0.1.0] - 2025-01-10

### Added

- 🎉 Initial release - NextShip SaaS Boilerplate
- ⚡ **Next.js 15** with App Router and Server Components
- 🔐 **Supabase** authentication and database
  - Email/password authentication
  - Magic link support
  - OAuth providers (Google, GitHub)
- 💳 **Payment integrations**:
  - Stripe with subscription support
  - LemonSqueezy integration
  - Webhook handling for both providers
- 🛡️ **Arcjet security** layer
  - Rate limiting
  - Bot protection
  - CSRF protection with Double Submit Cookie pattern
- 🌐 **Full internationalization (i18n)**
  - English (en)
  - Spanish (es)
  - Portuguese (pt)
  - Complete translations for all UI elements
- 🎨 **Modern UI/UX**
  - Tailwind CSS v4
  - Radix UI components
  - shadcn/ui component library
  - Dark mode support
  - Responsive design
  - Lucide icons
- 🐳 **Docker support**
  - Development environment with hot reload
  - Production-optimized builds
  - PostgreSQL and MongoDB configurations
  - Portainer integration
- 📧 Email integration with Mailgun
- 🔒 Security features
  - Zod schema validation
  - Environment variable validation
  - SQL injection protection with Drizzle ORM
  - Secure headers (CSP, HSTS, X-Frame-Options)
- 📱 Features
  - Dashboard with analytics
  - User authentication flows
  - Payment checkout flows
  - Profile management
  - Responsive mobile-first design

### Technical Stack

- **Framework**: Next.js 15.5.4
- **Language**: TypeScript 5
- **Database**: PostgreSQL (Supabase)
- **ORM**: Drizzle ORM
- **Auth**: Supabase Auth
- **Payments**: Stripe 17.6.0, LemonSqueezy
- **Security**: Arcjet 1.0.0-beta.13
- **Email**: Mailgun (later migrated to Resend in v0.2.0)
- **Styling**: Tailwind CSS 4, Radix UI
- **Package Manager**: pnpm 9.15.3
- **Node**: >= 20.0.0

---

## Version History

- **v0.2.0** (2025-01-14) - Resend migration, testing setup, code cleanup
- **v0.1.0** (2025-01-10) - Initial release based on ShipFree template

---

## Credits

Built with ❤️ by [emilianooferreyra](https://github.com/emilianooferreyra)

Based on [ShipFree](https://shipfree.idee8.agency/) template with significant improvements and modernizations.
