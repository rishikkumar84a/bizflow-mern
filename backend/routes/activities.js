const express = require('express');
const {
  getActivitiesByLead,
  createActivity,
  updateActivity,
  deleteActivity
} = require('../controllers/activityController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/leads/:id/activities')
  .get(protect, getActivitiesByLead)
  .post(protect, createActivity);

router.route('/activities/:id')
  .patch(protect, updateActivity)
  .delete(protect, deleteActivity);

module.exports = router;
