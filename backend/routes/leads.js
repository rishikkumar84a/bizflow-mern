const express = require('express');
const {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  updateLeadStage,
  deleteLead
} = require('../controllers/leadController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getLeads)
  .post(protect, createLead);

router.route('/:id')
  .get(protect, getLeadById)
  .patch(protect, updateLead)
  .delete(protect, deleteLead);

router.route('/:id/stage')
  .patch(protect, updateLeadStage);

module.exports = router;
