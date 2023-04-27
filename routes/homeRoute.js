const { getHome } = require('../controllers/homeController');

const router = require('express').Router()

router.get('/', getHome);


module.exports = router
