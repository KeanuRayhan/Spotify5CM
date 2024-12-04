const euclideanDistanceWithPenalty = (vecA, vecB) => {
  let sumOfSquares = 0;

  for (let i = 0; i < vecA.length; i++) {
    const diff = vecA[i] - vecB[i];
    if (vecA[i] === 0 || vecB[i] === 0) {
      sumOfSquares += (100) ** 2; // Penalti maksimum
    } else {
      sumOfSquares += diff ** 2; // Perbedaan normal
    }
  }

  return Math.sqrt(sumOfSquares);
};

const calculateSimilarityScore = (centroidA, centroidB, genreA, genreB) => {
  const lengthGenre = Object.keys(centroidA).length + Object.keys(centroidB).length;

  const vecA = [];
  const vecB = [];
  let same = 0;

  // Build vecA and vecB based on userRequestCentroid
  for (const genre of genreA) {
    vecA.push(centroidA[genre]); // Tambahkan nilai dari centroidA ke vecA
    
    let found = false;  
    for (const i in genreB) {
      if (genre === genreB[i]) {  // Jika genreA ada di genreB
        vecB.push(centroidB[genreB[i]]);  // Ambil nilai dari centroidB
        found = true;  // Set flag ke true
        same = same + 1;
        break;  // Keluar dari loop jika sudah ditemukan
      }
    }

    // Jika genreA tidak ditemukan di genreB, tambahkan 0 ke vecB
    if (!found) {
      vecB.push(0);
    }
  }

  // Ensure both vectors have the same length by filling with zeros
  while (vecA.length < (lengthGenre - same)) {
    vecA.push(0);
  }
  while (vecB.length < (lengthGenre - same)) {
    for (const key in centroidB) {
      // Jika panjang vecB kurang dari lengthGenre, tambahkan nilai dari centroidB
      if (vecB.length < (lengthGenre - same)) {
        vecB.push(centroidB[key]);
      } else {
        break; // Keluar dari loop if sudah cukup
      }
    }
  }

  const distance = euclideanDistanceWithPenalty(vecA, vecB);

  const maxPossibleDistance = Math.sqrt(lengthGenre * (100 ** 2));
  const similarity = ((maxPossibleDistance - distance) / maxPossibleDistance) * 100;

  return `${Math.max(0, Math.round(similarity))}`; // Ensure score is not negative
};


module.exports = { calculateSimilarityScore };
