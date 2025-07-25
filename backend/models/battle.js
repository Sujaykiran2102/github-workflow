const mongoose = require('mongoose');

const battleSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
  time: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Battle', battleSchema);