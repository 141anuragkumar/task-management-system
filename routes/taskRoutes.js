//use this commmond to creat -  New-Item -Path "routes\taskRoutes.js" -ItemType File

const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

// Routes
router.get('/', getTasks);           // Get all tasks
router.post('/', createTask);        // Create new task
router.put('/:id', updateTask);      // Update task status
router.delete('/:id', deleteTask);   // Delete task

module.exports = router;