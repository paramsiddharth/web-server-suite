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