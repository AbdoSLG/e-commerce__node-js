const { validationResult } = require("express-validator");
const { addProduct } = require("../models/productModel");
const { getAllOrdersToAdmin, changeStatus, getOrderByFilter, searchByName, searchByEmail } = require("../models/orderModel");

exports.getAdd = (req, res, next) => {
   // console.log( req.flash('validationFields'));
   res.render('addProduct', {
      isAdmin: req.session.isAdmin,
      isUser: req.session.userId,
      addProductErr: req.flash('addProductErr')[0],
      validationFields: req.flash('validationFields'),
   })
}


exports.postAdd = (req, res, next) => {
   if (!validationResult(req).array().length) {
      const image = req.file.filename;
      const data = {
         ...req.body,
         image
      }
      addProduct(data)
         .then(() => {
            res.redirect('/');
         })
         .catch(err => {
            res.redirect('/admin/addProduct');
            req.flash('addProductErr', err)
            console.log(err);
         })
   } else {
      res.redirect('/admin/addProduct');
      req.flash('validationFields', validationResult(req).array())
   }
}


exports.getManageOrder = (req, res, next) => {
   const validationErr = req.flash('validationErrs')[0];
   getAllOrdersToAdmin()
      .then((orders) => {
         res.render('manageOrder', {
            isAdmin: true,
            isUser: true,
            orders,
            validationErr
         })
      })
      .catch(err => {
         console.log(err);
      })
}



exports.modifyStatus = (req, res, next) => {
   const data = req.body;
   changeStatus(data)
      .then(() => {
         res.redirect('/admin/manageOrder')
      })
      .catch(err => {
         console.log(err);
      })
}



exports.postPendingOrder = (req, res, next) => {
   getOrderByFilter(req.body.filter)
      .then((orders) => {
         res.render('getPendingOrder', {
            orders,
            isAdmin: true,
            isUser: true
         })
      })
      .catch(err=>{
         console.log(err);
      })
}

exports.postSentOrder = (req, res, next) => {
   getOrderByFilter(req.body.filter)
      .then((orders) => {
         res.render('getSentOrder', {
            orders,
            isAdmin: true,
            isUser: true
         })
      })
      .catch(err=>{
         console.log(err);
      })
}
exports.postCompletedOrder = (req, res, next) => {
   getOrderByFilter(req.body.filter)
      .then((orders) => {
         res.render('getCompletedOrder', {
            orders,
            isAdmin: true,
            isUser: true
         })
      })
      .catch(err=>{
         console.log(err);
      })
}


exports.searchName = (req, res, next) => {
   if(!validationResult(req).array().length){

      searchByName(req.body.search)
      .then((orders)=>{
         res.render('getOrdersByUser', {
            isAdmin: true,
            isUser: true,
            orders
         })
      })
      .catch(err=>{
         console.log(err);
      })
   }else{
      req.flash('validationErrs', validationResult(req).array())
      res.redirect('/admin/manageOrder')
   }
}  

exports.searchEmail = (req, res, next) => {
   if(!validationResult(req).array().length){
      searchByEmail(req.body.search)
      .then((orders)=>{
         res.render('getOrdersByUser', {
            isAdmin: true,
            isUser: true,
            orders
         })
      })
      .catch(err=>{
         console.log(err);
      })
   }else{
      req.flash('validationErrs', validationResult(req).array())
      res.redirect('/admin/manageOrder')
   }
}  

