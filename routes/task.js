const express = require('express')
const router = express.Router()

// Creat a variable to store the task controller in 
const taskCtrl = require('../controllers/task')

// Every route here is added to /task
// Routes for tasks
router.get('/:categoryId/:taskId', taskCtrl.showTask)
router.post('/:categoryId', taskCtrl.createTask)
router.put('/:categoryId/:taskId', taskCtrl.updateTask)
router.delete('/:categoryId/:taskId', taskCtrl.deleteTask)


module.exports = router