# ⚡ NextShip SaaS

Hi there! 👋

NextShip SaaS is a modern, comprehensive Next.js boilerplate designed to accelerate your SaaS development. Built with cutting-edge technologies including Next.js 15, Supabase, Stripe, LemonSqueezy, Arcjet security, and full internationalization support.

## ✨ Features

- 🌐 **Internationalization**: Full i18n support (English, Spanish, Portuguese)
- 🎛️ **Advanced Dashboard**: Modern UI with comprehensive components  
- 🔒 **Enhanced Security**: Arcjet integration and secure authentication
- 🐳 **Docker Ready**: Complete dev/prod Docker configuration
- 💳 **Payment Processing**: Stripe and LemonSqueezy integration
- 🎨 **Modern UI**: Tailwind CSS with Radix UI components
- 📧 **Email Integration**: Mailgun for transactional emails
- 📱 **Responsive Design**: Mobile-first approach
- 🚀 **Performance Optimized**: Next.js 15 with modern practices

## Docker Setup

NextShip provides Docker configurations for both **development** and **production** environments. Below, you'll find the structure of the Docker files and the commands to get started.

### Docker File Structure

The Docker files are organized as follows:

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

In development, the project runs in **watch mode**, meaning it automatically detects changes in your code and rebuilds the application. This is ideal for local development but should **never** be used in production.

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

#### Why Watch Mode?

- **Watch mode** ensures that your changes are reflected in real-time without manually restarting the server.
- It’s perfect for development but **not suitable for production** due to performance and security concerns.

---

### Production Environment

The production environment is optimized for performance and security. It uses a multi-stage build to reduce the image size and includes only the necessary dependencies.

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

#### Key Differences in Production

- **No watch mode**: The application is pre-built, and changes require a rebuild.
- **Optimized images**: Smaller image size and faster startup times.
- **Environment variables**: Ensure all required variables (e.g., `DATABASE_URL`, `API_KEY`) are set.

---

### Portainer Integration

Portainer is included in both development and production setups to help you manage your Docker containers via a web interface.

- **Access Portainer**: `http://localhost:9000`
- **Default credentials**: Set up during the first login.

---

### Disclaimer

- **Development Mode**: Uses watch mode for real-time updates. Not suitable for production.
- **Production Mode**: Optimized for performance and security. Requires a rebuild for changes.

---

## Docs

For full documentation, visit: [NextShip Docs](https://google.com)

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## Contributing

For people who want to contribute, please refer to [CONTRIBUTING.md](CONTRIBUTING.md).

---

Built with ❤️ by [emilianooferreyra](https://github.com/emilianooferreyra)
