const connection = require('./index');
const Sequelize = require('sequelize');

const RestaurantData = connection.define('restaurantdata', {
    name: {type: Sequelize.STRING},  
    menu: {type: Sequelize.STRING},
    is_closed: {type: Sequelize.STRING},
    url: {type: Sequelize.STRING},
    price: {type: Sequelize.INTEGER},
    health_score: {type: Sequelize.INTEGER},
})
// .sync({force: false});

module.exports = { RestaurantData };

// CREATE TABLE restaurantdata(id PRIMARY KEY, name VARCHAR(50), menu VARCHAR(50), is_closed VARCHAR(50), url VARCHAR(50), price VARCHAR(50), health_score SMALLINT);

/* 
postgres command to create table:
CREATE TABLE restaurantdata
(
  id serial NOT NULL,
  name character varying(100),
  menu character varying(50), 
  is_closed character varying(50),
  url character varying(50),
  price integer,
  health_score integer,
  CONSTRAINT restaurantdata_pkey PRIMARY KEY (id)
);
// copy into postgres from CSV:
COPY restaurantdata(name, menu, is_closed, url, price, health_score) FROM '/Users/neilmartin/Documents/Coding/hrla23/SDC/restaurantData-module/data1.csv' CSV HEADER;

cassandra command to create table:
CREATE TABLE restaurantdata(
    name text,
    menu text,
    is_closed boolean,
    url text,
    price smallint,
    health_score int,
    PRIMARY KEY (name)
);
// copy into existing cassandra table from CSV file:
copy restaurantdata(name, menu, is_closed, url, price, health_score) from '/Users/neilmartin/Documents/Coding/hrla23/SDC/restaurantData-module/data1.csv' with HEADER = TRUE;

*/



// optimization: add multicolumn indexes, index formatting, partial index.