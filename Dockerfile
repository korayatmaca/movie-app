# Start from the latest LTS version of Node.js
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Build the NestJS app
RUN npm run build

# Expose the listening port
EXPOSE 3000

# Run the built app
CMD [ "npm", "run", "start:prod" ]