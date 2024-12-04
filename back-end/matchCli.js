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

};

matchUsers();
