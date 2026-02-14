FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Run migrations
RUN npx prisma migrate deploy

# Expose port
EXPOSE 3001

# Start the server
CMD ["npm", "run", "start"]
