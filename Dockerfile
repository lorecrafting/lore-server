FROM evennia/evennia:latest

RUN pip install psycopg2-binary

ENTRYPOINT evennia start --log
