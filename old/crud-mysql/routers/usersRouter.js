const Router = require('express').Router()
const Cryptr = require('cryptr')
const cryptr = new Cryptr('secret')
const nodemailer  = require('nodemailer')
const  wrapAsync = require('../middleware/wrapasync')
const mysql = require('../modules/db')

Router.get('/users', wrapAsync(async(req, res) => {
  mysql.query('SELECT * FROM users', (err, rows, field) => {
    res.render('users', {
      title: 'Users',
      users: rows
    })
  })
}))

Router.get('/detailuser/:id', wrapAsync(async(req, res) => {
  mysql.query('SELECT * FROM users where id = ? LIMIT 1', [req.params.id], (err, rows, field) => {
    user = {
      name: rows[0].name,
      password:cryptr.decrypt(rows[0].password)
    }
    res.render('detailuser', {
      title: 'Details',
      user: user
    })
  })
}))

Router.get('/edituser/:id', wrapAsync(async(req, res) => {
  mysql.query('SELECT * FROM users where id = ? LIMIT 1', [req.params.id], (err, rows, field) => {
    result = {
      id: rows[0].id,
      name: rows[0].name,
      password:cryptr.decrypt(rows[0].password)
    }
    res.render('edituser', {
      title: 'Details',
      user: result
    })
  })
}))

Router.post('/edituser/:id', wrapAsync(async(req, res) => {
  if(req.body.password.length > 3){
    mysql.query('Select name FROM users WHERE id = ? LIMIT 1', [req.params.id], (err, rows, field) => {
      if (rows.length === 1) {
        let newPass = cryptr.encrypt(req.body.password)
        mysql.query('UPDATE users SET password = ? WHERE id = ?', [newPass, req.params.id])
      }
      req.flash('success','Edit Success!')
      res.redirect('/admin/users')
    })
  }else{
    req.flash('danger','Some Error!')
    res.redirect('/admin/edituser/'+ req.params.id)
  }
}))

Router.get('/deleteuser/:id', wrapAsync(async(req, res) => {
  mysql.query('DELETE FROM users WHERE id= ?', [req.params.id], (err, rows, field) => {
    res.redirect('/admin/users')
  })
}))

Router.get('/contact', wrapAsync(async(req, res) => {
  res.render('contact')
}))

Router.post('/contact', wrapAsync(async(req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
      name:'mesto1830@outlook.com',
      password: 'MK1972mk'
    }
  })
  
  const mailoption  = {
    from: 'mesto1830@outlook.com',
    to: req.body.emailTo,
    subject: req.body.subject,
    text: req.body.email,
    html: '<h3>Hi</h3>',
  }
  await transporter.sendMail(mailoption)
  res.redirect('/admin/contact')
}))

Router.post('/users/search', wrapAsync(async(req, res) => {
  if(req.body.name === ''){
    mysql.query('SELECT * FROM users', (err, rows, field) => {
      res.render('users', {
        title: 'Users',
        users: rows
      })
    })
  } else {
    mysql.query('SELECT * FROM users WHERE name = ?', [req.body.name], (err, rows, field) => {
      res.render('users', {
        title: 'Users',
        users: rows
      })
    })
  }
}))
module.exports = Router