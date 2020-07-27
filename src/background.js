import { request } from './utils/firebase';
import addWord from './utils/addWord';
import './syncLocalData';

const browser = require('webextension-polyfill');

browser.runtime.onMessage.addListener(message => {
  return new Promise((resolve, reject) => {
    const { type } = message;

    if (type === 'translate') {
      const { text, lang } = message;

      request(`/translate?lang=${lang}-en&text=${text}`)
        .then(data => resolve(data))
        .catch(() => reject());
    } else if (type === 'currentTabLanguage') {
      browser.tabs.query({ active: true }).then(tab => {
        const { id } = tab[0];

        browser.browserAction.setBadgeText({
          text: message.langId.toUpperCase(),
          tabId: id,
        });

        browser.browserAction.setIcon({
          path: 'icons/icon_128.png',
        });

        resolve();
      });
    } else if (type === 'addWord') {
      addWord(message)
        .then(() => resolve())
        .catch(() => reject());
    }
  });
});
