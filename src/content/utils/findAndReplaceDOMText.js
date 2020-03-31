import findAndReplaceDOMText from 'findandreplacedomtext';

import generateRegex from './generateRegex';
import createElement from './createElement';

export default function(target, words) {
  const removeDuplicateWord = Array.from(new Set(words));
  const matchWords = [];
  return new Promise(resolve => {
    findAndReplaceDOMText(target, {
      preset: 'prose',
      find: generateRegex(removeDuplicateWord),
      replace: (portion, match) => {
        const matchWord = match[0];
        const filterMatchWord = removeDuplicateWord.filter(word => word.toLocaleLowerCase() === matchWord.toLocaleLowerCase());
        const element = createElement(matchWord, filterMatchWord);
        matchWords.push(match[0]);
        return element;
      },
      filterElements(element) {
        if (element.nodeType !== 8) return !element.hasAttribute('rendered-data-ext');
      },
    });
    resolve(matchWords);
  });
}
