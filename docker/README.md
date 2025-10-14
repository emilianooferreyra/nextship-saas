# Docker Configuration Guide

This directory contains Docker configurations for both development and production environments.

## Quick Start

### Development Environment

1. **Copy and configure your environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

2. **Choose your database:**

   **PostgreSQL (Recommended):**
   ```bash
   cd docker/dev
   docker-compose -f docker-compose.postgres.yml up -d
   ```

   **MongoDB (Alternative):**
   ```bash
   cd docker/dev
   docker-compose -f docker-compose.mongodb.yml up -d
   ```

   **No Database (App only):**
   ```bash
   cd docker/dev
   docker-compose up -d
   ```

### Production Environment

1. **Build and push your Docker image:**
   ```bash
   docker build -t your-registry/your-image:latest -f docker/prod/Dockerfile .
   docker push your-registry/your-image:latest
   ```

2. **Update the docker-compose file with your image:**
   Replace `YOUR_REGISTRY/YOUR_IMAGE:latest` with your actual image path.

3. **Deploy:**
   ```bash
   cd docker/prod
   docker-compose -f docker-compose.postgres.yml up -d
   ```

## Configuration Placeholders

Before using the Docker configurations, replace these placeholders with your actual values:

### PostgreSQL Configuration

- `YOUR_DB_USER` - PostgreSQL username (e.g., `myapp_user`)
- `YOUR_DB_PASSWORD` - PostgreSQL password (use a strong password)
- `YOUR_DB_NAME` - Database name (e.g., `myapp_db`)
- `YOUR_EMAIL@example.com` - Email for pgAdmin access
- `YOUR_PGADMIN_PASSWORD` - Password for pgAdmin interface

### MongoDB Configuration (if using MongoDB)

- `YOUR_MONGO_USER` - MongoDB root username
- `YOUR_MONGO_PASSWORD` - MongoDB root password
- `YOUR_DB_NAME` - Database name
- `YOUR_ADMIN_USER` - Mongo Express admin username
- `YOUR_ADMIN_PASSWORD` - Mongo Express admin password

### Production Image

- `YOUR_REGISTRY/YOUR_IMAGE:latest` - Your Docker registry and image name
  - Examples:
    - `ghcr.io/your-username/your-app:latest` (GitHub Container Registry)
    - `your-username/your-app:latest` (Docker Hub)
    - `registry.yourdomain.com/your-app:latest` (Private Registry)

## Available Services

### Development (`docker/dev/`)

- **App**: Your Next.js application (port 3000)
- **PostgreSQL**: Database server (port 5432)
- **pgAdmin**: PostgreSQL web interface (port 5050)
- **MongoDB**: Alternative database (port 27017)
- **Mongo Express**: MongoDB web interface (port 8081)
- **Portainer**: Docker management UI (port 9000)

### Production (`docker/prod/`)

- **App**: Your Next.js application (port 3000)
- **PostgreSQL/MongoDB**: Database server
- **Portainer**: Docker management UI (port 9000)

## Connection Strings

### PostgreSQL
```
postgresql://YOUR_DB_USER:YOUR_DB_PASSWORD@postgres:5432/YOUR_DB_NAME
```

### MongoDB
```
mongodb://YOUR_MONGO_USER:YOUR_MONGO_PASSWORD@mongodb:27017/YOUR_DB_NAME?authSource=admin
```

## Useful Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f app

# Rebuild and restart
docker-compose up -d --build

# Remove volumes (⚠️ deletes all data)
docker-compose down -v
```

## Security Notes

- **Never commit** real credentials to version control
- Use **strong passwords** for production
- Consider using **Docker secrets** for sensitive data in production
- Restrict database ports in production (remove port mappings)
- Use environment variables or `.env` files for configuration

## Troubleshooting

### Database Connection Issues
1. Ensure the database container is healthy: `docker-compose ps`
2. Check logs: `docker-compose logs postgres` or `docker-compose logs mongodb`
3. Verify your connection string matches the docker-compose configuration

### Port Already in Use
If you get "port already allocated" errors, either:
- Stop the conflicting service
- Change the port mapping in docker-compose.yml (e.g., `5433:5432` instead of `5432:5432`)

### Permission Issues
On Linux, you may need to run Docker commands with `sudo` or add your user to the docker group.
