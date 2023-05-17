const express = require('express')
const router = express.Router();

const taskCatCtrl = require('../controllers/Task-Categories')

// Routes for task categories
router.get('/', taskCatCtrl.index)
router.post('/Task-Categories', taskCatCtrl.createTaskCategory)
router.get('/Task-Categories/new', taskCatCtrl.newTaskCategory)
router.put('/Task-Categories/:id', taskCatCtrl.updateTaskCategory)
router.delete('/Task-Categories/:id', taskCatCtrl.deleteTaskCategory)

module.exports = router