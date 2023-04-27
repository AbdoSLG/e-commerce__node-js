const { default: mongoose } = require("mongoose");
const { getAllOrders, addOrder, removeOrderFromOrders } = require("../models/orderModel");



exports.postOrder = (req, res, next) => {
   const userId = req.session.userId.toString();
   const address = req.body.address[0]
   const data = {
      ...req.body,
      userId,
      address,
      timestamp: Date.now(),
      price: +req.body.price * +req.body.amount 
   }

   addOrder(data)
      .then(() => {
         res.redirect('/order')
      })
      .catch(err => {
         console.log(err);
      })

}

exports.getOrder = (req, res, next) => {
   const userId = req.session.userId
   getAllOrders(userId)
      .then((orders) => {
         res.render('order', {
            isUser: true,
            orders,
            isAdmin: req.session.isAdmin
         })
      })
      .catch(err => {
         res.redirect('/');
      })
}


exports.removeOrder = (req, res, next) => {
   const data = {
      ...req.body,
      userId: req.session.userId.toString(),
   }
   removeOrderFromOrders(data)
   .then(()=>{
      res.redirect('/order');
   })
   .catch(err=>{
      console.log(err);
   })
}

