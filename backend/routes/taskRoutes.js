const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware'); // Import the middleware
const router = express.Router();

router.route('/').post(protect, createTask).get(protect, getTasks); // Protect task creation and fetching routes
router.route('/:id').put(protect, updateTask).delete(protect, deleteTask); // Protect update and delete routes

module.exports = router;