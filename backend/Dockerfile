FROM ubuntu:16.04
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y \
    locales \
    python3 \
    python3-dev \
    python3-pip \
    libssl-dev \
    libffi-dev \
    libpq-dev \
    libgdal-dev \
    nginx


RUN locale-gen pt_BR.UTF-8
ENV LANG="pt_BR.UTF-8"

RUN pip3 install --upgrade pip
RUN pip install uwsgi

ENV app /app
ENV sftp /home/sftp
RUN mkdir ${app} && mkdir $sftp
WORKDIR ${app}
ADD . .
RUN pip install -r requirements.txt

RUN ln -sf /etc/nginx/sites-available/app.nginx.conf /etc/nginx/sites-enabled/app
RUN rm /etc/nginx/sites-enabled/default

VOLUME $sftp

EXPOSE 80 443

CMD  pip install -r requirements.txt && \
     cp app.nginx.conf /etc/nginx/sites-available/ && \
     python3 manage.py collectstatic --no-input && \
     service nginx restart && \
     uwsgi --ini app.uwsgi.ini --uid root --gid www-data
