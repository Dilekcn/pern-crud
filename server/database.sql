CREATE DATABASE cyf_hotels;

CREATE TABLE customers (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(30) NOT NULL,
  email     VARCHAR(120) NOT NULL,
  address   VARCHAR(120),
  city      VARCHAR(30),
  postcode  VARCHAR(12),
  country   VARCHAR(20)
);

CREATE TABLE bookings (
  id               SERIAL PRIMARY KEY,
  customer_id      INT REFERENCES customers(id),
  hotel_id         INT REFERENCES hotels(id),
  checkin_date     DATE NOT NULL,
  nights           INT NOT NULL
);

CREATE TABLE hotels (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(250) NOT NULL,
  rooms     VARCHAR(120) NOT NULL,
  postcode  VARCHAR(12)
 
);