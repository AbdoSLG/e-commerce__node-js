const { validationResult } = require("express-validator")
const { addNewItem, getUserCart, deleteProductFromCart, modifyAmount } = require("../models/cartModel");
const { getAllAddress } = require("../models/addressModel");

exports.postCart = (req, res, next) => {
   if (!validationResult(req).array().length) {
      const data = {
         name: req.body.name,
         price: req.body.price,
         productId: req.body.productId,
         redirectTo: req.body.redirectTo,
         userId: req.session.userId,
         amount: req.body.amount,
         size: req.body.size,
         timestamp: Date.now(),
         description: req.body.description,
         image: req.body.image,
         category: req.body.category,
      };
      addNewItem(data)
         .then(() => {
            res.redirect('/cart')
         })
         .catch(err => {
            res.redirect('/'+data.redirectTo)
         })
   } else {
      req.flash('validationErr', validationResult(req).array())
      res.redirect(req.body.redirectTo)
   }
}



exports.getCart = (req, res, next) => {
   const userId = req.session.userId;
   getUserCart(userId)
      .then(({products, addresses}) => {
         res.render('cart', {
            isUser: true,
            products,
            addresses, 
            isAdmin: req.session.isAdmin
         });
      })
      .catch(err => {
         console.log(err);
         res.redirect('/');
      })
}


exports.deleteItem = (req, res, next) => {
   const productId = req.body.productId;
   deleteProductFromCart(productId)
      .then(msg => {
         console.log(msg);
         res.redirect('/cart');
      })
      .catch(err => {
         console.log(err);
      })
}


exports.modifyQty = (req, res, next) => {
   const amount = req.body.amount;
   const productId = req.body.productId;
   modifyAmount(productId, amount)
      .then(msg => {
         res.redirect('/cart');
         console.log(msg);
      })
      .catch(err => {
         console.log(err);
         res.redirect('/')
      })

}