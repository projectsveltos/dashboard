# 1: Build stage
FROM node:18-alpine AS builder
WORKDIR /build
COPY package*.json ./
RUN npm install

# 2: Runtime stage
FROM node:18-alpine AS runner
WORKDIR /app

# Set higher ulimit
RUN ulimit -n 65535

# Only copy necessary files, not node_modules
COPY --from=builder /build/node_modules /app/node_modules
COPY package*.json ./
COPY vite.config.ts ./
COPY public ./public
COPY src ./src
COPY index.html ./

# Environment variables
ARG VITE_BACKEND_PORT
ARG VITE_BACKEND_NAME
ENV VITE_BACKEND_PORT=${VITE_BACKEND_PORT}
ENV VITE_BACKEND_NAME=${VITE_BACKEND_NAME}

# Add Vite configuration for file watching
RUN echo 'export default { server: { watch: { usePolling: true, interval: 1000, ignored: ["**/node_modules/**", "**/dist/**"] } } }' > /app/vite.config.js

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
