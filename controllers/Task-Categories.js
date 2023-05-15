const TaskCategory = require('../models/taskCategory.js')


function index(req, res, next) {
    // In Task-Categories there is a field called 'user' I want to search to find the user
    // That I am passing in 
    TaskCategory.find({ user: req.user._id })
        .then(taskCategory => {
            // This res.render will look for a view to render...from this app, check the vieews folder. Inside the views folder
            // there is a folder called Task-Categories and inside of that folder there is a file called index 
            res.render('Task-Categories/index', {
                taskCategories,
                title: "My Task Categories"
            })
        })
        
        .catch(next)
}

module.exports = {
    index
}