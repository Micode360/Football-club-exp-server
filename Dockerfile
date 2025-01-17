FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the project (if needed)
RUN yarn build

# Expose the port
EXPOSE 5000

# Start the application
CMD ["yarn", "start"]