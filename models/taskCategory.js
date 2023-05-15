const mongoose = require('mongoose')
const Schema = mongoose.Schema
const taskSchema = require('./task')


const taskCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tasks: [taskSchema]
},{
    timestamps: true
})

module.exports = mongoose.model('TaskCategory', taskCategorySchema)