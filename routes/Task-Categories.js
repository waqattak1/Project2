const express = require('express')
const router = express.Router();

const taskCatCtrl = require('../controllers/Task-Categories')

router.get('/', taskCatCtrl.index)
router.get('/new', taskCatCtrl.newTaskCategory)
router.post('/', taskCatCtrl.createTaskCategory)
router.get('/:id', taskCatCtrl.show)
router.get('/:id/edit', taskCatCtrl.updateTaskCategoryForm)
router.put('/:id', taskCatCtrl.updateTaskCategory)
router.delete('/:id', taskCatCtrl.deleteTaskCategory)


module.exports = router