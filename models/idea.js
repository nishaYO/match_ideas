const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  userId: String,
  title: String,
  body: String,
  genre: String,
  keywords: [String]
});

const Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;
