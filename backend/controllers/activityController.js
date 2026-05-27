const Activity = require('../models/Activity');
const Lead = require('../models/Lead');

const getActivitiesByLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    if (req.user.role === 'bda' && 
        lead.assignedTo.toString() !== req.user._id.toString() && 
        lead.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this lead' });
    }

    const activities = await Activity.find({ lead: req.params.id })
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createActivity = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    if (req.user.role === 'bda' && 
        lead.assignedTo.toString() !== req.user._id.toString() && 
        lead.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to add activity to this lead' });
    }

    const activity = await Activity.create({
      ...req.body,
      lead: req.params.id,
      createdBy: req.user._id
    });

    lead.activities.push(activity._id);
    await lead.save();

    await activity.populate('createdBy', 'name email');

    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    if (activity.createdBy.toString() !== req.user._id.toString() && req.user.role === 'bda') {
      return res.status(403).json({ message: 'Not authorized to update this activity' });
    }

    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('createdBy', 'name email');

    res.json(updatedActivity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    if (activity.createdBy.toString() !== req.user._id.toString() && req.user.role === 'bda') {
      return res.status(403).json({ message: 'Not authorized to delete this activity' });
    }

    await Lead.findByIdAndUpdate(activity.lead, {
      $pull: { activities: activity._id }
    });

    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: 'Activity removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getActivitiesByLead,
  createActivity,
  updateActivity,
  deleteActivity
};
