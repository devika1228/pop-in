const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const checkinRoutes = require('./routes/checkin').router;
const matchRoutes = require('./routes/match');

app.use('/checkin', checkinRoutes);
app.use('/match', matchRoutes);

// Base Route
app.get('/', (req, res) => {
  res.send('👋 Welcome to the Pop-In backend!');
});

app.listen(PORT, () => {
  console.log(`🚀 Pop-In backend is running at http://localhost:${PORT}`);
});
