const { getAdd, postAdd, getManageOrder, modifyStatus, postPendingOrder, postSentOrder, postCompletedOrder, searchName, searchEmail } = require('../controllers/adminController');
const { isAdmin } = require('./gaurds/isAdmin');
const multer = require('multer');
const { check } = require('express-validator');
const bodyParser = require('body-parser');
const router = require('express').Router();

router.get('/addProduct', isAdmin, getAdd);

router.post('/addProduct',
   isAdmin,
   multer({
      storage: multer.diskStorage({
         destination: (req, file, cb) => {
            cb(null, 'images');
         },
         filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
         }
      })
   }).single('image'),
   // //validation fields 
   check('name').not().isEmpty().withMessage('name is required'),
   check('price').not().isEmpty().withMessage('price is required'),
   check('category').not().isEmpty().withMessage('category is required'),
   check('description').not().isEmpty().withMessage('description is required'),
   // //validation image field
   check('image').custom((value, { req }) => {
      if (req.file) return true;
      else throw 'image is required'
   }),
   /* // another validation image field
      (req, res) => {
         if (req.file) return true;
         else {
            req.flash('validationImageErr', 'image is required');
            res.redirect('/admin/addProduct')
         };
      },
    */
   postAdd
);

router.get('/manageOrder', isAdmin, getManageOrder);

router.post('/modify', isAdmin, bodyParser.urlencoded({ extended: false }), modifyStatus);

// filters routes
router.post('/getPendingOrder', isAdmin, bodyParser.urlencoded({ extended: false }), postPendingOrder)
router.post('/getSentOrder', isAdmin, bodyParser.urlencoded({ extended: false }), postSentOrder)
router.post('/getCompletedOrder', isAdmin, bodyParser.urlencoded({ extended: false }), postCompletedOrder)

// search route
router.post('/searchName',
   isAdmin,
   bodyParser.urlencoded({ extended: false }),
   check('search').not().isEmpty().withMessage('Enter name or email in search input'),
   searchName
)
router.post('/searchEmail',
   isAdmin,
   bodyParser.urlencoded({ extended: false }),
   check('search').not().isEmpty().withMessage('Enter name or email in search input'),
   searchEmail
)


module.exports = router;