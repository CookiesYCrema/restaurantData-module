const router = require('express').Router();
const controller = require('./controller');

router.route('/restaurantList/:name')
    .get(controller.get)
    // .post(controller.post)
    .put(controller.update)
    .delete(controller.delete);
router.route('/post/restaurantList')
    .post(controller.post)

module.exports = router;