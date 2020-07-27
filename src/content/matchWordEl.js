import wordMeaning from './components/wordMeaning';

function delayMouseEvent(element, callback) {
  let timeout = null;

  element.onmouseover = event => {
    timeout = setTimeout(() => callback(event), 500);
  };
  element.onmouseout = () => {
    clearTimeout(timeout);
  };
}

export default function(word, langId) {
  const element = document.createElement('span');
  element.textContent = word;
  element.className = 'oneWord-match';
  element.setAttribute(
    'data-oneWord',
    JSON.stringify({
      word,
      langId,
    })
  );

  const eventHandler = ({ target }) => {
    if (target.matches('.open, .disabled')) return;
    target.classList.add('open');

    wordMeaning({
      target,
      ...JSON.parse(target.dataset.oneword),
    });
  };

  element.addEventListener('click', eventHandler);
  delayMouseEvent(element, eventHandler);

  return element;
}
