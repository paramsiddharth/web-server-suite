# Nginx
<p align='center'><img src='https://www.nginx.com/wp-content/uploads/2020/05/NGINX-product-icon.svg' width='80'></p>

> A web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache.

Building the image will be a 2 stage process. In the
first stage, the sample application will be buil.

A simple React application is served as an example. Building
that application will also pull `node:15-slim` from Docker Hub.

## Implementations
### From the Official Nginx base image
This uses the official Nginx image as the base image.

Build:
```bash
docker build -t nginx-app -f Dockerfile.official .
```

### From the Ubuntu 20.04 base image
This uses Ubuntu 20.04 as the base image.

Build:
```bash
docker build -t nginx-app:ubuntu .
```

## Execution
To run the sample app on port 8080 on the host machine,
use the following command:
```bash
# Built from Nginx base
docker run --rm -d -p 8080:80 --name app nginx-app

# Built from Ubuntu 20.04 base
docker run --rm -d -p 8080:80 --name app nginx-app:ubuntu
```

To run your own static application and/or use a custom configuration
file with the built image, use the following command(s):
```bash
# Built from Nginx base
docker run --rm -d -p 8080:80 -v /path/to/nginx.conf:/etc/nginx/conf.d/default.conf:ro -v /path/to/static-app:/usr/share/nginx/html:ro --name app nginx-app

# Built from Ubuntu 20.04 base
docker run --rm -d -p 8080:80 -v /path/to/nginx.conf:/etc/nginx/sites-available/default:ro -v /path/to/static-app:/usr/share/nginx/html:ro --name app nginx-app:ubuntu
```

# Building
You may build your own application's
image using one of these images as base.
```Dockerfile
# Built from Nginx base
FROM nginx-app

# Copying configuration and static app
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY static-app /usr/share/nginx/html

# Expose port
EXPOSE 80
```
```Dockerfile
# Built from Ubuntu 20.04 base
FROM nginx-app:ubuntu

# Copying configuration and static app
COPY nginx.conf /etc/nginx/sites-available/default
COPY static-app /usr/share/nginx/html

# Expose port
EXPOSE 80
```

# Made with ❤ by [Param](https://www.paramsid.com).