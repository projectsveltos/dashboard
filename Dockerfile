### Multi-stage builds

# 1: Build the application
FROM node:25-alpine AS builder

# ENV vars
ARG VITE_BACKEND_PORT
ARG VITE_BACKEND_NAME
ARG VITE_APP_BACKEND_URL
ARG VITE_APP_VERSION

ENV VITE_BACKEND_PORT=${VITE_BACKEND_PORT}
ENV VITE_BACKEND_NAME=${VITE_BACKEND_NAME}
ENV VITE_APP_BACKEND_URL=${VITE_APP_BACKEND_URL}
ENV VITE_APP_VERSION=${VITE_APP_VERSION}

WORKDIR /build

COPY package*.json ./
RUN npm install --only=dev

COPY . .
RUN npm run build

# 2: Prepare the runtime environment
FROM alpine AS runner

# Install Nginx and envsubst (gettext)
RUN apk add --no-cache nginx gettext \
  && mkdir -p /etc/nginx/templates \
  && mkdir -p /etc/nginx/conf.d

WORKDIR /app

# Copy build output
COPY --from=builder /build/dist /app/dist

# Copy custom nginx.conf to replace default
COPY nginx.conf /etc/nginx/nginx.conf

# Copy Nginx template and entrypoint script
COPY nginx.template.conf /etc/nginx/templates/nginx.template.conf
COPY scripts/docker-entrypoint.sh /docker-entrypoint.sh
COPY scripts/config.template.js /docker-entrypoint.d/config.template.js
RUN chmod +x /docker-entrypoint.sh

# ENV vars
ARG VITE_BACKEND_PORT
ARG VITE_BACKEND_NAME
ARG VITE_APP_BACKEND_URL
ARG VITE_APP_VERSION


ENV VITE_BACKEND_PORT=${VITE_BACKEND_PORT}
ENV VITE_BACKEND_NAME=${VITE_BACKEND_NAME}
ENV VITE_APP_BACKEND_URL=${VITE_APP_BACKEND_URL}
ENV VITE_APP_VERSION=${VITE_APP_VERSION}

EXPOSE 5173

ENTRYPOINT ["/docker-entrypoint.sh"]
