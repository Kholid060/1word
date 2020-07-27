import findAndReplaceDOMText from 'findandreplacedomtext';
import generateWordRegex from '~/utils/generateWordRegex';
import matchWordEl from './matchWordEl';

export default function({ target, words, langId }) {
  return new Promise(resolve => {
    findAndReplaceDOMText(target, {
      preset: 'prose',
      find: generateWordRegex(words),
      replace: ({ text }) => matchWordEl(text, langId),
      filterElements(element) {
        return element.nodeType !== 8;
      },
    });

    resolve();
  });
}
