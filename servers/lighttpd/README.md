# Lighttpd
<p align='center'><img src='../../docs/lighttpd.svg' width='80'></p>

> An open-source web server optimized for speed-critical environments while remaining standards-compliant, secure and flexible.

Building the image will be a 2 stage process. In the
first stage, the sample application will be built.

A simple React application is served as an example. Building
that application will also pull `node:15-slim` from Docker Hub.

For the reverse-proxying example, a dynamic Express app is used.

## Implementations
### From the Official Lighttpd base image
This uses the official Lighttpd image as the base image.
```bash
docker build -t lighttpd-app static-app
```

### From the Alpine base image
This uses Alpine as the base image.
```bash
docker build -t lighttpd-app:alpine static-app-alpine
```

## Execution
To run the sample app on port 8080 on the host machine,
use the following command(s):
```bash
# Built from Lighttpd base
docker run --rm -d -p 8080:80 --name app lighttpd-app
```
```bash
# Built from Alpine base
docker run --rm -d -p 8080:80 --name app lighttpd-app:alpine
```

To run your own static application and/or use a custom configuration
file with the built image (on port 8080 in the host machine), use the following command(s):
```bash
# Built from Lighttpd base
docker run --rm -d -p 8080:80 -v /path/to/lighttpd.conf:/etc/lighttpd/lighttpd.conf:ro -v /path/to/static-app:/var/www/localhost/htdocs:ro --name app lighttpd-app
```
```bash
# Built from Alpine base
docker run --rm -d -p 8080:80 -v /path/to/lighttpd.conf:/etc/lighttpd/lighttpd.conf:ro -v /path/to/static-app:/var/www/localhost/htdocs:ro --name app lighttpd-app:alpine
```

## Building
You may build your own application's
image using one of these images as base.
```Dockerfile
# Built from Lighttpd base
FROM lighttpd-app

# Copying configuration and static app
COPY /path/to/lighttpd.conf /etc/lighttpd/lighttpd.conf
COPY /path/to/static-app /var/www/localhost/htdocs

# Expose port
EXPOSE 80
```
```Dockerfile
# Built from Alpine base
FROM lighttpd-app:alpine

# Copying configuration and static app
COPY /path/to/lighttpd.conf /etc/lighttpd/lighttpd.conf
COPY /path/to/static-app /var/www/localhost/htdocs

# Expose port
EXPOSE 80
```

## Bonus
To use Lighttpd as a reverse-proxy for the sample dynamic app
running inside another container, use the following:
```bash
# Build the sample dynamic app
docker build -t app-dynamic dynamic-app-reverse-proxy/app

# Build the image with configuration for the dynamic app
docker build -t lighttpd-app:dynamic dynamic-app-reverse-proxy

# Create a network for the containers
docker network create app-net

# Start the dynamic app in its own container
docker run --rm -d --name dynamic-app --hostname app-dynamic --network app-net app-dynamic

# Start the reverse-proxy container
docker run --rm -d -p 8080:80 --name app --network app-net lighttpd-app:dynamic
```
The dynamic app runs on port 3000 inside its container.

Here, the dynamic app's container is being referenced as `app-dynamic`, the
hostname we have set while creating the container and inside the reverse-proxy
configuration file.

# Made with ❤ by [Param](https://www.paramsid.com).