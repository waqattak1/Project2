const TaskCategory = require('../models/taskCategory')


function index(req, res, next) {
    // In Task-Categories there is a field called 'user' I want to search to find the user
    // That I am passing in 
    TaskCategory.find({ user: req.user._id })
        .then(taskCategory => {
            // This res.render will look for a view to render...from this app, check the vieews folder. Inside the views folder
            // there is a folder called Task-Categories and inside of that folder there is a file called index 
            res.render('Task-Categories/index', {
                taskCategory,                
                title: "My Task Categories"
            })
        })
        
        .catch(next)
}

// CREATE
function createTaskCategory(req, res, next) {
    const taskCategory = new TaskCategory({ ...req.body, user: req.user._id });
    taskCategory.save()
        .then(() => res.redirect('/Task-Categories'))
        .catch(next);
}

// UPDATE
function updateTaskCategory(req, res, next) {
    TaskCategory.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((taskCategory) => res.redirect(`/Task-Categories/${taskCategory._id}`))
        .catch(next);
}

// DELETE
function deleteTaskCategory(req, res, next) {
    TaskCategory.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/Task-Categories'))
        .catch(next);
}

// FORM FOR CREATING NEW TASK CATEGORY
function newTaskCategory(req, res) {
    res.render('Task-Categories/new', {title: 'New Task Category'})
}

module.exports = {
    index,
    createTaskCategory,
    updateTaskCategory,
    deleteTaskCategory,
    newTaskCategory
}