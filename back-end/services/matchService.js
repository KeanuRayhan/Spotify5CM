const Match = require('../models/Match');

const saveMatchingResult = async ({ matchId, similarityScore, userRequestId, userTargetId, userRequestScores, userTargetScores }) => {
  await Match.create({
    match_id: matchId,
    similarity_score: similarityScore,
    user_request_id: userRequestId,
    user_target_id: userTargetId,
    genre_scores_ureq: userRequestScores,
    genre_scores_utar: userTargetScores,
  });
};


module.exports = { saveMatchingResult };
