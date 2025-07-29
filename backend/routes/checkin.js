const express = require('express');
const router = express.Router();

// In-memory check-in store
const checkins = [];

// GET /checkin — helper route to test in browser
router.get('/', (req, res) => {
  res.send('✅ Use POST /checkin to submit your info.');
});

// POST /checkin — accepts user check-in
router.post('/', (req, res) => {
  const { name, location, interest } = req.body;

  if (!name || !location || !interest) {
    return res.status(400).json({ error: 'All fields (name, location, interest) are required.' });
  }

  const newCheckin = {
    id: Date.now(),
    name,
    location,
    interest,
    timestamp: new Date()
  };

  checkins.push(newCheckin);

  res.status(201).json({
    message: '✅ Check-in successful!',
    checkin: newCheckin
  });
});

// Export both router and the shared checkins array
module.exports = {
  router,
  checkins
};
