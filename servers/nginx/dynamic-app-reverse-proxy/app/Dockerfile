# Sample Express app, to be run using Node.js
FROM node:15-slim AS build

# Copying app source code
ADD . /app
WORKDIR /app

# Install the dependencies and start the app
EXPOSE 3000
RUN npm install
CMD ["npm", "start"]