export default function(word, title, meaning, learn_id) {
  return word.learn_id === learn_id && word.title.toLowerCase() === title.toLowerCase();
}
