# Apache
<p align='center'><img src='../../docs/apache.svg' width='80'></p>

> A free and open-source cross-platform web server
> software, released under the terms of Apache License 2.0.

For the static application implementation,
building the image will be a 2 stage process. In the
first stage, the sample application will be built.

A simple React application is served as an example for
the static app. Building
that application will also pull `node:15-slim` from Docker Hub.

The rest 3 implementations make use of PHP applications.

## Implementation
### From the Official Apache server base image
This uses Apache's server (`httpd`) as the base image,
and a static web application.

```bash
docker build -t apache-app:static static-app
```

### From the Ubuntu 20.04 base image
This uses Ubuntu 20.04 as the base image and
PHP (using `mod_php`).

```bash
docker build -t apache-app:ubuntu php-app-ubuntu
```

### From the Ubuntu 20.04 base image
This uses Ubuntu 20.04 as the base image and
PHP (using `mod_fcgid`, `proxy_fcgi` and `php-fpm`).

```bash
docker build -t apache-app:ubuntu-fpm php-app-ubuntu-fpm
```

### From the Official PHP with Apache server base image
This uses the PHP image provided with Apache
built-in (using `mod_php`).

```bash
docker build -t apache-app php-app
```

## Execution
To run the sample apps on port 8080 on the host machine,
use the following command(s):

```bash
# Built using the Official Apache server image
docker run --rm -d -p 8080:80 --name static-app apache-app:static

# Built using the Ubuntu 20.04 image
docker run --rm -d -p 8080:80 --name app apache-app:ubuntu

# Built using the Ubuntu 20.04 image with
# FastCGI Process Manager (FPM) support
docker run --rm -d -p 8080:80 --name app apache-app:ubuntu-fpm

# Built using the Official PHP image containing
# the Apache server
docker run --rm -d -p 8080:80 --name app apache-app
```

## Building
You may build your own application's
image using one of these images as base.

For static applications:
```Dockerfile
# Apache image
FROM apache-app:static

# Copying the configuration and application
COPY /path/to/apache.conf /usr/local/apache2/conf/httpd.conf
COPY /path/to/static-app /usr/local/apache2/htdocs

# Exposing the port
EXPOSE 80
```

For dynamic (PHP-based) applications:
```Dockerfile
# Apache image; Replace tag with the desired image
FROM apache-app:<tag>

# Copying the configuration and application
COPY /path/to/dir.conf /etc/apache2/mods-available/dir.conf
COPY /path/to/app /var/www/html

# Exposing the port
EXPOSE 80
```

# Made with ❤ by [Param](https://www.paramsid.com).