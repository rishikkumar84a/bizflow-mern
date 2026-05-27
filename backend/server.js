const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/mongo');
const authRoutes = require('./routes/auth');
const leadsRoutes = require('./routes/leads');
const activitiesRoutes = require('./routes/activities');

dotenv.config();

connectDB();

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api', activitiesRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'BizFlow API is running!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
