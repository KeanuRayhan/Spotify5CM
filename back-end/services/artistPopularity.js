const Artist = require('../models/Artist');

// Fungsi untuk mengambil artist berdasarkan popularity, dengan filter berdasarkan region/country
const getArtistByPopularity = async (region, country) => {
  try {
    let query = {};

    // Menambahkan filter berdasarkan region dan country
    if (region) {
      query.region = region;
    }
    if (country) {
      query.country = country;
    }

    // Mengambil data artist yang diurutkan berdasarkan popularity secara menurun
    const artists = await Artist.find(query).sort({ popularity: -1 });
    return artists; // Mengembalikan hasil query
  } catch (error) {
    throw new Error('Error fetching artist data');
  }
};

module.exports = { getArtistByPopularity };
