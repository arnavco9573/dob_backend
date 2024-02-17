const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to handle POST requests
app.post('/getDayOfWeek', (req, res) => {
  const { date } = req.body;

  if (!date) {
    return res.status(400).json({ error: 'Date is required' });
  }
  // Parse the date using moment.js
  const parsedDate = moment(date, 'DDMMYYYY');
  
  if (!parsedDate.isValid()) {
    return res.status(400).json({ error: 'Invalid date format' });
  }

  // Get the day of the week
  const dayOfWeek = parsedDate.format('dddd');

  res.json({ dayOfWeek });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
