const Artist = require('../models/Artist');
const { getArtistId } = require('../services/spotifyService');
const Track = require('../models/Track');

const findMissingArtists = async (artistsFetch) => {
    const existingArtists = await Artist.find({ artist_id: { $in: artistsFetch } }).select('artist_id');

    const existingArtistIds = existingArtists.map(artist => artist.artist_id);
    const missingArtists = artistsFetch.filter(id => !existingArtistIds.includes(id));

    return missingArtists;
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getAllArtistIds = async (trackIds, limitPerSecond = 5) => {
    try {
        const artistIds = [];
        
        for (let i = 0; i < trackIds.length; i++) {
            if (i > 0 && i % limitPerSecond === 0) {
                // Add a delay after every `limitPerSecond` requests
                await delay(1000);  // Delay for 1 second (1000 ms)
            }
            const artistId = await getArtistId(trackIds[i]);
            if (artistId) {
                artistIds.push(artistId);
            }
        }

        // Remove duplicates
        const uniqueArtistIds = [...new Set(artistIds)];

        return uniqueArtistIds;
    } catch (error) {
        console.error('Error fetching artist IDs:', error.message);
        return [];
    }
};


const createArtist = async (artistsData) => {
    try {
        const artistPromises = artistsData.map(async (artist) => {
            const existingArtist = await Artist.findOne({ artist_id: artist.artist_id });

            if (!existingArtist) {
                const newArtist = new Artist(artist);
                await newArtist.save();
            } else {
                console.log(`Artist ${artist.artist_name} already exists in database.`);
            }
        });

        await Promise.all(artistPromises);
    } catch (error) {
        console.error('Error saving artists to database:', error.message);
    }
};

const getArtistGenre = async (artistIds) => {
    try {
      const genrePromises = artistIds.map(async (artistId) => {
        const artist = await Artist.findOne({ artist_id: artistId });
        // Memecah genre yang digabung dengan koma dan memastikan trim spasi ekstra
        const genres = Array.isArray(artist.genres) ? artist.genres : artist.genres.split(",").map(genre => genre.trim());
        return  genres.flatMap(genre => genre.split(',').map(g => g.trim()));;
      });
  
      const genres = await Promise.all(genrePromises);
      const arrayGenre = genres.flat(); // Menggabungkan semua genre dalam satu array
  
      return arrayGenre;
    } catch (error) {
      console.error('Error fetching artist genres:', error.message);
      return [];
    }
  };

  const getArtistsByGenres = async (genres, limitPerSecond = 5) => {
    try {
      let combinedArtists = [];
      
      // Query untuk genre pertama
      const genre1Artists = await Artist.find({
        genres: { $in: [genres[0]] }
      }).limit(3).select('artist_id');
  
      // Query untuk genre kedua
      const genre2Artists = await Artist.find({
        genres: { $in: [genres[1]] }
      }).limit(1).select('artist_id');
  
      // Gabungkan hasil query
      combinedArtists = [...genre1Artists, ...genre2Artists];
  
      // Ekstrak hanya artist_id dari hasil gabungan
      const artistIds = combinedArtists.map(artist => artist.artist_id);
  
      // Buat unik jika diperlukan
      const uniqueArtistIds = [...new Set(artistIds)];
  
      return uniqueArtistIds;
    } catch (error) {
      console.error('Error fetching artist IDs:', error.message);
      return [];
    }
  }; 

  const getRecommendTracks = async (artistIds) => {
    try {
      // Map setiap artist_id untuk melakukan query di tabel track
      const trackPromises = artistIds.map(async (artistId) => {
        return await Track.findOne({ artist_id: artistId }); // Ambil hanya field yang diperlukan
      });
  
      // Tunggu semua query selesai
      const trackResults = await Promise.all(trackPromises);
  
      // Gabungkan hasil dari semua artist
    //   const recommendedTracks = trackResults.flat(); // Menggabungkan array hasil query menjadi satu array
  
      return trackResults;
    } catch (error) {
      console.error('Error fetching artist recommends:', error.message);
      return [];
    }
  };
  
module.exports = { findMissingArtists, getAllArtistIds, createArtist, getArtistGenre, getArtistsByGenres, getRecommendTracks };
