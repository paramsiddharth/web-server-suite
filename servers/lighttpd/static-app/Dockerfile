# Sample React app, to be built using Node.js
FROM node:15-slim AS build

# Copying app source code
ADD app /app
WORKDIR /app

# Install the dependencies and build for production
RUN npm install
RUN npm run build

# Official Lighttpd image
FROM sebp/lighttpd

# Copying configuration and static app
COPY --from=build /app/build /var/www/localhost/htdocs
COPY lighttpd.conf /etc/lighttpd/lighttpd.conf

# Expose port
EXPOSE 80