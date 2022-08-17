CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(28) NOT NULL UNIQUE,
    passhash VARCHAR NOT NULL
);

INSERT INTO users(username, passhash) values($1,$2);


ALTER TABLE users
	ADD avatar_url VARCHAR,
    ADD first_name VARCHAR(128),
    ADD last_name VARCHAR(128),
    ADD gender VARCHAR(25),
    ADD age INT,
    ADD dob DATE,
    ADD marital_status BOOLEAN,
    ADD nationality VARCHAR(128),
    ADD id_type VARCHAR(25),
    ADD id_number INT,
    ADD id_url VARCHAR,
    ADD is_verified BOOLEAN NOT NULL DEFAULT FALSE;