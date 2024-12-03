const mongoose = require('mongoose');

const recommendSchema = new mongoose.Schema({
  match_id: { type: String, required: true },
  rect_track_ids: { type: [String], required: true },
});

module.exports = mongoose.model('Recommend', recommendSchema);
