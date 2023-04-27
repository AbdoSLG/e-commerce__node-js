const { getProducts, getProductsByCategory } = require("../models/productModel")

exports.getHome = (req, res, next) => {
   // filter data 
   // if(category != all)
   //    filter
   // else
   //    render all
   const category = req.query.category;
   const validCategories = ['clothes', 'electronics', 'other']
   if (category && validCategories.includes(category)) {

      getProductsByCategory(category)
         .then(products => {
            console.log(products);
            res.render('home', {
               products,
               isUser: req.session.userId,
               validationErr: req.flash('validationErr')[0],
               adminErr: req.flash('adminErr')[0],
               isAdmin: req.session.isAdmin
            })
         })
         .catch(err => console.log(err));

   } else {
      // get products from database
      // render home page
      getProducts()
         .then(products => {
            res.render('home', {
               products,
               isUser: req.session.userId,
               validationErr: req.flash('validationErr')[0],
               adminErr: req.flash('adminErr')[0],
               isAdmin: req.session.isAdmin
            })
         })
         .catch(err => console.log(err));
   }
}