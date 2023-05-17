// This page represents the code for the to-do list app 

// First, we require express so we must import it 
require('dotenv').config()
const createError = require('http-errors')
const express = require('express');

const app = express();
const ejs = require('ejs');
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const passport = require('passport');
const methodOverride = require('method-override')


const indexRouter = require('./routes/index')
const taskCategoryRouter = require('./routes/Task-Categories')
const taskRouter = require('./routes/task')


require('./config/database')
require('./config/passport')

// app.set (views/ejs) go here
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// app.use (mounts) go here
app.use('/', indexRouter)
app.use('/Task-Categories', taskCategoryRouter)
app.use('/task', taskRouter)

module.exports = app

