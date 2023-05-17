const TaskCategory = require('../models/TaskCategory');
const Task = require('../models/task');

function showTask(req, res, next) {
  const categoryId = req.params.categoryId; 
  const taskId = req.params.taskId; 

  TaskCategory.findById(categoryId)

    .then((category) => {
   
      const task = category.tasks.id(taskId); // Retrieve the specific task within the category
      
      res.render('task/show', {
        category,
        task,
        title: 'Task Details',
      })
    })
    .catch(next)
}

function createTask(req, res, next) {
  const categoryId = req.params.categoryId; // Assuming category ID is provided in the request parameters

  TaskCategory.findById(categoryId)
    .then((category) => {
      const taskData = req.body; // Assuming task data is sent in the request body
      const task = new Task(taskData);

      category.tasks.push(task);
      category.save()
    })
    .then(() => {
      res.redirect(`/categories/${categoryId}`); // Redirect to the task category page
    })
    .catch(next)
}

function updateTask(req, res, next) {
  const categoryId = req.params.categoryId; // Assuming category ID is provided in the request parameters
  const taskId = req.params.taskId; // Assuming task ID is provided in the request parameters

  TaskCategory.findById(categoryId)
    .then((category) => {
      const task = category.tasks.id(taskId); // Retrieve the specific task within the category
      const taskData = req.body; // Assuming updated task data is sent in the request body
      task.set(taskData); // Update the task data

      category.save()
    })        
    .then(() => {
      res.redirect(`/categories/${categoryId}`); // Redirect to the task category page
    })
    .catch(next)   
}

function deleteTask(req, res, next) {
    const categoryId = req.params.categoryId; // Assuming category ID is provided in the request parameters
    const taskId = req.params.taskId; // Assuming task ID is provided in the request parameters
  
    TaskCategory.findById(categoryId)
      .then((category) => {  
        const task = category.tasks.id(taskId); // Retrieve the specific task within the category 
        task.remove(); // Remove the task from the category  
        category.save()
        })
      .then(() => {
        res.redirect(`/categories/${categoryId}`); // Redirect to the task category page
      })
      .catch(next) 
}

  module.exports = {
    showTask,
    createTask,
    updateTask,
    deleteTask
}
  
