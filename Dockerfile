### Multi-stage builds

# 1: Build the application
FROM node:14-alpine AS builder

# Set working directory
WORKDIR /build

# Copy package.json and lock file, and install both production and dev dependencies
COPY package*.json ./
RUN npm install --only=dev

# Copy application files and build
COPY . .
RUN npm run build

# 2: Prepare the runtime environment (only with production dependencies)
FROM alpine AS runner

# Set working directory
WORKDIR /app
RUN  apk add --update nodejs npm
# Copy build output and production dependencies
COPY --from=builder /build/dist /app/dist
COPY --from=builder /build/node_modules /app/node_modules
COPY --from=builder /build/package.json /app/package.json
# VITE arguments
ARG VITE_BACKEND_PORT
ARG VITE_BACKEND_NAME
ARG VITE_APP_BACKEND_URL
ENV VITE_BACKEND_PORT=${VITE_BACKEND_PORT}
ENV VITE_BACKEND_NAME=${VITE_BACKEND_PORT}
ENV VITE_APP_BACKEND_URL=${VITE_APP_BACKEND_URL}
ENV VITE_BACKEND_NAME=${VITE_BACKEND_NAME}

EXPOSE 5173
CMD ["npx", "vite", "preview"]