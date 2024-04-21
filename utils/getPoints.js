async function getPoints(inputIdea, oneIdea) {
  let points = 0;

  // Check for token matches
  const inputTokens = new Set(inputIdea.tokens);
  const oneIdeaTokens = new Set(oneIdea.tokens);

  for (const token of inputTokens) {
    if (oneIdeaTokens.has(token)) {
      points += 2;
    }
  }

  // Check for genre match
  if (inputIdea.genre.toLowerCase() === oneIdea.genre.toLowerCase()) {
    points += 15;
  }

  return points;
}

module.exports = getPoints;
