FROM evennia/evennia:latest

USER root

RUN apk --no-cache add build-base

RUN apk --no-cache add postgresql-dev

COPY requirements.txt /cs_account/

RUN pip3 install -r requirements.txt

ENTRYPOINT evennia start --log