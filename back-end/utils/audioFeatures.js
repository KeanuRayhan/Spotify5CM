// Calculate centroid for audio features
const calculateCentroid = (audioFeatures) => {
    const centroid = {};
    const attributes = [
      'acousticness',
      'danceability',
      'energy',
      'instrumentalness',
      'loudness',
      'mode',
      'speechiness',
      'valence',
      'tempo',
      'time_signature',
      'key',
      'liveness',
    ];
    const totalTracks = audioFeatures.length;
  
    attributes.forEach((attribute) => {
      centroid[attribute] = audioFeatures.reduce(
        (sum, track) => sum + (track[attribute] || 0),
        0
      ) / totalTracks;
    });
  
    return centroid;
  };
  
  module.exports = { calculateCentroid };
  