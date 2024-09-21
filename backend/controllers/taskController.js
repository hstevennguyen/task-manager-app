const Task = require('../models/Task');

// Create a new task associated with the logged-in user
exports.createTask = async (req, res) => {
  try {
    // Get the user ID from the token (req.user is populated by JWT middleware)
    const userId = req.user.id;
    
    // Create a new task with the user ID
    const task = await Task.create({ ...req.body, user: userId });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all tasks for the logged-in user
exports.getTasks = async (req, res) => {
  try {
    // Get the user ID from the token (req.user is populated by JWT middleware)
    const userId = req.user.id;

    // Fetch tasks that belong to the logged-in user
    const tasks = await Task.find({ user: userId });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a task that belongs to the logged-in user
exports.updateTask = async (req, res) => {
  try {
    // Ensure the task belongs to the logged-in user before updating
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // Ensure task belongs to user
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found or you do not have permission to update this task' });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a task that belongs to the logged-in user
exports.deleteTask = async (req, res) => {
  try {
    // Ensure the task belongs to the logged-in user before deleting
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found or you do not have permission to delete this task' });
    }

    res.status(204).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
