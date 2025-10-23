CREATE EXTENSION IF NOT EXISTS pgcrypto;


CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(64) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user'
);


INSERT INTO users (username, password, role)
VALUES
  ('admin',  crypt('mauaguardian123#',  gen_salt('bf')), 'admin'),
  ('administrator', crypt('guardianmaua123#', gen_salt('bf')), 'user')
ON CONFLICT (username) DO NOTHING;
