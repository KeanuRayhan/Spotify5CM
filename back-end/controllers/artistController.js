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
