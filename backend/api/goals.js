const express = require('express');
const router = express.Router();
const { parseGoal } = require('../../shared/parseGoal');
const { schedulePlan } = require('../../shared/schedulePlan');

// POST /api/goals
router.post('/', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'text required' });

  const goals = parseGoal(text);
  const schedule = schedulePlan(goals);

  res.json({ schedule });
});

module.exports = router;
