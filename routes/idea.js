const express = require('express');
const router = express.Router();
const Idea = require('../models/idea');
const calculateMatchingAccuracy = require("../utils/calculateMatchingAccuracy");
// Idea endpoint
router.post('/submit', async (req, res) => {
  try {
    const { userId, title, body, genre, keywords } = req.body;
    const idea = new Idea({ userId, title, body, genre, keywords });
    await idea.save();
    const matchedIdeas = await calculateMatchingAccuracy(idea);
    res.json(matchedIdeas);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
