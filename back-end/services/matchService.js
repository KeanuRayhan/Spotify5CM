const Match = require('../models/Match');

const saveMatchingResult = async ({ matchId, similarityScore, userRequestId, userTargetId }) => {
  await Match.create({
    match_id: matchId,
    similarity_score: similarityScore,
    user_request_id: userRequestId,
    user_target_id: userTargetId,
  });
};

module.exports = { saveMatchingResult };
