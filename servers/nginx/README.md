# Nginx
<p align='center'><img src='../../docs/nginx.svg' width='80'></p>

> A web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache.

Building the image will be a 2 stage process. In the
first stage, the sample application will be buil.

A simple React application is served as an example. Building
that application will also pull `node:15-slim` from Docker Hub.

For the reverse-proxying example, a dynamic Express app is used.

## Implementations
### From the Official Nginx base image
This uses the official Nginx image as the base image.

Build:
```bash
docker build -t nginx-app static-app
```

### From the Ubuntu 20.04 base image
This uses Ubuntu 20.04 as the base image.

Build:
```bash
docker build -t nginx-app:ubuntu static-app-ubuntu
```

## Execution
To run the sample app on port 8080 on the host machine,
use the following command:
```bash
# Built from Nginx base
docker run --rm -d -p 8080:80 --name app nginx-app
```
```bash
# Built from Ubuntu 20.04 base
docker run --rm -d -p 8080:80 --name app nginx-app:ubuntu
```

To run your own static application and/or use a custom configuration
file with the built image (on port 8080 in the host machine), use the following command(s):
```bash
# Built from Nginx base
docker run --rm -d -p 8080:80 -v /path/to/nginx.conf:/etc/nginx/conf.d/default.conf:ro -v /path/to/static-app:/usr/share/nginx/html:ro --name app nginx-app
```
```bash
# Built from Ubuntu 20.04 base
docker run --rm -d -p 8080:80 -v /path/to/nginx.conf:/etc/nginx/sites-available/default:ro -v /path/to/static-app:/usr/share/nginx/html:ro --name app nginx-app:ubuntu
```

## Building
You may build your own application's
image using one of these images as base.
```Dockerfile
# Built from Nginx base
FROM nginx-app

# Copying configuration and static app
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY /path/to/static-app /usr/share/nginx/html

# Expose port
EXPOSE 80
```
```Dockerfile
# Built from Ubuntu 20.04 base
FROM nginx-app:ubuntu

# Copying configuration and static app
COPY nginx.conf /etc/nginx/sites-available/default
COPY /path/to/static-app /usr/share/nginx/html

# Expose port
EXPOSE 80
```

## Bonus
To use Nginx as a reverse-proxy for the sample dynamic app
running inside another container, use the following:
```bash
# Build the sample dynamic app
docker build -t app-dynamic dynamic-app-reverse-proxy/app

# Build the image with configuration for the dynamic app
docker build -t nginx-app:dynamic dynamic-app-reverse-proxy

# Create a network for the containers
docker network create app-net

# Start the dynamic app in its own container
docker run --rm -d --name dynamic-app --hostname app-dynamic --network app-net app-dynamic

# Start the reverse-proxy container
docker run --rm -d -p 8080:80 --name app --network app-net nginx-app:dynamic
```
The dynamic app runs on port 3000 inside its container.

Here, the dynamic app's container is being referenced as `app-dynamic`, the
hostname we have set while creating the container and inside the reverse-proxy
configuration file.

# Made with ❤ by [Param](https://www.paramsid.com).