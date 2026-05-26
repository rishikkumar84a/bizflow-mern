const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',
    required: true
  },
  type: {
    type: String,
    enum: ['call', 'email', 'meeting', 'note', 'task'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: Date,
  completed: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Activity', ActivitySchema);
