// src/components/TaskDashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token'); // Get the JWT token
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in request headers
        },
      });
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  // Create new task and update the task list
  const handleCreateTask = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Get the JWT token
    const newTask = {
      title,
      description,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/tasks', newTask, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in request headers
        },
      });

      // Add the new task to the existing task list
      setTasks([...tasks, response.data]);

      // Clear the input fields after task is created
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Error creating task', err);
    }
  };

  return (
    <div>
      <h2>Task Dashboard</h2>
      <form onSubmit={handleCreateTask}>
        <div>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Create Task</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskDashboard;
