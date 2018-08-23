const { RestaurantData } = require('../Database/models');
const sequelize = require('sequelize');

const controller = {
  get: (req, res) => {
    //Raw query attempt:
    /*
    RestaurantData.query(
      `SELECT * FROM
       restaurantdata WHERE id = ${req.params.id}`
      ,{ type: sequelize.QueryTypes.SELECT})
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => console.error(err)); 
    */
    // General attempt:
    console.log(req.params.name)
    RestaurantData.findOne({
      where:{
        name: req.params.name
      }
    }).then(data => {
      res.status(200).send(data)
    }).catch(err => console.error(err));
  },
  post: (req, res) => {
    console.log(req.body)
    var { name, menu, is_closed, url, price, health_score } = req.body
    RestaurantData.create({
      name,
      menu,
      is_closed, 
      url, 
      price, 
      health_score,
    }).then(data => {
      res.status(202).json({
        message:'successfully post newRestaurant',
        added:data
      })
    }).catch(err => console.error(err));
  },
  update: (req, res) => {
    RestaurantData.update({
        name: req.body.newName
      },
      {
        where: {
          name: req.body.name
      }})
      .then(data => res.status(202).send('successfully updated'))
      .catch(err => console.error(err))
  },
  delete: (req, res) => {
    RestaurantData.destroy({
      where:{
        //fill
      }
    })
    .then(data => res.send('successfully deleted'))
    .catch(err => console.error(err))
  },
};

module.exports = controller;