const postgres = require('pg');
const Sequelize = require('sequelize');

const connection = new Sequelize('hrla23sdc', 'neilmartin', 'martin', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases:false,
  define: {
    timestamps:false
  }
});

connection.authenticate()
  .then(() => console.log('connected to database'))
  .catch(err => console.error('unable to connect', err));

module.exports = connection;