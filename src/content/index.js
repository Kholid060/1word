import './style.scss';
import getWords from './utils/getWords';
import findAndReplaceDOMText from './utils/findAndReplaceDOMText';
import removeDuplicate from './utils/removeDuplicate';
import popper from './utils/popper';

const browser = require('webextension-polyfill');

document.addEventListener('dblclick', event => {
  const text = window
    .getSelection()
    .toString()
    .trim()
    .toLocaleLowerCase();
  const hasAttribute = attribute => event.target.hasAttribute(attribute);
  if (!!text && !hasAttribute('word-data') && !hasAttribute('popover-container')) popper(event, 'add', text);
});

getWords().then(async words => {
  if (Object.keys(words).length === 0) return;
  const mapWordTitle = words.map(word => word.title);
  findAndReplaceDOMText(document.body, mapWordTitle).then(matchWords => {
    const removeDuplicateMatchWord = removeDuplicate(matchWords);
    const sendWordsPayload = words.filter(word => removeDuplicateMatchWord.includes(word.title));
    browser.runtime.sendMessage({ to: 'background', type: 'matchWord', data: sendWordsPayload });
  });
});
