const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const helmet  = require('helmet')
const session = require('express-session')
const MemoryStore = require('memorystore')(session)

dotenv.config()

const isAdmin = require('./middleware/isAdmin')
const homeRouter = require('./routers/homeRouter')
const authRouter = require('./routers/authRouter')
const usersRouter = require('./routers/usersRouter')

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))

// app.set('views', path.join(__dirname, 'templates'))//custom folder
app.set('view engine','pug')//default

app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  httpOnly: true,//only transmit cookie over https
  secure: true,//prevents client side js reading the cookies
  store: new MemoryStore({
    checkPeriod: 86400000
  })
}))

//first install connect-flash and express-messages
app.use(require('connect-flash')())
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res)
  next()
})

app.locals.moment = require('moment')

app.use('/', homeRouter)
app.use('/', authRouter)
app.use('/admin', isAdmin, usersRouter)

app.use((error, req, res, next) => {
  res.render('error', {error})
})

app.listen(3000, () => {
  console.log('Server listen...')
})
