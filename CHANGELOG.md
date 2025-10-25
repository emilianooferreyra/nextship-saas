# Changelog

All notable changes to NextShip will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0] - 2025-10-25

### Added

- ⚡ **Biome integration** - Ultra-fast linter and formatter
  - Replaces ESLint + Prettier with single tool (10-100x faster)
  - New commands: `pnpm check`, `pnpm check:fix`, `pnpm lint:fix`
  - Automatic import organization
  - Configuration in `biome.json`

### Changed

- 🚀 **Next.js 15.5.4 → 16.0.0** - Major version upgrade
  - Turbopack enabled by default
  - Updated `next.config.ts` for React Compiler compatibility
  - Moved `experimental.reactCompiler` to root level
- 📦 **Major dependency updates**:
  - @stripe/stripe-js: 5.6.0 → 8.1.0
  - @supabase/supabase-js: 2.48.1 → 2.76.1
  - drizzle-orm: 0.39.3 → 0.44.7
  - framer-motion: 12.0.9 → 12.23.24
  - lucide-react: 0.474.0 → 0.548.0
  - stripe: 17.6.0 → 19.1.0
  - axios: 1.7.9 → 1.12.2
  - next-intl: 4.3.12 → 4.4.0
- 🔧 **Dev dependency updates**:
  - @types/node: 20.17.16 → 24.9.1
  - typescript: 5.7.3 → 5.9.3
  - vitest: 3.2.4 → 4.0.3
- 📝 Updated package.json scripts for Biome

### Removed

- ❌ **ESLint** - Replaced with Biome
  - Removed `eslint` package
  - Removed `eslint-config-next` package
  - Removed `@eslint/eslintrc` package
  - Removed `eslint.config.mjs`
- ❌ **Prettier** - Replaced with Biome
  - Removed `prettier` package
  - Removed `.prettierrc` and `.prettierignore`

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

- **v0.4.0** (2025-10-25) - Next.js 16, Biome migration, major dependency updates
- **v0.2.0** (2025-01-14) - Resend migration, testing setup, code cleanup
- **v0.1.0** (2025-01-10) - Initial release based on ShipFree template

---

## Credits

Built with ❤️ by [emilianooferreyra](https://github.com/emilianooferreyra)

Based on [ShipFree](https://shipfree.idee8.agency/) template with significant improvements and modernizations.
