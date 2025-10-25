# ⚡ NextShip SaaS

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/tests-23%20passing-green)](./TESTING.md)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![pnpm](https://img.shields.io/badge/pnpm-9-orange)](https://pnpm.io/)
[![Biome](https://img.shields.io/badge/Biome-2.3-60a5fa)](https://biomejs.dev/)

Hi there! 👋

NextShip SaaS is a modern, comprehensive Next.js boilerplate designed to accelerate your SaaS development. Built with cutting-edge technologies including Next.js 16, Supabase, Stripe, LemonSqueezy, Arcjet security, Resend email, Biome linting, and full internationalization support.

## ✨ Features

- 🌐 **Internationalization**: Full i18n support (English, Spanish, Portuguese)
- 🔐 **Authentication**: Supabase with email/password, magic links, and OAuth
- 💳 **Payment Processing**: Stripe and LemonSqueezy integration with webhooks
- 📧 **Email Integration**: Resend with React Email templates
- 🛡️ **Enhanced Security**: Arcjet rate limiting, bot protection, and CSRF protection
- 🧪 **Testing**: Vitest setup with 23 passing tests
- ⚡ **Biome**: Ultra-fast linting and formatting (10-100x faster than ESLint)
- 🪝 **Pre-commit Hooks**: Automated code quality checks with Husky
- 🎛️ **Advanced Dashboard**: Modern UI with comprehensive components
- 🎨 **Modern UI**: Tailwind CSS v4 with Radix UI components
- 🐳 **Docker Ready**: Complete dev/prod Docker configuration
- 📱 **Responsive Design**: Mobile-first approach
- 🚀 **Performance Optimized**: Next.js 16 with Turbopack and Server Components

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/emilianooferreyra/nextship-saas.git
   cd nextship-saas
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your credentials:

   - Supabase (Auth & Database)
   - Stripe (Payments)
   - Resend (Email)
   - Arcjet (Security)

4. **Run development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📜 Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality (Biome)
pnpm lint             # Run linter
pnpm lint:fix         # Run linter and auto-fix issues
pnpm format           # Format code
pnpm format:check     # Check code formatting
pnpm check            # Run lint + format + organize imports
pnpm check:fix        # Fix all issues automatically

# Testing
pnpm test             # Run tests in watch mode
pnpm test:ui          # Run tests with UI
pnpm test:coverage    # Run tests with coverage
```

**Note:** Pre-commit hooks will automatically run `biome check` on staged files before each commit.

## 🧪 Testing

NextShip includes a complete testing setup with Vitest:

```bash
# Run tests in watch mode
pnpm test

# Run tests once
pnpm test run

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

📖 For more details, see [TESTING.md](./TESTING.md)

## 📧 Email Setup (Resend)

NextShip uses [Resend](https://resend.com) with React Email for beautiful, responsive email templates.

1. **Get your API key** from [resend.com/api-keys](https://resend.com/api-keys)
2. **Add to `.env`**
   ```bash
   RESEND_API_KEY=re_xxx
   ```
3. **Use pre-built templates**

   ```typescript
   import { sendEmail } from "@/lib/resend";
   import { WelcomeEmail } from "@/emails";

   await sendEmail({
     to: "user@example.com",
     subject: "Welcome to NextShip!",
     react: <WelcomeEmail username="John" />,
   });
   ```

**Available templates:**

- `WelcomeEmail` - New user welcome
- `ResetPasswordEmail` - Password reset flow
- `NotificationEmail` - General notifications

## 🔐 Environment Variables

Create a `.env` file with the following variables:

```bash
# Environment
NODE_ENV=development

# URLs
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://abc123.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# LemonSqueezy
LEMONSQUEEZY_API_KEY=your-api-key
LEMONSQUEEZY_STORE_ID=your-store-id
LEMONSQUEEZY_WEBHOOK_SECRET=your-webhook-secret

# Resend (Email)
RESEND_API_KEY=re_xxx

# Arcjet (Security)
ARCJET_KEY=ajkey_xxx
```

## 🐳 Docker Setup

NextShip provides Docker configurations for both **development** and **production** environments.

### Docker File Structure

```
docker
├── dev
│   ├── Dockerfile                  # Dockerfile for development
│   ├── docker-compose.yml          # Base development setup
│   ├── docker-compose.mongodb.yml  # Development setup with MongoDB
│   └── docker-compose.postgres.yml # Development setup with PostgreSQL
└── prod
    ├── Dockerfile                  # Dockerfile for production
    ├── docker-compose.yml          # Base production setup
    ├── docker-compose.mongodb.yml  # Production setup with MongoDB
    └── docker-compose.postgres.yml # Production setup with PostgreSQL
```

### Development Environment

In development, the project runs in **watch mode** with automatic rebuilds.

#### Commands for Development

1. **Base Setup** (without a database):

   ```bash
   docker-compose -f docker/dev/docker-compose.yml up --build
   ```

2. **With PostgreSQL**:

   ```bash
   docker-compose -f docker/dev/docker-compose.yml -f docker/dev/docker-compose.postgres.yml up --build
   ```

3. **With MongoDB**:
   ```bash
   docker-compose -f docker/dev/docker-compose.yml -f docker/dev/docker-compose.mongodb.yml up --build
   ```

### Production Environment

The production environment is optimized for performance and security.

#### Commands for Production

1. **Base Setup** (without a database):

   ```bash
   docker-compose -f docker/prod/docker-compose.yml up --build -d
   ```

2. **With PostgreSQL**:

   ```bash
   docker-compose -f docker/prod/docker-compose.yml -f docker/prod/docker-compose.postgres.yml up --build -d
   ```

3. **With MongoDB**:
   ```bash
   docker-compose -f docker/prod/docker-compose.yml -f docker/prod/docker-compose.mongodb.yml up --build -d
   ```

### Portainer Integration

Portainer is included in both development and production setups.

- **Access**: `http://localhost:9000`
- **Setup**: Configure credentials on first login

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.0
- **Language**: TypeScript 5.9.3
- **Database**: PostgreSQL (Supabase)
- **ORM**: Drizzle ORM 0.44.7
- **Auth**: Supabase Auth 0.7.0
- **Payments**: Stripe 19.1.0, LemonSqueezy
- **Email**: Resend 6.2.2 with React Email 4.3.2
- **Security**: Arcjet 1.0.0-beta.13
- **Styling**: Tailwind CSS 4.1.16, Radix UI
- **Linting/Formatting**: Biome 2.3.0
- **Testing**: Vitest 4.0.3
- **Git Hooks**: Husky 9.1.7 + lint-staged 16.2.6
- **Package Manager**: pnpm 9.15.3
- **Node**: >= 20.0.0

## 📚 Documentation

- [Testing Guide](./TESTING.md) - Complete testing documentation
- [Changelog](./CHANGELOG.md) - Version history and changes
- [Contributing](./CONTRIBUTING.md) - How to contribute
- [Code of Conduct](./CODE_OF_CONDUCT.md) - Community guidelines

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) before submitting a PR.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Credits

Built with ❤️ by [emilianooferreyra](https://github.com/emilianooferreyra)

Based on [ShipFree](https://github.com/shipfree/shipfree) template with significant improvements:

- 🚀 Next.js 16 with Turbopack
- ⚡ Biome linting (10-100x faster than ESLint)
- 🪝 Pre-commit hooks for code quality
- ✨ Resend + React Email integration
- 🧪 Complete testing setup with 23 tests
- 🔒 Enhanced security features
- 🌐 Full i18n support (3 languages)
- 🐳 Docker dev/prod environments
- 📝 Comprehensive documentation

## ⭐ Show your support

If you found NextShip helpful, please give it a ⭐ on GitHub!

---

**Ready to ship?** Start building your SaaS with NextShip today! 🚀
