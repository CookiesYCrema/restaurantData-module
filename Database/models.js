const connection = require('./index');
const Sequelize = require('sequelize');
/*
const restaurantSchema = mongoose.Schema({
    //to be determined by data from server
    alias: String,
    name: String,
    price_range: String,
    menu: mongoose.SchemaTypes.Url,
    is_closed: Boolean,
    url: mongoose.SchemaTypes.Url,
    price: String,
    health_score: String,
    more_info: [
        {property: String, value: String},
      ],
    hours: {
        hours_type: String,
        open: [{
            is_overnight: Boolean,
            end: Number,
            day: Number,
            start: Number
          }],
        is_open_now: Boolean
      },
  });

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
