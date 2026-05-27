const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./db/mongo');
const authRoutes = require('./routes/auth');
const leadsRoutes = require('./routes/leads');
const activitiesRoutes = require('./routes/activities');
const analyticsRoutes = require('./routes/analytics');

dotenv.config();

connectDB();

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api', activitiesRoutes);
app.use('/api/analytics', analyticsRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'BizFlow API is running!' });
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
