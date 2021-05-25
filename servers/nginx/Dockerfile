# Sample React app, to be build using Node.js
FROM node:15-slim AS build

# Copying app source code
ADD app /app
WORKDIR /app

# Install the dependencies and build for production
RUN npm install
RUN npm run build

# Main Nginx image
FROM ubuntu:20.04

# Required to ensure no I/O blocking
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update && apt install -y nginx

# Copying configuration and static app
COPY nginx.conf /etc/nginx/sites-available/default
COPY --from=build /app/build /usr/share/nginx/html

# Starting the server
EXPOSE 80
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]