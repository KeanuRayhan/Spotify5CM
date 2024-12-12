const calculateGenreScores = (genreList) => {
  const genreCounts = genreList.reduce((acc, genre) => {
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});

  // Filter out genres listened to only once
  for (const genre in genreCounts) {
    if (genreCounts[genre] === 1) {
      delete genreCounts[genre];
    }
  }

  // Sort genres by their counts in descending order
  const sortedGenres = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]);

  // Take the top 6 genres
  const topGenres = sortedGenres.slice(0, 6);

  // Combine remaining genres into 'Others'
  const othersCount = sortedGenres
    .slice(6)
    .reduce((sum, [, count]) => sum + count, 0);

  if (othersCount > 0) {
    topGenres.push(["Others", othersCount]);
  }

  // Calculate total number of genres
  const totalGenres = genreList.length;

  // Calculate percentages for each genre, including 'Others'
  const genrePercentages = {};
  for (let [genre, count] of topGenres) {
    genrePercentages[genre] = Number(((count / totalGenres) * 100).toFixed(2));
  }

  return { genreCounts, genrePercentages };
};

module.exports = { calculateGenreScores };
