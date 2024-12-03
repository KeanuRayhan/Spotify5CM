const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  artist_id: { type: String, required: true, unique: true },
  artist_name: { type: String, required: true },
  url_profile: { type: String, required: true },
  images: { type: String },
  genres: { type: [String] },
  followers: { type: Number },
  monthly_listener: { type: Number },
  popularity: { type: Number },
  country: { type: String },
  region: { type: String },
});

module.exports = mongoose.model('Artist', artistSchema);
