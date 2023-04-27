const { addUserToDatabase, login } = require("../models/authModel");

const validationResult = require('express-validator').validationResult

exports.getSignup = (req, res, next) => {
   const authErr = req.flash('authErr')[0];
   const validationErrs = req.flash('validationErrs');
   res.render('signup', {
      authErr,
      validationErrs,
      isUser: false,
      isAdmin: false
   });
}

exports.postSignup = (req, res, next) => {
   if (!validationResult(req).array().length) {
      const data = req.body;
      addUserToDatabase(data)
         .then(() => {
            res.redirect('/login');
         })
         .catch(err => {
            res.redirect('/signup');
            req.flash('authErr', err)
         })
   } else {
      req.flash('validationErrs', validationResult(req).array());
      res.redirect('/signup');
   }
}


exports.getLogin = (req, res, next) => {
   const authErr = req.flash('authErr')[0];
   const validationErrs = req.flash('validationErrs')
   res.render('login', {
      authErr,
      validationErrs,
      isUser: false,
      isAdmin: false,
   });
}


exports.postLogin = (req, res, next) => {
   if (validationResult(req).isEmpty()) {
      const data = req.body;
      login(data)
         .then(([id, isAdmin]) => {
            req.session.userId = id;
            req.session.isAdmin = isAdmin;
            res.redirect('/');
         })
         .catch(err => {
            res.redirect('/login');
            req.flash('authErr', err);
         });
   } else {
      req.flash('validationErrs', validationResult(req).array())
      res.redirect('/login')
   }
}



exports.logout = (req, res, next) => {
   req.session.destroy(() => {
      res.redirect('/');
   })
}