const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Assistant AI backend is live ✅' });
});

module.exports = router;