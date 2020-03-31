import url from 'url';
import { setStorage, getStorage } from '~/utils/storage';
import isURL from '~/utils/isURL';

global.browser = require('webextension-polyfill');

browser.runtime.onInstalled.addListener(async () => {
  const dataKey = ['learns', 'practices', 'words', 'blockedWebsite'];
  const data = await getStorage(dataKey);

  if (Object.keys(data).length === 0) {
    setStorage({
      learns: [],
      practices: [],
      words: [],
      blockedWebsite: ['https://www.google.com', 'https://mail.google.com', 'https://www.youtube.com', 'https://www.bing.com'],
    });

    browser.tabs.create({
      active: true,
      url: browser.runtime.getURL('/tab/tab.html#/welcome'),
    });
  }
});

browser.runtime.onMessage.addListener((request, sender) => {
  return new Promise(resolve => {
    resolve();
  });
});

browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    const { blockedWebsite } = await getStorage('blockedWebsite');
    const hostList = blockedWebsite.map(web => url.parse(web).hostname);
    const isBlocked = hostList.includes(url.parse(tab.url).hostname);
    if (!isBlocked && isURL(tab.url)) {
      browser.tabs.executeScript(tabId, {
        file: '/content/index.js',
      });
      browser.tabs.insertCSS(tabId, {
        file: '/content/index.css',
      });
    }
  }
});
