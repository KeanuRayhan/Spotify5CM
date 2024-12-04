const { findMissingArtists } = require('../services/artistService');

/**
 * Controller untuk mencari artist_id yang belum ada di database
 * @param {Array} artistsFetch - Array artist_id yang akan dicek
 */
const checkArtists = async (artistsFetch) => {
  try {
    if (!Array.isArray(artistsFetch) || artistsFetch.length === 0) {
      throw new Error('Invalid artist IDs');
    }

    const missingArtists = await findMissingArtists(artistsFetch);
    return missingArtists;
  } catch (error) {
    console.error('Error in checkArtists:', error); // Log detail error
    throw error;
  }
};

module.exports = { checkArtists };
// Import model Artist
const Artist = require('../models/Artist');
// Fungsi untuk mendapatkan artist berdasarkan artist_score (60% monthly_listener, 40% popularity)
const startgetartistPopularity = async (req, res) => {
    try {
      // Ambil parameter dari query string atau body
      const { region, country } = req.query;
  
      // Menyusun query untuk mencari artist
      let query = {};
  
      // Menambahkan filter region dan country jika ada
      if (region) {
        query.region = region;
      }
      if (country) {
        query.country = country;
      }
  
      // Mengambil data artist dari database
      const artists = await Artist.find(query);
  
      // Menghitung artist_score untuk setiap artist
      const artistsWithScores = artists.map(artist => {
        // Menghitung artist_score berdasarkan formula yang diinginkan
        const artist_score = (0.6 * artist.monthly_listener) + (0.4 * artist.popularity);
        
        return { ...artist.toObject(), artist_score }; // Menambahkan artist_score ke objek artist
      });
  
      // Menentukan nilai minimum dan maksimum artist_score
      const minScore = Math.min(...artistsWithScores.map(artist => artist.artist_score));
      const maxScore = Math.max(...artistsWithScores.map(artist => artist.artist_score));
  
      // Menormalisasi artist_score ke rentang 0-100
      artistsWithScores.forEach(artist => {
        artist.artist_score = (100 * (artist.artist_score - minScore)) / (maxScore - minScore);
      });
  
      // Mengurutkan artist berdasarkan artist_score secara menurun
      artistsWithScores.sort((a, b) => b.artist_score - a.artist_score);
  
      // Mengirimkan response dengan status 200 dan data artist
      res.status(200).json(artistsWithScores);
    } catch (error) {
      // Menangani error jika terjadi
      res.status(500).json({ message: 'Error fetching artist data', error: error.message });
    }
  };
  
  module.exports = { startgetartistPopularity };
  