# Use official Node.js image as base
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the TypeScript application
RUN npm run build

# Expose the application port (change if needed)
EXPOSE 8000

# Command to run the application
CMD ["node", "dist/server.js"]
