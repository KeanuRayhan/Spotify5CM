const calculateGenreScores = (genreList) => {
  const genreCounts = genreList.reduce((acc, genre) => {
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});

  const totalGenres = genreList.length;

  const genrePercentages = {};
  for (let genre in genreCounts) {
    genrePercentages[genre] = Number(((genreCounts[genre] / totalGenres) * 100).toFixed(2));
  }

  return { genreCounts, genrePercentages };
};

module.exports = { calculateGenreScores };