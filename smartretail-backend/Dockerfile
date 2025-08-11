# Use Node.js official image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Expose backend port (adjust if different)
EXPOSE 3000

# Start the backend server
CMD ["node", "index.js"]
