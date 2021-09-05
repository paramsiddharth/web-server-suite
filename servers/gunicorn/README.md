# Gunicorn
<p align='center'><img src='../../docs/gunicorn.svg' width='80'></p>

> A Python Web Server Gateway Interface (WSGI) HTTP server for UNIX, which is broadly compatible, simple, light, and fairly speedy.

A dynamic Flask application is served as an used.

## Implementations
### From the Official Python base image
This uses the official Python 3.8 image as the base image.
```bash
docker build -t gunicorn-app app
```

### From the Ubuntu base image
This uses Ubuntu as the base image.
```bash
docker build -t gunicorn-app:ubuntu app-ubuntu
```

## Execution
To run the sample app on port 8080 on the host machine,
use the following command(s):
```bash
# Built from Python base
docker run --rm -d -p 8080:80 --name app gunicorn-app
```
```bash
# Built from Ubuntu base
docker run --rm -d -p 8080:80 --name app gunicorn-app:ubuntu
```

## Building
You may build your own application's
image using one of these images's Dockerfile
as reference.
```Dockerfile
# Python image
FROM python:3.8-slim

WORKDIR /usr/src/app

# Installing dependencies
ADD requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copying app
COPY . .

# Serving application
EXPOSE 80
CMD ["gunicorn", "-b", "0.0.0.0:80", "-w", "2", "app:app"]
```
```Dockerfile
# Ubuntu image
FROM ubuntu

# Required to ensure no I/O blocking
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update && apt install -y \
    python3 python3-pip python-is-python3

WORKDIR /app

# Installing dependencies
ADD requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Copying app
COPY . .

# Serving application
EXPOSE 80
CMD ["python", "-m", "gunicorn", "-b", "0.0.0.0:80", "-w", "2", "app:app"]
```

# Made with ❤ by [Param](https://www.paramsid.com).