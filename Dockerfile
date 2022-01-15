FROM lorecrafting/evennia:latest

USER root

RUN apk --no-cache add build-base

RUN apk --no-cache add postgresql-dev

RUN pip3 install --requirement requirements.txt

COPY . /tmp/

# RUN echo "from evennia import DefaultAccount;\
#      DefaultAccount.objects.create_superuser('admin', 'admin@myproject.com', 'password')" \
#     | evennia shell

ENTRYPOINT sleep 5 \ 
           && evennia migrate \
           && echo "from evennia import DefaultAccount;\
               DefaultAccount.objects.create_superuser('admin', 'admin@myproject.com', 'password')" | evennia shell \
           && echo "admin admin@myaccount.com password" | evennia start --log

# ENTRYPOINT ["tail", "-f", "/dev/null"]