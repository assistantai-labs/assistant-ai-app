const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Temporary seed route: POST /api/tasks/seed
router.post('/seed', async (req, res) => {
  try {
    const sampleTasks = [
      {
        title: "Morning Workout",
        startTime: "2025-06-01T07:00:00Z",
        type: "Setup",
        location: "Gym"
      },
      {
        title: "Team Meeting",
        startTime: "2025-06-01T09:30:00Z",
        type: "Meeting",
        location: "Zoom"
      },
      {
        title: "Deep Work Session",
        startTime: "2025-06-01T11:00:00Z",
        type: "Work",
        location: "Home Office"
      }
    ];

    await Task.deleteMany({});
    const inserted = await Task.insertMany(sampleTasks);
    res.status(201).json({ message: "Seed successful", tasks: inserted });
  } catch (error) {
    res.status(500).json({ message: "Seed failed", error: error.message });
  }
});

module.exports = router;

const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    enum: ['Setup', 'Work', 'Break', 'Meeting'], // expand as needed
    required: true,
  }
});

module.exports = mongoose.model('Task', TaskSchema);
