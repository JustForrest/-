# Use a lightweight Node.js base image
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port your Fastify app uses (default is 3000)
EXPOSE 3000

# Set environment variable defaults
ENV PORT=3000
# Don't set DATABASE_URL here - it should be injected at runtime

# Command to start the application
CMD ["node", "index.js"]