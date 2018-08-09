const postgres = require('postgresql');
const Sequelize = require('sequelize');

const connection = new Sequelize('restaurantData', 'nnm', 'martin', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases:false
});

connection.authenticate()
  .then(() => console.log('connected to database'))
  .catch(err => console.error('unable to connect', err));

module.exports = connection;