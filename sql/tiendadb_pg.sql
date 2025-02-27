CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name varchar(50) not null,
    email varchar(50) not null unique,
    password varchar(50) not null,
    created_at timestamp default current_timestamp
);

SELECT * FROM users;