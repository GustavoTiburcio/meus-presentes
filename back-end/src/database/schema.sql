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

insert into
  gift_models(name, list_type_id, image_uri, electrical, voltage)
values
  ('Aspirador', 'd72e12e1-db19-414c-87da-4cdaec07f6ad', 'https://imagizer.imageshack.com/img922/9062/bCmPx3.png', true, '220V'),
  ('Chaleira', 'd72e12e1-db19-414c-87da-4cdaec07f6ad', 'https://imagizer.imageshack.com/img922/5365/nq2aHi.jpg', true, '110V'),
  ('Almofada', 'd72e12e1-db19-414c-87da-4cdaec07f6ad', 'https://imagizer.imageshack.com/img923/6623/A2tjsI.png', false, ''),
  ('Mesa de centro', 'd72e12e1-db19-414c-87da-4cdaec07f6ad', 'https://imagizer.imageshack.com/img922/3788/TfsJLO.png', false, ''),
  ('Liquidificador Oster', 'd72e12e1-db19-414c-87da-4cdaec07f6ad', 'https://imagizer.imageshack.com/img922/9351/hbukn8.png', false, '110V'),
  ('Aparelho de Jantar', 'd72e12e1-db19-414c-87da-4cdaec07f6ad', 'https://imagizer.imageshack.com/img924/8523/Pxdwe7.png', false, '');

CREATE TABLE IF NOT EXISTS gifts(
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  image_uri VARCHAR,
  electrical BOOLEAN,
  voltage VARCHAR,
  requested_amount INTEGER,
  confirmed_amount INTEGER,
  color VARCHAR,
  observation VARCHAR,
  gift_list_id UUID,
  created_at TIMESTAMP DEFAULT now(),
  PRIMARY KEY (id),
  FOREIGN KEY(gift_list_id) REFERENCES gift_lists(id)
);