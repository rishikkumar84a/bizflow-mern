const express = require('express');
const {
  getTeamAnalytics,
  getBdaAnalytics,
  getPipelineAnalytics
} = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/team', protect, getTeamAnalytics);
router.get('/bda/:id', protect, getBdaAnalytics);
router.get('/pipeline', protect, getPipelineAnalytics);

module.exports = router;
