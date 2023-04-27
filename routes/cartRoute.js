const bodyParser = require('body-parser');
const { isAuth } = require('./gaurds/authGaurd');
const { check } = require('express-validator');
const { getCart, postCart, deleteItem, modifyQty } = require('../controllers/cartController');

const router = require('express').Router();


router.get('/cart', getCart)

router.post(
   '/addToCart',
   bodyParser.urlencoded({ extended: false }),
   isAuth,
   check('amount').not().isEmpty().withMessage('amount is required')
   .isInt({min:1}).withMessage('amount must be greater than 0'),
   postCart
)


router.post('/deleteFromCart',
   bodyParser.urlencoded({ extended: false }),
   isAuth,
   deleteItem
)

router.post('/modifyQty',
   bodyParser.urlencoded({ extended: false }),
   isAuth,
   modifyQty
)

module.exports = router;