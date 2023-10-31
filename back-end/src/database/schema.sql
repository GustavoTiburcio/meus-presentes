CREATE DATABASE meuspresentes;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users(
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL
);

-- CREATE TABLE IF NOT EXISTS contacts(
--   id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
--   name VARCHAR NOT NULL,
--   email VARCHAR UNIQUE,
--   phone VARCHAR,
--   category_id UUID,
--   FOREIGN KEY(category_id) REFERENCES categories(id)
-- );
