export default function(words) {
  const wordList = words.join('|');
  const regex = new RegExp(`(^|\\b)(${wordList})(?=\\s|$|\\b)`, 'ig');

  return regex;
}
