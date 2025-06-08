const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { parseInstruction } = require('../shared/parseInstruction');

router.post('/', async (req, res) => {
  const { message } = req.body;
  const parsed = parseInstruction(message);

  if (!parsed) return res.status(400).json({ error: 'Unable to parse instruction' });

  const { target, field, value } = parsed;
  const all = await Task.find({});
  const match = all.find(
    t =>
      (t.title && t.title.toLowerCase().includes(target)) ||
      (t.type && t.type.toLowerCase().includes(target))
  );

  if (!match) return res.status(404).json({ error: 'No matching task found' });

  match[field] = value;
  await match.save();
  res.json({ updated: match });
});

module.exports = router;