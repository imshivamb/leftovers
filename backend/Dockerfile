# Use Node.js 18 Alpine as base image
FROM node:18-alpine

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies)
RUN npm install

# Copy TypeScript configuration and source code
COPY tsconfig.json ./
COPY ./src ./src

# Build TypeScript code
RUN npm run build

# Keep the TypeScript files for potential source map usage
RUN npm install -g typescript

# Remove development dependencies AFTER build
# RUN npm prune --production  # Comment this out for now

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/server.js"]