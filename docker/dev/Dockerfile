FROM node:20-alpine
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.15.3 --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

EXPOSE 3000

# Push database schema
RUN pnpm dlx drizzle-kit push:pg

CMD ["pnpm", "dev"]