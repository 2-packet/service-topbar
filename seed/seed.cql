DROP KEYSPACE IF EXISTS fake_data;
CREATE KEYSPACE fake_data WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : '1'};

USE fake_data;

CREATE TABLE fake (
  id INT PRIMARY KEY,
  restaurant VARCHAR,
  location VARCHAR,
  cuisine VARCHAR,
);

CREATE INDEX restaurant_name ON fake(restaurant) USING 'org.apache.cassandra.index.sasi.SASIIndex' WITH OPTIONS = { 'mode': 'CONTAINS' };
CREATE INDEX restaurant_location ON fake(location) USING 'org.apache.cassandra.index.sasi.SASIIndex' WITH OPTIONS = { 'mode': 'CONTAINS' };
CREATE INDEX restaurant_cuisine ON fake(cuisine) USING 'org.apache.cassandra.index.sasi.SASIIndex' WITH OPTIONS = { 'mode': 'CONTAINS' };

COPY fake(id,restaurant,location,cuisine)
FROM './../data-gen/cassandra/seed.csv' WITH HEADER = TRUE;