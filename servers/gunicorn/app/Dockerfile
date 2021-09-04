# Python image
FROM python:3.8-slim

WORKDIR /usr/src/app

# Installing dependencies
ADD requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copying app
COPY . .

# Serving application
EXPOSE 8080
CMD ["gunicorn", "-b", "0.0.0.0:80", "-w", "2", "app:app"]