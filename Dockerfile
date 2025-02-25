# Use the official Node.js image.
FROM node:14

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install app dependencies.
COPY package*.json ./
RUN npm install

# Expose the port the app runs on.
EXPOSE 5000

# Run the app.
CMD ["npm", "start"]
