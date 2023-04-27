const bodyParser = require('body-parser');
const { isAuth } = require('./gaurds/authGaurd');
const { postOrder, getOrder, removeOrder } = require('../controllers/orderController');

const router = require('express').Router();


router.get('/order', isAuth ,getOrder)

router.post('/order', isAuth,  bodyParser.urlencoded({extended: false}), postOrder)

router.post('/order/remove', isAuth, bodyParser.urlencoded({extended: false}), removeOrder)

module.exports = router