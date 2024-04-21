const natural = require("natural");

// Define the tokenizer and stemmer
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

// Function to tokenize and stem an idea element
async function tokenizeAndStemTitleAndBody(input) {
  // Tokenize the idea element
  const tokens = tokenizer.tokenize(input.toLowerCase());

  // Stem the tokens
  const stemmedTokens = tokens.map((token) => stemmer.stem(token));

  return stemmedTokens;
}

async function tokenizeAndStemKeywords(keywords) {
  // Flatten the array of arrays and tokenize/stem each keyword
  const flattenedKeywords = keywords
    .map((keyword) => tokenizer.tokenize(keyword.toLowerCase())) // Tokenize each keyword
    .flat(); // Flatten the array of arrays

  // Stem the tokens
  const stemmedKeywords = flattenedKeywords.map((token) => stemmer.stem(token));

  return stemmedKeywords;
}

async function tokenizeAndStem(idea) {
  const { title, body, keywords } = idea;
  const newTitle = await tokenizeAndStemTitleAndBody(title);
  const newBody = await tokenizeAndStemTitleAndBody(body);
  const newKeywords = await tokenizeAndStemKeywords(keywords);

  idea.tokens = [...newTitle, ...newBody, ...newKeywords].flat(); 
  return idea;
}

module.exports = tokenizeAndStem
