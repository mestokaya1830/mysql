const admin = (req, res, next) => {
  if(req.session.admin){
    next()
  }else{
    req.flash('errors', 'Please login!')
    res.redirect('/login')
  }
}

module.exports = admin