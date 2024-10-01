### staged builds

# 1: get the dependencies to copy in the shipping layer.
FROM node:14-alpine AS builder
WORKDIR /build
COPY package*.json ./
RUN npm install --only=dev
RUN npm install -D typescript
RUN npm prune

# 2: final layer to ship.
FROM alpine AS runner
WORKDIR /app
# copy dependencies from ealier stage.
# TODO: check if the following copy can be further specialized.
COPY . .
COPY --from=builder /build/node_modules/typescript/bin/tsc /usr/bin/tsc
COPY --from=builder /build/node_modules /app/node_modules
RUN  apk add --update nodejs npm
# VITE arguments
ARG VITE_BACKEND_PORT
ARG VITE_BACKEND_NAME
ENV VITE_BACKEND_PORT=${VITE_BACKEND_PORT}
ENV VITE_BACKEND_NAME=${VITE_BACKEND_NAME}
EXPOSE 5173
CMD ["npm", "run", "dev"]
