const { getProduct, getFirstProduct } = require('../controllers/productController');

const router = require('express').Router();


router.get('/:id', getProduct);

router.get('/', getFirstProduct);


module.exports = router;
