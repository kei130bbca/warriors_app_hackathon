FROM python:3
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt update -y
RUN mkdir -p /usr/src
COPY ./requirements.txt /usr/src/requirements.txt
RUN pip install -r /usr/src/requirements.txt
WORKDIR /usr/src
