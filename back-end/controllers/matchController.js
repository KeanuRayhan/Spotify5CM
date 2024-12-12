const { fetchUserAndTracks, getUserData, getAudioFeatures, getArtist } = require('../services/spotifyService');
const { saveMatchingResult, isEverMatch } = require('../services/matchService');
const { calculateSimilarityScore } = require('../utils/cosineSimilarity');
const { extractUserIdFromUrl } = require('../utils/urlUtil.js');
const { getAllArtistIds, createArtist } = require('../services/artistService');
const { checkArtists } = require('../controllers/artistController');
const { getArtistGenre, getArtistsByGenres, getRecommendTracks, getArtistImages } = require('../services/artistService');
const { calculateGenreScores } = require('../utils/genreScore');
const { generatePieChart } = require('../utils/genreChart');
const { generatePieChartV2 } = require('../utils/genreChartv2');
const { saveUser, getUser } = require('../services/userService');

const startMatching = async (req, res) => {
  try {
    const { userRequestUrl, userTargetUrl } = req.body;
    console.log('Received URLs:', userRequestUrl, userTargetUrl);
    const userRequestId = extractUserIdFromUrl(userRequestUrl);
    const userTargetId = extractUserIdFromUrl(userTargetUrl);

    const userRequestData = await getUserData(userRequestId);
    const userTargetData = await getUserData(userTargetId);

    if (!userRequestData || !userTargetData) {
      return 201;
    }

    const previousMatch = await isEverMatch(userRequestId, userTargetId);
    if (previousMatch) {

      const userRequestScores = previousMatch.genre_scores_ureq;
      const userTargetScores = previousMatch.genre_scores_utar;

      const imageRequest = await generatePieChartV2(userRequestScores);
      const imageTarget = await generatePieChartV2(userTargetScores);
      console.log('Previous match found:', previousMatch);

      const sortedGenres = Array.from(userRequestScores).map(([key, value]) => [key, value])
        .sort((a, b) => b[1] - a[1]);
      const topTwoGenres = sortedGenres.slice(0, 2).map(item => item[0]);

      const artistIdsRecommend = await getArtistsByGenres(topTwoGenres);

      const artistImages = await getArtistImages(artistIdsRecommend);

      const recommend = await getRecommendTracks(artistIdsRecommend);

      const artistImagesMap = new Map(artistImages.map(image => [image.artist_id, image.images]));

      const combinedResults = recommend.map(track => ({
        artist_id: track.artist_id,
        track_name: track.track_name,
        artist_name: track.artist_name,
        duration_ms: track.duration_ms,
        images: artistImagesMap.get(track.artist_id) || []
      }));

      return res.status(200).json({
        success: true,
        imageRequest,
        imageTarget,
        userRequestScores,
        userTargetScores,
        similarityScore: previousMatch.similarity_score,
        userRequestData,
        userTargetData,
        combinedResults
      });
    }

    let userRequestScores = null;
    let userTargetScores = null;
    const genreReqDatabase = await getUser(userRequestId);
    if (genreReqDatabase) {
      userRequestScores = genreReqDatabase;
    }
    const genreTarDatabase = await getUser(userTargetId);
    if (genreTarDatabase) {
      userTargetScores = genreTarDatabase;
    }

    const { userRequestTracks, userTargetTracks } = await fetchUserAndTracks(userRequestId, userTargetId);
    if (!userRequestTracks.length || !userTargetTracks.length) {
      return 202;
    }

    const uniqueArtistIds = await getAllArtistIds(userRequestTracks);
    const uniqueArtistIdsTarget = await getAllArtistIds(userTargetTracks);
    const missingArtists = await checkArtists(uniqueArtistIds);
    const missingArtistsTarget = await checkArtists(uniqueArtistIdsTarget);

    if (missingArtists.length > 0 || missingArtistsTarget.length > 0) {
      const newArtistData = await getArtist(missingArtists);
      const newArtistDataTarget = await getArtist(missingArtistsTarget);

      await createArtist(newArtistData);
      await createArtist(newArtistDataTarget);
    }

    const genreUserRequest = await getArtistGenre(uniqueArtistIds);
    const genreUserTarget = await getArtistGenre(uniqueArtistIdsTarget);

    userRequestScores = calculateGenreScores(genreUserRequest);
    userTargetScores = calculateGenreScores(genreUserTarget);

    const imageRequest = await generatePieChart(userRequestScores);
    const imageTarget = await generatePieChart(userTargetScores);

    const extractedKeys = Object.keys(userRequestScores.genrePercentages);
    const extractedKeys2 = Object.keys(userTargetScores.genrePercentages);

    const similarityScore = calculateSimilarityScore(Object(userRequestScores.genreCounts),
      Object(userTargetScores.genreCounts), extractedKeys, extractedKeys2
    );
    const matchId = Math.random().toString(36).substring(2, 6).toUpperCase();

    await saveUser({
      userId: userRequestData.user_id,
      genreScores: userRequestScores.genrePercentages,
      displayName: userRequestData.display_name,
      urlProfile: userRequestData.url_profile,
      images: userRequestData.images
    });

    const sortedGenres = Object.entries(userRequestScores.genrePercentages)
      .sort((a, b) => b[1] - a[1]);
    const topTwoGenres = sortedGenres.slice(0, 2).map(item => item[0]);

    const artistIdsRecommend = await getArtistsByGenres(topTwoGenres);

    const artistImages = await getArtistImages(artistIdsRecommend);

    const recommend = await getRecommendTracks(artistIdsRecommend);

    const artistImagesMap = new Map(artistImages.map(image => [image.artist_id, image.images]));

    const combinedResults = recommend.map(track => ({
      artist_id: track.artist_id,
      track_name: track.track_name,
      artist_name: track.artist_name,
      duration_ms: track.duration_ms,
      images: artistImagesMap.get(track.artist_id) || []
    }));

    await saveMatchingResult({
      matchId,
      similarityScore,
      userRequestId,
      userTargetId,
      userRequestScores: userRequestScores.genrePercentages,
      userTargetScores: userTargetScores.genrePercentages,
      combinedResults
    });

    res.status(200).json({
      success: true,
      imageRequest,
      imageTarget,
      userRequestScores: userRequestScores.genrePercentages,
      userTargetScores: userTargetScores.genrePercentages,
      similarityScore,
      userRequestData,
      userTargetData,
      combinedResults
    });
  } catch (error) {
    console.error("Error in startMatching", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { startMatching };

