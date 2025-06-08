const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// POST a new task
router.post('/', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /tasks/:id — Update task
router.put('/:id', async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
});

// DELETE /tasks/:id — Delete task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Temporary seed route to insert sample tasks
router.post('/seed', async (req, res) => {
  try {
    const sampleTasks = [
      {
        title: "Morning Workout",
        startTime: new Date("2025-06-01T07:00:00Z"),
        duration: 60,
        type: "Setup",
        location: "Gym",
        isLocked: false
      },
      {
        title: "Team Meeting",
        startTime: new Date("2025-06-01T09:30:00Z"),
        duration: 45,
        type: "Meeting",
        location: "Zoom",
        isLocked: true
      },
      {
        title: "Deep Work Session",
        startTime: new Date("2025-06-01T11:00:00Z"),
        duration: 120,
        type: "Work",
        location: "Home Office",
        isLocked: false
      }
    ];

    await Task.deleteMany({});
    const inserted = await Task.insertMany(sampleTasks);
    res.status(201).json({ message: "Seed successful", tasks: inserted });
  } catch (err) {
    res.status(500).json({ message: "Seed failed", error: err.message });
  }
});

module.exports = router;
