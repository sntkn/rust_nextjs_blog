-- Add migration script here
CREATE TABLE posts
(
  id        SERIAL PRIMARY KEY,
  title     VARCHAR NOT NULL,
  body      TEXT NOT NULL,
  posted_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL
);