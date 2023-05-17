require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const passport = require('passport')
const methodOverride = require('method-override')

const taskCategoryRouter = require('./routes/task-categories')
const taskRouter = require('./routes/task')
const indexRouter = require('./routes/index')

const app = express()

require('./config/database')
require('./config/passport')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(methodOverride('_method'))

app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: true,
	})
)

app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
	res.locals.user = req.user

	next()
})

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/task-categories', taskCategoryRouter)
app.use('/task', taskRouter)

app.use(function (req, res, next) {
	console.log(req)
	next(createError(404))
})

app.use(function (err, req, res, next) {
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	res.status(err.status || 500)
	res.render('error')
})

module.exports = app
