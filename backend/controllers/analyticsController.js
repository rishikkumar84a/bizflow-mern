const Lead = require('../models/Lead');
const User = require('../models/User');

const getTeamAnalytics = async (req, res) => {
  try {
    if (req.user.role === 'bda') {
      return res.status(403).json({ message: 'Not authorized to access team analytics' });
    }

    const bdAs = await User.find({ role: 'bda' }).select('name email');

    const analytics = await Promise.all(bdAs.map(async (bda) => {
      const totalLeads = await Lead.countDocuments({ assignedTo: bda._id });
      const wonLeads = await Lead.countDocuments({ assignedTo: bda._id, stage: 'won' });
      const lostLeads = await Lead.countDocuments({ assignedTo: bda._id, stage: 'lost' });
      const pipelineValue = await Lead.aggregate([
        { $match: { assignedTo: bda._id, stage: { $nin: ['won', 'lost'] } } },
        { $group: { _id: null, total: { $sum: '$dealValue' } } }
      ]);
      const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(2) : 0;

      return {
        bda: {
          _id: bda._id,
          name: bda.name,
          email: bda.email
        },
        totalLeads,
        wonLeads,
        lostLeads,
        conversionRate: `${conversionRate}%`,
        pipelineValue: pipelineValue[0]?.total || 0
      };
    }));

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBdaAnalytics = async (req, res) => {
  try {
    if (req.user.role !== 'bda' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized to access this analytics' });
    }

    const bdaId = req.params.id;
    const totalLeads = await Lead.countDocuments({ assignedTo: bdaId });
    const wonLeads = await Lead.countDocuments({ assignedTo: bdaId, stage: 'won' });
    const lostLeads = await Lead.countDocuments({ assignedTo: bdaId, stage: 'lost' });
    const pipelineValue = await Lead.aggregate([
      { $match: { assignedTo: bdaId, stage: { $nin: ['won', 'lost'] } } },
      { $group: { _id: null, total: { $sum: '$dealValue' } } }
    ]);
    const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(2) : 0;

    res.json({
      totalLeads,
      wonLeads,
      lostLeads,
      conversionRate: `${conversionRate}%`,
      pipelineValue: pipelineValue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPipelineAnalytics = async (req, res) => {
  try {
    const stages = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'];
    const pipeline = await Promise.all(stages.map(async (stage) => {
      const count = await Lead.countDocuments({ stage });
      const value = await Lead.aggregate([
        { $match: { stage } },
        { $group: { _id: null, total: { $sum: '$dealValue' } } }
      ]);
      return {
        stage,
        count,
        value: value[0]?.total || 0
      };
    }));

    res.json(pipeline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTeamAnalytics,
  getBdaAnalytics,
  getPipelineAnalytics
};
