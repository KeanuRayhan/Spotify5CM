const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  display_name: { type: String, required: true },
  url_profile: { type: String, required: true },
  images: { type: String },
  last_calculated_at: { type: Date },
  u_energy: { type: Number },
  u_accousticness: { type: Number },
  u_instrumentalness: { type: Number },
  u_key: { type: Number },
  u_speechiness: { type: Number },
  u_liveness: { type: Number },
  u_tempo: { type: Number },
  u_danceability: { type: Number },
  u_loudness: { type: Number },
  u_mode: { type: Number },
  u_valence: { type: Number },
  u_time_signature: { type: Number },
});

module.exports = mongoose.model('User', userSchema);
