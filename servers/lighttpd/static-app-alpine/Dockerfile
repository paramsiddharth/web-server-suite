# Sample React app, to be built using Node.js
FROM node:15-slim AS build

# Copying app source code
ADD app /app
WORKDIR /app

# Install the dependencies and build for production
RUN npm install
RUN npm run build

# Official Alpine image
FROM alpine

# Install minimal dependencies for web server
RUN apk add --update --no-cache lighttpd lighttpd-mod_auth \
    && rm -rf /var/cache/apk/*

# Copying configuration and static app
COPY --from=build /app/build /var/www/localhost/htdocs
COPY lighttpd.conf /etc/lighttpd/lighttpd.conf
COPY start.sh /usr/local/bin/

# Expose port
EXPOSE 80

# Launch the server
CMD ["/usr/local/bin/start.sh"]