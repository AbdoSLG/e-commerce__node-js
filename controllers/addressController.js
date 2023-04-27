const { validationResult } = require("express-validator");
const { getAllAddress, addNewAddress, deleteAddressById } = require("../models/addressModel")

exports.getAddress = (req, res, next) => {
   const userId = req.session.userId;
   getAllAddress(userId)
      .then((addresses) => {
         res.render('address', {
            addresses,
            isUser: true,
            error: req.flash('err')[0],
            validationErrs: req.flash('validationErrs'),
            isAdmin: req.session.isAdmin
         })
      })
      .catch(err => {
         res.redirect('/address');
      })
}


exports.postAddress = (req, res, next) => {
   if(!validationResult(req).array().length){

      const data = {
         userId: req.session.userId,
         address: req.body.address
      }
      addNewAddress(data)
      .then(()=>{
         res.redirect('/address');
      })
      .catch(err=>{
         res.redirect('/address')
         req.flash('err', err)
      })
      
   }else{
      req.flash('validationErrs', validationResult(req).array());
      res.redirect('/address')
   }
}


exports.deleteAddress = (req, res, next) => {
   const data = req.body
   deleteAddressById(data)
   .then(()=>{
      res.redirect('/address')
   })
   .catch(err=>{
      res.redirect('/')
   })
}