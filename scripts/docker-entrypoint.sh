#!/bin/sh

set -e

echo "🔧 Starting Docker Entrypoint..."
echo "📦 ENV values:"
echo "  - VITE_BACKEND_NAME: $VITE_BACKEND_NAME"
echo "  - VITE_BACKEND_PORT: $VITE_BACKEND_PORT"
echo "  - OIDC_ISSUER: $OIDC_ISSUER"
echo "  - OIDC_CLIENT_ID: $OIDC_CLIENT_ID"
echo "  - OIDC_REDIRECT_URI: $OIDC_REDIRECT_URI"

# Confirm template file exists
TEMPLATE_PATH="/etc/nginx/templates/nginx.template.conf"
CONF_PATH="/etc/nginx/conf.d/default.conf"

if [ ! -f "$TEMPLATE_PATH" ]; then
  echo "❌ Nginx template not found at $TEMPLATE_PATH"
  exit 1
fi

echo "📄 Found template at $TEMPLATE_PATH"

# Generate runtime config.js from template
echo "🔁 Generating runtime config.js..."
envsubst '$OIDC_ISSUER $OIDC_CLIENT_ID $OIDC_REDIRECT_URI' \
  < /docker-entrypoint.d/config.template.js \
  > /app/dist/config.js

# Generate nginx config from template
echo "🔁 Substituting env vars into Nginx config..."
envsubst '$VITE_BACKEND_PORT $VITE_BACKEND_NAME' < "$TEMPLATE_PATH" > "$CONF_PATH"

# Output the generated file for debug
echo "📝 Generated Nginx config:"
cat "$CONF_PATH"

# Validate Nginx config
echo "✅ Validating Nginx config..."
nginx -t

# Run nginx
echo "🚀 Starting Nginx..."
exec nginx -g "daemon off;"
