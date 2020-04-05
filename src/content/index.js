import './style.scss';
import { getStorage } from '~/utils/storage';
import findAndReplaceDOMText from './utils/findAndReplaceDOMText';
import popper from './components/popper';

// Create popover container
(function() {
  if (document.getElementById('oneWord-popover')) return;

  const popoverEl = document.createElement('div');
  popoverEl.setAttribute('id', 'oneWord-popover');
  popoverEl.classList.add('oneWord-popover');
  document.body.appendChild(popoverEl);
})();

document.addEventListener('dblclick', async event => {
  const { settings } = await getStorage('settings');
  const text = window
    .getSelection()
    .toString()
    .trim()
    .toLocaleLowerCase();
  const virtualElement = {
    getBoundingClientRect: () => ({
      width: 0,
      height: 0,
      top: event.clientY + 7,
      right: event.clientX,
      bottom: event.clientY + 7,
      left: event.clientX,
    }),
  };
  const hasOneWordClass = /oneWord-/g.test(event.target.className);
  const isCtrlClick = !settings.ctrlClick ? true : event.ctrlKey;

  if (!!text && !hasOneWordClass && isCtrlClick) popper(virtualElement, 'AddWord', text);
});

getStorage('words').then(({ words }) => {
  if (words.length === 0) return;

  const mapWordTitle = words.map(word => word.title);
  findAndReplaceDOMText(document.body, mapWordTitle);
});
