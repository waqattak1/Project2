const express = require('express')
const router = express.Router()

// Creat a variable to store the task controller in 
const taskCtrl = require('../controllers/task')

// Routes for tasks
router.get('/Task-Categories/:categoryId/:taskId', taskCtrl.showTask)
router.post('/Task-Categories/:categoryId', taskCtrl.createTask)
router.put('/Task-Categories/:categoryId/:taskId', taskCtrl.updateTask)
router.delete('/Task-Categories/:categoryId/:taskId', taskCtrl.deleteTask)


module.exports = router