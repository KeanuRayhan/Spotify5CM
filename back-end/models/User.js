const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  display_name: { type: String, required: true },
  url_profile: { type: String, required: true },
  images: { type: String },
  last_calculated_at: { type: Date, required: true, default: Date.now },
  genre_scores: { type: Map, of: Number },
});

module.exports = mongoose.model('User', userSchema);
