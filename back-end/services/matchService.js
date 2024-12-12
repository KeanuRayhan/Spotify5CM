const Match = require('../models/Match');

const saveMatchingResult = async ({ matchId, similarityScore, userRequestId, userTargetId, userRequestScores, userTargetScores,combinedResults }) => {
  await Match.create({
    match_id: matchId,
    similarity_score: similarityScore,
    user_request_id: userRequestId,
    user_target_id: userTargetId,
    genre_scores_ureq: userRequestScores,
    genre_scores_utar: userTargetScores,
    recommended_tracks: combinedResults
  });
};

const isEverMatch = async (userRequestId, userTargetId) => {
  const match = await Match.findOne({ user_request_id: userRequestId, user_target_id: userTargetId });
  return match;
}

module.exports = { saveMatchingResult, isEverMatch };
