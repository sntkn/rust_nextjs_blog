-- Add migration script here
CREATE TABLE posts
(
  id        INTEGER PRIMARY KEY,
  text      TEXT NOT NULL,
  posted_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);