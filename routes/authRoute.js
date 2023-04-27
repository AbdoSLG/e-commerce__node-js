const bodyParser = require('body-parser');
const { getLogin, getSignup, postSignup, postLogin, logout } = require('../controllers/authController');
const { notAuth, isAuth } = require('./gaurds/authGaurd');

const check = require('express-validator').check
const router = require('express').Router();


router.get('/signup', notAuth, getSignup);

router.post(
   '/signup',
   notAuth,
   bodyParser.urlencoded({ extended: false }),

   // validation
   check('username')
      .not().isEmpty().withMessage('username is required'),
   check('email')
      .not().isEmpty().withMessage('email is required').isEmail().withMessage('email should be an email'),
   check('password')
      .isLength({ min: 4 }).withMessage('password should be greater than 4 chars'),
   check('confirmPass')
      .custom((val, { req }) => {
         if (val == req.body.password) return true;
         else throw 'passwords are different';
      }),

   postSignup
);


router.get('/login', notAuth, getLogin);

router.post(
   '/login',
   notAuth,
   bodyParser.urlencoded({ extended: false }),

   // validation
   check('email')
      .not().isEmpty().withMessage('email is required')
      .isEmail().withMessage('should be valid email'),
   check('password')
      .not().isEmpty().withMessage('password is required')
      .isLength({min:4}).withMessage('minimum length is 4 chars'),

   postLogin
);


router.all('/logout', isAuth ,logout)


module.exports = router;