CREATE EXTENSION IF NOT EXISTS "pgcrypto";

SELECT * FROM pg_extension WHERE extname = 'pgcrypto';

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name varchar(50) not null,
    email varchar(50) not null unique,
    password TEXT NOT NULL,
    created_at timestamp default current_timestamp
);

INSERT INTO users (name, email, password) VALUES ('Crisdcs', 'cdcs030600@gmail.com', '12345');

SELECT * FROM users;