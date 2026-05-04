const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
  tokenId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  userId: { 
    type: String, 
    required: true, 
    default: 'Anonymous User' 
  },
  issueDescription: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['open', 'in-progress', 'resolved', 'closed'],
    default: 'open' 
  },
  assignedTo: { 
    type: String, 
    default: 'Relation Manager' 
  }
}, { timestamps: true });

module.exports = mongoose.model('SupportTicket', supportTicketSchema);
