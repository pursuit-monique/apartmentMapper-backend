DROP DATABASE IF EXISTS apartments;
CREATE DATABASE apartments;
\c apartments
  
CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    contractor TEXT,
    staddress TEXT,
    apartment TEXT,
    floor TEXT,
    city TEXT,
    borough TEXT,
    zip INTEGER,
    num_bedrooms TEXT,
    vacant TEXT,
    accessable TEXT,
    gender TEXT,
    unavail_date TEXT,
    isvacant TEXT,
    isoffline TEXT,
    offlineinfo TEXT,
    apttreatment TEXT,
    notes TEXT,
    lat FLOAT,
    lng FLOAT
);
