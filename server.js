// This page represents the code for the to-do list app 

// First, we require express so we must import it 
const express = require('express');
const ejs = require('ejs');
const path = require('path')

const indexRouter = require('./routes/index')
const taskCategoryRouter = require('./routes/Task-Categories')

const app = express();

require('./config/database')
require('./config/passport')

// app.set (views/ejs) go here
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// app.use (mounts) go here
app.use('/', indexRouter)
app.use('Task-Categories', taskCategoryRouter)




