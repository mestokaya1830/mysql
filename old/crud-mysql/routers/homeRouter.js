const Router = require('express').Router()
const wrapAsync = require('../middleware/wrapasync.js')


Router.get('/', wrapAsync(async(req, res) => {
  res.render('index')
}))


module.exports = Router