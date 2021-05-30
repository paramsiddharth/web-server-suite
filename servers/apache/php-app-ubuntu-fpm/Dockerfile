# Main Apache image
FROM ubuntu:20.04

# Required to ensure no I/O blocking
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update && apt install -y apache2 php7.4-fpm libapache2-mod-fcgid &&\
	a2enconf php7.4-fpm &&\
	a2enmod proxy proxy_fcgi

# Copying the configuration and application
COPY dir.conf /etc/apache2/mods-available/dir.conf
COPY app /var/www/html

# Exposing the port
EXPOSE 80
CMD service php7.4-fpm start && apachectl -D FOREGROUND