const Router = require('express').Router()
const Cryptr = require('cryptr')
const cryptr = new Cryptr('secret')
const nodemailer  = require('nodemailer')
const  wrapAsync = require('../middleware/wrapasync')
const mysql = require('../modules/db')

Router.get('/users', wrapAsync(async(req, res) => {
  const conn = await mysql.getConnection()
  conn.release()
  const users = await conn.query('SELECT * FROM users')
  res.render('users', {
    title: 'Users',
    users: users[0]
  })
}))

Router.get('/detailuser/:id', wrapAsync(async(req, res) => {
  const conn = await mysql.getConnection()
  conn.release()
  const user = await conn.query('SELECT * FROM users where id = ? LIMIT 1', [req.params.id])
  result = {
    name: user[0][0].name,
    password:cryptr.decrypt(user[0][0].password)
  }
  res.render('detailuser', {
    title: 'Details',
    user: result
  })
}))

Router.get('/edituser/:id', wrapAsync(async(req, res) => {
  const conn = await mysql.getConnection()
  conn.release()
  const user = await conn.query('SELECT * FROM users where id = ? LIMIT 1', [req.params.id])
  result = {
    id: user[0][0].id,
    name: user.name,
    password:cryptr.decrypt(user[0][0].password)
  }
  res.render('edituser', {
    title: 'Details',
    user: result
  })
}))

Router.post('/edituser/:id', wrapAsync(async(req, res) => {
  if(req.body.password.length > 3){
    const conn = await mysql.getConnection()
    conn.release()
    const checkUser = await conn.query('Select name FROM users WHERE id = ? LIMIT 1', [req.params.id])
    if (checkUser[0].length === 1) {
      let newPass = cryptr.encrypt(req.body.password)
      await conn.query('UPDATE users SET password = ? WHERE id = ?', [newPass, req.params.id])
    }
    req.flash('success','Edit Success!')
    res.redirect('/admin/users')
  }else{
    req.flash('danger','Some Error!')
    res.redirect('/admin/edituser/'+ req.params.id)
  }
}))

Router.get('/deleteuser/:id', wrapAsync(async(req, res) => {
  const conn = await mysql.getConnection()
  conn.release()
  await conn.query('DELETE FROM users WHERE id= ?', [req.params.id])
  res.redirect('/admin/users')
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
  const conn = await mysql.getConnection()
  conn.release()
  if(req.body.name === ''){
    const users = await conn.query('SELECT * FROM users')
    res.render('users', {
      title: 'Users',
      users: users[0]
    })
  } else {
    const users = await conn.query('SELECT * FROM users WHERE name = ?', [req.body.name])
    res.render('users', {
      title: 'Users',
      users: users[0]
    })
  }
}))
module.exports = Router