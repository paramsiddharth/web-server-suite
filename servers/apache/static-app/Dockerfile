# Sample React app, to be built using Node.js
FROM node:15-slim AS build

# Copying app source code
ADD app /app
WORKDIR /app

# Install the dependencies and build for production
RUN npm install
RUN npm run build

# Main Apache image
FROM httpd

# Copying the configuration and static build
COPY apache.conf /usr/local/apache2/conf/httpd.conf
COPY --from=build /app/build /usr/local/apache2/htdocs

# Exposing the port
EXPOSE 80