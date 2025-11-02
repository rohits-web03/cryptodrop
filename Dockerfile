# Stage 0: Base image for all stages
FROM node:20-alpine AS base

# Set working directory inside the container
WORKDIR /app

# Install pnpm globally and enable corepack
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Stage 1: Development build
FROM base AS development

# Copy pnpm-lock.yaml and package.json to leverage Docker cache
COPY package.json pnpm-lock.yaml ./

# Install development dependencies.
# Using --frozen-lockfile ensures reproducible builds.
# Using --mount=type=cache for pnpm store for faster builds.
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Expose the Vite development server port
EXPOSE 5173

# Command to run the development server
CMD ["pnpm", "dev"]

# Stage 2: Production build
FROM base AS build

# Copy pnpm-lock.yaml and package.json
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (dev and prod) for building
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN pnpm build

# Stage 3: Production serving (using Nginx)
FROM nginx:stable-alpine AS production

# Copy the built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Copy a custom Nginx configuration if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose Nginx default HTTP port
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]