const readline = require('readline');
const mongoose = require('mongoose');
const connectDB = require('./db');
const { startMatchingCli } = require('./controllers/matchController');
const { getAudioFeatures } = require('./services/spotifyService');

const { calculateSimilarityScore } = require('./utils/cosineSimilarity');
const { calculateCentroid } = require('./utils/audioFeatures');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

const matchUsers = async () => {
  try {
    await connectDB();

  // tes ambil profile + track id (playlist)
    const userRequestUrl = await askQuestion('Masukkan URL User Request: ');
    const userTargetUrl = await askQuestion('Masukkan URL User Target: ');

    const result = await startMatchingCli(userRequestUrl, userTargetUrl);
    console.log(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    rl.close();
    mongoose.disconnect();
  }

  //tes similarity
  // const userRequestAudioFeatures = [
  //   {
  //     acousticness: 1.00,
  //     danceability: 0.943,
  //     energy: 0.952,
  //     instrumentalness: 1.00,
  //     loudness: 4.573,
  //     mode: 1,
  //     speechiness: 0.613,
  //     valence: 0.961,
  //     tempo: 136.998,
  //     time_signature: 4,
  //     key: 2,
  //     liveness: 1.00
  //   }
  // ];
  

  // const userTargetAudioFeatures = [
  //   {
  //     acousticness: 0.058,
  //     danceability: 0.059,
  //     energy: 0.027,
  //     instrumentalness: 0.001752,
  //     loudness: -5.598,
  //     mode: 0,
  //     speechiness: 0.073,
  //     valence: 0.088,
  //     tempo: 60.932,
  //     time_signature: 4,
  //     key: 10,
  //     liveness: 0.032
  //   }
  // ];

  // const userRequestCentroid = calculateCentroid(userRequestAudioFeatures);
  // const userTargetCentroid = calculateCentroid(userTargetAudioFeatures);

  // console.log("User Request Centroid:", userRequestCentroid);
  // console.log("User Target Centroid:", userTargetCentroid);

  // const similarityScore = calculateSimilarityScore(
  //   Object.values(userRequestCentroid),
  //   Object.values(userTargetCentroid)
  // );
  // console.log("Similarity Score euclidian:", similarityScore);

  //tes create pie chart genre

};

matchUsers();
