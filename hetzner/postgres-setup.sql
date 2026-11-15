-- Run ONCE as the Postgres admin on your Hetzner server (psql -U postgres).
-- Creates a separate database and a limited user for the new site, so the official website's data stays untouched.
-- Change the password first!

CREATE ROLE zecurx_app LOGIN PASSWORD 'CHANGE_ME_TO_A_LONG_RANDOM_PASSWORD';
CREATE DATABASE zecurx_academy OWNER zecurx_app;
REVOKE ALL ON DATABASE zecurx_academy FROM PUBLIC;
-- The app creates its own tables (schema "zecurx") the first time it runs. zecurx_app cannot see other databases' tables.
