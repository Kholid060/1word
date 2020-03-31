import popper from '../components/popper';

function delayMouseEvent(element, callback) {
  let timeout = null;

  element.onmouseover = event => {
    timeout = setTimeout(() => callback(event), 500);
  };
  element.onmouseout = () => {
    clearTimeout(timeout);
  };
}

export default function(texts = '', data) {
  const element = document.createElement('span');
  element.textContent = texts;
  element.className = 'oneWord-match';
  element.setAttribute('oneWord-data', data);

  element.addEventListener('click', event => {
    const { target } = event;

    if (target.classList.contains('open')) return;

    target.classList.add('open');

    popper(element, 'WordMeaning', data[0]);
  });

  delayMouseEvent(element, event => {
    const { target } = event;

    if (target.classList.contains('open')) return;

    target.classList.add('open');

    popper(element, 'WordMeaning', data[0]);
  });
  return element;
}
