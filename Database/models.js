const connection = require('./index');
const Sequelize = require('sequelize');

/*
const restaurantDataModel = connection.define('restaurantData', {
    'alias': {type: Sequelize.STRING},
    'name': {type: Sequelize.STRING},
    'price_range': {type: Sequelize.STRING},
    'menu': {type: Sequelize.STRING},
    'is_closed': {type: Sequelize.STRING},
    'url': {type: Sequelize.Url},
    'price': {type: Sequelize.STRING},
    'health_score': {type: Sequelize.STRING},
    'more_info': {type: Sequelize.STRING},
    'hours': {
        'hours_type': {type: Sequelize.STRING},
        'open': [{
            'is_overnight':{type:Sequelize.Boolean},
            'end': {type: Sequelize.NUMBER},
        }]
    }
})
*/

const RestaurantData = connection.define('restaurantdata', {
    name: {type: Sequelize.STRING},  
    menu: {type: Sequelize.STRING},
    is_closed: {type: Sequelize.BOOLEAN},
    url: {type: Sequelize.STRING},
    price: {type: Sequelize.STRING},
    health_score: {type: Sequelize.NUMBER},
});

module.exports = { RestaurantData }

// CREATE TABLE restaurantdata(id PRIMARY KEY, name VARCHAR(50), menu VARCHAR(50), is_closed VARCHAR(50), url VARCHAR(50), price VARCHAR(50), health_score SMALLINT);

/* CREATE TABLE restaurantdata
(
  id serial NOT NULL,
  name character varying(50),
  menu character varying(50),
  is_closed character varying(255),
  url character varying(50),
  price character varying(50),
  health_score integer,
  CONSTRAINT restaurantdata_pkey PRIMARY KEY (id)
) */