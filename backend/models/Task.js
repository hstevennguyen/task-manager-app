const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'pending' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Associate with User
});

module.exports = mongoose.model('Task', taskSchema);
