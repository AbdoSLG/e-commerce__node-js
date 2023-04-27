exports.isAdmin = (req, res, next) => {
   if(req.session.isAdmin) next() ;
   else{
      res.redirect('/');
      req.flash('adminErr', 'You are not admin')
   }
}