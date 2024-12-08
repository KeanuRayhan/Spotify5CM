const { fetchUserAndTracks, getUserData, getAudioFeatures, getArtist } = require('../services/spotifyService');
const { saveMatchingResult } = require('../services/matchService');
const { calculateSimilarityScore } = require('../utils/cosineSimilarity');
const { extractUserIdFromUrl } = require('../utils/urlUtil.js');
const { calculateCentroid } = require('../utils/audioFeatures');
const { getAllArtistIds, createArtist } = require('../services/artistService');
const { checkArtists } = require('../controllers/artistController');
const Artist = require('../models/Artist.js');
const { getArtistGenre, getArtistsByGenres, getRecommendTracks } = require('../services/artistService');
const { calculateGenreScores } = require('../utils/genreScore');
const { generatePieChart } = require('../utils/genreChart');

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

    const userRequestScores = calculateGenreScores(genreUserRequest);
    const userTargetScores = calculateGenreScores(genreUserTarget);

    const imageRequest = await generatePieChart(userRequestScores);
    const imageTarget = await generatePieChart(userTargetScores);

    const extractedKeys = Object.keys(userRequestScores.genrePercentages);
    const extractedKeys2 = Object.keys(userTargetScores.genrePercentages);

    const similarityScore = calculateSimilarityScore(Object(userRequestScores.genrePercentages),
      Object(userTargetScores.genrePercentages), extractedKeys, extractedKeys2
    );
    const matchId = Math.random().toString(36).substring(2, 6).toUpperCase();

    await saveMatchingResult({
      matchId,
      similarityScore,
      userRequestId,
      userTargetId,
      userRequestScores: userRequestScores.genrePercentages,
      userTargetScores: userTargetScores.genrePercentages,
    });

    console.log("user score:", userRequestScores);
    console.log("user target score:", userTargetScores);

    const sortedGenres = Object.entries(userRequestScores.genrePercentages)
      .sort((a, b) => b[1] - a[1]);
    const topTwoGenres = sortedGenres.slice(0, 2).map(item => item[0]);
    
    const artistIdsRecommend = await getArtistsByGenres(topTwoGenres);
    console.log(artistIdsRecommend)

    const recommend = await getRecommendTracks(artistIdsRecommend);
    console.log(recommend)

    // return imageRequest, imageTarget, similarityScore, userRequestData, userTargetData;
    //kurang recommend
    res.status(200).json({
      success: true,
      imageRequest,
      imageTarget,
      similarityScore,
      userRequestData,
      userTargetData
    });
  } catch (error) {
    console.error("Error in startMatching", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { startMatching };

