const TaskCategory = require('../models/TaskCategory')


function index(req, res, next) {
    // In Task-Categories there is a field called 'user' I want to search to find the user
    // That I am passing in 
    TaskCategory.find({ user: req.user._id })

        .then(taskCategories => {
            // This res.render will look for a view to render...from this app, check the vieews folder. Inside the views folder
            // there is a folder called Task-Categories and inside of that folder there is a file called index 
            res.render('Task-Categories/index', {
                taskCategories,                
                title: "My Task Categories"
            })
        })        
        .catch(next)
}

// CREATE
function createTaskCategory(req, res, next) {
    TaskCategory.create({ ...req.body, user: req.user._id })
    .then(() => res.redirect('/Task-Categories'))
    .catch(next)
}

// DELETE
function deleteTaskCategory(req, res, next) {
    TaskCategory.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/Task-Categories'))
        .catch(next)
}

// FORM FOR CREATING NEW TASK CATEGORY
function newTaskCategory(req, res) {
    res.render('Task-Categories/new', {title: 'New Task Category'})
}

// SHOW
function show(req, res, next) {
	TaskCategory.findById(req.params.id)
		.then((battleTeam) => {
			res.render('task-categories/show', {
				taskCategories,
				title: 'Task Category Details',
			})
		})
		.catch(next)
}

function updateTaskCategoryForm(req, res, next) {
	TaskCategory.findById(req.params.id)
		.then((taskCategory) => {
			res.render('task-categories/edit', {
				taskCategory,
				title: 'Task Category Details',
			})
		})
        // .then(() => res.redirect(`/Task-Categories/${req.params.id}`))
        // .then(() => res.redirect('/Task-Categories'))
		.catch(next)
}

// // UPDATE
// function updateTaskCategory(req, res, next) {
//     TaskCategory.findByIdAndUpdate(req.params.id, req.body, { new: true })
//         .then((taskCategory) => res.redirect(`/Task-Categories/${taskCategory._id}`))
//         .catch(next)
// }

function updateTaskCategory(req, res, next) {
	TaskCategory.findById(req.params.id)
		.then((taskCategory) => {
			if (!taskCategory.user.equals(req.user._id)) throw new Error('Unauthorized')
			return taskCategory.updateOne(req.body)
		})
		.then(() => res.redirect(`/Task-Categories/${req.params.id}`))
		.catch(next)
}

module.exports = {
    index,
    createTaskCategory,
    updateTaskCategory,
    updateTaskCategoryForm,
    deleteTaskCategory,
    newTaskCategory,
    show
}