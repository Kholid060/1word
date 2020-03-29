global.browser = require('webextension-polyfill');
import { setStorage, getStorage } from '~/utils/storage';
import isURL from '~/utils/isURL';

browser.runtime.onInstalled.addListener(async () => {
  // browser.tabs.create({
  //   active: true,
  //   url: browser.runtime.getURL('/tab/tab.html#/welcome')
  // })

  const dataKey = ['learns', 'practices', 'words', 'blockedWebsite'];
  const data = await getStorage(dataKey);

  if (Object.keys(data).length === 0) {
    setStorage({
      learns: [],
      practices: [],
      words: [],
      blockedWebsite: ['https://google.com', 'https://mail.google.com', 'https://youtube.com', 'https://bing.com'],
    });
  }
});

browser.runtime.onMessage.addListener((request, sender) => {
  return new Promise(resolve => {
    resolve();
  });
});
