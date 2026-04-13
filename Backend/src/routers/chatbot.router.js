const express = require('express');
const router = express.Router();
const SupportTicket = require('../models/SupportTicket');

// Generate a random token ID
const generateTokenId = () => {
  return 'TKT-' + Math.random().toString(36).substring(2, 9).toUpperCase();
};

// Route: POST /api/chat/ticket
// Description: Create a new support ticket assigned to a Relation Manager
router.post('/ticket', async (req, res) => {
  try {
    const { issueDescription, userId } = req.body;

    if (!issueDescription) {
      return res.status(400).json({ success: false, message: 'Issue description is required' });
    }

    const tokenId = generateTokenId();

    const newTicket = new SupportTicket({
      tokenId,
      userId: userId || 'Anonymous User',
      issueDescription,
      status: 'open',
      assignedTo: 'Relation Manager'
    });

    await newTicket.save();

    res.status(201).json({
      success: true,
      message: 'Support ticket created successfully',
      data: {
        tokenId: newTicket.tokenId,
        assignedTo: newTicket.assignedTo
      }
    });

  } catch (error) {
    console.error('Error creating support ticket:', error);
    res.status(500).json({ success: false, message: 'Server error creating ticket' });
  }
});

module.exports = router;
