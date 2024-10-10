# Use the official Node.js image as the build environment
FROM node:18 as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the Vue.js application
RUN npm run build

# Use the official Nginx image to serve the application
FROM nginx:stable-alpine as production-stage

# Copy the build output from the build-stage to the Nginx HTML folder
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 to serve the application
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
