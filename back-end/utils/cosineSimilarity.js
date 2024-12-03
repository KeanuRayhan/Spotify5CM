const euclideanDistance = (vecA, vecB) => {
  const sumOfSquares = vecA.reduce((sum, val, i) => sum + (val - vecB[i]) ** 2, 0);

  return Math.sqrt(sumOfSquares);
};

const calculateSimilarityScore = (vecA, vecB) => {
  const maxPossibleDistance = 190.32; 
  
  const distance = euclideanDistance(vecA, vecB);
  if (distance === 0) {
    return "100%";
  }
  console.log(distance)
  const normalizedSimilarity = Math.max(0, (distance / maxPossibleDistance) * 100);

  return Math.round(normalizedSimilarity);
};

module.exports = { calculateSimilarityScore };
