const express = require('express')
const router = express.Router();

const taskCategoryCtrl = require('../controllers/Task-Categories')

router.get('/', taskCategoryCtrl.index, {})

module.exports = router