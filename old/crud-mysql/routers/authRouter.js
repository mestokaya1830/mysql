const Router = require('express').Router()
const wrapAsync = require('../middleware/wrapasync.js')
const Cryptr = require('cryptr')
const cryptr = new Cryptr('secret')
const formValidate = require('../middleware/formValidation')
const mysql = require('../modules/db')

Router.get('/register', wrapAsync(async(req, res) => {
  res.render('register',{title: 'Register'})
}))

Router.post('/register', wrapAsync(async(req, res) => {
  const errors = formValidate(req.body.name, req.body.password)
  if(errors.length > 0){
    req.flash('danger', errors[0].message)
    res.render('register', {name:req.body.name,password: req.body.password})
  }else{
    const checkUser = await mysql.query('SELECT * FROM users WHERE name = ? LIMIT 1', [req.body.name])
    if(checkUser.length > 0){
      req.flash('danger','This user is exists!')
      res.redirect('/register')
    }else{
      var newUser = {
        name: req.body.name,
        password: cryptr.encrypt(req.body.password)
      }
      await mysql.query('INSERT INTO users SET ?', [newUser])
      req.flash('success','Saved Success!')
      res.redirect('/login')
    }
  }
}))

Router.get('/login', wrapAsync(async(req, res) => {
  res.render('login', {title: 'Login'})
}))

Router.post('/login', wrapAsync(async(req, res) => {
  mysql.query('SELECT * FROM users WHERE name = ? LIMIT 1', [req.body.name], (err,rows, fileds) => {
    if(rows.length > 0){
      let dePass = cryptr.decrypt(rows[0].password)
      if(req.body.password == dePass){
        req.session.admin = rows[0].name
        res.redirect('/admin/users')
      }else{
        req.flash('danger','Password not match')
        res.render('login', {name:req.body.name, password: req.body.password})
      }
    }else{
      req.flash('danger','User not found')
      res.redirect('/login')
    }
  })
}))

//logout
Router.get('/logout',  wrapAsync(async(req, res) => {
  req.session.destroy((err) => {
    res.redirect('/')
  })
}))
module.exports = Router