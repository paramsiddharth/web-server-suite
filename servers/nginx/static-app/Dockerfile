# Sample React app, to be built using Node.js
FROM node:15-slim AS build

# Copying app source code
ADD app /app
WORKDIR /app

# Install the dependencies and build for production
RUN npm install
RUN npm run build

# Official Nginx image
FROM nginx

# Copying configuration and static app
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80