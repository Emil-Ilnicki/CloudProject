#Filename: Dockerfile

# Pull base image
FROM node:12.20-alpine

# Set working directory
WORKDIR /app

# Add node modules to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Add app
COPY . ./

# Expose ports
EXPOSE 80

# Start app
CMD ["npm", "start"]