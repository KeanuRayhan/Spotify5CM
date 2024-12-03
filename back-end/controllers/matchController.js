const { fetchUserAndTracks, getUserData, getAudioFeatures } = require('../services/spotifyService');
const { saveMatchingResult } = require('../services/matchService');
const { calculateSimilarityScore } = require('../utils/cosineSimilarity');
const { extractUserIdFromUrl } = require('../utils/urlUtil.js');
const { calculateCentroid } = require('../utils/audioFeatures');

const startMatchingCli = async (userRequestUrl, userTargetUrl) => {
  const userRequestId = extractUserIdFromUrl(userRequestUrl);
  const userTargetId = extractUserIdFromUrl(userTargetUrl);

  const userRequestData = await getUserData(userRequestId);
  const userTargetData = await getUserData(userTargetId);

  console.log(userRequestData);
  console.log(userTargetData);

  if (!userRequestData || !userTargetData) {
    return 'Profil Not Valid';
  }

  const { userRequestTracks, userTargetTracks } = await fetchUserAndTracks(userRequestId, userTargetId);
  console.log(userRequestTracks);
  console.log(userTargetTracks);
  if (!userRequestTracks.length || !userTargetTracks.length) {
    return 'No Playlist Available';
  }

  // const userRequestAudioFeature = await getAudioFeatures(userRequestTracks); 
  // const userTargetAudioFeature = await getAudioFeatures(userTargetTracks);

  // console.log('Audio Feature for Request Track:', userRequestAudioFeature);
  // console.log('Audio Feature for Target Track:', userTargetAudioFeature);

  // const userRequestCentroid = calculateCentroid(userRequestAudioFeatures);
  // const userTargetCentroid = calculateCentroid(userTargetAudioFeatures);
  // console.log(userRequestCentroid);
  // console.log(userTargetCentroid);

  const userRequestAudioFeatures = [
    {
      acousticness: 1.00,
      danceability: 0.943,
      energy: 0.952,
      instrumentalness: 1.00,
      loudness: 4.573,
      mode: 1,
      speechiness: 0.613,
      valence: 0.961,
      tempo: 136.998,
      time_signature: 4,
      key: 2,
      liveness: 1.00
    }
  ];
  

  const userTargetAudioFeatures = [
    {
      acousticness: 0.058,
      danceability: 0.059,
      energy: 0.027,
      instrumentalness: 0.001752,
      loudness: -5.598,
      mode: 0,
      speechiness: 0.073,
      valence: 0.088,
      tempo: 60.932,
      time_signature: 4,
      key: 10,
      liveness: 0.032
    }
  ];

  const userRequestCentroid = calculateCentroid(userRequestAudioFeatures);
  const userTargetCentroid = calculateCentroid(userTargetAudioFeatures);

  const similarityScore = calculateSimilarityScore(Object.values(userRequestCentroid),
    Object.values(userTargetCentroid)
  );
  const matchId = Math.random().toString(36).substring(2, 6).toUpperCase();

  await saveMatchingResult({
    matchId,
    similarityScore,
    userRequestId,
    userTargetId,
  });

  return `Matching Successful!\nMatch ID: ${matchId}\nSimilarity Score: ${similarityScore}`;
};

module.exports = { startMatchingCli };
