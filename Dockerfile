

# Use official Node mirrors.
# https://hub.docker.com
FROM node:18.14.2-alpine3.17 AS base



# ==========================================
# Initialize
# ==========================================
# Install dependencies only when needed
FROM base AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.

RUN apk add --no-cache libc6-compat
WORKDIR /grpc-getting-started

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

    
# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /grpc-getting-started
COPY --from=deps /grpc-getting-started/node_modules ./node_modules
COPY . .


# ==========================================
# Build the project(use docker only when deploying)
# ==========================================
RUN npm run build


# ==========================================
# Production image, copy all the files and run next
# ==========================================
FROM base AS runner
WORKDIR /grpc-getting-started

ENV NODE_ENV production



# ==========================================
# Copy files
# ==========================================
COPY . .
COPY --from=deps /grpc-getting-started/node_modules ./node_modules


# ==========================================
# run node script (deploy custom server configuration)
# ==========================================
# Execute a single file, please use the following command
# Declare port 3000, just tell the mirror user the default port, the actual mapping will be informed below
EXPOSE 4002
# run node script (deploy custom server configuration)
CMD ["node", "server-api.js"]

