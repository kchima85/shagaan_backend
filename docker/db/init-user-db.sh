set -e

psql -v ERROR_STOP=1 --username=shagaan_user dbname=shagaan_db <<-EOSQL
  CREATE SCHEMA shagaan;
  GRANT ALL PRIVILEGES ON DATABASE shagaan_db TO shagaan_user;
  CREATE TABLE IF NOT EXISTS shagaan.users (
    user_id uuid PRIMARY KEY,
    google_id varchar(255),
    facebook_id varchar(255),
    first_name varchar(40) NOT NULL,
    last_name varchar(40) NOT NULL,
    email varchar(40),
    phone_number varchar(40),
    created_at timestamp,
    archived boolean
  )
EOSQL