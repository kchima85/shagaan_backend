set -e

psql -v ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE USER shagaan_backend;
  GRANT ALL PRIVILEGES ON DATABASE shagaan_backend to shagaan_backend;
  CREATE SCHEMA IF NOT EXISTS shagaan AUTHORIZATION shagaan_backend;
  CREATE TABLE IF NOT EXISTS shagaan.users (
    user_id uuid PRIMARY KEY,
    google_id varchar(255),
    facebook_id varchar(255),
    first_name varchar(40) NOT NULL,
    last_name varchar(40) NOT NULL,
    email varchar(40),
    phone_number varchar(40),
    created_at timestamp,
    archive boolean
  )
EOSQL