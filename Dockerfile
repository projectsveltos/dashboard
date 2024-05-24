FROM node:14

# Set the working directory in the container
WORKDIR /app
ARG VITE_BACKEND_PORT
ARG VITE_BACKEND_NAME
COPY package*.json ./
ENV VITE_BACKEND_PORT=${VITE_BACKEND_PORT}
ENV VITE_BACKEND_NAME=${VITE_BACKEND_PORT}
# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .
# Command to run the application in development mode
CMD ["npm", "run", "dev"]

RUN npm run build
