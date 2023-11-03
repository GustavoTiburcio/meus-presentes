CREATE DATABASE meuspresentes;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users(
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS list_types(
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  PRIMARY KEY (id)
);

insert into
  list_types(name)
values
  ('15 anos'),
  ('Aniversário - Comum'),
  ('Aniversário - Infantil'),
  ('Chá de Bebê'),
  ('Chá de Casa Nova'),
  ('Chá de Lingerie'),
  ('Chá de Panela'),
  ('Casamento'),
  ('Formatura'),
  ('Noivado'),
  ('Outra Lista');

CREATE TABLE IF NOT EXISTS gift_lists(
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  list_type_id UUID,
  event_date DATE NOT NULL,
  expiration_date DATE,
  gifts_voltage VARCHAR,
  delivery_address VARCHAR,
  observation VARCHAR,
  user_id UUID,
  created_at TIMESTAMP DEFAULT now(),
  PRIMARY KEY (id),
  FOREIGN KEY(list_type_id) REFERENCES list_types(id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS gift_models(
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  list_type_id UUID,
  image_uri VARCHAR,
  electrical BOOLEAN,
  voltage VARCHAR,
  created_at TIMESTAMP DEFAULT now(),
  PRIMARY KEY (id),
  FOREIGN KEY(list_type_id) REFERENCES list_types(id)
);
