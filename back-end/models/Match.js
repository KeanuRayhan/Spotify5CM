const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  match_id: { type: String, required: true, unique: true },
  calculated_at: { type: Date, required: true, default: Date.now },
  user_request_id: { type: String, required: true },
  user_target_id: { type: String, required: true },
  similarity_score: { type: Number, required: true },
  genre_scores_ureq: { type: Map, of: Number },
  genre_scores_utar: { type: Map, of: Number },
  recommended_tracks: [{
    artist_id: { type: String, required: true },
    track_name: { type: String, required: true },
    artist_name: { type: String, required: true },
    duration_ms: { type: Number, required: true },
    images: [{ type: String }]
  }]
});

module.exports = mongoose.model('Match', matchSchema);
