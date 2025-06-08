const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tasks', require('./api/tasks'));
app.use('/api/instruction', require('./api/instructions'));
app.use('/api/goals', require('./api/goals'));

mongoose.connect('mongodb://localhost:27017/assistant-ai', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001');
});
