# CryptoDrop Client

This directory contains the React frontend application built with Vite and managed with pnpm.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Local Development (without Docker)](#local-development-without-docker)
- [Docker Setup](#docker-setup)
- [Other Useful Docker Commands](#other-useful-docker-commands)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- [pnpm](https://pnpm.io/installation) (You can install it via `npm install -g pnpm` or rely on Corepack)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (or Docker Engine)

## Local Development (without Docker)

If you prefer to run the React application directly on your host machine without Docker:

1.  **Install dependencies:**

```bash
pnpm install
```

2.  **Start the development server:**

```bash
pnpm dev
```

The application will typically be available at `http://localhost:5173`.

## Docker Setup

This project uses Docker for consistent development and production environments.### Building Docker Images
Navigate to the `web` directory before running these commands:

```bash
cd web
```

Build Development Image:

This image is used for active development, featuring hot-reloading.

```bash
docker build -t cryptodrop-web:dev --target development .
```

Build Production Image:

This image contains the optimized, static production build served by Nginx.

```bash
docker build -t cryptodrop-web:prod --target production .
```

This command implicitly builds the final production stage of the Dockerfile.

Running Development Container

To develop your application with hot-reloading within a Docker container:

```bash
docker run -it --rm -p 5173:5173 -v "$(pwd):/app" -v /app/node_modules cryptodrop-web:dev
```

- 5173:5173: Maps the container's Vite development port to your host machine.

- -v "$(pwd):/app": Mounts your current host directory (where your React code is) into the container for live changes.

- -v /app/node_modules: Creates a separate volume for node_modules to ensure performance with bind mounts.

Access the development server in your browser at http://localhost:5173.

Running Production Container

To run the optimized production build:

```bash
docker run --rm -p 80:80 cryptodrop-web:prod
```

- 80:80: Maps the container's Nginx port to your host machine's port 80.

Access the production build in your browser at http://localhost.

## Other Useful Docker Commands

List all Docker images:

```bash
docker images
```

List running Docker containers:

```bash
docker ps
```

Stop a running container:

```bash
docker stop <container_id_or_name>
```

(You can find container_id_or_name from docker ps)

Remove a Docker image:

```bash
docker rmi <image_id_or_name>
```

Execute a command inside a running container (e.g., for debugging):

```bash
docker exec -it <container_id_or_name> sh # or bash if available
```
