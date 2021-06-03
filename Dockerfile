# Set base Docker image
FROM node:13.12.0-alpine as build

# Set working directory within Docker image
WORKDIR /var/app

# Install NPM packages and copy
COPY . .
RUN npm ci

# Expose ports
EXPOSE 3000

# Development only
CMD ["npm", "run", "serve"]
