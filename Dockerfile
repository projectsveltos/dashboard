### Multi-stage builds

# 1: Build the application
FROM node:25-alpine@sha256:bdf2cca6fe3dabd014ea60163eca3f0f7015fbd5c7ee1b0e9ccb4ced6eb02ef4 AS builder

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

# Version pinned to match package.json's "packageManager" field.
RUN npm install -g pnpm@11.1.1

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# 2: Prepare the runtime environment
FROM alpine:3.24.4@sha256:f59abe656b692d901e184be3445e084786602108599d2a51d229c0f5a48c71bf AS runner

# Keep nginx >= 1.30.7-r0: earlier builds affected by NGINX2Root (CVE-2026-123007).
# renovate: datasource=repology depName=alpine_3_24/nginx versioning=loose
ARG NGINX_VERSION=1.30.7-r0
# renovate: datasource=repology depName=alpine_3_24/gettext versioning=loose
ARG GETTEXT_VERSION=1.0-r0
RUN apk add --no-cache nginx="${NGINX_VERSION}" gettext="${GETTEXT_VERSION}" \
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

ARG GIT_COMMIT=unknown

LABEL org.opencontainers.image.source="https://github.com/projectsveltos/dashboard" \
      org.opencontainers.image.url="https://projectsveltos.io" \
      org.opencontainers.image.documentation="https://projectsveltos.github.io/sveltos/" \
      org.opencontainers.image.licenses="Apache-2.0" \
      org.opencontainers.image.vendor="projectsveltos" \
      org.opencontainers.image.title="dashboard" \
      org.opencontainers.image.description="Sveltos Dashboard web UI." \
      org.opencontainers.image.version="$VITE_APP_VERSION" \
      org.opencontainers.image.revision="$GIT_COMMIT"

EXPOSE 5173

ENTRYPOINT ["/docker-entrypoint.sh"]
