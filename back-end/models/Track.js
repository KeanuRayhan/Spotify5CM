const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  track_id: { type: String, required: true, unique: true },
  track_name: { type: String, required: true },
  artist_name: { type: String },
  artist_id: { type: String },
  duration_ms: { type: Number },
  popularity: { type: Number },
  acousticness: { type: Number },
  danceability: { type: Number },
  energy: { type: Number },
  instrumentalness: { type: Number },
  key: { type: Number },
  liveness: { type: Number },
  loudness: { type: Number },
  mode: { type: Number },
  speechiness: { type: Number },
  tempo: { type: Number },
  time_signature: { type: Number },
});

module.exports = mongoose.model('Track', trackSchema);
