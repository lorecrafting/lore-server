-- Postgres-specific optimizations
-- https://docs.djangoproject.com/en/dev/ref/databases/#optimizing-postgresql-s-configuration
ALTER ROLE evennia SET client_encoding TO 'utf8';
ALTER ROLE evennia SET default_transaction_isolation TO 'read committed';
ALTER ROLE evennia SET timezone TO 'UTC';

GRANT ALL PRIVILEGES ON DATABASE evennia TO evennia;
-- Other useful commands:
--  \l       (list all databases and permissions)
--  \q       (exit)