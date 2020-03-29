export default function(words) {
  const wordList = words.join('|');
  const regexPattern = `\\b(${wordList})\\b`;
  const regex = new RegExp(regexPattern, 'ig');
  return regex;
}
