### Multi-stage builds

# 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /build

COPY package*.json ./
RUN npm install --only=dev

COPY . .
RUN npm run build

# 2: Prepare the runtime environment
FROM alpine AS runner

# Install Node.js, npm, Nginx, envsubst
RUN apk add --no-cache nodejs npm nginx gettext \
  && mkdir -p /etc/nginx/templates \
  && mkdir -p /etc/nginx/conf.d

WORKDIR /app

# Copy build output and deps
COPY --from=builder /build/dist /app/dist
COPY --from=builder /build/node_modules /app/node_modules
COPY --from=builder /build/package.json /app/package.json

# Copy custom nginx.conf to replace default
COPY nginx.conf /etc/nginx/nginx.conf

# Copy Nginx template and entrypoint script
COPY nginx.template.conf /etc/nginx/templates/nginx.template.conf
COPY scripts/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# ENV vars
ARG VITE_BACKEND_PORT
ARG VITE_BACKEND_NAME
ARG VITE_APP_BACKEND_URL

ENV VITE_BACKEND_PORT=${VITE_BACKEND_PORT}
ENV VITE_BACKEND_NAME=${VITE_BACKEND_NAME}
ENV VITE_APP_BACKEND_URL=${VITE_APP_BACKEND_URL}

EXPOSE 5173

ENTRYPOINT ["/docker-entrypoint.sh"]
