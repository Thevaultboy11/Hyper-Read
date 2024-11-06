# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory for the app
WORKDIR /home/node/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Change ownership of the app directory
RUN chown -R node:node /home/node/app

# Switch to the node user to run npm install and the app
USER node

# Install dependencies with --force flag
RUN npm install --force

# Copy the rest of the application code with proper ownership
COPY --chown=node:node . .

# Copy the .env file into the container
COPY .env ./

# Build the application for production
RUN npm run build

# Set the command to run the application in production
CMD [ "npm", "run", "start:prod" ]