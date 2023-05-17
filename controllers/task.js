const TaskCategory = require('../models/taskCategory');
const Task = require('../models/task');

function showTask(req, res, next) {
  const categoryId = req.params.categoryId; 
  const taskId = req.params.taskId; 

  TaskCategory.findById(categoryId)
    .populate('user')
    .exec((err, category) => {
      if (err) {
        return next(err);
      }

      const task = category.tasks.id(taskId); // Retrieve the specific task within the category

      if (!task) {
        return res.status(404).send('Task not found');
      }

      res.render('task/show', {
        category,
        task,
        title: 'Task Details',
      });
    });
}

function createTask(req, res, next) {
  const categoryId = req.params.categoryId; // Assuming category ID is provided in the request parameters

  TaskCategory.findById(categoryId)
    .exec((err, category) => {
      if (err) {
        return next(err);
      }

      if (!category) {
        return res.status(404).send('Category not found');
      }

      const taskData = req.body; // Assuming task data is sent in the request body
      const task = new Task(taskData);

      category.tasks.push(task);
      category.save((err) => {
        if (err) {
          return next(err);
        }

        res.redirect(`/categories/${categoryId}`); // Redirect to the task category page
      });
    });
}

function updateTask(req, res, next) {
  const categoryId = req.params.categoryId; // Assuming category ID is provided in the request parameters
  const taskId = req.params.taskId; // Assuming task ID is provided in the request parameters

  TaskCategory.findById(categoryId)
    .exec((err, category) => {
      if (err) {
        return next(err);
      }

      if (!category) {
        return res.status(404).send('Category not found');
      }

      const task = category.tasks.id(taskId); // Retrieve the specific task within the category

      if (!task) {
        return res.status(404).send('Task not found');
      }

      const taskData = req.body; // Assuming updated task data is sent in the request body

      task.set(taskData); // Update the task data

      category.save((err) => {
        if (err) {
          return next(err);
        }

        res.redirect(`/categories/${categoryId}`); // Redirect to the task category page
      });
    });
}

function deleteTask(req, res, next) {
    const categoryId = req.params.categoryId; // Assuming category ID is provided in the request parameters
    const taskId = req.params.taskId; // Assuming task ID is provided in the request parameters
  
    TaskCategory.findById(categoryId)
      .exec((err, category) => {
        if (err) {
          return next(err);
        }
  
        if (!category) {
          return res.status(404).send('Category not found');
        }
  
        const task = category.tasks.id(taskId); // Retrieve the specific task within the category
  
        if (!task) {
          return res.status(404).send('Task not found');
        }
  
        task.remove(); // Remove the task from the category
  
        category.save((err) => {
          if (err) {
            return next(err);
          }
  
          res.redirect(`/categories/${categoryId}`); // Redirect to the task category page
        });
      });
  }

  module.exports = {
    showTask,
    createTask,
    updateTask,
    deleteTask
}
  
