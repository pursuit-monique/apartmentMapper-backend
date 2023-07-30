DROP DATABASE IF EXISTS apartments;
CREATE DATABASE apartments;
\c apartments

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_raster;
CREATE EXTENSION IF NOT EXISTS postgis_topology;
CREATE EXTENSION IF NOT EXISTS postgis_sfcgal;
CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;
CREATE EXTENSION IF NOT EXISTS postgis_tiger_geocoder;
CREATE EXTENSION IF NOT EXISTS address_standardizer;
CREATE EXTENSION IF NOT EXISTS address_standardizer_data_us;

-- CREATE EXTENSION postgis;
-- CREATE EXTENSION postgis_raster;
-- CREATE EXTENSION postgis_sfcgal;
-- CREATE EXTENSION fuzzystrmatch; --needed for postgis_tiger_geocoder
-- --optional used by postgis_tiger_geocoder, or can be used standalone
-- CREATE EXTENSION address_standardizer;
-- CREATE EXTENSION address_standardizer_data_us;
-- CREATE EXTENSION postgis_tiger_geocoder;
-- CREATE EXTENSION postgis_topology;

INSERT INTO tiger.loader_platform(os, declare_sect, pgbin, wget, unzip_command, psql, path_sep,
		   loader, environ_set_command, county_process_command)
SELECT 'debbie', declare_sect, pgbin, wget, unzip_command, psql, path_sep,
	   loader, environ_set_command, county_process_command
  FROM tiger.loader_platform
  WHERE os = 'sh';

  
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
    -- geom GEOMETRY(Point, 4326),
    lat FLOAT,
    lng FLOAT
);
