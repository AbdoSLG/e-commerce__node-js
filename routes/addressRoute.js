const bodyParser = require('body-parser');
const { getAddress, postAddress, deleteAddress } = require('../controllers/addressController');
const { isAuth } = require('./gaurds/authGaurd');
const { check } = require('express-validator');

const router = require('express').Router();


router.get('/address', isAuth, getAddress);


router.post('/address/add',
   isAuth,
   bodyParser.urlencoded({ extended: false }),
   check('address').not().isEmpty().withMessage('address is required') ,
   postAddress,
)

router.post('/address/delete',
   isAuth,
   bodyParser.urlencoded({ extended: false }),
   deleteAddress,
)


module.exports = router;