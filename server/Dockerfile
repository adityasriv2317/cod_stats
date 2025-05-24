FROM node:18-bullseye

# Install Chromium
RUN apt-get update && apt-get install -y chromium

# Create app directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "index.js"]
