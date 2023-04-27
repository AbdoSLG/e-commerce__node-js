const { getProductById, getFirstProductFromDatabase } = require("../models/productModel")

exports.getProduct = (req, res, next) => {
   const { id } = req.params
   getProductById(id)
      .then((product) => {
         res.render('product', {
            product,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
         })
      })
      .catch(err => {
         console.log(err);
      })
}

exports.getFirstProduct = (req, res, next) => {
   getFirstProductFromDatabase()
      .then((product) => {
         res.render('product', {
            product,
            isAdmin: req.session.isAdmin,
            isUser: req.session.userId,
         })
      })
      .catch(err => {
         console.log(err);
      })
}