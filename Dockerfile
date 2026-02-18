# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application to the container
COPY . .

# Set the working directory to agenda-service
WORKDIR /app/agenda-service

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]

