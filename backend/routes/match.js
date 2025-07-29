const express = require('express');
const router = express.Router();

// Import shared check-in memory
const { checkins } = require('./checkin');

// GET /match — filters by location & interest in the last 15 mins
router.get('/', (req, res) => {
  const { location, interest } = req.query;

  if (!location || !interest) {
    return res.status(400).json({ error: 'location and interest are required as query params' });
  }

  const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);

  const matches = checkins.filter((user) =>
    user.location.toLowerCase() === location.toLowerCase() &&
    user.interest.toLowerCase() === interest.toLowerCase() &&
    new Date(user.timestamp) > fifteenMinsAgo
  );

  res.json({
    count: matches.length,
    matches
  });
});

module.exports = router;
