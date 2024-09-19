const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const router = express.Router();

router.route('/').post(createTask).get(getTasks);
router.route('/:id').put(updateTask).delete(deleteTask);

module.exports = router;
