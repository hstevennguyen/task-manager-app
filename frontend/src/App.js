// src/App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskDashboard from './components/TaskDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Add a route for the root path */}
        <Route path="/" element={<Login />} />

        {/* Other routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<TaskDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
