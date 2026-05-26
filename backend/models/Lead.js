const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title']
  },
  company: {
    type: String,
    required: [true, 'Please add a company']
  },
  contactName: {
    type: String,
    required: [true, 'Please add a contact name']
  },
  contactEmail: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  contactPhone: String,
  dealValue: {
    type: Number,
    default: 0
  },
  stage: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'],
    default: 'new'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: String,
  activities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity'
  }],
  tags: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Lead', LeadSchema);
