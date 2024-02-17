const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Allow requests from specific origins (replace "*" with your frontend URL)
app.use(cors({
  origin: "https://dob-frontend.onrender.com"
}));

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
  console.log(`Server is running on port ${port}`);
});
