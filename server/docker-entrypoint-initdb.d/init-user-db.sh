#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER evennia_development;
    CREATE DATABASE evennia_evelopment;;
    GRANT ALL PRIVILEGES ON DATABASE evennia_development TO evennia_development;
    ALTER ROLE evennia_development SET client_encoding TO 'utf8';
    ALTER ROLE evennia_development SET default_transaction_isolation TO 'read committed';
    ALTER ROLE evennia_development SET timezone TO 'UTC';
EOSQL
