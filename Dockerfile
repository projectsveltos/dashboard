FROM node:14 as builder

# Set the working directory in the container
WORKDIR /build
ARG VITE_BACKEND_PORT
ARG VITE_BACKEND_NAME
COPY package*.json ./
ENV VITE_BACKEND_PORT=${VITE_BACKEND_PORT}
ENV VITE_BACKEND_NAME=${VITE_BACKEND_NAME}
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .

RUN npm run build

FROM node:alpine as runner

 # Set the working directory within the container to /app
WORKDIR /app

# Copy package.json from the build stage to the working directory
COPY --from=builder build/package*.json .
COPY --from=builder build/dist dist/
COPY --from=builder build/.env .

# Install only production dependencies
RUN npm install --only=dev

EXPOSE 5173
# Command to run the application in development mode
CMD ["npm", "run", "dev"]

